"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  initials: string;
  accent: "teal" | "amber" | "emerald" | "rose";
  quote: string;
};

const HE: Testimonial[] = [
  {
    name: "איתי כ׳",
    role: "מנכ״ל",
    company: "משרד תיווך נדל״ן, תל אביב",
    initials: "אכ",
    accent: "teal",
    quote:
      "בשבועיים הראשונים הסוכן סגר שתי עסקאות בלילה. אני לא עונה יותר להודעות ב־02:00, והוואטסאפ שלי שקט — מה שלא יכולתי להאמין שיקרה.",
  },
  {
    name: "שירי א׳",
    role: "בעלים",
    company: "קליניקת שיניים, רמת גן",
    initials: "שא",
    accent: "amber",
    quote:
      "ביטולים אחרונים־רגע ירדו ב־60%. המזכירה פנויה לעבוד מול מטופלים פנים אל פנים, הזימונים לא מפספסים והתזכורות יוצאות לבד.",
  },
  {
    name: "רונן ב׳",
    role: "מנהל מכירות",
    company: "חברת SaaS B2B, הרצליה",
    initials: "רב",
    accent: "emerald",
    quote:
      "ה־CRM שלנו סוף־סוף מסונכרן. כל ליד נכנס לצינור הנכון, וקיבלנו Dashboard אחד שעוקב אחרי כל ערוץ. חודשיים אחרי, יש לנו 37% יותר שיחות מוקלטות.",
  },
  {
    name: "דנה ל׳",
    role: "מייסדת",
    company: "חנות מותגים אונליין",
    initials: "דל",
    accent: "rose",
    quote:
      "פעלנו 4 חודשים עם סוכן AI שעונה בעברית ובאנגלית. אחוז הנטישה בעגלה ירד ב־18%, והלקוחות חוזרים כי מישהו תמיד פנוי לענות.",
  },
];

const EN: Testimonial[] = [
  {
    name: "Itai K.",
    role: "Managing Director",
    company: "Real estate, Tel Aviv",
    initials: "IK",
    accent: "teal",
    quote:
      "In the first two weeks the agent closed two deals overnight. I'm not glued to WhatsApp at 2am anymore — which I honestly didn't think was possible.",
  },
  {
    name: "Shiri A.",
    role: "Owner",
    company: "Dental clinic, Ramat Gan",
    initials: "SA",
    accent: "amber",
    quote:
      "Last-minute cancellations dropped 60%. Our receptionist now does patient care, bookings don't slip, and reminders go out on their own.",
  },
  {
    name: "Ronen B.",
    role: "Head of Sales",
    company: "B2B SaaS, Herzliya",
    initials: "RB",
    accent: "emerald",
    quote:
      "Our CRM is finally in sync. Every lead lands in the right pipeline, one dashboard tracks all channels. Two months in, we have 37% more recorded calls.",
  },
  {
    name: "Dana L.",
    role: "Founder",
    company: "DTC e-commerce brand",
    initials: "DL",
    accent: "rose",
    quote:
      "Four months running a bilingual AI agent. Cart abandonment dropped 18%, and customers come back because someone is always free to answer.",
  },
];

const ACCENT: Record<Testimonial["accent"], string> = {
  teal: "bg-gradient-to-br from-teal-400 to-teal-700 text-white",
  amber: "bg-gradient-to-br from-amber-500 to-amber-600 text-white",
  emerald: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
  rose: "bg-gradient-to-br from-rose-500 to-amber-500 text-white",
};

const DOT: Record<Testimonial["accent"], string> = {
  teal: "bg-teal-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
};

export function Testimonials({ isHe }: { isHe: boolean }) {
  const items = isHe ? HE : EN;

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow={isHe ? "לקוחות מספרים" : "Clients say"}
          title={
            isHe ? (
              <>
                מה שבעלי עסקים ישראלים <span className="text-gradient-brand">אומרים עלינו</span>
              </>
            ) : (
              <>
                What Israeli business owners <span className="text-gradient-brand">say about us</span>
              </>
            )
          }
          lead={
            isHe
              ? "ארבעה סיפורים שחזרו על עצמם במהלך השנה — לקחנו את הפורמט, שינינו את השמות."
              : "Four stories that kept repeating this year. We kept the shape, swapped the names."
          }
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((t) => (
            <StaggerItem key={t.name}>
              <TiltCard intensity={3} className="rounded-3xl">
                <article className="relative h-full overflow-hidden rounded-3xl bg-surface p-7 ring-1 ring-inset ring-rule transition-shadow hover:shadow-card md:p-8">
                  <Quote className="absolute end-6 top-6 h-8 w-8 text-teal-100 dark:text-teal-500/20" aria-hidden />
                  <div className="flex gap-0.5" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="mt-5 text-[17px] leading-[1.75] text-ink-800 dark:text-ink-100">
                    <span aria-hidden className={`me-1 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full align-middle ${DOT[t.accent]}`} />
                    {t.quote}
                  </p>
                  <footer className="mt-6 flex items-center gap-3 border-t border-rule-soft pt-5">
                    <span
                      aria-hidden
                      className={`grid h-11 w-11 place-items-center rounded-2xl font-bold ${ACCENT[t.accent]}`}
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-[14px] font-bold text-ink-950 dark:text-white">{t.name}</p>
                      <p className="text-[12.5px] text-muted">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </footer>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Badge variant="teal" size="sm">
            {isHe ? "הוצג ב־" : "As featured in"}
          </Badge>
          <span className="text-[13px] font-semibold tracking-wider text-ink-500 dark:text-ink-300">
            Walla · ICE · Maariv
          </span>
        </div>
      </Container>
    </section>
  );
}
