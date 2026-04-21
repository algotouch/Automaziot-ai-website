"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  open: string | null;
  setOpen: (id: string | null) => void;
  allowMultiple: boolean;
  openSet: Set<string>;
  toggle: (id: string) => void;
};
const Ctx = React.createContext<AccordionContextValue | null>(null);

export function Accordion({
  children,
  className,
  allowMultiple = false,
  defaultOpen,
}: {
  children: React.ReactNode;
  className?: string;
  allowMultiple?: boolean;
  defaultOpen?: string | null;
}) {
  const [open, setOpen] = React.useState<string | null>(defaultOpen ?? null);
  const [openSet, setOpenSet] = React.useState<Set<string>>(
    new Set(defaultOpen ? [defaultOpen] : []),
  );

  const toggle = React.useCallback(
    (id: string) => {
      if (allowMultiple) {
        setOpenSet((prev) => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        });
      } else {
        setOpen((cur) => (cur === id ? null : id));
      }
    },
    [allowMultiple],
  );

  const value = React.useMemo(
    () => ({ open, setOpen, allowMultiple, openSet, toggle }),
    [open, allowMultiple, openSet, toggle],
  );

  return (
    <Ctx.Provider value={value}>
      <div className={cn("flex flex-col gap-2.5", className)}>{children}</div>
    </Ctx.Provider>
  );
}

export function AccordionItem({
  id,
  question,
  children,
  className,
}: {
  id: string;
  question: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("AccordionItem must be inside <Accordion>");
  const isOpen = ctx.allowMultiple ? ctx.openSet.has(id) : ctx.open === id;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-surface ring-1 ring-inset ring-rule transition-colors",
        isOpen && "ring-teal-500/30",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => ctx.toggle(id)}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-semibold text-ink-950 hover:bg-cream/60 dark:text-white dark:hover:bg-ink-800"
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-ink-400 transition-transform duration-200",
            isOpen && "rotate-180 text-teal-600 dark:text-teal-300",
          )}
        />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        className={cn(
          "grid transition-[grid-template-rows] duration-300",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-[15px] leading-relaxed text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}
