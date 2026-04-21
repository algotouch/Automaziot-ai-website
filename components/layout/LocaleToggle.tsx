"use client";

import { useEffect, useRef, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";

const PREWARMED: Set<string> = new Set();

export function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === "he" ? "en" : "he";
  const [isPending, startTransition] = useTransition();
  const btnRef = useRef<HTMLButtonElement>(null);

  // Warm up the counterpart locale immediately so the RSC payload is cached
  // before the user clicks. One fetch per unique path.
  useEffect(() => {
    const key = `${pathname}::${next}`;
    if (PREWARMED.has(key)) return;
    try {
      router.prefetch(pathname, { locale: next });
      PREWARMED.add(key);
    } catch {}
  }, [router, pathname, next]);

  function handleSwitch() {
    if (isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false });
    });
  }

  function handlePrefetch() {
    try {
      router.prefetch(pathname, { locale: next });
    } catch {}
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleSwitch}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      onPointerDown={handlePrefetch}
      disabled={isPending}
      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-surface px-3 text-xs font-semibold text-ink-700 ring-1 ring-inset ring-rule transition hover:bg-cream disabled:opacity-70 dark:text-ink-200 dark:hover:bg-ink-700"
      aria-label={locale === "he" ? "Switch to English" : "עברו לעברית"}
      aria-busy={isPending}
    >
      <Globe className={`h-3.5 w-3.5 ${isPending ? "animate-pulse text-teal-600" : ""}`} />
      {next.toUpperCase()}
    </button>
  );
}
