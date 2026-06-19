const CHESTER = { latitude: 53.1905, longitude: -2.8919 };
const COVERED_RADIUS_MILES = 22;
const REVIEW_RADIUS_MILES = 32;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 30;
const MAX_RATE_LIMIT_RECORDS = 500;
const UPSTREAM_TIMEOUT_MS = 8_000;
const requests = new Map();

const knownAreas = new Map([
  ['chester', 'Chester'],
  ['hoole', 'Hoole'],
  ['upton', 'Upton'],
  ['handbridge', 'Handbridge'],
  ['boughton', 'Boughton'],
  ['great boughton', 'Great Boughton'],
  ['saltney', 'Saltney'],
  ['blacon', 'Blacon'],
  ['vicars cross', 'Vicars Cross'],
  ['huntington', 'Huntington'],
  ['waverton', 'Waverton'],
  ['christleton', 'Christleton'],
  ['saughall', 'Saughall'],
  ['mollington', 'Mollington'],
  ['guilden sutton', 'Guilden Sutton'],
  ['tarvin', 'Tarvin'],
  ['tattenhall', 'Tattenhall'],
  ['ellesmere port', 'Ellesmere Port'],
  ['deeside', 'Deeside'],
]);

const coveredOutcodes = new Set(['CH1', 'CH2', 'CH3', 'CH4', 'CH5', 'CH6', 'CH7', 'CH8', 'CH65', 'CH66']);
const reviewOutcodes = new Set(['CH41', 'CH42', 'CH43', 'CH44', 'CH45', 'CH46', 'CH47', 'CH48', 'CH49', 'CH60', 'CH61', 'CH62', 'CH63', 'CH64']);
const postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const outcodePattern = /^[A-Z]{1,2}\d[A-Z\d]?$/i;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
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

function normaliseInput(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, 80);
}

function normaliseArea(value) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
}

function normaliseOutcode(value) {
  return String(value || '').toUpperCase().replace(/\s+/g, '');
}

function formatMiles(value) {
  return `${Math.round(value)} mile${Math.round(value) === 1 ? '' : 's'}`;
}

function distanceMiles(from, to) {
  const radiusMiles = 3958.8;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const latDelta = toRadians(to.latitude - from.latitude);
  const lonDelta = toRadians(to.longitude - from.longitude);
  const fromLat = toRadians(from.latitude);
  const toLat = toRadians(to.latitude);
  const haversine = Math.sin(latDelta / 2) ** 2 + Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lonDelta / 2) ** 2;
  return radiusMiles * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
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

function buildMessage(status, location, service, detail = '') {
  const serviceText = service ? ` for ${service.toLowerCase()}` : '';

  if (status === 'covered') {
    return `${location} appears to be within the current service area${serviceText}. Please send the full enquiry so availability can be confirmed.`;
  }

  if (status === 'review') {
    return `${location} may be close to the edge of the service area${serviceText}. Please send the full enquiry and we will confirm manually.`;
  }

  if (status === 'outside') {
    return `${location} appears to be outside the current Chester service area${serviceText}. You can still send an enquiry for future planning.`;
  }

  return detail || 'Please enter a valid UK postcode or a recognised local area near Chester.';
}

async function lookupPostcode(postcode) {
  const response = await fetchWithTimeout(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`, {
    headers: { Accept: 'application/json' },
  });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Postcode lookup failed.');

  const data = await response.json();
  return data.result || null;
}

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { status: 'error', message: 'Method not allowed.' });
  }

  if (!hasValidOrigin(req)) {
    return sendJson(res, 403, { status: 'error', message: 'Invalid request origin.' });
  }

  const clientId = getClientId(req);
  if (isRateLimited(clientId)) {
    return sendJson(res, 429, { status: 'error', message: 'Too many checks. Please wait and try again.' });
  }

  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const input = normaliseInput(url.searchParams.get('postcode'));
  const service = normaliseInput(url.searchParams.get('service'));

  if (!input) {
    return sendJson(res, 400, { status: 'error', message: 'Enter a postcode or area so we can check availability.' });
  }

  const area = knownAreas.get(normaliseArea(input));
  if (area) {
    return sendJson(res, 200, {
      status: 'covered',
      location: area,
      message: buildMessage('covered', area, service),
    });
  }

  const outcode = normaliseOutcode(input);
  if (outcodePattern.test(outcode) && !postcodePattern.test(input)) {
    if (coveredOutcodes.has(outcode)) {
      return sendJson(res, 200, {
        status: 'covered',
        location: outcode,
        message: buildMessage('covered', outcode, service),
      });
    }

    if (reviewOutcodes.has(outcode)) {
      return sendJson(res, 200, {
        status: 'review',
        location: outcode,
        message: buildMessage('review', outcode, service),
      });
    }

    return sendJson(res, 400, {
      status: 'error',
      message: `${input} is not a recognised Chester-area postcode district. Please enter a full UK postcode or a local area name.`,
    });
  }

  if (!postcodePattern.test(input)) {
    return sendJson(res, 400, {
      status: 'error',
      message: 'Please enter a valid UK postcode, such as CH1 1AA, or a recognised local area near Chester.',
    });
  }

  try {
    const postcode = await lookupPostcode(input);
    if (!postcode?.latitude || !postcode?.longitude) {
      return sendJson(res, 400, {
        status: 'error',
        message: `${input.toUpperCase()} could not be found as a valid UK postcode.`,
      });
    }

    const miles = distanceMiles(CHESTER, {
      latitude: postcode.latitude,
      longitude: postcode.longitude,
    });
    const location = postcode.postcode || input.toUpperCase();

    if (miles <= COVERED_RADIUS_MILES || coveredOutcodes.has(postcode.outcode)) {
      return sendJson(res, 200, {
        status: 'covered',
        location,
        distanceMiles: Math.round(miles),
        message: `${buildMessage('covered', location, service)} Distance from Chester is about ${formatMiles(miles)}.`,
      });
    }

    if (miles <= REVIEW_RADIUS_MILES || reviewOutcodes.has(postcode.outcode)) {
      return sendJson(res, 200, {
        status: 'review',
        location,
        distanceMiles: Math.round(miles),
        message: `${buildMessage('review', location, service)} Distance from Chester is about ${formatMiles(miles)}.`,
      });
    }

    return sendJson(res, 200, {
      status: 'outside',
      location,
      distanceMiles: Math.round(miles),
      message: `${buildMessage('outside', location, service)} Distance from Chester is about ${formatMiles(miles)}.`,
    });
  } catch (error) {
    console.error('Area checker failed:', error instanceof Error ? error.message : 'Unknown error');

    return sendJson(res, 503, {
      status: 'error',
      message: 'The postcode checker is temporarily unavailable. Please try again or send a full enquiry.',
    });
  }
}

module.exports = handler;
