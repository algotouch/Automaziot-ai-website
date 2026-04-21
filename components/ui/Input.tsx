import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, invalid, ...rest }, ref) {
    return (
      <input
        ref={ref}
        {...rest}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-12 w-full rounded-xl bg-cream px-4 text-[15px] text-ink-900 placeholder:text-ink-400 ring-1 ring-inset ring-rule-soft outline-none transition focus:bg-surface focus:ring-teal-500 dark:text-white dark:placeholder:text-ink-400",
          invalid && "ring-rose-500/60 focus:ring-rose-500",
          className,
        )}
      />
    );
  },
);
