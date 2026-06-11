import Container from './Container.jsx';
import { site } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="bg-teal-950 py-12 text-cream">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <strong className="font-display text-2xl">{site.name}</strong>
          <p className="mt-3 max-w-sm text-sm leading-6 text-cream/70">{site.tagline}</p>
        </div>
        <div>
          <strong className="text-sm uppercase tracking-[0.22em] text-gold-400">Contact</strong>
          <span className="mt-3 block text-sm text-cream/75">{site.phonePlaceholder}</span>
          <span className="mt-2 block text-sm text-cream/75">{site.emailPlaceholder}</span>
        </div>
        <div>
          <strong className="text-sm uppercase tracking-[0.22em] text-gold-400">Social</strong>
          <span className="mt-3 block text-sm text-cream/75">{site.instagramPlaceholder}</span>
        </div>
        <div>
          <strong className="text-sm uppercase tracking-[0.22em] text-gold-400">Area</strong>
          <p className="mt-3 text-sm text-cream/75">{site.area}</p>
        </div>
      </Container>
    </footer>
  );
}
