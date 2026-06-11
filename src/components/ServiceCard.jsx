import { motion } from 'framer-motion';

export default function ServiceCard({ service, index }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-teal-900/10 bg-white/90 p-6 shadow-soft transition hover:border-gold-500/50"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold-500 transition group-hover:scale-x-100" />
      <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">{service.tag}</span>
      <h3 className="mt-6 font-display text-2xl font-bold text-teal-950">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-teal-950/70">{service.copy}</p>
    </motion.article>
  );
}
