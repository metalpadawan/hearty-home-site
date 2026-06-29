import { ArrowRight, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container.jsx';
import MotionSection from '../components/MotionSection.jsx';
import { site } from '../data/site.js';

const founderSections = [
  {
    label: 'Story',
    title: 'The story behind the work.',
    copy:
      'Hearty Home Services grew from support-work experience and the understanding that every home carries a personal story. Some spaces need practical cleaning, some need organisation, and some need patient conversation before any visible progress can happen.',
  },
  {
    label: 'Mission',
    title: 'To make support feel respectful, clear, and possible.',
    copy:
      'The mission is to help people, families, and businesses regain calm in their spaces through reliable services, careful communication, and a person-first approach.',
  },
  {
    label: 'Reason',
    title: 'Because people should not feel judged when they ask for help.',
    copy:
      'Many clients delay asking for support because they feel embarrassed, overwhelmed, or unsure where to begin. The service exists to make that first step easier and more dignified.',
  },
  {
    label: 'Vision',
    title: 'A trusted home services brand with heart.',
    copy:
      'The long-term vision is to grow Hearty Home Services into a trusted multi-service brand for cleaning, hoarders specialist support, home management, interior decor, and practical home care.',
  },
];

const clientGoals = [
  ['Individuals', 'Feel supported, respected, and able to make progress at a pace that feels manageable.'],
  ['Families', 'Get a clearer way to help loved ones without shame, pressure, or rushed decisions.'],
  ['Businesses', 'Keep workspaces clean, presentable, and dependable for staff, visitors, and clients.'],
  ['Properties', 'Prepare homes, short-stays, and tenancy spaces with practical standards and calm follow-through.'],
];

export default function Founder() {
  return (
    <>
      <section className="page-hero">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative mx-auto w-full max-w-48 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white p-2 shadow-soft sm:max-w-52 lg:order-first">
            <img
              src="/assets/images/founder-portrait.jpeg"
              alt={`${site.founderName}, founder of Hearty Home Services`}
              className="aspect-[4/5] w-full rounded-[1.1rem] object-cover object-top"
              loading="eager"
              decoding="async"
            />
          </div>
          <div>
            <p className="eyebrow">Founder</p>
            <p className="mb-3 font-display text-2xl font-bold text-gold-100">{site.founderName}</p>
            <h1>Built from support-work experience and practical care.</h1>
            <p className="lead">
              Hearty Home Services is shaped by the belief that homes are personal. The work is not only about making a space clean; it is about communication, trust,
              dignity, and knowing when a person needs patience before practical change can happen.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="btn-primary" href={site.linkedinUrl} rel="noreferrer" target="_blank">
                LinkedIn <Linkedin size={18} aria-hidden="true" />
              </a>
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-teal-900/15 bg-white px-6 py-3 text-sm font-bold text-teal-950 shadow-soft transition hover:-translate-y-0.5 hover:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500" to="/contact#enquiry">
                Contact Us <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <MotionSection className="section">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div className="rounded-[2rem] bg-white p-8 shadow-soft sm:p-10">
            <p className="eyebrow">Approach</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Care for the person, then care for the space.</h2>
            <p className="lead mt-5">
              {site.founderName}'s background in support work informs the tone of the brand: listen first, communicate clearly, respect consent, and keep the person at the
              centre of every practical decision.
            </p>
            <p className="mt-4 text-sm leading-7 text-teal-950/70">
              That experience matters most in situations involving hoarders, where people may feel overwhelmed, embarrassed, anxious, or unsure where to begin. The aim is
              patient problem solving, not pressure.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-gold-500/20 bg-gradient-to-br from-gold-100 via-white to-teal-50 p-6 shadow-soft">
            <strong className="font-display text-2xl text-teal-950">Founder-led values</strong>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-teal-950/75">
              {['Empathy before action', 'Clear communication', 'Privacy and dignity', 'Calm de-escalation', 'Practical, respectful progress'].map((item) => (
                <li className="flex gap-2" key={item}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </MotionSection>

      <MotionSection className="section bg-cream">
        <Container>
          <div className="section-head">
            <div>
              <p className="eyebrow">Mission and vision</p>
              <h2>The reason Hearty Home Services is being built.</h2>
            </div>
            <p>These are the foundations behind the service: the story, the mission, the reason it matters, and the direction the brand is growing toward.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {founderSections.map((section) => (
              <article className="rounded-2xl border border-teal-900/10 bg-white p-6 shadow-soft" key={section.label}>
                <p className="eyebrow">{section.label}</p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-teal-950">{section.title}</h3>
                <p className="mt-4 text-sm leading-7 text-teal-950/70">{section.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="section">
        <Container className="rounded-[2rem] bg-teal-950 p-8 text-cream shadow-glow sm:p-10">
          <div className="section-head">
            <div>
              <p className="eyebrow text-gold-400">Goals for clients</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">Support shaped around who is asking for help.</h2>
            </div>
            <p className="text-cream/70">Whether the enquiry comes from an individual, family, business, company, or property manager, the goal is to make the next step clearer and calmer.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {clientGoals.map(([title, copy]) => (
              <article className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur" key={title}>
                <strong className="font-display text-xl text-gold-100">{title}</strong>
                <p className="mt-3 text-sm leading-7 text-cream/70">{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </MotionSection>
    </>
  );
}
