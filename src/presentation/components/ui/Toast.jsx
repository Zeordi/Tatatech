import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, XCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast.js';

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export function Toast() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[90] flex w-full max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="pointer-events-auto flex items-start gap-3 rounded-xl border border-border bg-background p-4 shadow-lg"
            >
              <Icon
                className={
                  toast.type === 'success'
                    ? 'text-success'
                    : toast.type === 'error'
                      ? 'text-danger'
                      : 'text-info'
                }
              />
              <p className="flex-1 text-sm text-text-primary">{toast.message}</p>
              <button
                type="button"
                className="text-text-muted hover:text-text-primary"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
