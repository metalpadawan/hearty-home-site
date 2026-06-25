const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_BODY_BYTES = 16 * 1024;
const MAX_RATE_LIMIT_RECORDS = 500;
const UPSTREAM_TIMEOUT_MS = 10_000;
const requests = new Map();
const allowedServices = new Set([
  'Cleaning Services',
  'Hoarders Specialist Support',
  'Home Management',
  'Interior Decor',
  'General Enquiry',
]);

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function sendHtml(res, status, title, message) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head><body><main><h1>${title}</h1><p>${message}</p><p><a href="/contact">Back to contact form</a></p></main></body></html>`);
}

function wantsJson(req) {
  return String(req.headers.accept || '').includes('application/json') || String(req.headers['content-type'] || '').includes('application/json');
}

function parseUrlEncoded(body) {
  return Object.fromEntries(new URLSearchParams(body));
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    if (String(req.headers['content-type'] || '').includes('application/json')) return JSON.parse(req.body);
    return parseUrlEncoded(req.body);
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error('Request body is too large.');
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  if (String(req.headers['content-type'] || '').includes('application/json')) return JSON.parse(raw);
  return parseUrlEncoded(raw);
}

function getClientId(req) {
  return String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
}

function isRateLimited(clientId) {
  const now = Date.now();

  for (const [key, record] of requests) {
    if (now > record.resetAt) requests.delete(key);
  }

  if (requests.size > MAX_RATE_LIMIT_RECORDS) {
    const oldestKey = requests.keys().next().value;
    if (oldestKey) requests.delete(oldestKey);
  }

  const record = requests.get(clientId) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  record.count += 1;
  requests.set(clientId, record);

  return record.count > RATE_LIMIT_MAX;
}

function hasValidOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;

  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

async function fetchWithTimeout(url, options = {}, timeoutMs = UPSTREAM_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function validate(data) {
  const cleaned = {
    name: clean(data.name, 120),
    email: clean(data.email, 160),
    phone: clean(data.phone, 80),
    service: clean(data.service, 120),
    location: clean(data.location, 160),
    message: clean(data.message, 3000),
    company: clean(data.company, 120),
    turnstileToken: clean(data.turnstileToken, 2048),
  };

  if (cleaned.company) return { ok: false, message: 'Submission rejected.' };
  if (!cleaned.name) return { ok: false, message: 'Please enter your full name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) return { ok: false, message: 'Please enter a valid email address.' };
  if (!cleaned.service) return { ok: false, message: 'Please choose a service.' };
  if (!allowedServices.has(cleaned.service)) return { ok: false, message: 'Please choose a valid service.' };
  if (!cleaned.message) return { ok: false, message: 'Please include a short message.' };

  return { ok: true, data: cleaned };
}

async function verifyTurnstile(token, clientIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const response = await fetchWithTimeout('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: clientIp,
      }),
    });

    if (!response.ok) return false;

    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
}

function buildEmail(data) {
  const subject = `Hearty Home Services enquiry: ${data.service}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Service: ${data.service}`,
    `Location: ${data.location || 'Not provided'}`,
    '',
    'Message:',
    data.message,
  ].join('\n');

  const html = text
    .split('\n')
    .map((line) => line.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])))
    .join('<br>');

  return { subject, text, html };
}

async function sendEmail(data) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error('Email service is not configured.');
  }

  const email = buildEmail(data);
  const response = await fetchWithTimeout('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    const message = String(details.message || '');

    if (message.toLowerCase().includes('domain is not verified')) {
      throw new Error('Email sending domain is not verified in Resend yet. Verify contact.heartyhome.co.uk in Resend, then try again.');
    }

    throw new Error(message || 'Email service rejected the message.');
  }
}

async function handler(req, res) {
  const json = wantsJson(req);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json
      ? sendJson(res, 405, { message: 'Method not allowed.' })
      : sendHtml(res, 405, 'Method not allowed', 'Please submit the contact form.');
  }

  try {
    if (!hasValidOrigin(req)) {
      return json
        ? sendJson(res, 403, { message: 'Invalid request origin.' })
        : sendHtml(res, 403, 'Invalid request', 'The request origin could not be verified.');
    }

    const clientId = getClientId(req);

    if (isRateLimited(clientId)) {
      return json
        ? sendJson(res, 429, { message: 'Too many attempts. Please wait and try again.' })
        : sendHtml(res, 429, 'Too many attempts', 'Please wait and try again.');
    }

    const body = await readBody(req);
    const result = validate(body);

    if (!result.ok) {
      return json
        ? sendJson(res, 400, { message: result.message })
        : sendHtml(res, 400, 'Enquiry not sent', result.message);
    }

    const turnstileOk = await verifyTurnstile(result.data.turnstileToken, clientId);
    if (!turnstileOk) {
      return json
        ? sendJson(res, 400, { message: 'Please complete the spam protection check.' })
        : sendHtml(res, 400, 'Enquiry not sent', 'Please complete the spam protection check.');
    }

    await sendEmail(result.data);

    return json
      ? sendJson(res, 200, { message: 'Thank you. Your enquiry has been sent.' })
      : sendHtml(res, 200, 'Enquiry sent', 'Thank you. Your enquiry has been sent.');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const publicMessage = errorMessage.startsWith('Email sending domain is not verified')
      ? errorMessage
      : 'The enquiry service is not available right now.';

    console.error('Contact form failed:', errorMessage);
    return json
      ? sendJson(res, 500, { message: publicMessage })
      : sendHtml(res, 500, 'Enquiry not sent', publicMessage);
  }
}

module.exports = handler;
