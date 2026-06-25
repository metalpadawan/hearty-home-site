import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);
const areaHandler = require('../api/area-check.js');
const contactHandler = require('../api/contact.js');

function runHandler(handler, { method = 'GET', url = '/', body = {}, headers = {}, ip = '127.10.0.1' } = {}) {
  return new Promise((resolve) => {
    const req = {
      method,
      url,
      body,
      headers: {
        host: 'localhost:3000',
        accept: 'application/json',
        'content-type': 'application/json',
        ...headers,
      },
      socket: { remoteAddress: ip },
    };
    const res = {
      statusCode: 200,
      headers: {},
      setHeader(key, value) {
        this.headers[key] = value;
      },
      end(payload) {
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: JSON.parse(payload),
        });
      },
    };

    handler(req, res);
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_TO_EMAIL;
  delete process.env.CONTACT_FROM_EMAIL;
  delete process.env.TURNSTILE_SECRET_KEY;
});

describe('/api/area-check', () => {
  it('blocks invalid origins', async () => {
    const response = await runHandler(areaHandler, {
      url: '/api/area-check?postcode=Chester',
      headers: { origin: 'https://bad.example' },
    });

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe('Invalid request origin.');
  });

  it('accepts known local areas', async () => {
    const response = await runHandler(areaHandler, {
      url: '/api/area-check?postcode=Chester&service=Cleaning%20Services',
      ip: '127.10.0.2',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('covered');
  });
});

describe('/api/contact', () => {
  const validBody = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+441234567890',
    service: 'Cleaning Services',
    location: 'Chester',
    message: 'Please contact me about a service.',
    company: '',
    turnstileToken: '',
  };

  it('rejects invalid email addresses', async () => {
    const response = await runHandler(contactHandler, {
      method: 'POST',
      body: { ...validBody, email: 'not-an-email' },
      ip: '127.10.1.1',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Please enter a valid email address.');
  });

  it('rejects honeypot submissions', async () => {
    const response = await runHandler(contactHandler, {
      method: 'POST',
      body: { ...validBody, company: 'bot value' },
      ip: '127.10.1.2',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Submission rejected.');
  });

  it('rejects services outside the server allowlist', async () => {
    const response = await runHandler(contactHandler, {
      method: 'POST',
      body: { ...validBody, service: 'Unexpected Service' },
      ip: '127.10.1.4',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Please choose a valid service.');
  });

  it('sends a valid enquiry when email is configured', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    process.env.CONTACT_TO_EMAIL = 'owner@example.com';
    process.env.CONTACT_FROM_EMAIL = 'Hearty Home Services <noreply@example.com>';

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'mock-email' }),
    });

    const response = await runHandler(contactHandler, {
      method: 'POST',
      body: validBody,
      ip: '127.10.1.3',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Thank you. Your enquiry has been sent.');
    expect(globalThis.fetch).toHaveBeenCalledWith('https://api.resend.com/emails', expect.any(Object));
  });
});
