import { CheckCircle2 } from 'lucide-react';
import Container from '../components/Container.jsx';
import LogoOrb from '../components/LogoOrb.jsx';
import MotionSection from '../components/MotionSection.jsx';
import { site, values } from '../data/site.js';

export default function About() {
  return (
    <>
      <section className="page-hero">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="eyebrow">About Hearty Home</p>
            <h1>Warm, reliable, professional home services.</h1>
            <p className="lead">Hearty Home Services is being built as a multi-service home brand, beginning with clear cleaning services and growing into specialist and lifestyle services.</p>
          </div>
          <LogoOrb className="max-w-[280px]" />
        </Container>
      </section>

      <MotionSection className="section">
        <Container className="rounded-[2rem] bg-white p-8 shadow-soft sm:p-10">
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Cleaning and support that changes how a space feels.</h2>
          <p className="lead mt-5">
            We combine the high standards of a modern cleaning service with thoughtful communication. The brand begins with domestic, Airbnb, company, events, end of tenancy,
            and add-on cleaning, while also making room for specialist hoarding support, home management, and interior decor. Every visit is done with heart, and every
            client is treated with respect.
          </p>
        </Container>
      </MotionSection>

      <MotionSection className="section bg-cream">
        <Container className="grid items-center gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-soft">
            <img
              src="/assets/images/founder-portrait.jpeg"
              alt="Founder of Hearty Home Services"
              className="aspect-[4/5] w-full rounded-[1.45rem] object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p className="eyebrow">Founder</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Built from lived support-work experience.</h2>
            <p className="lead mt-5">
              Hearty Home Services is shaped by a founder who understands that homes are personal. The work is not only about making a space clean; it is about communication,
              trust, dignity, and knowing when a person needs patience before practical change can happen.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-teal-950/70">
              That experience matters most in hoarding-related situations, where the person affected should be met with empathy, options, consent, and calm problem solving.
            </p>
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="section bg-cream">
        <Container>
          <p className="eyebrow">Our mission</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Dependable support that gives you peace of mind.</h2>
          <p className="lead mt-5 max-w-3xl">
            Our mission is to make every space feel safer, fresher, calmer, and easier to enjoy through thoughtful service, attention to detail, clear communication, and consistent results.
          </p>
        </Container>
      </MotionSection>

      <MotionSection className="section">
        <Container className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">Specialist approach</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Hoarding support needs empathy before action.</h2>
            <p className="lead mt-5">
              Some clients hold on to items because the situation is emotionally difficult, overwhelming, or connected to wider wellbeing needs. In hoarding support,
              the care is for the person affected, not just the cleaning task. The approach is not to rush or shame. It is to communicate, listen, offer choices,
              explain the reason for each step, and de-escalate calmly when needed.
            </p>
          </div>
          <div className="rounded-[2rem] border border-coral-100 bg-gradient-to-br from-white via-coral-100/50 to-teal-50 p-6 shadow-soft">
            <strong className="font-display text-2xl text-teal-950">Person-centred problem solving</strong>
            <p className="mt-3 text-sm leading-7 text-teal-950/70">
              This service direction is shaped by support-work values: patience, dignity, privacy, safeguarding awareness, and practical answers that help both the
              person and the space move forward.
            </p>
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="section">
        <Container>
          <p className="eyebrow">Values</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">The standards behind every visit.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {values.map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-teal-900/10 bg-white p-6 shadow-soft">
                <CheckCircle2 className="text-gold-500" size={24} aria-hidden="true" />
                <strong className="mt-4 block text-lg text-teal-950">{title}</strong>
                <p className="mt-2 text-sm leading-7 text-teal-950/70">{copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="section">
        <Container className="rounded-[2rem] bg-teal-950 p-8 text-cream shadow-glow sm:p-10">
          <p className="eyebrow text-gold-400">Where we work</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">Serving {site.area}.</h2>
          <p className="mt-4 max-w-2xl text-cream/70">Tell us your location and the type of support you need, and we will confirm whether we can help.</p>
        </Container>
      </MotionSection>
    </>
  );
}
