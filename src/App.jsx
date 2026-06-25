import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import RouteMetadata from './components/RouteMetadata.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Founder from './pages/Founder.jsx';
import Privacy from './pages/Privacy.jsx';

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        id="main-content"
        tabIndex="-1"
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about.html" element={<About />} />
          <Route path="/founder.html" element={<Founder />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="/privacy.html" element={<Privacy />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

function ScrollManager() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (location.hash) {
      const scrollToHash = () => {
        const target = document.querySelector(location.hash);
        if (!target) return false;
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        return true;
      };

      if (!scrollToHash()) {
        const timer = window.setTimeout(scrollToHash, 320);
        return () => window.clearTimeout(timer);
      }

      return undefined;
    }

    window.scrollTo({ top: 0, left: 0 });
    return undefined;
  }, [location.pathname, location.hash, reduceMotion]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-mist text-ink antialiased">
      <RouteMetadata />
      <ScrollManager />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </div>
  );
}
