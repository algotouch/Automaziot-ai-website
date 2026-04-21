"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Check, X } from "lucide-react";

export function Transformation({ isHe }: { isHe: boolean }) {
  const before = isHe
    ? [
        "לקוח שלח הודעה ב-21:47. תענה בבוקר (אם תזכור).",
        "3 לידים שהתקבלו אתמול — אתה לא בטוח איפה נשמרו.",
        "שיחה עם לקוח באמצע פגישה אחרת. שני הצדדים מעוצבנים.",
        "פולואפ שהיה אמור לצאת ביום חמישי — יום שני.",
      ]
    : [
        "A lead messaged at 9:47pm. You'll reply in the morning (if you remember).",
        "3 leads from yesterday — you're not sure where they got saved.",
        "A customer calls mid-meeting. Both sides annoyed.",
        "A follow-up due Thursday — going out Monday.",
      ];

  const after = isHe
    ? [
        "לקוח שלח ב-21:47. הסוכן ענה ב-21:47:08. קבע פגישה.",
        "כל ליד מזוהה, מדורג ומתועד ב-CRM אוטומטית. אפס איבוד.",
        "שיחה נענית, מסוכמת, ומועברת אלייך רק אם היא חמה.",
        "פולואפים רצים לבד לפי תסריט — פעם, פעמיים, שלוש.",
      ]
    : [
        "Lead sent at 9:47pm. Agent replied by 9:47:08. Meeting booked.",
        "Every lead tagged, scored and logged to CRM automatically. Zero loss.",
        "Call answered, summarized, handed to you only if warm.",
        "Follow-ups run themselves — 1st, 2nd, 3rd touch.",
      ];

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{isHe ? "השינוי" : "The shift"}</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl md:text-[46px]">
              {isHe ? (
                <>
                  אותו יום. <span className="text-gradient-brand">שני עסקים שונים.</span>
                </>
              ) : (
                <>
                  Same day. <span className="text-gradient-brand">Two very different businesses.</span>
                </>
              )}
            </h2>
            <p className="mt-5 text-lg text-ink-500">
              {isHe
                ? "לפני / אחרי. ההבדל הוא לא הגודל של העסק. זו התשתית."
                : "Before / after. The difference isn't the size of the business. It's the foundation."}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="relative h-full rounded-3xl bg-white p-8 ring-1 ring-inset ring-rule">
              <div className="mb-6 flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-rose-700 ring-1 ring-inset ring-rose-100">
                  {isHe ? "בלי אוטומציה" : "Without automation"}
                </span>
              </div>
              <Stagger className="space-y-3.5">
                {before.map((line) => (
                  <StaggerItem key={line}>
                    <div className="flex items-start gap-3 rounded-2xl bg-rose-50/60 p-3.5 ring-1 ring-inset ring-rose-100/80">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-500/10 text-rose-600">
                        <X className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-[14.5px] text-ink-700">{line}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <p className="mt-6 text-sm font-semibold text-ink-500">
                {isHe ? "סה״כ: לידים שנזרקים, לקוחות שעוזבים, וצוות שרץ על אדים." : "Net: leaking leads, churning customers, a team on fumes."}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="relative h-full rounded-3xl bg-gradient-to-br from-teal-700 to-teal-900 p-8 text-white shadow-card">
              <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" aria-hidden />
              <div className="relative">
                <div className="mb-6 flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-100 ring-1 ring-inset ring-white/20">
                    {isHe ? "עם Automaziot" : "With Automaziot"}
                  </span>
                </div>
                <Stagger className="space-y-3.5">
                  {after.map((line) => (
                    <StaggerItem key={line}>
                      <div className="flex items-start gap-3 rounded-2xl bg-white/[0.08] p-3.5 ring-1 ring-inset ring-white/10">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-300/20 text-teal-200">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <p className="text-[14.5px] text-teal-50">{line}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
                <p className="mt-6 text-sm font-semibold text-teal-100">
                  {isHe ? "סה״כ: 15+ שעות בשבוע חזרות אליך. לצמיחה, לא לטיפולים." : "Net: 15+ hours a week back to you. For growth — not firefighting."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
