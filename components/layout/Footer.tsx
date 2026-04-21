import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Logo } from "@/components/brand/Logo";
import { CONTACT } from "@/lib/whatsapp";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { SERVICES } from "@/content/services";

export async function Footer() {
  const locale = await getLocale();
  const isHe = locale === "he";

  const quickLinks = isHe
    ? [
        { href: "/", label: "בית" },
        { href: "/services", label: "שירותים" },
        { href: "/pricing", label: "מחירון" },
        { href: "/about", label: "אודות" },
        { href: "/case-studies", label: "סיפורי הצלחה" },
        { href: "/blog", label: "בלוג" },
        { href: "/news", label: "חדשות" },
        { href: "/glossary", label: "מילון מונחים" },
        { href: "/contact", label: "צור קשר" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/pricing", label: "Pricing" },
        { href: "/about", label: "About" },
        { href: "/case-studies", label: "Case studies" },
        { href: "/blog", label: "Blog" },
        { href: "/news", label: "News" },
        { href: "/glossary", label: "Glossary" },
        { href: "/contact", label: "Contact" },
      ];

  const policies = isHe
    ? [
        { href: "/privacy", label: "מדיניות פרטיות" },
        { href: "/terms", label: "תנאי שימוש" },
        { href: "/accessibility", label: "הצהרת נגישות" },
        { href: "/editorial-standards", label: "מדיניות עריכה" },
      ]
    : [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/accessibility", label: "Accessibility" },
        { href: "/editorial-standards", label: "Editorial" },
      ];

  const solutionsLabel = isHe ? "פתרונות" : "Solutions";
  const quickLabel = isHe ? "קישורים" : "Links";
  const newsletterLabel = isHe ? "מעודכנים ב-AI" : "Stay sharp on AI";
  const newsletterLead = isHe
    ? "הכלים, התובנות והמעצבי-שוק שרצים כרגע בישראל — ישר לתיבה שלך, פעם בשבועיים."
    : "The tools, plays and market-movers working right now in Israel — in your inbox every other week.";
  const rights = isHe ? "כל הזכויות שמורות" : "All rights reserved";
  const tagline = isHe
    ? "העסק שלך עובד גם כשאתה לא."
    : "Your business keeps working after you log off.";

  return (
    <footer className="relative mt-24 border-t border-rule bg-cream text-ink-600 dark:text-ink-300">
      <div className="container-site grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo height={34} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{tagline}</p>
          <div className="mt-6 space-y-2.5 text-sm">
            <a href={`tel:${CONTACT.phoneIL.replace(/-/g, "")}`} className="flex items-center gap-2 hover:text-ink-950 dark:hover:text-white">
              <Phone className="h-4 w-4 text-teal-600 dark:text-teal-300" /> IL {CONTACT.phoneIL}
            </a>
            <a href="tel:+16467604854" className="flex items-center gap-2 hover:text-ink-950 dark:hover:text-white">
              <Phone className="h-4 w-4 text-teal-600 dark:text-teal-300" /> US {CONTACT.phoneUS}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-ink-950 dark:hover:text-white">
              <Mail className="h-4 w-4 text-teal-600 dark:text-teal-300" /> {CONTACT.email}
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-300" />
              <span>{isHe ? CONTACT.addressHe : CONTACT.addressEn}</span>
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <a aria-label="LinkedIn" href={CONTACT.social.linkedin} target="_blank" rel="noopener" className="rounded-full bg-surface p-2 text-ink-700 ring-1 ring-inset ring-rule transition hover:-translate-y-0.5 hover:text-teal-700 hover:ring-teal-200 dark:text-ink-200 dark:hover:text-teal-300 dark:hover:ring-teal-500/30">
              <Linkedin className="h-4 w-4" />
            </a>
            <a aria-label="Instagram" href={CONTACT.social.instagram} target="_blank" rel="noopener" className="rounded-full bg-surface p-2 text-ink-700 ring-1 ring-inset ring-rule transition hover:-translate-y-0.5 hover:text-teal-700 hover:ring-teal-200 dark:text-ink-200 dark:hover:text-teal-300 dark:hover:ring-teal-500/30">
              <Instagram className="h-4 w-4" />
            </a>
            <a aria-label="Facebook" href={CONTACT.social.facebook} target="_blank" rel="noopener" className="rounded-full bg-surface p-2 text-ink-700 ring-1 ring-inset ring-rule transition hover:-translate-y-0.5 hover:text-teal-700 hover:ring-teal-200 dark:text-ink-200 dark:hover:text-teal-300 dark:hover:ring-teal-500/30">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-800 dark:text-ink-100">{quickLabel}</h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink-950 dark:hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-800 dark:text-ink-100">{solutionsLabel}</h4>
          <ul className="space-y-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-ink-950 dark:hover:text-white">
                  {isHe ? s.he.nav : s.en.nav}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-800 dark:text-ink-100">
            <Sparkles className="h-3.5 w-3.5 text-teal-500" />
            {newsletterLabel}
          </h4>
          <p className="text-sm">{newsletterLead}</p>
          <NewsletterForm isHe={isHe} className="mt-4" />
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="container-site flex flex-col items-start justify-between gap-4 py-6 text-xs text-ink-500 dark:text-ink-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Automaziot AI · {rights}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {policies.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="hover:text-ink-800 dark:hover:text-white">{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
