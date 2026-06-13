import { motion } from 'framer-motion';

export default function LogoOrb({ className = '' }) {
  return (
    <motion.div
      className={`relative mx-auto grid aspect-square w-full max-w-[360px] place-items-center overflow-hidden rounded-[42%] border border-white/35 bg-white/10 p-8 shadow-[0_28px_90px_rgba(215,241,239,0.24),inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-28px_80px_rgba(6,44,49,0.18)] backdrop-blur-2xl before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.64),rgba(255,255,255,0.1)_34%,rgba(215,241,239,0.12)_58%,rgba(255,255,255,0.32))] before:opacity-90 after:absolute after:inset-[1px] after:rounded-[inherit] after:border after:border-white/20 after:bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.7),transparent_18%),radial-gradient(circle_at_72%_82%,rgba(230,202,134,0.22),transparent_28%)] ${className}`}
      animate={{ y: [0, -14, 0], rotate: [0, -1.2, 0], scale: [1, 1.015, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="absolute -left-16 top-8 h-40 w-40 rounded-full bg-white/35 blur-3xl animate-soft-pulse" />
      <span className="absolute -right-12 bottom-6 h-36 w-36 rounded-full bg-teal-100/35 blur-3xl" />
      <span className="absolute left-10 top-8 h-16 w-28 -rotate-12 rounded-full bg-white/50 blur-xl" />
      <span className="absolute inset-6 rounded-[38%] border border-white/30 bg-white/[0.03] shadow-[inset_0_0_42px_rgba(255,255,255,0.18)]" />
      <img
        src="/assets/images/logo-emblem.png"
        alt="Hearty Home Services logo"
        className="relative z-10 w-44 rounded-full opacity-85 mix-blend-luminosity drop-shadow-[0_18px_42px_rgba(6,44,49,0.34)] saturate-[0.9] sm:w-52"
      />
    </motion.div>
  );
}
