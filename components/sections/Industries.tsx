"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Building2, Stethoscope, ShoppingBag, GraduationCap, Scale, Home, Sparkles, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "all" | "b2b" | "retail" | "services" | "health";

type Industry = {
  key: string;
  icon: typeof Home;
  title: string;
  body: string;
  cats: Category[];
  stats: { label: string; value: string }[];
};

export function Industries({ isHe }: { isHe: boolean }) {
  const [cat, setCat] = useState<Category>("all");

  const all: Industry[] = isHe
    ? [
        { key: "re", icon: Home, title: "נדל״ן", body: "מתווכים, יזמי נדל״ן, מנהלי נכסים — סוכן AI ללידים, תיאום סיורים וחתימת חוזים.", cats: ["services"], stats: [{ label: "זמן תגובה", value: "< 8 שניות" }, { label: "עסקאות שזזו", value: "₪34M+" }] },
        { key: "med", icon: Stethoscope, title: "קליניקות רפואיות", body: "זימון תורים ב-WhatsApp, תזכורות חכמות, מילוי טפסים אוטומטי לפני הפגישה.", cats: ["health"], stats: [{ label: "ביטולי רגע-אחרון", value: "-60%" }, { label: "לקוחות ששילמו מראש", value: "×2.4" }] },
        { key: "retail", icon: ShoppingBag, title: "קמעונאות ומותגים", body: "עגלות נטושות חוזרות, שירות 24/7, סנכרון מלאי בין Shopify/פייסבוק/אינסטגרם.", cats: ["retail"], stats: [{ label: "נטישת עגלה", value: "-18%" }, { label: "AOV", value: "+9%" }] },
        { key: "pro", icon: Scale, title: "שירותים מקצועיים", body: "עורכי דין, רואי חשבון, יועצים — ניהול פניות, לקוח-שיחה-חשבונית בזרימה אחת.", cats: ["services", "b2b"], stats: [{ label: "שעות ניהול בשבוע", value: "-12" }, { label: "חשבוניות שאיחרו", value: "-70%" }] },
        { key: "edu", icon: GraduationCap, title: "חינוך והדרכה", body: "רישום לקורסים, תזכורות, שירות לקוחות לתלמידים — בעברית, 24/7.", cats: ["services"], stats: [{ label: "שיעור המרה", value: "+22%" }, { label: "תשובות < 1 דקה", value: "24/7" }] },
        { key: "b2b", icon: Building2, title: "B2B ושירות ארגוני", body: "Sales automation מלא, RevOps, דוחות ניהולים וחיבור בין כל המחלקות.", cats: ["b2b"], stats: [{ label: "מחזור מכירה", value: "-25%" }, { label: "שיחות מוקלטות", value: "+37%" }] },
        { key: "bf", icon: Sparkles, title: "יופי וכושר", body: "סלונים, סטודיו לכושר, מטפלים — קביעת תורים, מקדמות, מניעת no-show.", cats: ["retail", "services"], stats: [{ label: "no-show", value: "-40%" }, { label: "הכנסה ללקוח", value: "+18%" }] },
        { key: "svc", icon: Wrench, title: "שירות ותחזוקה", body: "חברות שירות, טכנאים, אינסטלטורים — פתיחת קריאות, ניתוב, תיעוד, תשלום.", cats: ["services"], stats: [{ label: "זמן סגירת קריאה", value: "-35%" }, { label: "דירוג לקוח", value: "4.9★" }] },
      ]
    : [
        { key: "re", icon: Home, title: "Real Estate", body: "Brokers, developers, property managers — AI lead agent, tours, contract flows.", cats: ["services"], stats: [{ label: "Response time", value: "< 8s" }, { label: "Deals moved", value: "₪34M+" }] },
        { key: "med", icon: Stethoscope, title: "Medical Clinics", body: "WhatsApp booking, smart reminders, pre-visit form filling.", cats: ["health"], stats: [{ label: "Last-min cancellations", value: "-60%" }, { label: "Pre-paid bookings", value: "×2.4" }] },
        { key: "retail", icon: ShoppingBag, title: "Retail & D2C", body: "Abandoned-cart recovery, 24/7 service, multi-channel inventory sync.", cats: ["retail"], stats: [{ label: "Cart abandonment", value: "-18%" }, { label: "AOV", value: "+9%" }] },
        { key: "pro", icon: Scale, title: "Professional Services", body: "Lawyers, accountants, consultants — intake → call → invoice, one flow.", cats: ["services", "b2b"], stats: [{ label: "Admin hrs/week", value: "-12" }, { label: "Late invoices", value: "-70%" }] },
        { key: "edu", icon: GraduationCap, title: "Education", body: "Course enrollment, reminders, student support — 24/7 in Hebrew.", cats: ["services"], stats: [{ label: "Conversion rate", value: "+22%" }, { label: "< 1m replies", value: "24/7" }] },
        { key: "b2b", icon: Building2, title: "B2B & Enterprise", body: "Sales automation, RevOps, management reporting, cross-department glue.", cats: ["b2b"], stats: [{ label: "Sales cycle", value: "-25%" }, { label: "Calls logged", value: "+37%" }] },
        { key: "bf", icon: Sparkles, title: "Beauty & Fitness", body: "Salons, studios, therapists — booking, deposits, no-show prevention.", cats: ["retail", "services"], stats: [{ label: "No-shows", value: "-40%" }, { label: "Revenue/client", value: "+18%" }] },
        { key: "svc", icon: Wrench, title: "Service & Maintenance", body: "Service companies, technicians — tickets, routing, logging, payments.", cats: ["services"], stats: [{ label: "Time-to-resolve", value: "-35%" }, { label: "CSAT", value: "4.9★" }] },
      ];

  const chips: { value: Category; label: string }[] = isHe
    ? [
        { value: "all", label: "הכל" },
        { value: "b2b", label: "B2B" },
        { value: "retail", label: "קמעונאות" },
        { value: "services", label: "שירותים" },
        { value: "health", label: "בריאות" },
      ]
    : [
        { value: "all", label: "All" },
        { value: "b2b", label: "B2B" },
        { value: "retail", label: "Retail" },
        { value: "services", label: "Services" },
        { value: "health", label: "Health" },
      ];

  const items = cat === "all" ? all : all.filter((i) => i.cats.includes(cat));

  return (
    <section className="relative bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={isHe ? "תעשיות" : "Industries"}
            title={
              isHe ? (
                <>
                  אם העסק שלך מרוויח <br />
                  <span className="text-gradient-brand">משיחה אחת טובה — זה בשבילך.</span>
                </>
              ) : (
                <>
                  If your business wins <br />
                  <span className="text-gradient-brand">on one good conversation — this is for you.</span>
                </>
              )
            }
            lead={
              isHe
                ? "אלה התחומים שבהם כבר ראינו תוצאות. אם אתה לא כאן — כנראה שעדיין מתאים."
                : "These are where we've already seen results. If you're not listed — probably still a fit."
            }
          />
        </Reveal>

        <div className="mt-10 inline-flex flex-wrap items-center gap-1 rounded-full bg-cream p-1 ring-1 ring-inset ring-rule-soft dark:bg-ink-800 dark:ring-ink-700">
          {chips.map((c) => {
            const active = cat === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setCat(c.value)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors",
                  active ? "text-ink-950 dark:text-white" : "text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="industry-chip"
                    className="absolute inset-0 -z-10 rounded-full bg-surface ring-1 ring-inset ring-rule dark:bg-ink-900 dark:ring-ink-700"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i, idx) => (
            <motion.div
              layout
              key={i.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-full overflow-hidden rounded-2xl bg-surface p-6 ring-1 ring-inset ring-rule transition card-hover-border"
            >
              <div className="pointer-events-none absolute -end-8 -top-8 h-24 w-24 rounded-full bg-teal-100/0 blur-2xl transition-colors duration-500 group-hover:bg-teal-100/60 dark:group-hover:bg-teal-500/10" />
              <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg] dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/30">
                <i.icon className="h-5 w-5" />
              </div>
              <h3 className="relative mt-4 text-base font-extrabold text-ink-950 dark:text-white">{i.title}</h3>
              <p className="relative mt-1.5 text-[13.5px] leading-relaxed text-muted">{i.body}</p>

              <div className="relative mt-4 grid grid-cols-2 gap-2 border-t border-rule-soft pt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:border-ink-700">
                {i.stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">
                      {s.label}
                    </p>
                    <p className="mt-0.5 text-sm font-extrabold text-teal-700 dark:text-teal-300">{s.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
