import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, HeartHandshake, MessageCircle, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AreaChecker from '../components/AreaChecker.jsx';
import Container from '../components/Container.jsx';
import LogoOrb from '../components/LogoOrb.jsx';
import MotionSection from '../components/MotionSection.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { faqs, howItWorks, services, site, trustPoints } from '../data/site.js';

const filters = [
  ['All', 'all'],
  ['Home', 'home'],
  ['Specialist', 'specialist'],
  ['Future', 'future'],
  ['Property', 'property'],
  ['Business', 'business'],
];

export default function Home() {
  const [filter, setFilter] = useState('all');
  const visibleServices = useMemo(() => (filter === 'all' ? services : services.filter((service) => service.kind === filter)), [filter]);

  return (
    <>
      <section className="relative overflow-hidden bg-teal-950 py-20 text-cream sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(238,122,95,0.32),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(230,202,134,0.34),transparent_28%),radial-gradient(circle_at_70%_78%,rgba(122,165,140,0.25),transparent_34%),linear-gradient(135deg,#062c31,#0f535c_46%,#102323)] bg-[length:160%_160%] animate-gradient-shift" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-mist/90 to-transparent" />
        <div className="absolute left-1/2 top-14 h-px w-[84vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/80 to-transparent animate-line-reveal" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <p className="eyebrow text-gold-400">{site.tagline}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              Thoughtful services for homes that need care, calm, and practical support.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
              Hearty Home Services starts with reliable home support and grows into specialist hoarding care, home management, interior decor, property care, and business support.
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
                ['Available', 'Reliable home support'],
                ['Specialist', 'Hoarding care with empathy'],
                ['Growing', 'Management, decor, and property care'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur">
                  <strong className="block text-lg text-gold-400">{title}</strong>
                  <span className="mt-1 block text-sm text-cream/70">{copy}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <LogoOrb />
        </Container>
      </section>

      <MotionSection className="-mt-12">
        <Container>
          <AreaChecker />
        </Container>
      </MotionSection>

      <MotionSection className="section scroll-mt-28" delay={0.05} id="services">
        <Container>
          <div className="section-head">
            <div>
              <p className="eyebrow">Services</p>
              <h2>One caring brand, multiple ways to support the home.</h2>
            </div>
            <p>The offer starts with practical home support, while the brand expands into sensitive specialist work, lifestyle services, property care, and business support.</p>
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

      <MotionSection className="section bg-cream">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] bg-teal-950 p-8 text-cream shadow-glow">
            <span className="absolute -left-16 top-8 h-44 w-44 rounded-full bg-gold-400/25 blur-3xl animate-soft-pulse" />
            <span className="absolute inset-y-0 -left-24 w-24 bg-white/20 blur-xl animate-gold-shine" />
            <Sparkles className="relative text-gold-400" size={32} aria-hidden="true" />
            <h2 className="relative mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">High standards, delivered with patience and care.</h2>
            <p className="relative mt-5 text-cream/70">Clear communication, careful attention to detail, and a calm, non-judgemental presence in your space.</p>
            <p className="relative mt-4 text-sm leading-7 text-cream/70">
              Specialist hoarding work is approached with patience, privacy, empathy, de-escalation awareness, and respect for the person behind the space.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Warm and reliable', 'Careful support shaped around the person and the space.'],
              ['Professional standards', 'Clear routines, respectful boundaries, and consistent follow-through.'],
              ['Local service', `Focused on ${site.area}, with direct communication.`],
              ['Detail focused', 'Small touches are treated as part of the final result, not an afterthought.'],
            ].map(([item, copy]) => (
              <div key={item} className="rounded-2xl bg-white p-6 shadow-soft">
                <strong className="text-lg text-teal-950">{item}</strong>
                <p className="mt-2 text-sm leading-7 text-teal-950/70">{copy}</p>
              </div>
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
            <p>The brand needs to feel safe for people who may feel embarrassed, overwhelmed, or unsure where to begin.</p>
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

      <MotionSection className="section">
        <Container>
          <div className="section-head">
            <div>
              <p className="eyebrow">Questions</p>
              <h2>Helpful answers before someone reaches out.</h2>
            </div>
            <p>Clear answers reduce anxiety and help visitors understand that enquiries can be about current services or future service areas.</p>
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

      <MotionSection className="section bg-cream">
        <Container className="rounded-[2rem] border border-white/60 bg-gradient-to-br from-white via-coral-100/40 to-teal-50 p-8 shadow-soft sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Growing with care</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-teal-950 sm:text-4xl">Future team and partner opportunities.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-teal-950/70">
              As Hearty Home Services grows, there may be room for trusted helpers, support workers, organisers, property-care assistants, and decor-focused partners.
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
            <p className="mt-4 max-w-2xl text-cream/70">Use the enquiry form for current services, specialist support, or future service interest in Chester and surrounding areas.</p>
          </div>
          <Link className="btn-primary mt-8 lg:mt-0" to="/contact">
            Contact Us <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Container>
      </MotionSection>
    </>
  );
}
