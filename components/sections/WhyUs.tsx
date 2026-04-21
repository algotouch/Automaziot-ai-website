"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { BadgeCheck, Gauge, HeartHandshake, LineChart, Rocket, Wrench } from "lucide-react";

export function WhyUs({ isHe }: { isHe: boolean }) {
  const pillars = isHe
    ? [
        { icon: Wrench, title: "בנינו את זה לעצמנו קודם", body: "החברה שלנו רצה על אותה תשתית שאנחנו מוכרים. אתם מקבלים פלטפורמה שכבר הוכיחה את עצמה — לא ניסוי." },
        { icon: HeartHandshake, title: "מנהל הצלחה צמוד לפרויקט", body: "לא ״פתח טיקט וחכה״. יש לך WhatsApp של מי שמכיר את העסק שלך אישית — ועונה באותו יום." },
        { icon: BadgeCheck, title: "Tailor-made, לא קופסה", body: "כל פרויקט נבנה סביב הצרכים שלך. אין מנוי חודשי מדומה ואין ״תוסף ל-CRM״ כללי." },
        { icon: LineChart, title: "מודדים ROI — לא שעות", body: "ההצלחה שלנו נמדדת בהשפעה על השורה התחתונה שלך. אם אין ROI, לא סיימנו." },
        { icon: Rocket, title: "טכנולוגיה בחזית", body: "Anthropic, OpenAI, n8n, ElevenLabs, Twilio — הכלים הכי חדים ב-2026, מוחלים עם כוונה." },
        { icon: Gauge, title: "שקיפות מלאה בתמחור", body: "הצעת מחיר סופית, מפורטת, ללא תוספות בסוף הדרך. מה שאתה רואה — זה מה שאתה משלם." },
      ]
    : [
        { icon: Wrench, title: "We built this for ourselves first", body: "Our own company runs on the same stack we sell. You get a proven platform — not an experiment." },
        { icon: HeartHandshake, title: "A dedicated success manager", body: "No 'open a ticket and wait.' You have the WhatsApp of the person who knows your business — and replies same day." },
        { icon: BadgeCheck, title: "Tailor-made, not a box", body: "Every project is designed around your needs. No subscription charade, no generic CRM plug-in." },
        { icon: LineChart, title: "We measure ROI — not hours", body: "Our success is measured on your bottom line. No ROI = we're not done." },
        { icon: Rocket, title: "Front-edge tech", body: "Anthropic, OpenAI, n8n, ElevenLabs, Twilio — the sharpest 2026 tools, applied with intent." },
        { icon: Gauge, title: "Full pricing transparency", body: "Final, detailed quote — no 'oh, another ₪4k' at the end. What you see is what you pay." },
      ];

  return (
    <section className="relative bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={isHe ? "למה אנחנו" : "Why us"}
            title={isHe ? "היתרון שלנו הוא אחד:" : "Our edge is one thing:"}
            lead={
              isHe
                ? "אנחנו לא ספקי AI. אנחנו החברה שבונה AI בשביל חברות אחרות — כי בנינו אותה קודם לנו."
                : "We're not AI vendors. We're the company that builds AI for other companies — because we built it for ourselves first."
            }
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <div className="group h-full rounded-3xl bg-surface p-7 ring-1 ring-inset ring-rule transition hover:-translate-y-0.5 hover:shadow-card hover:ring-teal-200 dark:hover:ring-teal-500/40">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/25">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-ink-950 dark:text-white">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500 dark:text-ink-300">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
