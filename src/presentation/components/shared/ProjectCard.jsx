import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '../ui/Badge.jsx';

export function ProjectCard({ project, overlay = false }) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      data-cursor="View"
      className="group block overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-hover:translate-x-1"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {overlay ? (
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-sm font-semibold text-white">View Case Study →</span>
          </div>
        ) : null}
      </div>
      <div className="overflow-hidden p-5">
        <Badge className="mb-3">{project.category}</Badge>
        <h3 className="mb-2 text-lg transition-transform duration-300 group-hover:-translate-y-1">
          {project.title}
        </h3>
        <div className="flex items-center justify-between gap-3">
          <p className="translate-y-2 text-sm font-semibold text-success opacity-80 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {project.result}
          </p>
          {!overlay ? <ArrowUpRight className="h-4 w-4 text-primary" /> : null}
        </div>
      </div>
    </Link>
  );
}
