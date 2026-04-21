"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { SERVICES } from "@/content/services";
import {
  ArrowLeft,
  Award,
  Bot,
  Calendar,
  ChevronDown,
  Compass,
  Database,
  Filter,
  LayoutGrid,
  MessageCircle,
  Phone,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const icons = {
  MessageCircle,
  Phone,
  Filter,
  Workflow,
  Database,
  TrendingUp,
  Calendar,
  ShoppingCart,
  Bot,
  Compass,
} as const;

const accent: Record<string, string> = {
  indigo: "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300",
  cyan: "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300",
  emerald: "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400",
  rose: "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500",
  violet: "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300",
};

export function SolutionsDropdown({ label, active }: { label: string; active?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const isHe = locale === "he";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      SERVICES.forEach((s) => router.prefetch(`/services/${s.slug}` as string));
      router.prefetch("/services");
      router.prefetch("/case-studies/nadlanist-ai");
      router.prefetch("/pricing");
    } catch {}
  }, [router]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function scheduleClose() {
    closeTimer.current && clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }
  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors",
          open
            ? "bg-ink-100/60 text-ink-950 dark:bg-ink-800 dark:text-white"
            : active
            ? "text-ink-950 dark:text-white"
            : "text-ink-700 hover:bg-ink-100/60 hover:text-ink-950 dark:text-ink-200 dark:hover:bg-ink-800 dark:hover:text-white",
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-ink-400 transition-transform duration-200",
            open && "rotate-180 text-teal-600 dark:text-teal-300",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute z-50 mt-3 w-[min(92vw,980px)] overflow-hidden rounded-3xl bg-surface p-3 shadow-card ring-1 ring-inset ring-rule dark:bg-ink-900"
            style={{ insetInlineStart: "50%", transform: "translateX(-50%)" }}
          >
            <span
              aria-hidden="true"
              className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm bg-surface ring-1 ring-inset ring-rule dark:bg-ink-900"
            />
            <div className="relative grid gap-3 p-2 md:grid-cols-[1fr_1fr_260px]">
              <div className="grid gap-1.5 sm:grid-cols-2 md:col-span-2">
                {SERVICES.map((s) => {
                  const copy = isHe ? s.he : s.en;
                  const Icon = icons[s.icon as keyof typeof icons] ?? Workflow;
                  return (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setOpen(false)}
                      role="menuitem"
                      className="group relative flex items-start gap-3 rounded-xl p-3 transition hover:bg-cream focus:bg-cream focus:outline-none dark:hover:bg-ink-800 dark:focus:bg-ink-800"
                    >
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 ring-inset ring-rule-soft transition-transform group-hover:scale-105 group-hover:rotate-[-2deg]",
                          accent[s.accent] ?? accent.indigo,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 truncate text-[14.5px] font-bold text-ink-950 dark:text-white">
                          {copy.nav}
                          {s.isNew && (
                            <Badge variant="amber" size="xs">
                              {isHe ? "חדש" : "New"}
                            </Badge>
                          )}
                          {s.isPopular && (
                            <Badge variant="teal" size="xs">
                              {isHe ? "פופולרי" : "Popular"}
                            </Badge>
                          )}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-relaxed text-muted">
                          {copy.subtitle}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Right rail — featured case study */}
              <Link
                href="/case-studies/nadlanist-ai"
                onClick={() => setOpen(false)}
                className="group relative overflow-hidden rounded-2xl bg-ink-950 p-5 text-white transition hover:scale-[1.01] md:block"
              >
                <span className="pointer-events-none absolute -top-10 -end-10 h-40 w-40 rounded-full bg-teal-500/30 blur-3xl" aria-hidden />
                <span className="pointer-events-none absolute -bottom-10 -start-10 h-40 w-40 rounded-full bg-teal-700/40 blur-3xl" aria-hidden />
                <div className="relative flex flex-col gap-3">
                  <Badge variant="dark" size="xs">
                    <Award className="h-3 w-3" />
                    {isHe ? "פלגשיפ" : "Flagship case"}
                  </Badge>
                  <p className="text-lg font-extrabold leading-tight">Nadlanist AI</p>
                  <p className="text-[13px] leading-relaxed text-ink-200">
                    {isHe
                      ? "סוכן נדל״ן שהתפרסם ב־Walla, ICE ומעריב. ₪34M+ בעסקאות."
                      : "Real-estate agent featured in Walla, ICE, Maariv. ₪34M+ moved."}
                  </p>
                  <div className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-teal-300">
                    {isHe ? "קראו את הסיפור" : "Read the story"}
                    <ArrowLeft className="arrow-nudge h-3.5 w-3.5 flip-x" />
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3 ring-1 ring-inset ring-rule-soft dark:bg-ink-800 dark:ring-ink-700">
              <div className="flex items-center gap-2 text-[12.5px] text-muted">
                <Sparkles className="h-4 w-4 text-teal-500" />
                <span>
                  {isHe ? "לא בטוחים מה מתאים? 30 דקות ייעוץ חינם." : "Not sure what fits? 30-min free consult."}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/pricing"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 text-[13px] font-bold text-ink-900 ring-1 ring-inset ring-rule transition hover:bg-cream dark:bg-ink-900 dark:text-white dark:ring-ink-700"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  {isHe ? "מחירון" : "Pricing"}
                </Link>
                <Link
                  href="/services"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-teal-700 px-3.5 py-1.5 text-[13px] font-bold text-white transition hover:bg-teal-800"
                >
                  {isHe ? "כל הפתרונות" : "All solutions"}
                  <ArrowLeft className="arrow-nudge h-3.5 w-3.5 flip-x" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
