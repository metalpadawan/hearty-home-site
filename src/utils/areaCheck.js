const CHESTER = { latitude: 53.1905, longitude: -2.8919 };
const COVERED_RADIUS_MILES = 22;
const REVIEW_RADIUS_MILES = 32;

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

function normaliseArea(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
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
  const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`, {
    headers: { Accept: 'application/json' },
  });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error('The postcode checker is temporarily unavailable. Please try again or send a full enquiry.');

  const data = await response.json();
  return data.result || null;
}

export async function checkAreaAvailability(input, service) {
  const value = String(input || '').trim().replace(/\s+/g, ' ').slice(0, 80);

  if (!value) {
    return { status: 'error', message: 'Enter a postcode or area so we can check availability.' };
  }

  const area = knownAreas.get(normaliseArea(value));
  if (area) {
    return { status: 'covered', location: area, message: buildMessage('covered', area, service) };
  }

  const outcode = normaliseOutcode(value);
  if (outcodePattern.test(outcode) && !postcodePattern.test(value)) {
    if (coveredOutcodes.has(outcode)) {
      return { status: 'covered', location: outcode, message: buildMessage('covered', outcode, service) };
    }

    if (reviewOutcodes.has(outcode)) {
      return { status: 'review', location: outcode, message: buildMessage('review', outcode, service) };
    }

    return {
      status: 'error',
      message: `${value} is not a recognised Chester-area postcode district. Please enter a full UK postcode or a local area name.`,
    };
  }

  if (!postcodePattern.test(value)) {
    return {
      status: 'error',
      message: 'Please enter a valid UK postcode, such as CH1 2HJ, or a recognised local area near Chester.',
    };
  }

  const postcode = await lookupPostcode(value);
  if (!postcode?.latitude || !postcode?.longitude) {
    return { status: 'error', message: `${value.toUpperCase()} could not be found as a valid UK postcode.` };
  }

  const miles = distanceMiles(CHESTER, {
    latitude: postcode.latitude,
    longitude: postcode.longitude,
  });
  const location = postcode.postcode || value.toUpperCase();

  if (miles <= COVERED_RADIUS_MILES || coveredOutcodes.has(postcode.outcode)) {
    return {
      status: 'covered',
      location,
      distanceMiles: Math.round(miles),
      message: `${buildMessage('covered', location, service)} Distance from Chester is about ${formatMiles(miles)}.`,
    };
  }

  if (miles <= REVIEW_RADIUS_MILES || reviewOutcodes.has(postcode.outcode)) {
    return {
      status: 'review',
      location,
      distanceMiles: Math.round(miles),
      message: `${buildMessage('review', location, service)} Distance from Chester is about ${formatMiles(miles)}.`,
    };
  }

  return {
    status: 'outside',
    location,
    distanceMiles: Math.round(miles),
    message: `${buildMessage('outside', location, service)} Distance from Chester is about ${formatMiles(miles)}.`,
  };
}
