"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Check } from "lucide-react";

export function HowItWorks({ isHe }: { isHe: boolean }) {
  const steps = isHe
    ? [
        {
          week: "שבוע 1",
          title: "לומדים את העסק",
          body: "סדנה אחת ממוקדת. מוצאים איפה דולפים הזמן והכסף. יוצאים עם KPIs ברורים.",
          deliver: ["מפת תהליכים אמיתית", "נקודות כשל וצווארי בקבוק", "יעדים מדידים לפרויקט"],
        },
        {
          week: "שבוע 2",
          title: "מתכננים את הפתרון",
          body: "עיצוב פתרון מדויק לפני שכותבים שורת קוד. שקוף, תמחיר סגור.",
          deliver: ["טכנולוגיה וכלים נבחרים", "זרימת עבודה חדשה מפורטת", "הצעת מחיר סופית"],
        },
        {
          week: "שבוע 3",
          title: "בונים ומחברים",
          body: "האוטומציות נבנות, מחוברות ל-CRM ולאתר, ונבדקות בתרחישי אמת לפני שמישהו רואה אותן חי.",
          deliver: ["סוכן AI פעיל בסביבת בדיקה", "אינטגרציה מלאה (CRM + WhatsApp)", "50+ שיחות סימולציה"],
        },
        {
          week: "שבוע 4+",
          title: "משיקים ולא עוזבים",
          body: "הפתרון עובר חי, הצוות עובר הדרכה. 14 יום של ניטור יומי כלול — כי ההבדל הוא בדקויות.",
          deliver: ["השקה חיה ומסודרת", "הדרכת צוות + חומרים", "14 יום ליווי יומי"],
        },
      ]
    : [
        { week: "Week 1", title: "Learn the business", body: "One focused workshop. We find where time and money leak. You leave with clear KPIs.", deliver: ["Real process map", "Failure points & bottlenecks", "Measurable project goals"] },
        { week: "Week 2", title: "Design the solution", body: "Precise design before any code. Transparent, fixed-price scope.", deliver: ["Tech & tools chosen", "Detailed new workflow", "Final quote"] },
        { week: "Week 3", title: "Build and integrate", body: "Automations built, integrated with CRM and website, tested under real scenarios before anyone sees them live.", deliver: ["Live agent in staging", "Full integration (CRM + WhatsApp)", "50+ simulated conversations"] },
        { week: "Week 4+", title: "Launch — and stay", body: "Solution goes live, team is trained. 14 days of daily monitoring included — because the details matter.", deliver: ["Clean live launch", "Team training + docs", "14 days of daily support"] },
      ];

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={isHe ? "איך זה עובד" : "How it works"}
            title={
              isHe ? (
                <>
                  מאפס ל-live <br />
                  <span className="text-gradient-brand">ב-4 שבועות. בלי הפתעות.</span>
                </>
              ) : (
                <>
                  From zero to live <br />
                  <span className="text-gradient-brand">in 4 weeks. No surprises.</span>
                </>
              )
            }
            lead={
              isHe
                ? "אותו תהליך שבו בנינו את Nadlanist AI — עכשיו מותאם לעסק שלך."
                : "The same process we used to build Nadlanist AI — now applied to your business."
            }
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StaggerItem key={step.week}>
              <div className="flex h-full flex-col rounded-3xl bg-surface p-6 ring-1 ring-inset ring-rule transition hover:shadow-card hover:ring-teal-200 dark:hover:ring-teal-500/40">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-teal-700 ring-1 ring-inset ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/25">
                    {step.week}
                  </span>
                  <span className="font-display text-3xl font-extrabold text-ink-300 dark:text-ink-700">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-ink-950 dark:text-white">{step.title}</h3>
                <p className="mt-2 flex-1 text-[14.5px] text-ink-500 dark:text-ink-300">{step.body}</p>
                <ul className="mt-5 space-y-2 border-t border-rule-soft pt-4 text-sm text-ink-700 dark:text-ink-200">
                  {step.deliver.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
