"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Phone, Mic } from "lucide-react";

const HE_TRANSCRIPT = [
  { speaker: "caller", text: "היי, אפשר לקבוע תור לשיננית השבוע?" },
  { speaker: "agent", text: "בטח! יש לי שלישי 10:00 או חמישי 14:30. מה עדיף?" },
  { speaker: "caller", text: "חמישי עדיף." },
  { speaker: "agent", text: "מעולה, שלחתי אישור ל-SMS. שיהיה יום נעים! ☀️" },
];
const EN_TRANSCRIPT = [
  { speaker: "caller", text: "Hi, can I book a cleaning this week?" },
  { speaker: "agent", text: "Sure — Tuesday 10am or Thursday 2:30pm. Which works?" },
  { speaker: "caller", text: "Thursday please." },
  { speaker: "agent", text: "Confirmed — I've texted you the details. Have a good one ☀️" },
];

export function VoiceVisual({ isHe }: { isHe: boolean }) {
  const [time, setTime] = useState("00:14");
  useEffect(() => {
    let s = 14;
    const id = setInterval(() => {
      s += 1;
      const mm = String(Math.floor(s / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      setTime(`${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const bars = Array.from({ length: 32 }, (_, i) => i);
  const lines = isHe ? HE_TRANSCRIPT : EN_TRANSCRIPT;

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-teal-100/60 via-cream to-white blur-2xl dark:from-teal-700/30 dark:via-ink-900 dark:to-ink-950" />
      <div className="relative overflow-hidden rounded-[28px] bg-surface p-6 shadow-lift ring-1 ring-inset ring-rule">
        <div className="flex items-center justify-between pb-5">
          <div className="flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white">
              <Phone className="h-5 w-5" />
              <span className="absolute inset-0 rounded-2xl bg-teal-500/60 pulse-ring" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-white">{isHe ? "שיחה נכנסת · סוכן AI" : "Inbound call · AI agent"}</p>
              <p className="text-[11px] font-medium text-emerald-500">
                {isHe ? "מוקלט · תומלל אוטומטית" : "Recording · auto-transcribed"}
              </p>
            </div>
          </div>
          <span className="font-mono text-sm font-bold tabular-nums text-teal-700 dark:text-teal-300" dir="ltr">{time}</span>
        </div>

        {/* Waveform */}
        <div className="flex h-20 items-center justify-center gap-1 rounded-2xl bg-cream p-3 ring-1 ring-inset ring-rule-soft">
          {bars.map((b) => (
            <motion.span
              key={b}
              className="inline-block w-1 rounded-full bg-gradient-to-b from-teal-400 to-teal-700"
              initial={{ height: 6 }}
              animate={{ height: [6 + (b % 5) * 4, 10 + (b % 7) * 5, 6 + (b % 5) * 4] }}
              transition={{ duration: 0.9 + (b % 5) * 0.1, repeat: Infinity, ease: "easeInOut", delay: b * 0.03 }}
            />
          ))}
        </div>

        {/* Transcript */}
        <div className="mt-5 space-y-2.5">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: line.speaker === "caller" ? -8 : 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.35 }}
              className="flex items-start gap-3"
            >
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                  line.speaker === "agent"
                    ? "bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100"
                    : "bg-cream text-ink-700 ring-1 ring-inset ring-rule-soft"
                }`}
              >
                {line.speaker === "agent" ? "AI" : isHe ? "מתקשר" : "Caller"}
              </span>
              <p className="text-[13.5px] leading-relaxed text-ink-800 dark:text-ink-100">{line.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-cream p-4 ring-1 ring-inset ring-rule-soft">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-ink-700 dark:text-ink-200">
            <Mic className="h-3.5 w-3.5 text-teal-700 dark:text-teal-300" />
            {isHe ? "מומחה ל-4 שפות" : "4 languages"}
          </div>
          <div className="text-end">
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">
              {isHe ? "משך שיחה ממוצע" : "Avg call length"}
            </p>
            <p className="mt-0.5 font-display text-base font-extrabold text-ink-900 dark:text-white" dir="ltr">
              1:47
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
