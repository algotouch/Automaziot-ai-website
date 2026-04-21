"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Milestone = { when: string; title: string; body: string };

export function Timeline({ items, isHe }: { items: Milestone[]; isHe: boolean }) {
  const reduce = useReducedMotion();

  return (
    <ol className="relative mt-6 grid gap-4 md:grid-cols-4" aria-label={isHe ? "ציר זמן של הפרויקט" : "Project timeline"}>
      <div
        aria-hidden
        className="absolute start-0 top-6 hidden h-px w-full bg-gradient-to-r from-transparent via-teal-500 to-transparent md:block"
      />
      {items.map((m, i) => (
        <motion.li
          key={m.title}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="flex items-center gap-3 md:block">
            <span
              className={cn(
                "grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-extrabold",
                "bg-gradient-to-br from-teal-400 to-teal-700 text-white shadow-glow-teal",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-700 md:mt-4 dark:text-teal-300">
              {m.when}
            </p>
          </div>
          <h3 className="mt-2 text-base font-extrabold text-ink-950 dark:text-white">{m.title}</h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{m.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}
