import { cn } from '../../../utils/formatters.js';

export function Skeleton({ className = '' }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-surface-alt',
        className,
      )}
    />
  );
}
