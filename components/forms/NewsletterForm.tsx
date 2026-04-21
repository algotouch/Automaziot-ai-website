"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { newsletterSchema, type NewsletterInput } from "@/lib/validators";
import { cn } from "@/lib/utils";

export function NewsletterForm({ isHe, className }: { isHe: boolean; className?: string }) {
  const { toast } = useToast();
  const reduce = useReducedMotion();
  const [success, setSuccess] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: NewsletterInput) {
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!r.ok) throw new Error();
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      toast({
        title: isHe ? "הרישום נכשל" : "Subscription failed",
        description: isHe ? "אפשר לנסות שוב?" : "Could you try again?",
        variant: "error",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-2", className)} noValidate>
      <div className="flex gap-2">
        <input
          {...register("email")}
          type="email"
          dir="ltr"
          aria-invalid={!!errors.email}
          aria-label={isHe ? "כתובת מייל" : "Email address"}
          placeholder={isHe ? "המייל שלך" : "your@email.com"}
          className={cn(
            "h-11 min-w-0 flex-1 rounded-full bg-surface px-4 text-sm text-ink-900 placeholder:text-ink-400 ring-1 ring-inset ring-rule outline-none transition focus:ring-teal-500 dark:text-white",
            errors.email && "ring-rose-500/60",
          )}
        />
        <button
          type="submit"
          disabled={isSubmitting || success}
          className="relative inline-flex h-11 min-w-[90px] items-center justify-center rounded-full bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-70"
        >
          <AnimatePresence initial={false} mode="wait">
            {success ? (
              <motion.span
                key="ok"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1.5"
              >
                <motion.svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <motion.path
                    d="M2 7 L6 11 L12 3"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.svg>
                {isHe ? "נרשמת" : "Subscribed"}
              </motion.span>
            ) : isSubmitting ? (
              <motion.span key="load" className="inline-flex">
                <Loader2 className="h-4 w-4 animate-spin" />
              </motion.span>
            ) : (
              <motion.span key="idle" className="inline-flex">
                {isHe ? "הרשמה" : "Subscribe"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      {errors.email && (
        <p className="text-xs font-medium text-rose-500">
          {isHe ? "כתובת מייל לא תקינה" : "Please enter a valid email"}
        </p>
      )}
      {success && !errors.email && (
        <p className="flex items-center gap-1.5 text-xs text-teal-700 dark:text-teal-300">
          <Check className="h-3.5 w-3.5" />
          {isHe ? "מעולה — נשלח לך את הגיליון הבא." : "Nice — we'll send the next issue your way."}
        </p>
      )}
    </form>
  );
}
