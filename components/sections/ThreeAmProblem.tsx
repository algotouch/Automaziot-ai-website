"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AlertTriangle } from "lucide-react";

export function ThreeAmProblem({ isHe }: { isHe: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const rows = [
    { label: isHe ? "30 שניות" : "30 seconds", pct: 92, tone: "good" as const },
    { label: isHe ? "5 דקות" : "5 minutes", pct: 68, tone: "ok" as const },
    { label: isHe ? "שעה" : "1 hour", pct: 18, tone: "bad" as const },
    { label: isHe ? "24 שעות" : "24 hours", pct: 3, tone: "worst" as const },
  ];

  const toneBar: Record<string, string> = {
    good: "bg-teal-500",
    ok: "bg-teal-300",
    bad: "bg-amber-500",
    worst: "bg-rose-500",
  };

  return (
    <section className="relative bg-paper py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>{isHe ? "העובדה המטרידה" : "The uncomfortable truth"}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-3xl font-extrabold leading-[1.08] text-balance sm:text-4xl md:text-[46px]">
                {isHe ? (
                  <>
                    ליד שמחכה שעה — <br />
                    <span className="text-gradient-brand">הוא ליד שאבד.</span>
                  </>
                ) : (
                  <>
                    A lead that waits an hour — <br />
                    <span className="text-gradient-brand">is a lead you lost.</span>
                  </>
                )}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-500">
                {isHe
                  ? "מחקר של Harvard Business Review הראה: הסיכויים לסגור עסקה צונחים פי 10 כשהתגובה מתעכבת בשעה. רוב העסקים בישראל עונים בממוצע פעם ביום. זה הפער שהתחרות מנצלת עכשיו — ואנחנו סוגרים."
                  : "HBR research: conversion odds drop 10× after the first hour. Most Israeli businesses reply about once a day. That's the gap your competitors exploit right now — the gap we close."}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-inset ring-rose-100">
                <AlertTriangle className="h-4 w-4" />
                {isHe
                  ? "עסק קטן ממוצע מפסיד ₪14,000 בחודש על לידים לא מענויים"
                  : "Avg small business loses ₪14,000/mo on unanswered leads"}
              </div>
            </Reveal>
          </div>

          <div ref={ref} className="md:col-span-6">
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-inset ring-rule">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                    {isHe ? "זמן תגובה → אחוז סגירה" : "Response time → close rate"}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">
                    HBR + InsideSales
                  </span>
                </div>
                <div className="mt-7 space-y-5">
                  {rows.map((row, i) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-ink-800">{row.label}</span>
                        <span className="font-mono font-bold text-ink-950" dir="ltr">
                          {row.pct}%
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-100">
                        <motion.div
                          className={`h-full rounded-full ${toneBar[row.tone]}`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${row.pct}%` } : { width: 0 }}
                          transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-ink-400">
                  {isHe
                    ? "* נתונים ממוצעים משוק ה-B2C וה-B2B במחקרי המרה בינלאומיים."
                    : "* Averages from B2C and B2B conversion studies."}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
