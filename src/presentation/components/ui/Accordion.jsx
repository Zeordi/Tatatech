import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../utils/formatters.js';

export function Accordion({ items, openId, onChange }) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-border bg-background"
          >
            <button
              type="button"
              className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
              onClick={() => onChange(open ? null : item.id)}
            >
              <span className="font-heading font-semibold text-text-primary">
                {item.question || item.title}
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-text-muted transition-transform',
                  open && 'rotate-180',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="border-t border-border px-5 py-4 text-text-secondary">
                    {item.answer || item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
