"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      panelRef.current?.focus();
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial="closed"
          animate="open"
          exit="closed"
          variants={{ open: { pointerEvents: "auto" }, closed: { pointerEvents: "none" } }}
        >
          <motion.button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 },
            }}
            transition={{ duration: 0.18 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={cn(
              "relative z-10 w-full max-w-lg rounded-3xl bg-surface p-6 text-ink-900 shadow-lift ring-1 ring-inset ring-rule outline-none dark:text-white",
              className,
            )}
            variants={
              reduce
                ? { open: { opacity: 1 }, closed: { opacity: 0 } }
                : {
                    open: { opacity: 1, y: 0, scale: 1 },
                    closed: { opacity: 0, y: 24, scale: 0.98 },
                  }
            }
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute end-4 top-4 rounded-full p-1.5 text-ink-400 transition-colors hover:bg-cream hover:text-ink-800 dark:hover:bg-ink-800"
            >
              <X className="h-5 w-5" />
            </button>
            {title && <h2 className="pe-10 text-2xl font-extrabold text-ink-950 dark:text-white">{title}</h2>}
            {description && <p className="mt-2 text-[15px] text-muted">{description}</p>}
            <div className={cn((title || description) && "mt-4")}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
