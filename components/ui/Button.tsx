import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-3 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal-700 text-white hover:bg-teal-800 shadow-soft hover:shadow-glow-teal hover:-translate-y-[1px]",
  secondary:
    "bg-white text-ink-900 ring-1 ring-inset ring-ink-100 hover:bg-cream hover:ring-ink-200",
  ghost: "text-ink-700 hover:text-ink-950 hover:bg-ink-100/40",
  whatsapp:
    "bg-[#1F8C5C] text-white hover:brightness-110 shadow-[0_10px_30px_-10px_rgba(31,140,92,0.5)]",
  dark: "bg-ink-950 text-white hover:bg-ink-800",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
  as?: "button" | "a";
};

type ButtonProps = ButtonOwnProps &
  (Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> | Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps>);

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, as, ...rest } = props as ButtonOwnProps & Record<string, unknown>;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (as === "a") {
    return (
      <a {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  );
}
