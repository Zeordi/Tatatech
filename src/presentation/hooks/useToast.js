import { useToastContext } from '../../app/providers/QueryProvider.jsx';

export function useToast() {
  const { push, dismiss, toasts } = useToastContext();
  return {
    toasts,
    success: (message) => push({ type: 'success', message }),
    error: (message) => push({ type: 'error', message }),
    info: (message) => push({ type: 'info', message }),
    dismiss,
  };
}
