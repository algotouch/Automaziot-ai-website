"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme, type ThemeMode } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Extract<ThemeMode, "light" | "dark">; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

export function ThemeToggle({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { resolved, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full bg-cream p-0.5 ring-1 ring-inset ring-rule",
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = resolved === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex items-center justify-center rounded-full transition-colors",
              compact ? "h-7 w-7" : "h-8 w-8",
              active
                ? "bg-white text-teal-700 shadow-soft dark:bg-ink-800 dark:text-teal-300"
                : "text-ink-400 hover:text-ink-800 dark:text-ink-300 dark:hover:text-white",
            )}
          >
            <Icon className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
          </button>
        );
      })}
    </div>
  );
}
