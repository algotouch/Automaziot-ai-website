"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { LocaleToggle } from "@/components/layout/LocaleToggle";
import { SolutionsDropdown } from "@/components/layout/SolutionsDropdown";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SERVICES } from "@/content/services";
import { whatsappLink } from "@/lib/whatsapp";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { href: "/case-studies" | "/pricing" | "/about" | "/blog" | "/contact"; key: string };

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const isHe = locale === "he";
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  const items: NavItem[] = [
    { href: "/case-studies", key: "caseStudies" },
    { href: "/pricing", key: "pricing" },
    { href: "/about", key: "about" },
    { href: "/blog", key: "blog" },
    { href: "/contact", key: "contact" },
  ];

  // Warm up every top-level route for the CURRENT locale immediately so navigating
  // inside the site feels instant after the first paint.
  useEffect(() => {
    try {
      ["/case-studies", "/pricing", "/about", "/blog", "/contact", "/services"].forEach((h) => router.prefetch(h));
    } catch {}
  }, [router]);

  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-rule/60 bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent bg-paper/0",
      )}
    >
      <div className="container-site flex h-18 items-center justify-between gap-4 py-3">
        <Link href="/" aria-label="Automaziot AI home" className="shrink-0">
          <Logo height={32} />
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          <SolutionsDropdown label={t("services")} active={servicesActive} />
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.key}
                href={item.href}
                prefetch
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors",
                  active
                    ? "text-ink-950 dark:text-white"
                    : "text-ink-700 hover:text-ink-950 dark:text-ink-200 dark:hover:text-white",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-cream ring-1 ring-inset ring-rule dark:bg-ink-800 dark:ring-ink-700"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <LocaleToggle />
          <Button
            as="a"
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            variant="primary"
            size="sm"
          >
            <MessageCircle className="h-4 w-4" />
            {t("cta")}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink-900 ring-1 ring-inset ring-rule dark:text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "border-t border-rule/60 bg-paper md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="container-site flex flex-col gap-1 py-4">
          <button
            type="button"
            onClick={() => setSolutionsOpen((v) => !v)}
            aria-expanded={solutionsOpen}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium hover:bg-ink-100/60 dark:hover:bg-ink-800",
              servicesActive ? "text-ink-950 dark:text-white" : "text-ink-800 dark:text-ink-200",
            )}
          >
            <span>{t("services")}</span>
            <ChevronDown className={cn("h-4 w-4 text-ink-400 transition-transform", solutionsOpen && "rotate-180 text-teal-600")} />
          </button>
          {solutionsOpen && (
            <div className="mb-1 grid gap-1 rounded-xl bg-surface p-2 ring-1 ring-inset ring-rule">
              {SERVICES.map((s) => {
                const copy = isHe ? s.he : s.en;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-[14px] font-semibold text-ink-800 hover:bg-cream dark:text-ink-200 dark:hover:bg-ink-700"
                  >
                    {copy.nav}
                  </Link>
                );
              })}
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-lg bg-teal-700 px-3 py-2 text-center text-[13px] font-bold text-white hover:bg-teal-800"
              >
                {isHe ? "כל הפתרונות" : "All solutions"}
              </Link>
            </div>
          )}

          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                prefetch
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                  active
                    ? "bg-cream text-ink-950 ring-1 ring-inset ring-rule dark:bg-ink-800 dark:text-white dark:ring-ink-700"
                    : "text-ink-800 hover:bg-ink-100/60 dark:text-ink-200 dark:hover:bg-ink-800",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
          <div className="mt-3 flex items-center gap-2">
            <ThemeToggle compact />
            <LocaleToggle />
            <Button
              as="a"
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              variant="primary"
              size="sm"
              className="flex-1"
            >
              <MessageCircle className="h-4 w-4" />
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
