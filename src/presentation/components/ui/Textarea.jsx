import { forwardRef } from 'react';
import { cn } from '../../../utils/formatters.js';

export const Textarea = forwardRef(function Textarea(
  { label, error, id, className = '', rows = 5, ...props },
  ref,
) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-text-primary">
          {label}
        </label>
      ) : null}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={cn(
          'w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors',
          error ? 'border-danger' : 'border-border focus:border-primary',
          className,
        )}
        {...props}
      />
      {error ? <p className="mt-1.5 text-sm text-danger">{error}</p> : null}
    </div>
  );
});
