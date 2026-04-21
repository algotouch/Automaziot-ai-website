import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { whatsappLink } from "@/lib/whatsapp";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Timeline } from "@/components/case/Timeline";
import { BeforeAfter } from "@/components/case/BeforeAfter";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, ExternalLink, Newspaper } from "lucide-react";
import { NEWS } from "@/content/news";
import { articleSchema, breadcrumbSchema, FOUNDER } from "@/lib/jsonld";
import { bilingualLanguages, localePath } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";
  return {
    title: isHe ? "Nadlanist AI — סיפור הצלחה" : "Nadlanist AI — case study",
    description: isHe ? "איך בנינו את הפלטפורמה שמשנה את שוק הנדל״ן הישראלי." : "How we built the platform reshaping Israeli real estate.",
    alternates: {
      canonical: localePath(locale, "/case-studies/nadlanist-ai"),
      languages: bilingualLanguages("/case-studies/nadlanist-ai"),
    },
    openGraph: {
      type: "article",
      url: `https://www.automaziot.ai${localePath(locale, "/case-studies/nadlanist-ai")}`,
      title: isHe ? "Nadlanist AI — סיפור הצלחה" : "Nadlanist AI — case study",
      description: isHe ? "איך בנינו את הפלטפורמה שמשנה את שוק הנדל״ן הישראלי." : "How we built the platform reshaping Israeli real estate.",
    },
  };
}

const CASE_STUDY_PUBLISHED = "2026-02-01";
const CASE_STUDY_UPDATED = "2026-04-21";

