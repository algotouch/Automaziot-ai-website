"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/Reveal";
import { Database, TrendingUp } from "lucide-react";

export function DashboardVisual({ isHe, variant = "crm" }: { isHe: boolean; variant?: "crm" | "consulting" }) {
  const title =
    variant === "consulting"
      ? isHe
        ? "דוח ייעוץ · רבעון נוכחי"
        : "Consulting digest · current quarter"
      : isHe
        ? "ניהול לקוחות · חודש נוכחי"
        : "CRM · current month";

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-teal-100/60 via-cream to-white blur-2xl dark:from-teal-700/30 dark:via-ink-900 dark:to-ink-950" />
      <div className="relative overflow-hidden rounded-[28px] bg-surface p-5 shadow-lift ring-1 ring-inset ring-rule">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white">
              <Database className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-white">{title}</p>
              <p className="text-[11px] font-medium text-teal-700">
                <TrendingUp className="mr-1 inline h-3 w-3" />
                {isHe ? "כל המחלקות מסונכרנות" : "All departments synced"}
              </p>
            </div>
          </div>
          <span className="rounded-full bg-teal-50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-teal-700 ring-1 ring-inset ring-teal-100">
            LIVE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { k: isHe ? "לקוחות פעילים" : "Active clients", v: 147, color: "teal" },
            { k: isHe ? "עסקאות פתוחות" : "Open deals", v: 23, color: "amber" },
            { k: isHe ? "הכנסות החודש" : "MRR", v: 124_800, color: "emerald", money: true },
            { k: isHe ? "שיעור סגירה" : "Close rate", v: 38, color: "teal", pct: true },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.k}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl bg-cream p-4 ring-1 ring-inset ring-rule-soft"
            >
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">{kpi.k}</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-ink-950 dark:text-white" dir="ltr">
                {kpi.money ? "₪" : ""}
                <CountUp to={kpi.v} duration={1.3} format={kpi.money ? (n) => n.toLocaleString() : undefined} />
                {kpi.pct ? "%" : ""}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trend sparkline */}
        <div className="mt-4 rounded-2xl bg-cream p-4 ring-1 ring-inset ring-rule-soft">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">
              {isHe ? "מגמת הכנסות · 30 יום" : "Revenue trend · 30 days"}
            </p>
            <span className="text-xs font-bold text-emerald-500">+18.2%</span>
          </div>
          <svg viewBox="0 0 300 80" className="h-16 w-full">
            <defs>
              <linearGradient id="spark-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1F9AA1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1F9AA1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,60 Q40,55 60,45 T120,40 Q160,30 180,35 T240,20 Q270,10 300,15 L300,80 L0,80 Z"
              fill="url(#spark-grad)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.path
              d="M0,60 Q40,55 60,45 T120,40 Q160,30 180,35 T240,20 Q270,10 300,15"
              fill="none"
              stroke="#1F9AA1"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
