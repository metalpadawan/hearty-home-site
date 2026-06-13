import { Instagram, Mail, MapPin, Phone, UserRound } from 'lucide-react';
import Container from '../components/Container.jsx';
import ContactForm from '../components/ContactForm.jsx';
import MotionSection from '../components/MotionSection.jsx';
import { site } from '../data/site.js';

export default function Contact() {
  const details = [
    [UserRound, 'Service Enquiries', 'Tell us what support you need'],
    [Phone, 'Phone', site.phonePlaceholder],
    [Mail, 'Email', site.emailPlaceholder],
    [MapPin, 'Location', site.area],
    [Instagram, 'Instagram', site.instagramPlaceholder],
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
            {details.map(([Icon, label, value]) => (
              <div key={label} className="flex gap-4 rounded-2xl border border-teal-900/10 bg-white p-5 shadow-soft">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-800">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong className="block text-sm uppercase tracking-[0.16em] text-teal-700">{label}</strong>
                  <span className="mt-1 block text-teal-950/70">{value}</span>
                </div>
              </div>
            ))}
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
    </>
  );
}
