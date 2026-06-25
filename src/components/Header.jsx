import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Container from './Container.jsx';
import { site } from '../data/site.js';

const navItems = [
  ['Home', '/'],
  ['Services', '/#services'],
  ['About Us', '/about'],
  ['Contact Us', '/contact'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-cream/90 shadow-sm backdrop-blur-xl">
      <Container as="nav" className="flex min-h-24 items-center justify-between gap-4 py-3 md:min-h-20 md:py-0" aria-label="Main navigation">
        <NavLink className="group flex items-center gap-3" to="/" onClick={() => setOpen(false)} aria-label={`${site.name} home`}>
          <motion.img
            src="/assets/images/logo-emblem.png"
            alt=""
            className="h-11 w-11 rounded-full object-contain shadow-gold ring-1 ring-gold-400/50 sm:h-12 sm:w-12"
            whileHover={{ rotate: -4, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          />
          <span className="grid max-w-[13.5rem] gap-0.5 sm:max-w-none">
            <span className="font-display text-lg font-bold leading-none tracking-normal text-teal-950 sm:text-xl">Hearty Home Services</span>
            <span className="font-body text-[0.66rem] font-semibold leading-snug text-teal-700 sm:text-xs">{site.tagline}</span>
          </span>
        </NavLink>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-teal-900/20 bg-white/70 text-teal-950 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-gold-500 md:hidden"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-controls="site-menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
        </button>

        <div
          id="site-menu"
          className={`absolute left-5 right-5 top-[6.35rem] rounded-2xl border border-teal-900/10 bg-cream p-4 shadow-soft md:static md:flex md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
            open ? 'block' : 'hidden md:flex'
          }`}
        >
          {navItems.map(([label, path]) => (
            path.includes('#') ? (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={`block rounded-full px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold-500 md:py-2 ${
                  location.pathname === '/' && location.hash === '#services' ? 'bg-teal-950 text-cream' : 'text-teal-950 hover:bg-teal-50'
                }`}
              >
                {label}
              </Link>
            ) : (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-full px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold-500 md:py-2 ${
                    isActive && !(location.hash === '#services' && path === '/') ? 'bg-teal-950 text-cream' : 'text-teal-950 hover:bg-teal-50'
                  }`
                }
              >
                {label}
              </NavLink>
            )
          ))}
          <NavLink
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-gold-500 px-5 py-3 text-sm font-bold text-teal-950 shadow-gold transition hover:-translate-y-0.5 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-teal-700 md:ml-2 md:mt-0 md:w-auto"
            to="/contact"
            onClick={() => setOpen(false)}
          >
            Send Enquiry
          </NavLink>
        </div>
      </Container>
    </header>
  );
}
