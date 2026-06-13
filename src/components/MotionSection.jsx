import { motion, useReducedMotion } from 'framer-motion';

export default function MotionSection({ className = '', children, delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      {...props}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
