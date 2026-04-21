import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, invalid, children, ...rest }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          {...rest}
          aria-invalid={invalid || undefined}
          className={cn(
            "h-12 w-full appearance-none rounded-xl bg-cream pe-10 ps-4 text-[15px] text-ink-900 ring-1 ring-inset ring-rule-soft outline-none transition focus:bg-surface focus:ring-teal-500 dark:text-white",
            invalid && "ring-rose-500/60 focus:ring-rose-500",
            className,
          )}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      </div>
    );
  },
);
