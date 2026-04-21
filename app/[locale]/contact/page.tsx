import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT, whatsappLink } from "@/lib/whatsapp";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";
  return {
    title: isHe ? "צור קשר — בואו נתחיל" : "Contact — let's start",
    description: isHe
      ? "מלאו פרטים ונחזור תוך שעה. או דברו איתנו בוואטסאפ עכשיו."
      : "Fill in your details and we'll get back within an hour. Or WhatsApp us now.",
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";

  const hours = isHe
    ? [
        { d: "ראשון–חמישי", t: "09:00–18:00" },
        { d: "שישי", t: "09:00–14:00" },
        { d: "שבת", t: "סגור" },
        { d: "חירום (WhatsApp)", t: "24/7" },
      ]
    : [
        { d: "Sun–Thu", t: "09:00–18:00" },
        { d: "Fri", t: "09:00–14:00" },
        { d: "Sat", t: "Closed" },
        { d: "Emergency (WhatsApp)", t: "24/7" },
      ];

  return (
    <section className="relative overflow-hidden bg-hero-light pb-20 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-b" aria-hidden />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{isHe ? "צור קשר" : "Get in touch"}</Eyebrow>
              <h1 className="mt-5 text-4xl font-extrabold text-balance md:text-5xl">
                {isHe ? (
                  <>
                    בואו נתחיל <br /><span className="text-gradient-brand">לעבוד יחד.</span>
                  </>
                ) : (
                  <>
                    Let's <br /><span className="text-gradient-brand">get to work.</span>
                  </>
                )}
              </h1>
              <p className="mt-5 text-ink-500">
                {isHe
                  ? "השאירו פרטים בטופס או דברו איתנו ישירות בוואטסאפ — ממשיכים לאבחון חינם של 30 דקות."
                  : "Drop your details in the form or message us on WhatsApp — we'll take it from there with a free 30-minute diagnosis."}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 space-y-4 text-sm">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-3 rounded-2xl bg-[#1F8C5C] p-4 text-white shadow-soft transition hover:brightness-110"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="flex-1 font-bold">{isHe ? "וואטסאפ עכשיו" : "WhatsApp now"}</span>
                  <span className="text-xs text-white/80" dir="ltr">+972 54-278-7664</span>
                </a>
                <div className="rounded-2xl bg-white p-4 ring-1 ring-inset ring-rule">
                  <div className="flex items-center gap-3 text-ink-800">
                    <Phone className="h-4 w-4 text-teal-600" />
                    <a href={`tel:${CONTACT.phoneIL.replace(/-/g, "")}`} className="font-bold">IL {CONTACT.phoneIL}</a>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-ink-800">
                    <Phone className="h-4 w-4 text-teal-600" />
                    <a href="tel:+16467604854" className="font-bold">US {CONTACT.phoneUS}</a>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-ink-800">
                    <Mail className="h-4 w-4 text-teal-600" />
                    <a href={`mailto:${CONTACT.email}`} className="font-bold">{CONTACT.email}</a>
                  </div>
                  <div className="mt-2 flex items-start gap-3 text-ink-800">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{isHe ? CONTACT.addressHe : CONTACT.addressEn}</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4 ring-1 ring-inset ring-rule">
                  <p className="flex items-center gap-2 font-bold text-ink-950">
                    <Clock className="h-4 w-4 text-teal-600" /> {isHe ? "שעות פעילות" : "Business hours"}
                  </p>
                  <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-sm">
                    {hours.map((h) => (
                      <div key={h.d} className="contents">
                        <dt className="text-ink-500">{h.d}</dt>
                        <dd className="text-end font-mono text-ink-900" dir="ltr">{h.t}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ContactForm isHe={isHe} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
