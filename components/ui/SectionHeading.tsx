import * as React from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-700 ring-1 ring-inset ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/30",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "start",
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const Tag = as;
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="mt-5 text-3xl font-extrabold text-balance sm:text-4xl md:text-[44px]">{title}</Tag>
      {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{lead}</p>}
    </div>
  );
}
