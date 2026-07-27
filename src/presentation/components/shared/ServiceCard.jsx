import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Card } from '../ui/Card.jsx';

export function ServiceCard({ service, variant = 'preview' }) {
  const Icon = Icons[service.icon] || Icons.Sparkles;

  if (variant === 'detailed') {
    return (
      <Card hover className="card-beam relative flex h-full flex-col overflow-hidden">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition duration-300 group-hover:rotate-180 dark:bg-primary/10">
          <Icon className="h-6 w-6 transition duration-500 hover:scale-90 hover:rotate-180" />
        </div>
        <h3 className="mb-2 text-xl">{service.title}</h3>
        <p className="mb-4 text-text-secondary">{service.description}</p>
        <ul className="mb-6 flex-1 space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
              <Icons.Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to={`/services/${service.slug}`}
          className="group/link inline-flex items-center gap-1 text-sm font-semibold text-primary"
        >
          View Details
          <span className="inline-block origin-left transition-transform duration-300 group-hover/link:scale-x-150">
            →
          </span>
        </Link>
      </Card>
    );
  }

  return (
    <Card
      hover
      as={Link}
      to={`/services/${service.slug}`}
      className="card-beam group relative block h-full overflow-hidden"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary/10">
        <Icon className="h-6 w-6 transition duration-500 group-hover:scale-90 group-hover:rotate-[360deg]" />
      </div>
      <h3 className="mb-2 text-xl">{service.title}</h3>
      <p className="mb-4 line-clamp-2 text-text-secondary">{service.shortDescription}</p>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Learn more
        <span className="inline-block origin-left transition-transform duration-300 group-hover:scale-x-150">
          →
        </span>
      </span>
    </Card>
  );
}
