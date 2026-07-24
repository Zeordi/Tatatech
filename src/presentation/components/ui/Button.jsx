import { cn } from '../../../utils/formatters.js';
import { MagneticButton } from '../../motion/MagneticButton.jsx';

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-primary-glow focus-visible:ring-primary',
  accent:
    'bg-accent text-slate-900 font-semibold hover:bg-accent-hover focus-visible:ring-accent',
  outline:
    'border border-border bg-transparent text-text-primary hover:border-primary hover:text-primary',
  ghost:
    'bg-transparent text-text-secondary hover:text-primary hover:bg-surface-alt',
  white:
    'bg-white text-primary font-semibold hover:bg-slate-100',
  'white-outline':
    'border border-white/70 bg-transparent text-white hover:bg-white/10',
};

const sizes = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  loading = false,
  disabled,
  magnetic,
  ...props
}) {
  const useMagnetic =
    magnetic ?? (variant === 'primary' || variant === 'accent');

  const classes = cn(
    'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      ) : null}
      {children}
    </>
  );

  if (useMagnetic && !disabled && !loading) {
    return (
      <MagneticButton
        as={Component}
        className={classes}
        accentBorder={variant === 'accent'}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </MagneticButton>
    );
  }

  return (
    <Component className={classes} disabled={disabled || loading} {...props}>
      {content}
    </Component>
  );
}
