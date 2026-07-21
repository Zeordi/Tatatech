import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({ open, onClose, title, children, labelledBy = 'modal-title' }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
          <motion.button
            type="button"
            aria-label="Close dialog overlay"
            className="absolute inset-0 bg-slate-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className="relative z-10 m-4 w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 id={labelledBy} className="text-xl font-bold">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-text-muted hover:bg-surface-alt hover:text-text-primary"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
