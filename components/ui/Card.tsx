import { cn } from "@/lib/utils";

type Hover = "lift" | "glow" | "border" | "none";

export function Card({
  children,
  className,
  hover = "lift",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  hover?: Hover;
  as?: React.ElementType;
}) {
  const hoverCls =
    hover === "lift"
      ? "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
      : hover === "glow"
      ? "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:ring-teal-500/40"
      : hover === "border"
      ? "card-hover-border"
      : "";

  return (
    <Tag
      className={cn(
        "rounded-2xl bg-surface p-6 ring-1 ring-inset ring-rule",
        hoverCls,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
