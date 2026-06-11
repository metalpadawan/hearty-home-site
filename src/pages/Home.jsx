import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container.jsx';
import LogoOrb from '../components/LogoOrb.jsx';
import MotionSection from '../components/MotionSection.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { services, site } from '../data/site.js';

const filters = [
  ['All', 'all'],
  ['Homes', 'home'],
  ['Personal', 'personal'],
  ['Businesses', 'business'],
  ['Transitions', 'move'],
];

export default function Home() {
  const [filter, setFilter] = useState('all');
  const visibleServices = useMemo(() => (filter === 'all' ? services : services.filter((service) => service.kind === filter)), [filter]);

  return (
    <>
      <section className="relative overflow-hidden bg-teal-950 py-20 text-cream sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(213,180,106,0.28),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(215,241,239,0.16),transparent_34%),linear-gradient(135deg,#062c31,#0b3e45_48%,#102323)] bg-[length:160%_160%] animate-gradient-shift" />
        <div className="absolute left-1/2 top-14 h-px w-[84vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/80 to-transparent animate-line-reveal" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <p className="eyebrow text-gold-400">{site.tagline}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              Thoughtful solutions for homes, people, and spaces.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
              Warm, professional help for everyday needs, special circumstances, and important transitions across Chester and surrounding areas.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary" to="/contact">
                Contact Us <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="btn-ghost" href="#services">
                View Services
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ['Local', 'Chester-based support'],
                ['Flexible', 'Support shaped around your needs'],
                ['Personal', `Led by ${site.founder}`],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <strong className="block text-lg text-gold-400">{title}</strong>
                  <span className="mt-1 block text-sm text-cream/70">{copy}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <LogoOrb />
        </Container>
      </section>

      <MotionSection className="section" delay={0.05}>
        <Container>
          <div className="section-head">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Flexible solutions for the way life happens.</h2>
            </div>
            <p>From everyday support to more sensitive situations, we help create calmer, more comfortable spaces where people can breathe, feel settled, and thrive.</p>
          </div>
          <div id="services" className="mt-8 flex flex-wrap gap-3" aria-label="Filter services">
            {filters.map(([label, value]) => (
              <button
                className={`rounded-full border px-5 py-2.5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                  filter === value ? 'border-teal-950 bg-teal-950 text-cream' : 'border-teal-900/10 bg-white text-teal-950 hover:border-gold-500'
                }`}
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="section bg-cream">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-teal-950 p-8 text-cream shadow-glow">
            <span className="absolute -left-16 top-8 h-44 w-44 rounded-full bg-gold-400/25 blur-3xl animate-soft-pulse" />
            <span className="absolute inset-y-0 -left-24 w-24 bg-white/20 blur-xl animate-gold-shine" />
            <Sparkles className="relative text-gold-400" size={32} aria-hidden="true" />
            <h2 className="relative mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">High standards, delivered with patience and care.</h2>
            <p className="relative mt-5 text-cream/70">Clear communication, careful attention to detail, and a calm, non-judgemental presence in your space.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {['Warm and reliable', 'Professional standards', 'Local service', 'Detail focused'].map((item) => (
              <div key={item} className="rounded-2xl bg-white p-6 shadow-soft">
                <strong className="text-lg text-teal-950">{item}</strong>
                <p className="mt-2 text-sm leading-7 text-teal-950/70">Careful support shaped around the needs of each home, person, or business.</p>
              </div>
            ))}
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="section">
        <Container className="rounded-[2rem] bg-teal-950 p-8 text-cream shadow-glow sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-gold-400">Ready for a calmer, fresher space?</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">Tell us what needs attention.</h2>
            <p className="mt-4 max-w-2xl text-cream/70">Get in touch today to discuss the support you need in Chester and surrounding areas.</p>
          </div>
          <Link className="btn-primary mt-8 lg:mt-0" to="/contact">
            Contact Us <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Container>
      </MotionSection>
    </>
  );
}
