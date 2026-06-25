import { afterEach, describe, expect, it, vi } from 'vitest';
import { checkAreaAvailability } from '../src/utils/areaCheck.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('checkAreaAvailability', () => {
  it('accepts recognised local areas without external lookup', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const result = await checkAreaAvailability('Chester', 'Cleaning Services');

    expect(result.status).toBe('covered');
    expect(result.message).toContain('Chester appears to be within the current service area');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('rejects fake postcodes when the postcode API cannot find them', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ status: 404, ok: false });

    const result = await checkAreaAvailability('tm3 4yu', 'Cleaning Services');

    expect(result.status).toBe('error');
    expect(result.message).toContain('could not be found as a valid UK postcode');
  });

  it('marks Chester postcodes as covered', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        result: {
          postcode: 'CH1 2HJ',
          outcode: 'CH1',
          latitude: 53.1905,
          longitude: -2.8919,
        },
      }),
    });

    const result = await checkAreaAvailability('CH1 2HJ', 'Cleaning Services');

    expect(result.status).toBe('covered');
    expect(result.distanceMiles).toBe(0);
  });
});
