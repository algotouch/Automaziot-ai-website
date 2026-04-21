import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { BookOpen } from "lucide-react";
import { definedTermSetSchema } from "@/lib/jsonld";
import { bilingualLanguages, localePath } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";
  return {
    title: isHe ? "מילון מונחים — AI ואוטומציה" : "Glossary — AI & automation",
    description: isHe ? "הכל על AI, אוטומציה, סוכנים ו-n8n — בשפה פשוטה." : "AI, automation, agents and n8n — explained simply.",
    alternates: {
      canonical: localePath(locale, "/glossary"),
      languages: bilingualLanguages("/glossary"),
    },
  };
}

type Term = {
  id: string;
  term: { he: string; en: string };
  def: { he: string; en: string };
  related?: string[];
};

const terms: Term[] = [
  { id: "agent", term: { he: "סוכן AI (AI Agent)", en: "AI Agent" }, def: { he: "תוכנה חכמה שמקבלת מטרה, מחליטה אילו פעולות לנקוט כדי להשיג אותה, ומבצעת אותן — כולל שימוש ב-APIs, מאגרי מידע ושיחה עם משתמשים. זה לא צ׳אטבוט: זה עובד דיגיטלי.", en: "Software given a goal, that decides what actions to take to reach it and executes them — calling APIs, querying databases, and talking to users. Not a chatbot: a digital worker." }, related: ["llm", "n8n"] },
  { id: "llm", term: { he: "LLM (Large Language Model)", en: "LLM (Large Language Model)" }, def: { he: "מודל שפה גדול כמו GPT, Claude, או Gemini. הבסיס לסוכני AI — הוא מבין שפה טבעית, כותב תשובות, ומקבל החלטות.", en: "A large language model like GPT, Claude, or Gemini. The backbone for AI agents — understands natural language, writes replies, and makes decisions." }, related: ["agent", "token"] },
  { id: "n8n", term: { he: "n8n", en: "n8n" }, def: { he: "פלטפורמת אוטומציה בקוד פתוח. מאפשרת לחבר מאות מערכות עם זרימות עבודה ויזואליות, ולהשתמש ב-AI בנקודות המפתח. התשתית המרכזית שלנו — שלך בבעלות.", en: "An open-source automation platform. Connects hundreds of systems via visual workflows, with AI plugged in at key decision points. Our core stack — fully yours to own." }, related: ["webhook", "rpa"] },
  { id: "whatsapp-api", term: { he: "WhatsApp Business API", en: "WhatsApp Business API" }, def: { he: "הממשק הרשמי של Meta לחיבור מערכות ל-WhatsApp. נדרש לסוכן וואטסאפ אמיתי (להבדיל מ-WhatsApp Business App שהוא ידני).", en: "Meta's official API for connecting systems to WhatsApp. Required for real WhatsApp agents (vs. the manual WhatsApp Business app)." }, related: ["agent", "webhook"] },
  { id: "crm", term: { he: "CRM", en: "CRM" }, def: { he: "Customer Relationship Management — מערכת לניהול כל התקשורת עם לקוחות: לידים, היסטוריה, עסקאות, משימות. דוגמאות: Zoho, HubSpot, Monday, Pipedrive, Salesforce.", en: "Customer Relationship Management — a system managing all customer communication: leads, history, deals, tasks. Examples: Zoho, HubSpot, Monday, Pipedrive, Salesforce." }, related: ["icp", "roi"] },
  { id: "rpa", term: { he: "RPA (Robotic Process Automation)", en: "RPA (Robotic Process Automation)" }, def: { he: "אוטומציה של משימות חוזרות שמישהו עושה על מסך — כמו קליק, העתקה, הדבקה. רלוונטי כשאין API.", en: "Automation of repetitive on-screen tasks — clicking, copying, pasting. Relevant when there's no API." }, related: ["n8n", "webhook"] },
  { id: "roi", term: { he: "ROI", en: "ROI (Return on Investment)" }, def: { he: "החזר השקעה — כמה זמן עד שמה שהשקעת חוזר אליך באמצעות חיסכון או הכנסה חדשה. ROI ממוצע לפרויקט אוטומציה: 3-6 חודשים.", en: "Return on Investment — how long before what you invested comes back as savings or new revenue. Average ROI on automation: 3–6 months." }, related: ["crm"] },
  { id: "icp", term: { he: "ICP (Ideal Customer Profile)", en: "ICP (Ideal Customer Profile)" }, def: { he: "הפרופיל של הלקוח האידיאלי — תעשייה, גודל, תקציב, מיקום. בסיס לסינון לידים חכם.", en: "The profile of your ideal customer — industry, size, budget, location. The basis for smart lead filtering." }, related: ["crm", "roi"] },
  { id: "webhook", term: { he: "Webhook", en: "Webhook" }, def: { he: "צורת ״דחיפה״ בין מערכות: מערכת א׳ שולחת אוטומטית למערכת ב׳ ברגע שקורה משהו. מפתח בבניית אוטומציות מבוססות אירועים.", en: "A system-to-system 'push': system A auto-calls system B the moment something happens. Key for event-driven automation." }, related: ["n8n", "whatsapp-api"] },
  { id: "token", term: { he: "Token (טוקן AI)", en: "Token (AI)" }, def: { he: "יחידת חיוב בחלק ממודלי ה-AI. משפט ממוצע הוא בערך 20–30 טוקנים. עלות לטוקן נמוכה מאוד (שברירי אגורות), אבל בנפחים זה מצטבר.", en: "A billing unit for many AI models. An average sentence is ~20–30 tokens. Per-token cost is tiny, but volume adds up." }, related: ["llm", "agent"] },
];

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";

  const ld = definedTermSetSchema({
    name: isHe ? "מילון מונחים — AI ואוטומציה" : "AI & Automation Glossary",
    url: localePath(locale, "/glossary"),
    locale,
    terms: terms.map((t) => ({
      id: t.id,
      term: isHe ? t.term.he : t.term.en,
      definition: isHe ? t.def.he : t.def.en,
      related: t.related,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <section className="relative overflow-hidden bg-hero-light pb-10 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-b" aria-hidden />
        <Container className="relative">
          <Reveal>
            <Eyebrow>{isHe ? "מילון מונחים" : "Glossary"}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold text-balance md:text-6xl">
              {isHe ? (
                <>ה-AI והאוטומציה <span className="text-gradient-brand">בשפה בן-אדמית.</span></>
              ) : (
                <>AI &amp; automation <span className="text-gradient-brand">in plain English.</span></>
              )}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              {isHe ? "מדריך קצר למונחים שתשמע בשוק. אם זה לא כאן — שאל אותנו." : "A short guide to the terms you'll hear. Missing something? Ask us."}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl bg-surface p-5 ring-1 ring-inset ring-rule">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
                  <BookOpen className="h-3.5 w-3.5" />
                  {isHe ? "מונחים" : "Terms"}
                </p>
                <ol className="mt-3 space-y-1.5 text-[13.5px]">
                  {terms.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="block rounded-md px-2 py-1 text-ink-500 transition hover:bg-cream hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
                      >
                        {isHe ? t.term.he : t.term.en}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div>
              <Reveal>
                <SectionHeading
                  eyebrow={isHe ? "מונחים נפוצים" : "Common terms"}
                  title={isHe ? "10 מונחים שכדאי להכיר לפני פגישה" : "10 terms to know before the meeting"}
                />
              </Reveal>
              <Stagger className="mt-10 grid gap-4">
                {terms.map((t) => (
                  <StaggerItem key={t.id}>
                    <article
                      id={t.id}
                      className="scroll-mt-28 rounded-3xl bg-surface p-6 ring-1 ring-inset ring-rule transition hover:ring-teal-200 md:p-7 dark:hover:ring-teal-500/30"
                    >
                      <header className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-xl font-extrabold text-ink-950 dark:text-white">
                          {isHe ? t.term.he : t.term.en}
                        </h3>
                        <a
                          href={`#${t.id}`}
                          className="text-[11px] font-semibold text-ink-400 hover:text-teal-700 dark:hover:text-teal-300"
                          aria-label={`Direct link to ${t.id}`}
                        >
                          #{t.id}
                        </a>
                      </header>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted">
                        {isHe ? t.def.he : t.def.en}
                      </p>
                      {t.related && t.related.length > 0 && (
                        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-rule-soft pt-4 dark:border-ink-700">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                            {isHe ? "קשור" : "Related"}
                          </span>
                          {t.related.map((r) => {
                            const rel = terms.find((x) => x.id === r);
                            if (!rel) return null;
                            return (
                              <a key={r} href={`#${r}`} className="no-underline">
                                <Badge variant="teal" size="sm">
                                  {isHe ? rel.term.he : rel.term.en}
                                </Badge>
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
