import { ArrowRight, Loader2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceOptions } from '../data/site.js';
import { checkAreaAvailability } from '../utils/areaCheck.js';

const statusStyles = {
  covered: 'border-teal-700/20 bg-teal-50 text-teal-900',
  review: 'border-gold-500/30 bg-gold-100/60 text-teal-950',
  outside: 'border-coral-500/25 bg-coral-100/70 text-teal-950',
  error: 'border-red-200 bg-red-50 text-red-800',
  idle: 'border-transparent bg-transparent text-teal-950/70',
};
const REQUEST_TIMEOUT_MS = 8_000;

export default function AreaChecker() {
  const [postcode, setPostcode] = useState('');
  const [service, setService] = useState(serviceOptions[0]);
  const [result, setResult] = useState({
    status: 'idle',
    message: 'Focused on Chester and surrounding areas. Enter a UK postcode or recognised local area.',
  });
  const [checking, setChecking] = useState(false);

  const checkArea = async (event) => {
    event.preventDefault();
    setChecking(true);
    setResult({ status: 'idle', message: 'Checking availability...' });

    const value = postcode.trim();
    let data = null;

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      let response;

      try {
        response = await fetch(`/api/area-check?${new URLSearchParams({ postcode: value, service })}`, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timeout);
      }
      const isJson = response.headers.get('content-type')?.includes('application/json');

      if (isJson) {
        data = await response.json();
        if (!response.ok && response.status < 500) throw new Error(data.message || 'The area checker could not validate that location.');
        if (!response.ok) data = null;
      }
    } catch (error) {
      if (error.name !== 'AbortError' && error.message && !error.message.includes('Failed to fetch')) {
        setResult({ status: 'error', message: error.message });
        setChecking(false);
        return;
      }
    }

    try {
      const finalResult = data || (await checkAreaAvailability(value, service));
      setResult({
        status: finalResult.status || 'idle',
        message: finalResult.message || 'Availability could not be confirmed.',
      });
    } catch (error) {
      setResult({
        status: 'error',
        message: error.message || 'The area checker is not available right now. Please send a full enquiry.',
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <form className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/75 p-5 shadow-soft backdrop-blur-xl sm:p-6" onSubmit={checkArea}>
      <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-coral-100 blur-3xl" />
      <div className="relative flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-800">
          <MapPin size={20} aria-hidden="true" />
        </span>
        <div>
          <p className="eyebrow">Area checker</p>
          <h2 className="font-display text-2xl font-bold text-teal-950">Check if we can support your area.</h2>
        </div>
      </div>
      <div className="relative mt-5 grid gap-3 xl:grid-cols-[1fr_1fr_auto]">
        <label className="sr-only" htmlFor="area-checker-postcode">
          Postcode or area
        </label>
        <input
          id="area-checker-postcode"
          value={postcode}
          onChange={(event) => setPostcode(event.target.value)}
          placeholder="Postcode or area"
          autoComplete="postal-code"
        />
        <label className="sr-only" htmlFor="area-checker-service">
          Service interest
        </label>
        <select id="area-checker-service" value={service} onChange={(event) => setService(event.target.value)}>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <button className="btn-primary w-full xl:w-auto" type="submit">
          {checking ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : null}
          {checking ? 'Checking...' : 'Check'}
          {!checking ? <ArrowRight size={18} aria-hidden="true" /> : null}
        </button>
      </div>
      <div className="relative mt-4 flex flex-col gap-3 text-sm leading-6 sm:flex-row sm:items-center sm:justify-between">
        <p className={`rounded-2xl border px-4 py-3 ${statusStyles[result.status] || statusStyles.idle}`} role="status" aria-live="polite">
          {result.message}
        </p>
        <Link className="font-bold text-teal-800 underline decoration-gold-500/60 underline-offset-4" to="/contact#enquiry">
          Send full enquiry
        </Link>
      </div>
    </form>
  );
}
