"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/routing";
import { SERVICES } from "@/content/services";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import {
  ArrowLeft,
  Bot,
  Calendar,
  Compass,
  Database,
  Filter,
  MessageCircle,
  Phone,
  ShoppingCart,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { formatILS } from "@/lib/utils";

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
  indigo: "text-teal-700 bg-teal-50 ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/30",
  cyan: "text-teal-700 bg-teal-50 ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/30",
  emerald: "text-emerald-500 bg-emerald-50 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30",
  rose: "text-rose-500 bg-rose-50 ring-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/30",
  amber: "text-amber-600 bg-amber-50 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-500 dark:ring-amber-500/30",
  violet: "text-teal-700 bg-teal-50 ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/30",
};

export function ServicesGrid({ isHe }: { isHe: boolean }) {
  return (
    <section className="relative bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={isHe ? "שירותים" : "Services"}
            title={
              isHe ? (
                <>
                  10 דרכים מדויקות <br />
                  <span className="text-gradient-brand">להחזיר לך את הזמן.</span>
                </>
              ) : (
                <>
                  10 precise ways to <br />
                  <span className="text-gradient-brand">get your time back.</span>
                </>
              )
            }
            lead={
              isHe
                ? "כל שירות נבנה על אותה תשתית — אז אם מתחילים בשירות אחד וגדלים, הכל משתלב."
                : "Every service sits on the same foundation — start with one, add more later, everything stays coherent."
            }
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const copy = isHe ? s.he : s.en;
            const Icon = icons[s.icon as keyof typeof icons] ?? Workflow;
            return (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface p-6 ring-1 ring-inset ring-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:ring-teal-200 dark:hover:ring-teal-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div className={`grid h-11 w-11 place-items-center rounded-xl ring-1 ring-inset ${accent[s.accent] ?? accent.indigo}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex gap-1.5">
                      {s.isNew && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-600 ring-1 ring-inset ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-500 dark:ring-amber-500/30">
                          {isHe ? "חדש" : "New"}
                        </span>
                      )}
                      {s.isPopular && (
                        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-teal-700 ring-1 ring-inset ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/30">
                          {isHe ? "פופולרי" : "Popular"}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-ink-950 dark:text-white">{copy.nav}</h3>
                  <p className="mt-2 flex-1 text-[14.5px] text-muted">{copy.subtitle}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-rule-soft pt-4 text-sm dark:border-ink-700">
                    <span className="text-ink-400">
                      {isHe ? "החל מ־" : "From"}{" "}
                      <span className="font-bold text-ink-900 dark:text-white">{formatILS(s.startingPrice)}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-300">
                      {isHe ? "לפרטים" : "Details"} <ArrowLeft className="arrow-nudge h-4 w-4 flip-x" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
