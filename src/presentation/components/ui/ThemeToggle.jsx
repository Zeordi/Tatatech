import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme.js';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-primary hover:text-primary"
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.span>
    </button>
  );
}
