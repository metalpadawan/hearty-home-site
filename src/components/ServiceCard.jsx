import { motion } from 'framer-motion';

export default function ServiceCard({ service, index }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-teal-900/10 bg-white/90 p-6 shadow-soft transition hover:border-gold-500/60 hover:shadow-gold"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-500 via-coral-400 to-teal-600 transition duration-300 group-hover:scale-x-100" />
      <span className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal-50 opacity-0 blur-3xl transition duration-300 group-hover:opacity-100" />
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">{service.tag}</span>
        {service.status ? <span className="rounded-full bg-coral-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-coral-500">{service.status}</span> : null}
      </div>
      <h3 className="relative mt-6 font-display text-2xl font-bold text-teal-950">{service.title}</h3>
      <p className="relative mt-3 text-sm leading-7 text-teal-950/70">{service.copy}</p>
      {service.items?.length ? (
        <ul className="relative mt-5 grid gap-2 text-sm leading-6 text-teal-950/75">
          {service.items.map((item) => (
            <li className="flex gap-2" key={item}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </motion.article>
  );
}
