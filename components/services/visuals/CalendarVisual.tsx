"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export function CalendarVisual({ isHe }: { isHe: boolean }) {
  const slots = [
    { t: "09:00", booked: true, name: isHe ? "דניאל כהן" : "Daniel Cohen", tag: isHe ? "התייעצות" : "Consult" },
    { t: "10:30", booked: true, name: isHe ? "נועה שרון" : "Noa Sharon", tag: isHe ? "חדשה" : "New" },
    { t: "12:00", booked: false },
    { t: "13:30", booked: true, name: isHe ? "אורי לב" : "Uri Lev", tag: isHe ? "חוזר" : "Returning" },
    { t: "15:00", booked: false },
    { t: "16:30", booked: true, name: isHe ? "יעל מוזס" : "Yael Moses", tag: isHe ? "VIP" : "VIP" },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-teal-100/60 via-cream to-white blur-2xl dark:from-teal-700/30 dark:via-ink-900 dark:to-ink-950" />
      <div className="relative overflow-hidden rounded-[28px] bg-surface p-5 shadow-lift ring-1 ring-inset ring-rule">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white">
              <Calendar className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-white">{isHe ? "יום שלישי, 23 באפריל" : "Tuesday, April 23"}</p>
              <p className="text-[11px] font-medium text-teal-700">{isHe ? "4 פגישות · 2 חלונות פנויים" : "4 meetings · 2 open slots"}</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 ring-1 ring-inset ring-emerald-100">
            {isHe ? "מלא 80%" : "80% full"}
          </span>
        </div>

        <div className="space-y-2.5">
          {slots.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, x: isHe ? 10 : -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ring-1 ring-inset ${
                s.booked
                  ? "bg-teal-50 ring-teal-100"
                  : "bg-cream ring-rule-soft"
              }`}
            >
              <span className="w-12 font-mono text-[13px] font-bold text-ink-800 dark:text-ink-100" dir="ltr">{s.t}</span>
              {s.booked ? (
                <>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-surface text-xs font-bold text-teal-700 ring-1 ring-inset ring-teal-200">
                    {(s.name ?? "").slice(0, 1)}
                  </span>
                  <span className="flex-1 text-[13px] font-semibold text-ink-900 dark:text-white">{s.name}</span>
                  <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-teal-700 ring-1 ring-inset ring-teal-100">
                    {s.tag}
                  </span>
                </>
              ) : (
                <span className="flex-1 text-[12.5px] text-ink-400">{isHe ? "פנוי — מוצע ללקוחות" : "Open — offered to leads"}</span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-cream p-3 ring-1 ring-inset ring-rule-soft text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">No-show</p>
            <p className="mt-0.5 font-display text-lg font-extrabold text-emerald-500" dir="ltr">−58%</p>
          </div>
          <div className="rounded-xl bg-cream p-3 ring-1 ring-inset ring-rule-soft text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">{isHe ? "טלפון" : "Calls"}</p>
            <p className="mt-0.5 font-display text-lg font-extrabold text-emerald-500">0</p>
          </div>
          <div className="rounded-xl bg-cream p-3 ring-1 ring-inset ring-rule-soft text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">{isHe ? "דיוק" : "Accuracy"}</p>
            <p className="mt-0.5 font-display text-lg font-extrabold text-teal-700 dark:text-teal-300">100%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
