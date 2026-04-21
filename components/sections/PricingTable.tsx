"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/MagneticButton";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { DEFAULT_LAST_UPDATED, SERVICES } from "@/content/services";
import { whatsappLink } from "@/lib/whatsapp";
import { ArrowLeft, Check, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT_RING: Record<string, string> = {
  teal: "ring-teal-500/40",
  emerald: "ring-emerald-500/40",
  rose: "ring-rose-500/40",
  amber: "ring-amber-500/40",
  cyan: "ring-teal-500/40",
  indigo: "ring-teal-500/40",
  violet: "ring-teal-500/40",
};

export function PricingTable({ isHe }: { isHe: boolean }) {
  const locale = useLocale();
  const heLocale = locale === "he";

  return (
    <section className="relative bg-paper py-20 md:py-28">
      <Container className="relative">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow={isHe ? "מחירון שקוף" : "Transparent pricing"}
          title={
            isHe ? (
              <>
                מחירים <span className="text-gradient-brand">פתוחים</span>, בלי אותיות קטנות
              </>
            ) : (
              <>
                Pricing <span className="text-gradient-brand">out in the open</span>, no fine print
              </>
            )
          }
          lead={
            isHe
              ? "כל הפתרונות עם טווחי מחיר ברורים. עלויות צד ג׳ (WhatsApp API, טוקני AI) שקופות ומשולמות ישירות לספקים."
              : "All solutions with clear price ranges. Third-party costs (WhatsApp API, AI tokens) are transparent and paid directly to providers."
          }
        />

        <p className="mt-5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
          {isHe ? "עודכן לאחרונה:" : "Last updated:"}{" "}
          <time dateTime={DEFAULT_LAST_UPDATED}>{DEFAULT_LAST_UPDATED}</time>
          {" · "}
          <a
            href="/pricing.md"
            className="underline decoration-dotted underline-offset-2 hover:text-teal-700"
          >
            {isHe ? "גרסה מכונתית (markdown)" : "Machine-readable (markdown)"}
          </a>
        </p>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s) => {
            const copy = heLocale ? s.he : s.en;
            const featuredTier = copy.tiers.find((t) => t.featured) ?? copy.tiers[0];
            return (
              <StaggerItem key={s.slug}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface p-6 ring-1 ring-inset ring-rule transition-all hover:-translate-y-1 hover:shadow-lift",
                    s.isPopular && "gradient-border",
                  )}
                >
                  {s.isPopular && (
                    <Badge variant="teal" size="xs" className="absolute end-4 top-4">
                      <Sparkles className="h-3 w-3" />
                      {isHe ? "הכי פופולרי" : "Most popular"}
                    </Badge>
                  )}
                  <header>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-300">
                      {copy.nav}
                    </p>
                    <h3 className="mt-2 text-xl font-extrabold text-ink-950 dark:text-white">{copy.title}</h3>
                    <p className="mt-2 text-[14px] text-muted">{copy.subtitle}</p>
                  </header>

                  <div className="mt-5 rounded-2xl bg-cream p-5 ring-1 ring-inset ring-rule-soft dark:bg-ink-800 dark:ring-ink-700">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-400">
                      {isHe ? "החל מ־" : "Starts from"}
                    </p>
                    <p className="mt-1 font-display text-3xl font-extrabold text-ink-950 dark:text-white">
                      ₪{s.startingPrice.toLocaleString("en-US")}
                      <span className="ms-1 text-sm font-semibold text-ink-400">
                        {isHe ? "· הקמה" : "· one-time"}
                      </span>
                    </p>
                    {featuredTier && (
                      <p className="mt-2 text-[12px] text-muted">
                        {isHe ? "מומלץ:" : "Recommended:"} {featuredTier.name} · {featuredTier.price}
                      </p>
                    )}
                  </div>

                  <ul className="mt-5 flex flex-1 flex-col gap-2">
                    {featuredTier?.highlights.slice(0, 4).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-[14px] text-ink-700 dark:text-ink-200">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={cn(
                      "mt-6 flex items-center justify-between border-t pt-5",
                      "border-rule-soft dark:border-ink-700",
                    )}
                  >
                    <Link
                      href={`/services/${s.slug}`}
                      className={cn(
                        "group/link inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-bold text-ink-900 ring-1 ring-inset transition hover:bg-cream dark:text-white",
                        "ring-rule dark:ring-ink-700",
                      )}
                    >
                      {isHe ? "פרטים" : "Details"}
                      <ArrowLeft className="arrow-nudge h-3.5 w-3.5 flip-x" />
                    </Link>
                    <a
                      href={whatsappLink(copy.whatsappMessage)}
                      target="_blank"
                      rel="noopener"
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full bg-teal-700 px-3.5 py-1.5 text-[13px] font-bold text-white transition hover:bg-teal-800",
                        ACCENT_RING[s.accent] ?? "",
                      )}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      {isHe ? "בקשה" : "Ask"}
                    </a>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-14">
          <h3 className="text-center text-xl font-extrabold text-ink-950 md:text-2xl dark:text-white">
            {isHe ? "שאלות נפוצות על המחירון" : "Pricing FAQ"}
          </h3>
          <div className="mx-auto mt-6 max-w-3xl">
            <Accordion>
              <AccordionItem
                id="p1"
                question={isHe ? "המחירים כוללים מע״מ?" : "Do prices include VAT?"}
              >
                {isHe
                  ? "לא. כל המחירים ללא מע״מ. תוספת 17% במסגרת חשבונית לעוסק מורשה."
                  : "No. Prices exclude VAT. A 17% VAT is added on invoices for licensed businesses in Israel."}
              </AccordionItem>
              <AccordionItem
                id="p2"
                question={isHe ? "מה העלויות החודשיות הנוספות?" : "What ongoing monthly costs should I expect?"}
              >
                {isHe
                  ? "עלויות צד ג׳: WhatsApp Business API (100–500 ₪ לחודש תלוי בנפח), טוקני AI (50–300 ₪ לחודש), ואחסון. אתם משלמים ישירות לספקים — אין מרווח מצידנו."
                  : "Third-party costs: WhatsApp Business API (₪100–500/mo depending on volume), AI tokens (₪50–300/mo), and hosting. Paid directly to providers — no markup from us."}
              </AccordionItem>
              <AccordionItem
                id="p3"
                question={isHe ? "האם אפשר לשלם בתשלומים?" : "Can I pay in installments?"}
              >
                {isHe
                  ? "כן. עד 3 תשלומים ללא ריבית. לחברות — הסדרי תשלום גמישים לפי מסלול."
                  : "Yes — up to 3 interest-free installments. Enterprise: flexible payment terms per engagement."}
              </AccordionItem>
              <AccordionItem
                id="p4"
                question={isHe ? "מה כולל מחיר ההקמה?" : "What does the setup price include?"}
              >
                {isHe
                  ? "אפיון, בנייה, אינטגרציות, בדיקות, השקה, ו-14 יום של ליווי מלא אחרי השקה. אחרי — ליווי חודשי ברמת SLA, אם רוצים."
                  : "Scoping, build, integrations, QA, launch, and 14 days of hand-on support post-launch. After that: optional monthly SLA support."}
              </AccordionItem>
              <AccordionItem
                id="p5"
                question={isHe ? "מה קורה אם לא מרוצים?" : "What if I'm not happy?"}
              >
                {isHe
                  ? "14 יום ראשונים — אם לא רואים ערך, מחזירים 100% מעלות ההקמה. הסיכון אצלנו, לא אצלכם."
                  : "First 14 days: if you see no value, we refund 100% of the setup cost. Risk sits with us, not you."}
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[32px] bg-ink-950 p-8 text-white md:p-12">
          <div className="pointer-events-none absolute -top-24 -end-24 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl" aria-hidden />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <Badge variant="dark" size="xs">
                {isHe ? "הצעה מותאמת" : "Custom quote"}
              </Badge>
              <h3 className="mt-3 text-3xl font-extrabold">
                {isHe
                  ? "לא רואים את המסלול המתאים?"
                  : "Don't see the right plan?"}
              </h3>
              <p className="mt-3 text-ink-200">
                {isHe
                  ? "30 דקות שיחה — מקבלים הצעה מדויקת עם ROI צפוי, בלי התחייבות."
                  : "30 minutes on a call — you leave with a precise quote and projected ROI, zero commitment."}
              </p>
            </div>
            <Magnetic strength={0.16}>
              <a
                href={whatsappLink(
                  isHe
                    ? "רוצה הצעת מחיר מותאמת לעסק שלי"
                    : "I'd like a tailored quote for my business",
                )}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink-950 shadow-glow-teal transition hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" />
                {isHe ? "בקשו הצעה" : "Request a quote"}
              </a>
            </Magnetic>
          </div>
        </div>
      </Container>
    </section>
  );
}
