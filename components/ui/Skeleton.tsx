import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-md bg-ink-100/70 dark:bg-ink-800/70",
        className,
      )}
    >
      <span className="absolute inset-0 animate-shimmer" />
    </div>
  );
}
