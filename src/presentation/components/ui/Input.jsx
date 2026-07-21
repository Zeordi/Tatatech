import { forwardRef } from 'react';
import { cn } from '../../../utils/formatters.js';

export const Input = forwardRef(function Input(
  { label, error, id, className = '', ...props },
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
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'min-h-11 w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors',
          error ? 'border-danger' : 'border-border focus:border-primary',
          className,
        )}
        {...props}
      />
      {error ? <p className="mt-1.5 text-sm text-danger">{error}</p> : null}
    </div>
  );
});
