"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Side = "top" | "bottom" | "start" | "end";

export function Tooltip({
  children,
  content,
  side = "top",
  delay = 120,
  className,
}: {
  children: React.ReactElement;
  content: React.ReactNode;
  side?: Side;
  delay?: number;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const reduce = useReducedMotion();
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  };

  const childProps = (children as React.ReactElement<Record<string, unknown>>).props;
  const wrapped = React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      (childProps.onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      (childProps.onMouseLeave as ((e: React.MouseEvent) => void) | undefined)?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      (childProps.onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      (childProps.onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e);
    },
  } as Record<string, unknown>);

  const position: Record<Side, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    start: "end-full top-1/2 -translate-y-1/2 me-2",
    end: "start-full top-1/2 -translate-y-1/2 ms-2",
  };

  return (
    <span className="relative inline-flex">
      {wrapped}
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.08 }}
            className={cn(
              "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-ink-950 px-2.5 py-1.5 text-[12px] font-medium text-white shadow-card dark:bg-ink-100 dark:text-ink-950",
              position[side],
              className,
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
