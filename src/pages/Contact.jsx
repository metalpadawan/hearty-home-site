import { Instagram, Linkedin, Mail, MapPin, Phone, UserRound } from 'lucide-react';
import Container from '../components/Container.jsx';
import ContactForm from '../components/ContactForm.jsx';
import MotionSection from '../components/MotionSection.jsx';
import { faqs, site } from '../data/site.js';

export default function Contact() {
  const details = [
    [UserRound, 'Service Enquiries', 'Tell us what support you need'],
    [Phone, 'Phone', site.phonePlaceholder],
    [Mail, 'Email', site.emailPlaceholder],
    [MapPin, 'Location', site.area],
    [Instagram, 'Instagram', site.instagramHandle, site.instagramUrl],
    [Linkedin, 'LinkedIn', site.linkedinLabel, site.linkedinUrl],
  ];

  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow">Contact Hearty Home Services</p>
          <h1>Have an enquiry?</h1>
          <p className="lead">Get in touch for current services, specialist support, or interest in future service areas. Please include your service type, location, and any important details.</p>
        </Container>
      </section>

      <MotionSection className="section">
        <Container className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="grid gap-4 self-start" aria-label="Contact details">
            {details.map(([Icon, label, value, href]) => (
              <div key={label} className="flex gap-4 rounded-2xl border border-teal-900/10 bg-white p-5 shadow-soft">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-800">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong className="block text-sm uppercase tracking-[0.16em] text-teal-700">{label}</strong>
                  {href ? (
                    <a className="mt-1 block font-semibold text-teal-950 underline decoration-gold-500/60 underline-offset-4" href={href} rel="noreferrer" target="_blank">
                      {value}
                    </a>
                  ) : (
                    <span className="mt-1 block text-teal-950/70">{value}</span>
                  )}
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-teal-900/10 bg-white p-5 shadow-soft">
              <strong className="block text-sm uppercase tracking-[0.16em] text-teal-700">Instagram QR</strong>
              <a className="mt-4 block overflow-hidden rounded-2xl border border-teal-900/10 bg-mist" href={site.instagramUrl} rel="noreferrer" target="_blank">
                <img className="h-auto w-full" src={site.instagramQr} alt="Instagram QR code for Hearty Home Services" loading="lazy" decoding="async" />
              </a>
              <p className="mt-3 text-sm leading-6 text-teal-950/60">Scan or tap to open the Hearty Home Services Instagram page.</p>
            </div>
          </aside>

          <section className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-8" id="enquiry">
            <p className="eyebrow">Send enquiry</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Tell us what support you need.</h2>
            <p className="mt-4 text-sm leading-7 text-teal-950/60">
              Direct contact details are coming soon. For now, this form is ready for the business email once it is added in Vercel.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </section>
        </Container>
      </MotionSection>

      <MotionSection className="section bg-cream">
        <Container>
          <div className="section-head">
            <div>
              <p className="eyebrow">Questions</p>
              <h2>Helpful answers before you send an enquiry.</h2>
            </div>
            <p>These answers cover services, hoarders support, area coverage, family or carer involvement, and contact placeholders.</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <details className="group rounded-2xl border border-teal-900/10 bg-white p-5 shadow-soft" key={question}>
                <summary className="cursor-pointer list-none text-base font-bold text-teal-950 group-open:text-teal-700">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-teal-950/70">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </MotionSection>
    </>
  );
}
