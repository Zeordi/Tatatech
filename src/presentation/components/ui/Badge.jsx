import { cn } from '../../../utils/formatters.js';

const tones = {
  primary: 'bg-primary-light text-primary dark:bg-primary/20 dark:text-blue-300',
  accent: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300',
  success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300',
  muted: 'bg-surface-alt text-text-secondary',
  outline: 'border border-border text-text-secondary',
};

export function Badge({ children, tone = 'primary', className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
