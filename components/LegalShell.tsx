import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CalendarClock } from "lucide-react";

/**
 * LegalShell — content left, sticky ToC right on md+.
 * Consumers pass prose children with <h2 id="slug">…</h2> so the ToC sidebar
 * can extract anchors client-side.
 */
export function LegalShell({
  eyebrow,
  title,
  updated,
  toc,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  toc?: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-hero-light pb-16 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 mask-fade-b" aria-hidden />
      <Container className="relative">
        <div className="grid gap-10 md:grid-cols-[1fr_240px]">
          <article className="min-w-0 max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold text-balance md:text-5xl">{title}</h1>
            <Badge variant="neutral" size="sm" className="mt-4">
              <CalendarClock className="h-3.5 w-3.5" />
              {updated}
            </Badge>
            <div className="mt-10 space-y-4 text-ink-700 dark:text-ink-200 [&>h2]:mt-10 [&>h2]:text-xl [&>h2]:font-extrabold [&>h2]:text-ink-950 dark:[&>h2]:text-white [&>p]:leading-relaxed [&>ul]:list-none [&>ul]:space-y-2 [&>ul>li]:relative [&>ul>li]:ps-4 [&>ul>li]:before:absolute [&>ul>li]:before:start-0 [&>ul>li]:before:top-2.5 [&>ul>li]:before:h-1.5 [&>ul>li]:before:w-1.5 [&>ul>li]:before:rounded-full [&>ul>li]:before:bg-teal-500 [&_a]:text-teal-700 dark:[&_a]:text-teal-300 [&_a]:font-semibold">
              {children}
            </div>
          </article>

          {toc && toc.length > 0 && (
            <aside className="hidden md:block">
              <div className="sticky top-24 rounded-2xl bg-surface p-5 ring-1 ring-inset ring-rule">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
                  Contents
                </p>
                <ol className="mt-3 space-y-2 text-[13.5px]">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="block border-s-2 border-rule ps-3 text-ink-500 transition hover:border-teal-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </section>
  );
}
