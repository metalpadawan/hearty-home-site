import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, HeartHandshake, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AreaChecker from '../components/AreaChecker.jsx';
import Container from '../components/Container.jsx';
import HeroImageShowcase from '../components/HeroImageShowcase.jsx';
import MotionSection from '../components/MotionSection.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { howItWorks, services, site, trustPoints } from '../data/site.js';

const filters = [
  ['All', 'all'],
  ['Cleaning', 'cleaning'],
  ['Specialist', 'specialist'],
  ['Property', 'property'],
  ['Events', 'event'],
  ['Business', 'business'],
  ['Future', 'future'],
];

export default function Home() {
  const [filter, setFilter] = useState('all');
  const visibleServices = useMemo(() => (filter === 'all' ? services : services.filter((service) => service.kind === filter)), [filter]);

  return (
    <>
      <section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-teal-950 py-16 text-cream sm:py-20 lg:py-24">
        <HeroImageShowcase />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/94 via-teal-950/74 to-teal-950/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-transparent to-teal-950/20" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-mist to-transparent" />
        <Container className="relative flex min-h-[calc(100dvh-13rem)] items-center">
          <motion.div
            className="max-w-2xl rounded-[2rem] border border-white/15 bg-teal-950/48 p-6 shadow-glow backdrop-blur-md sm:p-8 lg:p-10"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              {site.name}
            </h1>
            <p className="mt-5 max-w-2xl text-2xl font-semibold leading-9 text-gold-100 sm:text-3xl">
              {site.tagline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary" to="/contact">
                Contact Us <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="btn-ghost" href="#services">
                View Services
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

      <MotionSection className="bg-mist py-8 sm:py-10" delay={0.03}>
        <Container>
          <AreaChecker />
        </Container>
      </MotionSection>

      <MotionSection className="section scroll-mt-28" delay={0.05} id="services">
        <Container>
          <div className="section-head">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Clear service options, so visitors know exactly what to ask for.</h2>
            </div>
            <p>Each service card explains what the service is. Cleaning is named clearly, while hoarding support stays person-centred and discreet.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3" aria-label="Filter services">
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

      <MotionSection className="section scroll-mt-28 bg-cream" id="how-it-works">
        <Container>
          <div className="section-head">
            <div>
              <p className="eyebrow">How it works</p>
              <h2>A calm process before any work begins.</h2>
            </div>
            <p>People need clarity before they trust a service with their home. The process is designed to be simple, respectful, and easy to start.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {howItWorks.map(([title, copy], index) => (
              <motion.article
                className="relative overflow-hidden rounded-2xl border border-teal-900/10 bg-white p-6 shadow-soft"
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-teal-950 font-bold text-gold-400">{index + 1}</span>
                <h3 className="mt-5 text-lg font-bold text-teal-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-teal-950/70">{copy}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="section">
        <Container>
          <div className="section-head">
            <div>
              <p className="eyebrow">Trust and privacy</p>
              <h2>Built for sensitive homes, not just simple bookings.</h2>
            </div>
            <p>The brand needs to feel safe for people who may feel embarrassed, overwhelmed, or unsure where to begin, especially in hoarding-related situations.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map(([title, copy], index) => {
              const icons = [ShieldCheck, HeartHandshake, MessageCircle, BriefcaseBusiness];
              const Icon = icons[index] || ShieldCheck;
              return (
                <div key={title} className="rounded-2xl border border-teal-900/10 bg-white p-6 shadow-soft">
                  <Icon className="text-coral-500" size={28} aria-hidden="true" />
                  <strong className="mt-5 block text-lg text-teal-950">{title}</strong>
                  <p className="mt-2 text-sm leading-7 text-teal-950/70">{copy}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="section bg-cream">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Client feedback</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">A polished review space, ready for real feedback.</h2>
            <p className="lead mt-5">No fake testimonials. Once reviews are available, this section can connect to Google reviews or show approved client words.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {['Review space reserved', 'Google reviews ready'].map((quote) => (
              <article className="rounded-2xl border border-gold-500/20 bg-white p-6 shadow-soft" key={quote}>
                <div className="flex gap-1 text-gold-500" aria-label="Review placeholder">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} size={17} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-5 font-display text-2xl font-bold leading-tight text-teal-950">{quote}</p>
                <p className="mt-4 text-sm leading-7 text-teal-950/60">This will be replaced with real, approved feedback once the service has live client reviews.</p>
              </article>
            ))}
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="section bg-cream">
        <Container className="rounded-[2rem] border border-white/60 bg-gradient-to-br from-white via-coral-100/40 to-teal-50 p-8 shadow-soft sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Growing with purpose</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Future team and partner opportunities.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-teal-950/70">
              As Hearty Home Services grows, there may be room for trusted cleaners, support workers, organisers, property-care assistants, and decor-focused partners.
            </p>
          </div>
          <Link className="btn-primary mt-8 lg:mt-0" to="/contact">
            Register Interest <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Container>
      </MotionSection>

      <MotionSection className="section">
        <Container className="rounded-[2rem] bg-teal-950 p-8 text-cream shadow-glow sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-gold-400">Ready to talk through what you need?</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">Tell us what needs attention.</h2>
            <p className="mt-4 max-w-2xl text-cream/70">Use the enquiry form for cleaning services, specialist hoarding support, or future service interest in Chester and surrounding areas.</p>
          </div>
          <Link className="btn-primary mt-8 lg:mt-0" to="/contact">
            Contact Us <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Container>
      </MotionSection>
    </>
  );
}
