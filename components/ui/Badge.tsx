import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "neutral" | "teal" | "amber" | "emerald" | "rose" | "dark";
type Size = "xs" | "sm" | "md";

const variants: Record<Variant, string> = {
  neutral:
    "bg-cream text-ink-700 ring-1 ring-inset ring-rule-soft dark:bg-ink-800 dark:text-ink-200 dark:ring-ink-700",
  teal: "bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/30",
  amber:
    "bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-500 dark:ring-amber-500/30",
  emerald:
    "bg-emerald-50 text-emerald-500 ring-1 ring-inset ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-500 dark:ring-emerald-500/30",
  rose: "bg-rose-50 text-rose-500 ring-1 ring-inset ring-rose-500/20 dark:bg-rose-500/10 dark:text-rose-500 dark:ring-rose-500/30",
  dark: "bg-ink-950 text-teal-200 ring-1 ring-inset ring-white/10",
};

const sizes: Record<Size, string> = {
  xs: "text-[10px] px-2 py-0.5 tracking-[0.14em] uppercase font-bold",
  sm: "text-[11px] px-2.5 py-1 tracking-[0.14em] uppercase font-semibold",
  md: "text-[12px] px-3 py-1 font-semibold",
};

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
  size?: Size;
  dot?: boolean;
};

export function Badge({
  variant = "neutral",
  size = "sm",
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full whitespace-nowrap",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "teal" && "bg-teal-500",
            variant === "amber" && "bg-amber-500",
            variant === "emerald" && "bg-emerald-500",
            variant === "rose" && "bg-rose-500",
            variant === "dark" && "bg-teal-300",
            variant === "neutral" && "bg-ink-400",
          )}
        />
      )}
      {children}
    </span>
  );
}
