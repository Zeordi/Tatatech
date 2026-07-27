import * as Icons from 'lucide-react';
import { Badge } from '../ui/Badge.jsx';
import { Button } from '../ui/Button.jsx';

export function AppCard({ app }) {
  const Icon = Icons[app.icon] || Icons.AppWindow;

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-background p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-hero-gradient text-white">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-2 text-lg">{app.name}</h3>
      <Badge tone="muted" className="mb-3 w-fit">
        {app.category}
      </Badge>
      <p className="mb-4 flex-1 text-sm text-text-secondary">{app.description}</p>
      <div className="mt-auto flex gap-2">
        <Button as="a" href={app.demoUrl} variant="ghost" size="sm" className="flex-1">
          Live Demo
        </Button>
        <Button as="a" href="/contact" variant="primary" size="sm" className="flex-1">
          Get App
        </Button>
      </div>
    </div>
  );
}
