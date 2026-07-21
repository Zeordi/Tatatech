import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/formatters.js';
import { Badge } from '../ui/Badge.jsx';
import { Button } from '../ui/Button.jsx';
import { cn } from '../../../utils/formatters.js';

export function PricingCard({ plan, billing = 'monthly' }) {
  const price =
    billing === 'monthly' ? plan.monthlyPrice : plan.oneTimePrice;
  const priceLabel =
    price === null || price === undefined
      ? 'Custom'
      : formatCurrency(price);

  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-xl border bg-background p-6 shadow-sm lg:p-8',
        plan.popular
          ? 'border-2 border-primary lg:scale-105'
          : 'border-border',
      )}
    >
      {plan.popular ? (
        <Badge tone="accent" className="absolute -top-3 left-1/2 -translate-x-1/2">
          MOST POPULAR
        </Badge>
      ) : null}
      <h3 className="text-xl">{plan.name}</h3>
      <p className="mt-2 text-sm text-text-muted">{plan.description}</p>
      <p className="mt-6 font-heading text-4xl font-extrabold text-text-primary">
        {priceLabel}
        {price !== null && price !== undefined ? (
          <span className="ml-1 text-sm font-medium text-text-muted">
            /{billing === 'monthly' ? 'mo' : 'project'}
          </span>
        ) : null}
      </p>
      <ul className="my-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature.label}
            className={cn(
              'flex items-start gap-2 text-sm',
              feature.included ? 'text-text-secondary' : 'text-text-muted',
            )}
          >
            {feature.included ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            {feature.label}
          </li>
        ))}
      </ul>
      <Button
        as={Link}
        to="/contact"
        variant={plan.popular ? 'primary' : 'outline'}
        className="w-full"
      >
        {plan.cta}
      </Button>
    </div>
  );
}
