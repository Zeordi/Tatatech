import { Star } from 'lucide-react';
import { Card } from '../ui/Card.jsx';

export function TestimonialCard({ testimonial }) {
  return (
    <Card className="h-full">
      <div className="mb-4 flex gap-1 text-accent">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="mb-6 text-text-secondary">“{testimonial.quote}”</blockquote>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light font-semibold text-primary dark:bg-primary/20">
          {testimonial.initials}
        </span>
        <div>
          <p className="font-semibold text-text-primary">{testimonial.name}</p>
          <p className="text-sm text-text-muted">{testimonial.role}</p>
        </div>
      </div>
    </Card>
  );
}
