import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-text-muted">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {index > 0 ? <ChevronRight className="h-3.5 w-3.5" /> : null}
              {last || !item.path ? (
                <span className="text-text-secondary" aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-primary">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
