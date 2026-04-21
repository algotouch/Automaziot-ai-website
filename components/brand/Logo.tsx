import { cn } from "@/lib/utils";

// Render the real brand artwork from /public/logo.svg. Aspect 1536×672 (~2.286:1).
// The SVG itself is a single HTTP cache — cheap on every subsequent page.
export function Logo({ className, height = 34 }: { className?: string; height?: number }) {
  const width = Math.round(height * (1536 / 672));
  return (
    <span
      className={cn("inline-flex items-center leading-none select-none", className)}
      aria-label="Automaziot AI"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="Automaziot AI"
        width={width}
        height={height}
        style={{ height, width: "auto" }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        draggable={false}
      />
    </span>
  );
}
