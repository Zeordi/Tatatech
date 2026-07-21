import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function QueryProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (toast) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, ...toast }]);
      window.setTimeout(() => dismiss(id), toast.duration ?? 4000);
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ push, dismiss, toasts }), [push, dismiss, toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used within QueryProvider');
  return ctx;
}
