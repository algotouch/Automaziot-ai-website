"use client";

import { motion } from "framer-motion";
import { Workflow, Zap } from "lucide-react";

const HE_NODES = [
  { x: 50, y: 40, label: "WhatsApp" },
  { x: 220, y: 40, label: "AI סיווג" },
  { x: 220, y: 150, label: "CRM" },
  { x: 50, y: 150, label: "יומן" },
  { x: 135, y: 245, label: "חשבונית" },
];
const EN_NODES = [
  { x: 50, y: 40, label: "WhatsApp" },
  { x: 220, y: 40, label: "AI triage" },
  { x: 220, y: 150, label: "CRM" },
  { x: 50, y: 150, label: "Calendar" },
  { x: 135, y: 245, label: "Invoice" },
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [1, 3], [3, 4], [2, 4],
];

export function FlowVisual({ isHe }: { isHe: boolean }) {
  const nodes = isHe ? HE_NODES : EN_NODES;

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-teal-100/60 via-cream to-white blur-2xl dark:from-teal-700/30 dark:via-ink-900 dark:to-ink-950" />
      <div className="relative overflow-hidden rounded-[28px] bg-surface p-5 shadow-lift ring-1 ring-inset ring-rule">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white">
              <Workflow className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-white">{isHe ? "זרימת אוטומציה חיה" : "Live automation flow"}</p>
              <p className="text-[11px] font-medium text-teal-700 inline-flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {isHe ? "126 פעולות בדקה" : "126 actions / min"}
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 ring-1 ring-inset ring-emerald-100">
            HEALTHY
          </span>
        </div>

        <div className="relative mx-auto h-[320px] w-full overflow-hidden rounded-2xl bg-cream ring-1 ring-inset ring-rule-soft">
          <svg viewBox="0 0 300 320" className="h-full w-full">
            <defs>
              <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#36C6C0" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#0E4767" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Edges */}
            {EDGES.map(([a, b], i) => {
              const A = nodes[a];
              const B = nodes[b];
              return (
                <motion.line
                  key={i}
                  x1={A.x + 60}
                  y1={A.y + 20}
                  x2={B.x + 60}
                  y2={B.y + 20}
                  stroke="url(#edge-grad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12 }}
                />
              );
            })}

            {/* Animated dots along edges */}
            {EDGES.map(([a, b], i) => {
              const A = nodes[a];
              const B = nodes[b];
              return (
                <motion.circle
                  key={`dot-${i}`}
                  r="3"
                  fill="#1F9AA1"
                  initial={{ cx: A.x + 60, cy: A.y + 20, opacity: 0 }}
                  animate={{ cx: B.x + 60, cy: B.y + 20, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, delay: 1 + i * 0.4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((n, i) => (
              <motion.g
                key={n.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width="120"
                  height="40"
                  rx="10"
                  strokeWidth="1"
                  style={{ fill: "var(--c-surface)", stroke: "var(--c-rule)" }}
                />
                <text
                  x={n.x + 60}
                  y={n.y + 24}
                  textAnchor="middle"
                  className="font-display text-[12px] font-bold"
                  style={{ fill: "var(--c-text-strong)" }}
                >
                  {n.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <Kpi label={isHe ? "הצליחו" : "Succeeded"} v="94%" tone="good" />
          <Kpi label={isHe ? "ממוצע" : "Avg latency"} v="118ms" tone="accent" />
          <Kpi label={isHe ? "שגיאות" : "Errors"} v="0.3%" tone="muted" />
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, v, tone }: { label: string; v: string; tone: "good" | "accent" | "muted" }) {
  const cls = {
    good: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    accent: "bg-teal-50 text-teal-700 ring-teal-100",
    muted: "bg-cream text-ink-700 ring-rule-soft",
  }[tone];
  return (
    <div className={`rounded-xl p-3 ring-1 ring-inset ${cls}`}>
      <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80">{label}</p>
      <p className="mt-0.5 font-display text-lg font-extrabold" dir="ltr">{v}</p>
    </div>
  );
}
