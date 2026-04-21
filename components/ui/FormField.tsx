import * as React from "react";
import { cn } from "@/lib/utils";

export function FormField({
  label,
  hint,
  error,
  htmlFor,
  required,
  className,
  children,
}: {
  label?: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const hintId = hint && htmlFor ? `${htmlFor}-hint` : undefined;
  const errId = error && htmlFor ? `${htmlFor}-err` : undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-[13px] font-semibold text-ink-800 dark:text-ink-100"
        >
          {label}
          {required && <span className="ms-1 text-rose-500">*</span>}
        </label>
      )}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            id: htmlFor,
            "aria-describedby": [hintId, errId].filter(Boolean).join(" ") || undefined,
          } as Record<string, unknown>)
        : children}
      {hint && !error && (
        <p id={hintId} className="text-[12px] text-ink-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} className="text-[12px] font-medium text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}
