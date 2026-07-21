import { cn } from '../../../utils/formatters.js';

export function Card({ children, className = '', hover = false, as: Component = 'div', ...props }) {
  return (
    <Component
      className={cn(
        'rounded-xl border border-border bg-background p-6 shadow-sm lg:p-8',
        hover &&
          'transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