export default async function NadlanistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";

  const caseStudyTitle = isHe ? "Nadlanist AI — סיפור הצלחה" : "Nadlanist AI — case study";
  const caseStudyDesc = isHe
    ? "איך בנינו את הפלטפורמה שמשנה את שוק הנדל״ן הישראלי — 4× שיעור תגובה, זמן תגובה <30 שניות, כיסוי בוואלה, ICE ומעריב."
    : "How we built the platform reshaping Israeli real estate — 4× reply rate, <30s response time, press coverage in Walla, ICE and Maariv.";

  const article = articleSchema({
    title: caseStudyTitle,
    description: caseStudyDesc,
    url: localePath(locale, "/case-studies/nadlanist-ai"),
    datePublished: CASE_STUDY_PUBLISHED,
    dateModified: CASE_STUDY_UPDATED,
    author: { name: FOUNDER.name, url: FOUNDER.linkedin },
    locale,
    citation: NEWS.map((n) => ({
      name: isHe ? n.titleHe : n.titleEn,
      url: n.url,
      publisher: isHe ? n.sourceHe : n.source,
    })),
  });
  const bc = breadcrumbSchema([
    { name: isHe ? "בית" : "Home", url: localePath(locale, "/") },
    { name: isHe ? "סיפורי הצלחה" : "Case studies", url: localePath(locale, "/case-studies") },
    { name: "Nadlanist AI", url: localePath(locale, "/case-studies/nadlanist-ai") },
  ]);

  const stats = [
    { v: "4×", l: isHe ? "שיעור תגובה ללידים" : "Lead reply rate" },
    { v: "−82%", l: isHe ? "זמן תגובה ממוצע" : "Avg response time" },
    { v: "0", l: isHe ? "לידים שנשכחו" : "Leads forgotten" },
    { v: "24/7", l: isHe ? "קליטה וטיפול" : "24/7 ingestion" },
  ];

  const capabilities = isHe
    ? [
        { t: "סוכן AI חכם לניהול לקוחות", d: "סוכן AI שמנהל שיחות, מבין הקשר, מתחבר למאגרי מידע, ומבצע פעולות מורכבות — ממש כמו עובד מומחה." },
        { t: "קליטת לידים מיידית מהאתר", d: "מערכת אוטומטית שמקבלת כל ליד, בודקת אותו, מתעדת אותו ב-CRM ושולחת הודעה ראשונית תוך שניות." },
        { t: "מערכת פולואפ אוטומטית", d: "הודעות מעקב מותאמות אישית ללקוחות בזמנים קבועים, כדי שאף לקוח לא יישכח." },
        { t: "סיכום מנהלים יומי מבוסס AI", d: "דוח יומי שמרכז את כל נתוני העסק, מנתח שיחות ומזהה הזדמנויות או בעיות באופן אוטומטי." },
      ]
    : [
        { t: "Smart AI customer management agent", d: "An agent that runs conversations, understands context, hits databases, and executes complex actions." },
        { t: "Instant lead ingestion from the site", d: "Every lead captured, qualified, logged to CRM, and hit with a first message within seconds." },
        { t: "Automated follow-up system", d: "Personalized follow-ups at the right intervals, so no lead falls through." },
        { t: "AI-powered daily executive digest", d: "A daily report that aggregates data, analyzes conversations, and flags opportunities or issues." },
      ];

  const press = [
    { name: "Walla Nadlan", he: "וואלה נדל״ן", q: isHe ? "הסוף לעמלת התיווך? יזם ישראלי מצהיר: ׳המודל הנוכחי גוסס׳" : "Is the brokerage commission dying?" },
    { name: "ICE", he: "ICE", q: isHe ? "האם ה-AI יחליף את מתווכי הנדל״ן ומה תהיה העמלה?" : "Will AI replace brokers?" },
    { name: "Maariv", he: "מעריב", q: isHe ? "מהפכת נדל״ן: מה שווייז עשתה לנהיגה — ChatGPT עושה לגוגל" : "A real-estate revolution" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }}
      />
      <section className="relative overflow-hidden bg-hero-light pb-16 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-b" aria-hidden />
        <div className="pointer-events-none absolute -end-40 -top-20 h-[420px] w-[420px] rounded-full bg-teal-100/60 blur-3xl" aria-hidden />
        <Container className="relative">
          <div className="mb-8 flex items-center gap-2 text-sm text-ink-400">
            <Link href="/case-studies" className="hover:text-ink-950">{isHe ? "סיפורי הצלחה" : "Case studies"}</Link>
            <ArrowLeft className="h-3.5 w-3.5 flip-x opacity-60" />
            <span className="text-ink-800">Nadlanist AI</span>
          </div>
          <Reveal>
            <Eyebrow>{isHe ? "פרויקט הדגל" : "Flagship project"}</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold leading-[1.05] text-balance">
              {isHe ? (
                <>Nadlanist AI — <span className="text-gradient-brand">שוק הנדל״ן, אוטומטי.</span></>
              ) : (
                <>Nadlanist AI — <span className="text-gradient-brand">real estate, on autopilot.</span></>
              )}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-ink-500">
              {isHe
                ? "בנינו מאפס פלטפורמת All-in-One לשוק הנדל״ן — סוכן AI חכם לניהול לקוחות, אוטומציות לליד-בעיצומו, ודאש-בורד יומי מבוסס AI. התוצאה: אלפי שעות שחזרו למתווכים, ותגובה לכל ליד תוך פחות מ-30 שניות."
                : "We built an end-to-end platform for real estate — smart customer-management agent, in-flight lead automations, and AI-powered daily dashboard. Thousands of hours returned, replies in under 30 seconds."}
            </p>
            <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
              {isHe ? "פורסם:" : "Published:"}{" "}
              <time dateTime={CASE_STUDY_PUBLISHED}>{CASE_STUDY_PUBLISHED}</time>
              {" · "}
              {isHe ? "עודכן:" : "Updated:"}{" "}
              <time dateTime={CASE_STUDY_UPDATED}>{CASE_STUDY_UPDATED}</time>
              {" · "}
              {isHe ? "מאת" : "By"} {FOUNDER.name}
            </p>
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.l}>
                <div className="rounded-2xl bg-surface p-4 ring-1 ring-inset ring-rule">
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-ink-500">{s.l}</dt>
                  <dd className="mt-1 font-display text-3xl font-extrabold text-ink-950 dark:text-white">{s.v}</dd>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="mt-5 max-w-3xl text-[12px] leading-relaxed text-ink-400">
            <strong className="font-semibold text-ink-500">
              {isHe ? "מתודולוגיה:" : "Methodology:"}
            </strong>{" "}
            {isHe
              ? "המדדים נאספו מטלמטריית Nadlanist AI בפרודקשן — השוואת Q1 2024 (בסיס ידני, לפני המערכת) מול Q1 2026 (לאחר השקה מלאה). מעל 2,000 שיחות לידים נספרו בתקופת המדידה. זמני תגובה כוללים חגים וחופשות. מחושב כממוצע משוקלל על פני כל החשבונות הפעילים."
              : "Metrics were collected from Nadlanist AI production telemetry — Q1 2024 baseline (manual, pre-system) vs. Q1 2026 (post-launch). Over 2,000 lead conversations counted during measurement. Response times include holidays and off-hours. Weighted average across all active accounts."}
          </p>

          <Reveal delay={0.3}>
            <div className="mt-12">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="teal" size="xs">
                  {isHe ? "לפני ואחרי" : "Before / after"}
                </Badge>
                <p className="text-[12px] text-muted">
                  {isHe ? "גררו להשוואת לפני/אחרי" : "Drag to compare before and after"}
                </p>
              </div>
              <BeforeAfter
                isHe={isHe}
                before={{
                  label: isHe ? "לפני Nadlanist AI" : "Before Nadlanist AI",
                  metric: isHe ? "4 שעות" : "4 hours",
                  note: isHe ? "זמן תגובה ממוצע לליד" : "Avg first-response time",
                }}
                after={{
                  label: isHe ? "אחרי Nadlanist AI" : "After Nadlanist AI",
                  metric: isHe ? "< 30 שניות" : "< 30 seconds",
                  note: isHe ? "עונה לכל ליד, 24/7" : "Every lead, 24/7",
                }}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-20 dark:bg-ink-900">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={isHe ? "ציר זמן" : "Timeline"}
              title={isHe ? "מהאפיון ועד ההשקה — 10 שבועות" : "From scope to launch — 10 weeks"}
              lead={
                isHe
                  ? "ארבעה שלבים, כל אחד עם תוצרים מוחשיים ונקודת החלטה."
                  : "Four phases, each with concrete deliverables and a decision gate."
              }
            />
          </Reveal>
          <Timeline
            isHe={isHe}
            items={
              isHe
                ? [
                    { when: "שבוע 1–2", title: "מיפוי ואפיון", body: "ראיונות עם מתווכים, מיפוי תהליכי מכירה, הגדרת מדדי הצלחה." },
                    { when: "שבוע 3–5", title: "בנייה ואינטגרציות", body: "פיתוח הסוכן, חיבור WhatsApp Business, CRM, יומנים וטפסים." },
                    { when: "שבוע 6–8", title: "בדיקות סמויות", body: "200+ שיחות בדיקה, כיוון עדין של התנהגות, קווים אדומים ומעבר לאדם." },
                    { when: "שבוע 9–10", title: "השקה והתאמות", body: "הפעלה הדרגתית, ניטור יומי, שיפורים מיידיים לפי פידבק אמיתי." },
                  ]
                : [
                    { when: "Weeks 1–2", title: "Scope & discovery", body: "Broker interviews, sales-process mapping, success metric definition." },
                    { when: "Weeks 3–5", title: "Build & integrations", body: "Agent build, WhatsApp Business + CRM + calendar + form integrations." },
                    { when: "Weeks 6–8", title: "Stealth testing", body: "200+ sandbox conversations, behavior tuning, red-line & human-handoff rules." },
                    { when: "Weeks 9–10", title: "Launch & tune", body: "Staged rollout, daily monitoring, live tuning from real feedback." },
                  ]
            }
          />
        </Container>
      </section>

      <section className="bg-paper py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeading
                  eyebrow={isHe ? "האתגר" : "The challenge"}
                  title={isHe ? "מתווכים טובעים בזמן שהשוק דורש מהירות" : "Brokers drowning while the market demands speed"}
                />
                <p className="mt-4 text-ink-500">
                  {isHe
                    ? "ענף הנדל״ן בישראל שמרני, ידני ואיטי. מתווך טוב עובד 10–12 שעות ביום, ועדיין מפספס לידים. הקונים מצפים לתגובה תוך דקות, אבל מתווך ממוצע עונה תוך 4–6 שעות. הפער הזה הוא כסף שחמק החוצה."
                    : "Israeli real estate is conservative, manual, slow. A good broker works 10–12 hour days and still loses leads. Buyers expect answers in minutes; the average broker replies in 4–6 hours. That gap is leaked revenue."}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <SectionHeading
                  className="mt-12"
                  eyebrow={isHe ? "הפתרון" : "The solution"}
                  title={isHe ? "פלטפורמה שמחליפה 4 כלים, 3 תהליכים, 12 שעות ביום" : "A platform replacing 4 tools, 3 processes, 12 hours a day"}
                />
              </Reveal>
              <Stagger className="mt-6 grid gap-4 md:grid-cols-2">
                {capabilities.map((c) => (
                  <StaggerItem key={c.t}>
                    <div className="h-full rounded-3xl bg-surface p-6 ring-1 ring-inset ring-rule transition hover:-translate-y-0.5 hover:shadow-card hover:ring-teal-200 dark:hover:ring-teal-500/30">
                      <h3 className="text-base font-extrabold text-ink-950 dark:text-white">{c.t}</h3>
                      <p className="mt-2 text-sm text-muted">{c.d}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.12}>
                <SectionHeading
                  className="mt-12"
                  eyebrow={isHe ? "התוצאות" : "Outcomes"}
                  title={isHe ? "הנתונים מדברים" : "The numbers speak"}
                />
                <ul className="mt-4 space-y-3 text-ink-800">
                  {(isHe
                    ? [
                        "זמן תגובה ממוצע לליד חדש: מ-4 שעות ל-<30 שניות (−99.8%)",
                        "שיעור תגובה של לקוחות להודעות מעקב: פי 4 גבוה יותר",
                        "אלפי שעות שחזרו למתווכים בחודש",
                        "דוחות יומיים שהופכים החלטות עסקיות — לבסיס נתוני",
                      ]
                    : [
                        "Avg first-response time: 4h → <30s (−99.8%)",
                        "Reply rate to follow-up messages: 4× higher",
                        "Thousands of hours returned to brokers every month",
                        "Daily reports that shifted decisions from gut to data",
                      ]
                  ).map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-24 space-y-5">
                <Reveal delay={0.1}>
                  <div className="rounded-3xl bg-surface p-6 ring-1 ring-inset ring-rule">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-500">
                      <Newspaper className="h-3.5 w-3.5 text-teal-600 dark:text-teal-300" />
                      {isHe ? "כיסוי תקשורתי" : "Press coverage"}
                    </p>
                    <ul className="mt-4 space-y-4">
                      {press.map((p) => (
                        <li key={p.name} className="group rounded-2xl border border-transparent p-3 -mx-3 transition hover:border-rule hover:bg-cream dark:hover:bg-ink-800">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300">
                            {isHe ? p.he : p.name}
                          </p>
                          <p className="mt-1 text-sm text-ink-800 dark:text-ink-100">״{p.q}״</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="rounded-3xl bg-ink-950 p-6 text-white shadow-card">
                    <h3 className="text-lg font-extrabold">
                      {isHe ? "רוצה אחד כזה לעסק שלך?" : "Want one like this?"}
                    </h3>
                    <p className="mt-2 text-sm text-slate-200">
                      {isHe ? "כל הפתרונות שפיתחנו לנדלניסט ניתנים להתאמה לכל תחום עסקי." : "Every part of the Nadlanist stack is adaptable."}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button as="a" href={whatsappLink(isHe ? "רוצה מערכת דומה לנדלניסט" : "I want a Nadlanist-style system")} target="_blank" rel="noopener" variant="whatsapp">
                        {isHe ? "דברו איתנו" : "Talk to us"}
                      </Button>
                      <a href="https://www.nadlanist.ai" target="_blank" rel="noopener" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-5 text-[15px] font-semibold text-white ring-1 ring-inset ring-white/15 transition hover:bg-white/20">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Nadlanist.ai
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <FinalCTA isHe={isHe} />
    </>
  );
}
