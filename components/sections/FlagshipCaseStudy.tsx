"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { whatsappLink } from "@/lib/whatsapp";
import { Reveal, Stagger, StaggerItem, CountUp } from "@/components/ui/Reveal";
import { ArrowLeft, Newspaper } from "lucide-react";

export function FlagshipCaseStudy({ isHe }: { isHe: boolean }) {
  const press = [
    {
      name: "Walla Nadlan",
      he: "וואלה נדל״ן",
      quote: isHe
        ? "הסוף לעמלת התיווך? יזם ישראלי מצהיר: ׳המודל הנוכחי גוסס׳"
        : "Is the brokerage commission dying?",
    },
    {
      name: "ICE",
      he: "ICE",
      quote: isHe
        ? "האם ה-AI יחליף את מתווכי הנדל״ן ומה תהיה העמלה?"
        : "Will AI replace real estate brokers?",
    },
    {
      name: "Maariv",
      he: "מעריב",
      quote: isHe
        ? "מהפכת נדל״ן: מה שווייז עשתה לנהיגה — ChatGPT עושה לגוגל"
        : "Real estate revolution: what Waze did to driving, ChatGPT is doing to Google",
    },
  ];

  return (
    <section className="relative bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-ink-950 p-8 text-white shadow-card dark:bg-surface dark:text-ink-900 dark:ring-1 dark:ring-inset dark:ring-rule md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-line-grid opacity-[0.06]" aria-hidden />
            <div className="pointer-events-none absolute -end-32 -top-32 h-[420px] w-[420px] rounded-full bg-teal-500/20 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -start-20 bottom-0 h-80 w-80 rounded-full bg-teal-700/30 blur-3xl dark:bg-teal-500/20" aria-hidden />

            <div className="relative grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Eyebrow className="bg-white/10 text-teal-200 ring-white/10 dark:bg-teal-500/10 dark:text-teal-700 dark:ring-teal-500/25">
                  {isHe ? "פרויקט הדגל שלנו" : "Our flagship project"}
                </Eyebrow>
                <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.05] sm:text-4xl md:text-5xl">
                  {isHe ? (
                    <>
                      Nadlanist AI. <br />
                      <span className="text-gradient-brand">שוק הנדל״ן, אוטומטי.</span>
                    </>
                  ) : (
                    <>
                      Nadlanist AI. <br />
                      <span className="text-gradient-brand">Israeli real estate, on autopilot.</span>
                    </>
                  )}
                </h2>
                <p className="mt-5 max-w-xl text-[17px] text-slate-200 dark:text-ink-500 md:text-lg">
                  {isHe
                    ? "בנינו מאפס פלטפורמת All-in-One למתווכים: סוכן AI שמנהל לקוחות, קליטה אוטומטית של לידים, פולואפ מותאם אישית וסיכום מנהלים יומי מבוסס AI. אלפי שעות שחזרו לשוק. כיסוי תקשורתי בוואלה, ICE ומעריב."
                    : "We built an end-to-end platform for brokers: an AI customer-management agent, automated lead ingestion, personalized follow-ups and an AI-powered daily executive summary. Thousands of hours returned to the market."}
                </p>

                <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { v: "4×", l: isHe ? "שיעור תגובה" : "Reply rate" },
                    { v: "−82%", l: isHe ? "זמן תגובה" : "Response time" },
                    { v: "0", l: isHe ? "לידים אבודים" : "Leads lost" },
                    { v: "24/7", l: isHe ? "קליטה" : "Intake" },
                  ].map((s) => (
                    <StaggerItem key={s.l}>
                      <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-inset ring-white/10 dark:bg-teal-500/5 dark:ring-teal-500/20">
                        <dt className="text-[10px] font-semibold uppercase tracking-widest text-slate-300 dark:text-ink-500">{s.l}</dt>
                        <dd className="mt-1 font-display text-2xl font-extrabold text-white dark:text-ink-900 md:text-3xl">{s.v}</dd>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Button
                    as="a"
                    href={whatsappLink(
                      isHe
                        ? "רוצה פתרון דומה לנדלניסט לעסק שלי"
                        : "I want a Nadlanist-style system for my business",
                    )}
                    target="_blank"
                    rel="noopener"
                    variant="primary"
                    size="md"
                  >
                    {isHe ? "רוצה דומה לעסק שלי" : "I want one like this"}
                    <ArrowLeft className="h-4 w-4 flip-x" />
                  </Button>
                  <Link
                    href="/case-studies/nadlanist-ai"
                    className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-5 text-[15px] font-semibold text-white ring-1 ring-inset ring-white/15 transition hover:bg-white/15 dark:bg-teal-500/10 dark:text-ink-900 dark:ring-teal-500/25 dark:hover:bg-teal-500/15"
                  >
                    {isHe ? "קראו את הסיפור המלא" : "Read the full story"}
                  </Link>
                </div>

                <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-inset ring-white/10 dark:bg-teal-500/5 dark:ring-teal-500/20">
                  <span className="text-xs font-semibold uppercase tracking-widest text-teal-200 dark:text-teal-700">
                    {isHe ? "הכנסות שעובדו" : "Value moved"}
                  </span>
                  <span className="font-mono text-lg font-bold text-white dark:text-ink-900" dir="ltr">
                    ₪
                    <CountUp to={34} suffix="M+" duration={1.6} />
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10 backdrop-blur dark:bg-ink-100/60 dark:ring-rule">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-200 dark:text-teal-700">
                    <Newspaper className="h-3.5 w-3.5" />
                    {isHe ? "כיסוי תקשורתי" : "Press coverage"}
                  </div>
                  <ul className="divide-y divide-white/5 dark:divide-rule">
                    {press.map((p) => (
                      <li key={p.name} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                        <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-white/10 px-2 text-[11px] font-bold uppercase tracking-wider text-white dark:bg-teal-500/15 dark:text-ink-900">
                          {isHe ? p.he : p.name}
                        </span>
                        <p className="text-sm text-slate-200 dark:text-ink-500">{p.quote}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-4 text-xs text-slate-400 dark:text-ink-400">
                  {isHe
                    ? "הפתרונות שפיתחנו לנדלניסט ניתנים להתאמה לכל תחום עסקי."
                    : "Every part of Nadlanist is adaptable to any industry."}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
