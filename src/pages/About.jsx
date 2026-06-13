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
            <p className="lead">Hearty Home Services is being built as a multi-service home brand, beginning with cleaning-led support and growing into specialist and lifestyle services.</p>
          </div>
          <LogoOrb className="max-w-[280px]" />
        </Container>
      </section>

      <MotionSection className="section">
        <Container className="rounded-[2rem] bg-white p-8 shadow-soft sm:p-10">
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Care that changes how a space feels.</h2>
          <p className="lead mt-5">
            We combine the care of a nurturing touch with the high standards of a modern support service. The brand begins with practical home support, while also
            making room for specialist hoarding work, home management, interior decor, property care, and business support. Every visit is done with heart, and every
            client is treated with respect.
          </p>
        </Container>
      </MotionSection>

      <MotionSection className="section bg-cream">
        <Container>
          <p className="eyebrow">Our mission</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Dependable support that gives you peace of mind.</h2>
          <p className="lead mt-5 max-w-3xl">
            Our mission is to make every space feel safer, fresher, calmer, and cared for through thoughtful service, attention to detail, clear communication, and consistent results.
          </p>
        </Container>
      </MotionSection>

      <MotionSection className="section">
        <Container className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">Specialist approach</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Hoarding support needs empathy before action.</h2>
            <p className="lead mt-5">
              Some clients hold on to items because the situation is emotionally difficult, overwhelming, or connected to wider wellbeing needs. The approach is not
              to rush or shame. It is to communicate, listen, offer choices, explain the reason for each step, and de-escalate calmly when needed.
            </p>
          </div>
          <div className="rounded-[2rem] border border-coral-100 bg-gradient-to-br from-white via-coral-100/50 to-teal-50 p-6 shadow-soft">
            <strong className="font-display text-2xl text-teal-950">Care-led problem solving</strong>
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
