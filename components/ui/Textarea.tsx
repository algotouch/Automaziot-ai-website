import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, invalid, rows = 4, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        {...rest}
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full rounded-xl bg-cream px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 ring-1 ring-inset ring-rule-soft outline-none transition focus:bg-surface focus:ring-teal-500 dark:text-white dark:placeholder:text-ink-400",
          invalid && "ring-rose-500/60 focus:ring-rose-500",
          className,
        )}
      />
    );
  },
);
