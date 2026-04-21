// URL helpers that respect next-intl's "as-needed" locale prefix.
//
// With `localePrefix: "as-needed"` + `defaultLocale: "he"`, Hebrew content
// is served at `/`, `/services/x`, etc. — visiting `/he/...` redirects.
// English content lives under `/en/...`. SEO canonicals and hreflang links
// must point at the actual served URL, not the redirect source.

import type { Locale } from "@/i18n/routing";

/**
 * Build the canonical path for a given locale + route.
 * @param path Route without locale prefix (e.g. "/services/whatsapp-agent", "")
 */
export function localePath(locale: Locale | string, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const clean = normalized === "/" ? "" : normalized;
  return locale === "he" ? clean || "/" : `/en${clean}`;
}

/** Build the hreflang map (he/en/x-default) for a given bilingual path. */
export function bilingualLanguages(path: string): Record<string, string> {
  return {
    he: localePath("he", path),
    en: localePath("en", path),
    "x-default": localePath("he", path),
  };
}
