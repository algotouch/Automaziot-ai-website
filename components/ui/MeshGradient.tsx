"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Slowly-drifting mesh background for hero-style sections.
 * Two soft blobs + one SVG aurora stroke that loops its pathLength.
 * Respects prefers-reduced-motion.
 */
export function MeshGradient({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "soft";
}) {
  const reduce = useReducedMotion();
  const intensity = variant === "hero" ? 1 : 0.55;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <motion.div
        className="absolute -end-[20%] -top-[30%] h-[120%] w-[80%] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(closest-side, rgba(54,198,192,${0.22 * intensity}), transparent 70%)`,
        }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, 30, -20, 0],
                y: [0, -20, 20, 0],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[30%] -start-[10%] h-[100%] w-[70%] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(closest-side, rgba(217,122,59,${0.12 * intensity}), transparent 70%)`,
        }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, -20, 15, 0],
                y: [0, 15, -15, 0],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute start-1/4 top-1/2 h-[60%] w-[50%] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(closest-side, rgba(31,154,161,${0.10 * intensity}), transparent 70%)`,
        }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, 18, -14, 0],
                y: [0, -18, 10, 0],
              }
        }
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora stroke loop */}
      <svg
        className="absolute start-0 top-[35%] h-[40%] w-full opacity-40 dark:opacity-60"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="aurora-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#36C6C0" stopOpacity="0" />
            <stop offset="50%" stopColor="#36C6C0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#36C6C0" stopOpacity="0" />
          </linearGradient>
        </defs>
        {!reduce ? (
          <motion.path
            d="M0 180 Q 300 80 600 150 T 1200 120"
            stroke="url(#aurora-g)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <path
            d="M0 180 Q 300 80 600 150 T 1200 120"
            stroke="url(#aurora-g)"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
        )}
      </svg>
    </div>
  );
}
