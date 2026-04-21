"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Side = { label: string; metric: string; note: string };

export function BeforeAfter({
  before,
  after,
  isHe,
  className,
}: {
  before: Side;
  after: Side;
  isHe: boolean;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.55);
  const percent = useTransform(x, (v) => `${v * 100}%`);
  const reduce = useReducedMotion();
  const [dragging, setDragging] = React.useState(false);

  const update = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rel = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    x.set(rel);
  }, [x]);

  React.useEffect(() => {
    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging) return;
      const cx = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      update(cx);
    }
    function onUp() {
      setDragging(false);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, update]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-72 w-full cursor-ew-resize overflow-hidden rounded-3xl bg-ink-900 ring-1 ring-inset ring-ink-800 select-none md:h-80",
        className,
      )}
      onMouseDown={(e) => {
        setDragging(true);
        update(e.clientX);
      }}
      onTouchStart={(e) => {
        setDragging(true);
        update(e.touches[0].clientX);
      }}
      role="region"
      aria-label={isHe ? "השוואה לפני ואחרי" : "Before and after comparison"}
    >
      {/* Before (full background) */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-ink-800 to-ink-900">
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-rose-500">
              {before.label}
            </p>
            <p className="mt-3 font-display text-4xl font-extrabold text-white md:text-5xl">
              {before.metric}
            </p>
            <p className="mt-2 text-sm text-ink-300">
              <Clock className="me-1 inline-block h-3.5 w-3.5 align-[-2px]" />
              {before.note}
            </p>
          </div>
        </div>
      </div>

      {/* After — clipped by x */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 start-0"
        style={{ width: percent }}
      >
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-teal-500/40 via-teal-700 to-ink-950">
          <div
            className="absolute inset-0 grid place-items-center p-6 text-center"
            style={{ width: containerRef.current?.clientWidth ?? "100%" }}
          >
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-teal-300">
                {after.label}
              </p>
              <p className="mt-3 font-display text-4xl font-extrabold text-white md:text-5xl">
                {after.metric}
              </p>
              <p className="mt-2 text-sm text-teal-100">
                <Zap className="me-1 inline-block h-3.5 w-3.5 align-[-2px]" />
                {after.note}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Divider & knob */}
      <motion.div
        className="pointer-events-none absolute top-0 h-full"
        style={{ insetInlineStart: percent }}
      >
        <div className="relative -ms-px h-full w-0.5 bg-white/70 shadow-lift" />
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -ms-5 h-10 w-10 rounded-full bg-white shadow-lift ring-1 ring-inset ring-rule",
            !reduce && "transition-transform duration-200",
            dragging && "scale-110",
          )}
        >
          <div className="absolute inset-0 grid place-items-center text-ink-900">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 8h8M4 8l3-3M4 8l3 3M12 8l-3-3M12 8l-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
