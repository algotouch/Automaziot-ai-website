"use client";

import { motion } from "framer-motion";
import { Filter, Send } from "lucide-react";

export function FunnelVisual({ isHe }: { isHe: boolean }) {
  const stages = isHe
    ? [
        { name: "לידים נכנסים", n: 147, c: "bg-teal-600", w: "100%" },
        { name: "עוברים קריטריוני סינון", n: 89, c: "bg-teal-500", w: "78%" },
        { name: "דורגו כחמים", n: 42, c: "bg-teal-400", w: "52%" },
        { name: "סוכם עם נציג", n: 28, c: "bg-emerald-500", w: "34%" },
      ]
    : [
        { name: "Leads incoming", n: 147, c: "bg-teal-600", w: "100%" },
        { name: "Pass criteria", n: 89, c: "bg-teal-500", w: "78%" },
        { name: "Scored hot", n: 42, c: "bg-teal-400", w: "52%" },
        { name: "Closed with rep", n: 28, c: "bg-emerald-500", w: "34%" },
      ];

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-teal-100/60 via-cream to-white blur-2xl dark:from-teal-700/30 dark:via-ink-900 dark:to-ink-950" />
      <div className="relative overflow-hidden rounded-[28px] bg-surface p-6 shadow-lift ring-1 ring-inset ring-rule">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white">
              <Filter className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-white">{isHe ? "מיון לידים · 24 שעות" : "Lead filtering · last 24h"}</p>
              <p className="text-[11px] font-medium text-teal-700">
                <Send className="mr-1 inline h-3 w-3" />
                {isHe ? "מתעדכן בזמן אמת" : "Live"}
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 ring-1 ring-inset ring-emerald-100">
            +28%
          </span>
        </div>

        <div className="space-y-4 pt-2">
          {stages.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <div className="mb-1.5 flex items-center justify-between text-[13px]">
                <span className="font-medium text-ink-700 dark:text-ink-200">{s.name}</span>
                <span className="font-mono font-bold text-ink-900 dark:text-white" dir="ltr">{s.n}</span>
              </div>
              <div className="relative h-8 overflow-hidden rounded-lg bg-cream ring-1 ring-inset ring-rule-soft">
                <motion.div
                  className={`absolute inset-y-0 rounded-lg ${s.c}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: s.w }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{ insetInlineStart: 0 }}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-40" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-cream p-3 ring-1 ring-inset ring-rule-soft">
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">
              {isHe ? "זמן תגובה" : "Response time"}
            </p>
            <p className="mt-0.5 font-display text-xl font-extrabold text-teal-700 dark:text-teal-300" dir="ltr">&lt;30s</p>
          </div>
          <div className="rounded-xl bg-cream p-3 ring-1 ring-inset ring-rule-soft">
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">
              {isHe ? "לידים אבודים" : "Lost leads"}
            </p>
            <p className="mt-0.5 font-display text-xl font-extrabold text-emerald-500">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
