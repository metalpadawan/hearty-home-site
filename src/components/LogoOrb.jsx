import { motion } from 'framer-motion';

export default function LogoOrb({ className = '' }) {
  return (
    <motion.div
      className={`relative mx-auto grid aspect-square w-full max-w-[360px] place-items-center rounded-full border border-gold-400/40 bg-[radial-gradient(circle_at_30%_20%,rgba(255,249,235,0.96),rgba(215,241,239,0.64)_38%,rgba(6,44,49,0.96)_76%)] p-8 shadow-glow ${className}`}
      animate={{ y: [0, -12, 0], rotate: [0, -1.5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="absolute inset-5 rounded-full border border-white/30" />
      <span className="absolute -right-4 top-12 h-24 w-24 rounded-full bg-gold-400/40 blur-2xl animate-soft-pulse" />
      <img src="/assets/images/logo-emblem.png" alt="Hearty Home Solutions logo" className="relative z-10 w-44 drop-shadow-2xl sm:w-52" />
    </motion.div>
  );
}
