"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TocItem = { id: string; label: string };

export function StickyToc({ items, isHe }: { items: TocItem[]; isHe: boolean }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((i) => ({ id: i.id, el: document.getElementById(i.id) }))
      .filter((x): x is { id: string; el: HTMLElement } => !!x.el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={isHe ? "ניווט עמוד" : "Page navigation"} className="sticky top-24">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">
        {isHe ? "בעמוד" : "On this page"}
      </p>
      <ul className="space-y-1">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={cn(
                  "group flex items-center gap-3 rounded-lg py-1.5 pe-2 ps-3 text-[13.5px] font-medium transition-colors",
                  isActive ? "text-ink-950" : "text-ink-500 hover:text-ink-800",
                )}
              >
                <span
                  className={cn(
                    "h-[2px] rounded-full transition-all duration-300",
                    isActive ? "w-6 bg-teal-600" : "w-3 bg-ink-200 group-hover:w-5 group-hover:bg-ink-400",
                  )}
                />
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
