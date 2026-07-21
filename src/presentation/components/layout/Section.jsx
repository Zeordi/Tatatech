import { motion } from 'framer-motion';

export function Section({ children, className = '', id, delay = 0 }) {
  return (
    <motion.section
      id={id}
      className={`py-16 md:py-24 lg:py-28 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.section>
  );
}
