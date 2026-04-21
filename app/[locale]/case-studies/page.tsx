import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/routing";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";
  return {
    title: isHe ? "סיפורי הצלחה — תוצאות אמיתיות" : "Case studies — real results",
    description: isHe
      ? "איך עסקים ישראלים משתמשים באוטומציה ו-AI להגדיל מכירות ולחסוך שעות."
      : "How Israeli businesses use automation and AI to grow sales and save hours.",
  };
}

const cases = [
  {
    slug: "nadlanist-ai",
    he: { title: "Nadlanist AI — פלטפורמה שמסקרטטת את שוק הנדל״ן", subtitle: "All-in-One AI למתווכים ולמכירת נכסים בישראל.", industry: "נדל״ן", metric: "4×", metricLabel: "תגובה ללידים" },
    en: { title: "Nadlanist AI — a platform rewriting real estate", subtitle: "All-in-One AI for Israeli brokers and property sales.", industry: "Real Estate", metric: "4×", metricLabel: "Lead reply rate" },
  },
];

export default async function CaseStudiesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";
  return (
    <>
      <section className="relative overflow-hidden bg-hero-light pb-10 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-b" aria-hidden />
        <Container className="relative">
          <Reveal>
            <Eyebrow>{isHe ? "סיפורי הצלחה" : "Case studies"}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold text-balance md:text-6xl">
              {isHe ? (
                <>תוצאות אמיתיות. <span className="text-gradient-brand">מספרים אמיתיים.</span></>
              ) : (
                <>Real results. <span className="text-gradient-brand">Real numbers.</span></>
              )}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-500">
              {isHe ? "לא שיווק — מה באמת קרה כשעסקים ישראלים עברו לאוטומציה וסוכני AI." : "Not marketing — what actually happened when Israeli businesses switched."}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={isHe ? "פרויקטים נבחרים" : "Selected work"}
              title={isHe ? "מה בנינו ולמה זה עובד" : "What we built and why it works"}
            />
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => {
              const copy = isHe ? c.he : c.en;
              return (
                <StaggerItem key={c.slug}>
                  <Link href={`/case-studies/${c.slug}`} className="group block h-full rounded-3xl bg-white p-6 ring-1 ring-inset ring-rule transition hover:-translate-y-1 hover:shadow-card hover:ring-teal-200">
                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-teal-700 ring-1 ring-inset ring-teal-100">
                      {copy.industry}
                    </span>
                    <h3 className="mt-4 text-2xl font-extrabold text-ink-950">{copy.title}</h3>
                    <p className="mt-2 text-sm text-ink-500">{copy.subtitle}</p>
                    <div className="mt-6 flex items-end justify-between pt-6">
                      <div>
                        <p className="font-display text-4xl font-extrabold text-gradient-brand">{copy.metric}</p>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{copy.metricLabel}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-teal-700 group-hover:translate-x-[-2px] transition-transform">
                        {isHe ? "לסיפור המלא" : "Full story"} <ArrowLeft className="h-4 w-4 flip-x" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}

            <StaggerItem>
              <div className="h-full rounded-3xl border-2 border-dashed border-rule bg-white p-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink-500 ring-1 ring-inset ring-rule">
                  {isHe ? "בקרוב" : "Soon"}
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-ink-950">
                  {isHe ? "הפרויקט הבא — שלך?" : "The next case — yours?"}
                </h3>
                <p className="mt-2 text-sm text-ink-500">
                  {isHe ? "אנחנו בונים את דור ה-Case Studies הבא. רוצה להיות הלקוח שכולם מדברים עליו?" : "We're building the next case studies. Want to be the client everyone talks about?"}
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </Container>
      </section>

      <FinalCTA isHe={isHe} />
    </>
  );
}
