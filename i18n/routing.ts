import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["he", "en"],
  defaultLocale: "he",
  localePrefix: "as-needed",
  // Do not auto-detect based on Accept-Language or an existing NEXT_LOCALE cookie.
  // The site is Hebrew-first; visitors land on /he unless they explicitly pick EN.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const localeDir = (locale: Locale) => (locale === "he" ? "rtl" : "ltr");
