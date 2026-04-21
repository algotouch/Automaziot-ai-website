"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";
export type ToastInput = { title: string; description?: string; variant?: ToastVariant; duration?: number };
type ToastItem = Required<ToastInput> & { id: number };

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

const VARIANT_STYLES: Record<ToastVariant, { ring: string; icon: React.ReactNode; tint: string }> = {
  success: {
    ring: "ring-teal-200",
    icon: <CheckCircle2 className="h-5 w-5 text-teal-600" />,
    tint: "bg-teal-50 dark:bg-ink-800",
  },
  error: {
    ring: "ring-rose-500/30",
    icon: <XCircle className="h-5 w-5 text-rose-500" />,
    tint: "bg-rose-50 dark:bg-ink-800",
  },
  info: {
    ring: "ring-ink-200",
    icon: <Info className="h-5 w-5 text-ink-700 dark:text-ink-200" />,
    tint: "bg-white dark:bg-ink-800",
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const reduce = useReducedMotion();
  const counter = React.useRef(0);

  const remove = React.useCallback((id: number) => {
    setItems((arr) => arr.filter((i) => i.id !== id));
  }, []);

  const toast = React.useCallback((input: ToastInput) => {
    counter.current += 1;
    const id = counter.current;
    const item: ToastItem = {
      id,
      title: input.title,
      description: input.description ?? "",
      variant: input.variant ?? "success",
      duration: input.duration ?? 4200,
    };
    setItems((arr) => [...arr, item]);
    if (item.duration > 0) {
      setTimeout(() => remove(id), item.duration);
    }
  }, [remove]);

  const value = React.useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-5 end-5 z-[90] flex w-[min(92vw,380px)] flex-col gap-2"
      >
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const v = VARIANT_STYLES[item.variant];
            return (
              <motion.div
                key={item.id}
                layout
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "pointer-events-auto flex items-start gap-3 rounded-2xl p-3.5 shadow-lift ring-1",
                  v.tint,
                  v.ring,
                )}
                role="status"
              >
                <div className="mt-0.5 shrink-0">{v.icon}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-900 dark:text-white">{item.title}</p>
                  {item.description && (
                    <p className="mt-1 text-[13px] text-muted">{item.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => remove(item.id)}
                  className="rounded-md p-1 text-ink-400 transition-colors hover:bg-ink-100/60 hover:text-ink-800 dark:hover:bg-ink-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    return { toast: () => {} };
  }
  return ctx;
}
