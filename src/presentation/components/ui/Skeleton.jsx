import { cn } from '../../../utils/formatters.js';

export function Skeleton({ className = '' }) {
  return <div className={cn('skeleton-shimmer rounded-xl', className)} />;
}
