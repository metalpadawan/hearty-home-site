import { Loader2, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { cloneElement, useEffect, useState } from 'react';
import { serviceOptions } from '../data/site.js';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  location: '',
  message: '',
  company: '',
  turnstileToken: '',
};

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const REQUEST_TIMEOUT_MS = 12_000;

function validateForm(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.phone.trim() && !/^[+\d\s().-]{7,}$/.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number or leave it blank.';
  if (!values.service) errors.service = 'Please choose a service.';
  if (!values.message.trim()) errors.message = 'Please include a short message.';

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!turnstileSiteKey || document.querySelector('script[data-turnstile]')) return;

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = 'true';
    document.head.append(script);
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ type: 'error', message: 'Please correct the highlighted fields.' });
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    const turnstileToken = turnstileSiteKey ? window.turnstile?.getResponse() || '' : '';
    if (turnstileSiteKey && !turnstileToken) {
      setStatus({ type: 'error', message: 'Please complete the spam protection check.' });
      return;
    }

    try {
      setSubmitting(true);
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      let response;

      try {
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form, turnstileToken }),
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timeout);
      }

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'The enquiry could not be sent.');

      setStatus({ type: 'success', message: result.message || 'Thank you. Your enquiry has been sent.' });
      setForm(initialForm);
      setErrors({});
      window.turnstile?.reset();
    } catch (error) {
      setStatus({ type: 'error', message: error.name === 'AbortError' ? 'The enquiry request timed out. Please try again.' : error.message || 'The enquiry service is not available right now.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      className="grid gap-5"
      action="/api/contact"
      method="post"
      noValidate
      onSubmit={submitForm}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12 }}
    >
      <input className="hidden" type="text" name="company" tabIndex="-1" autoComplete="off" value={form.company} onChange={updateField} aria-hidden="true" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" id="name" error={errors.name} required>
          <input id="name" name="name" value={form.name} onChange={updateField} autoComplete="name" required />
        </Field>
        <Field label="Email address" id="email" error={errors.email} required>
          <input id="email" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone number" id="phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" />
        </Field>
        <Field label="Service needed" id="service" error={errors.service} required>
          <select id="service" name="service" value={form.service} onChange={updateField} required>
            <option value="">Choose a service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Location" id="location">
        <input id="location" name="location" value={form.location} onChange={updateField} autoComplete="address-level2" placeholder="e.g. Chester, Hoole, Upton" />
      </Field>
      <Field label="Message" id="message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={updateField}
          required
          rows="6"
          placeholder="Tell us about the space, timing, and anything that needs special attention."
        />
      </Field>
      <p className="rounded-2xl border border-gold-500/30 bg-gold-100/60 px-4 py-3 text-sm leading-6 text-teal-950">
        Please do not include medical records, diagnosis details, financial information, identity documents, or highly sensitive personal information in this form.
      </p>
      {turnstileSiteKey ? (
        <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" aria-label="Spam protection challenge" />
      ) : null}
      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-teal-950 shadow-gold transition hover:-translate-y-0.5 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={submitting}
      >
        {submitting ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
        {submitting ? 'Sending...' : 'Send Enquiry'}
      </button>
      <div
        className={`min-h-6 rounded-xl px-4 py-3 text-sm ${status.type === 'success' ? 'bg-teal-50 text-teal-800' : ''} ${
          status.type === 'error' ? 'bg-red-50 text-red-700' : ''
        } ${status.message ? 'block' : 'sr-only'}`}
        role="status"
        aria-live="polite"
      >
        {status.message || 'Form status will appear here.'}
      </div>
    </motion.form>
  );
}

function Field({ label, id, error = '', required = false, children }) {
  const errorId = `${id}-error`;
  const control = cloneElement(children, {
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? errorId : undefined,
  });

  return (
    <div className="field grid gap-2">
      <label className="text-sm font-bold text-teal-950" htmlFor={id}>
        {label}
        {required ? <span className="text-teal-700"> *</span> : null}
      </label>
      {control}
      {error ? (
        <p className="text-sm font-semibold text-red-700" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
