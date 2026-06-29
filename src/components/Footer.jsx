import Container from './Container.jsx';
import { Link } from 'react-router-dom';
import { site } from '../data/site.js';

const socialLinks = [
  ['Instagram', site.instagramUrl, site.instagramHandle],
  ['LinkedIn', site.linkedinUrl, site.linkedinLabel],
];

export default function Footer() {
  return (
    <footer className="bg-teal-950 py-12 text-cream">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <strong className="font-display text-2xl">{site.name}</strong>
          <p className="mt-3 max-w-sm text-sm leading-6 text-cream/70">{site.tagline}</p>
          <Link className="mt-3 inline-block text-sm font-semibold text-gold-100 underline decoration-gold-400/60 underline-offset-4" to="/founder">
            Meet the Founder
          </Link>
        </div>
        <div>
          <strong className="text-sm uppercase tracking-[0.22em] text-gold-400">Contact</strong>
          <a className="mt-3 block text-sm font-semibold text-cream/75 underline decoration-gold-400/50 underline-offset-4 transition hover:text-gold-100" href={site.phoneHref}>
            {site.phone}
          </a>
          <a className="mt-2 block text-sm font-semibold text-cream/75 underline decoration-gold-400/50 underline-offset-4 transition hover:text-gold-100" href={site.emailHref}>
            {site.email}
          </a>
        </div>
        <div>
          <strong className="text-sm uppercase tracking-[0.22em] text-gold-400">Social</strong>
          <div className="mt-3 grid gap-2">
            {socialLinks.map(([label, href, text]) => (
              <a className="text-sm font-semibold text-cream/75 underline decoration-gold-400/50 underline-offset-4 transition hover:text-gold-100" href={href} key={label} rel="noreferrer" target="_blank">
                {text}
              </a>
            ))}
          </div>
        </div>
        <div>
          <strong className="text-sm uppercase tracking-[0.22em] text-gold-400">Area</strong>
          <p className="mt-3 text-sm text-cream/75">{site.area}</p>
          <Link className="mt-3 inline-block text-sm font-semibold text-gold-100 underline decoration-gold-400/60 underline-offset-4" to="/privacy">
            Privacy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
