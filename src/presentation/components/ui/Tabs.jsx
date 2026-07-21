import { cn } from '../../../utils/formatters.js';

export function Tabs({ tabs, value, onChange, className = '' }) {
  return (
    <div
      role="tablist"
      className={cn('inline-flex rounded-full border border-border bg-surface p-1', className)}
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={cn(
              'min-h-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              active
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-primary',
            )}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
