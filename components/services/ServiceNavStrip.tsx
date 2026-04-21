"use client";

import { Link } from "@/i18n/routing";
import { SERVICES } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { ArrowLeft } from "lucide-react";
import {
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

export function ServiceNavStrip({ currentSlug, isHe }: { currentSlug: string; isHe: boolean }) {
  const others = SERVICES.filter((s) => s.slug !== currentSlug);

  return (
    <section className="relative bg-white py-16 ring-1 ring-inset ring-rule-soft">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700">
              {isHe ? "עוד פתרונות" : "More solutions"}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-ink-950 md:text-3xl">
              {isHe ? "כל העסק מתחבר לאותה תשתית" : "Every part of the business, one foundation"}
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-teal-700 hover:text-teal-800"
          >
            {isHe ? "כל השירותים" : "All services"}
            <ArrowLeft className="h-4 w-4 flip-x" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {others.map((s) => {
            const copy = isHe ? s.he : s.en;
            const Icon = icons[s.icon as keyof typeof icons] ?? Workflow;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center gap-3 rounded-2xl bg-cream p-4 ring-1 ring-inset ring-rule-soft transition hover:bg-white hover:shadow-soft hover:ring-teal-200"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-teal-700 ring-1 ring-inset ring-teal-100">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="flex-1 text-sm font-bold text-ink-900">{copy.nav}</span>
                <ArrowLeft className="h-4 w-4 flip-x text-ink-400 transition-transform group-hover:-translate-x-1 group-hover:text-teal-700" />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
