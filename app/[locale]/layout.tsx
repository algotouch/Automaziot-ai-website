import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations, getMessages } from "next-intl/server";
import { Heebo } from "next/font/google";
import { notFound } from "next/navigation";
import { routing, localeDir, type Locale } from "@/i18n/routing";
import { bilingualLanguages, localePath } from "@/lib/seo";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FloatingWhatsAppLazy } from "@/components/ui/FloatingWhatsAppLazy";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/jsonld";

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

// Inline, blocking: sets the theme class before the first paint so the page
// can't flash dark before React hydrates. Light is the default; dark only
// activates when the user has explicitly picked it.
const SET_THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark';document.documentElement.classList.toggle('dark',d);document.documentElement.dataset.theme=d?'dark':'light';}catch(e){}})();`;

// Heebo covers both Hebrew and Latin glyphs — so we skip Inter entirely.
// Three weights is plenty for the whole type system.
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  weight: ["400", "600", "800"],
  display: "swap",
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { default: t("siteTitle"), template: "%s · " + t("siteName") },
    description: t("siteDescription"),
    alternates: {
      canonical: localePath(locale, "/"),
      languages: bilingualLanguages("/"),
    },
    openGraph: {
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      url: `https://www.automaziot.ai${localePath(locale, "/")}`,
      title: t("siteTitle"),
      description: t("siteDescription"),
      siteName: t("siteName"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("siteDescription"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const isHe = locale === "he";

  return (
    <html lang={locale} dir={localeDir(locale)} className={heebo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SET_THEME_SCRIPT }} />
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(isHe)) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema(locale)) }}
        />
        <Script
          id="ld-localbiz"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(isHe)) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <ToastProvider>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50 focus:rounded-md focus:bg-teal-700 focus:px-3 focus:py-2 focus:text-white"
              >
                {isHe ? "דלגו לתוכן" : "Skip to content"}
              </a>
              <ScrollProgress />
              <Nav />
              <main id="main">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <FloatingWhatsAppLazy isHe={isHe} />
              <ScrollToTop isHe={isHe} />
            </ToastProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
