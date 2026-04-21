import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { WhyUs } from "@/components/sections/WhyUs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Compass, Flag, HeartHandshake, ShieldCheck, Sparkles, Target } from "lucide-react";
import { FOUNDER, personSchema } from "@/lib/jsonld";
import { bilingualLanguages, localePath } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";
  return {
    title: isHe ? "אודות — הסיפור, החזון, והצוות" : "About — story, vision, team",
    description: isHe
      ? "חברת אוטומציות AI — שוברים את המחסומים הטכנולוגיים של עסקים ישראליים עם פתרונות AI מותאמים אישית."
      : "Automaziot AI — breaking technological barriers for Israeli businesses with custom AI solutions.",
    alternates: {
      canonical: localePath(locale, "/about"),
      languages: bilingualLanguages("/about"),
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";

  const founder = personSchema({
    name: FOUNDER.name,
    jobTitle: isHe ? FOUNDER.jobTitleHe : FOUNDER.jobTitleEn,
    url: localePath(locale, "/about"),
    sameAs: [FOUNDER.linkedin],
    description: isHe
      ? "מייסד ומנכ״ל Automaziot AI — בונה סוכני AI ואוטומציות לעסקים ישראליים, בדגש על WhatsApp, CRM ו-n8n."
      : "Founder & CEO of Automaziot AI — building AI agents and automations for Israeli businesses, with a focus on WhatsApp, CRM and n8n.",
    knowsAbout: [
      "AI agents",
      "WhatsApp Business API",
      "n8n automation",
      "Hebrew NLP",
      "CRM integration",
      "Israeli SMB technology",
      "Voice AI",
      "Lead automation",
    ],
  });

  const values = isHe
    ? [
        { icon: Target, title: "מיקוד בתוצאות", body: "כל תהליך נבנה סביב שאלה אחת: איך זה משפיע על השורה התחתונה של הלקוח?" },
        { icon: Sparkles, title: "חדשנות פרקטית", body: "אנחנו בוחרים טכנולוגיות לפי מה שעובד בפועל — לא לפי מה שטרנדי." },
        { icon: ShieldCheck, title: "שקיפות ואמינות", body: "תמחור מראש, תוצרים ברורים, ואם משהו לא עובד — אנחנו אומרים." },
        { icon: HeartHandshake, title: "שותפות אמיתית", body: "ההצלחה של הלקוח היא הצלחה שלנו. אנחנו שם גם חודשים אחרי ההשקה." },
      ]
    : [
        { icon: Target, title: "Outcome-focused", body: "Every project is framed around one question: how does this change the client's bottom line?" },
        { icon: Sparkles, title: "Pragmatic innovation", body: "We pick tech by what works — not what's trendy." },
        { icon: ShieldCheck, title: "Transparent & honest", body: "Upfront pricing, clear deliverables, and if something isn't working we say so." },
        { icon: HeartHandshake, title: "Real partnership", body: "The client's success is ours. We're still here months after launch." },
      ];

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founder) }}
      />
      <section className="relative overflow-hidden bg-hero-light pb-10 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-b" aria-hidden />
        <div className="pointer-events-none absolute -end-40 -top-20 h-[420px] w-[420px] rounded-full bg-teal-100/60 blur-3xl" aria-hidden />
        <Container className="relative">
          <Reveal>
            <Eyebrow>{isHe ? "מי אנחנו" : "About us"}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold text-balance md:text-6xl">
              {isHe ? (
                <>
                  החברה שבנתה את התשתית שלה <br />
                  <span className="text-gradient-brand">על האוטומציות שהיא מוכרת.</span>
                </>
              ) : (
                <>
                  We built our company <br />
                  <span className="text-gradient-brand">on the automations we sell.</span>
                </>
              )}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-500">
              {isHe
                ? "Automaziot AI היא חברה ישראלית שמתמחה בפיתוח פתרונות אוטומציה וסוכני AI לעסקים. אנחנו משרתים עשרות עסקים ישראליים — מקליניקות ומשרדי עורכי דין ועד חברות SaaS וסוכנויות נדל״ן — ובונים להם את המערכת שעושה את העבודה בזמן שהם ישנים."
                : "Automaziot AI is an Israeli company specializing in automation and AI agents for businesses. We serve dozens of Israeli businesses — from clinics and law firms to SaaS companies and real-estate agencies — building the system that does the work while they sleep."}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl bg-white p-8 ring-1 ring-inset ring-rule">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100">
                  <Flag className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-2xl font-extrabold text-ink-950">{isHe ? "המשימה שלנו" : "Our mission"}</h2>
                <p className="mt-3 text-ink-500">
                  {isHe
                    ? "להעצים עסקים ישראלים באמצעות טכנולוגיה חכמה. אנחנו שוברים את המחסומים הטכנולוגיים, מקטינים עבודה ידנית משעמעת, ומחזירים לבעלי העסק ולצוות שלו את השעות שהם צריכים לצמיחה."
                    : "Empower Israeli businesses with smart technology. We break technological barriers, shrink tedious manual work, and return the hours that owners and their teams actually need to grow."}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="h-full rounded-3xl bg-white p-8 ring-1 ring-inset ring-rule">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100">
                  <Compass className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-2xl font-extrabold text-ink-950">{isHe ? "החזון" : "The vision"}</h2>
                <p className="mt-3 text-ink-500">
                  {isHe
                    ? "שלוש שנים מהיום, אוטומציה וסוכני AI לא יהיו יתרון תחרותי — הם יהיו תנאי קיום. אנחנו רוצים להיות הצוות שהוביל את העסקים הטובים בישראל לשם — מוקדם ובלי כאבי הראש של הכישלונות הנפוצים."
                    : "Three years from now, automation and AI agents won't be a competitive edge — they'll be table stakes. We want to be the team that brought Israel's best businesses there — early, and without the common failure-mode headaches."}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={isHe ? "הערכים שלנו" : "Values"}
              title={isHe ? "איך אנחנו מחליטים החלטות קשות" : "How we make the hard calls"}
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-inset ring-rule">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-ink-950">{v.title}</h3>
                  <p className="mt-2 text-[14.5px] text-ink-500">{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <WhyUs isHe={isHe} />
      <FinalCTA isHe={isHe} />
    </>
  );
}
