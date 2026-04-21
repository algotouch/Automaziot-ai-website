import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";
  return {
    title: isHe ? "שירותים — 10 פתרונות AI ואוטומציה" : "Services — 10 AI & automation solutions",
    description: isHe
      ? "10 שירותים ברורים, כל אחד עם מחיר התחלתי. בחרו את מה שמתאים לעסק שלכם."
      : "10 clearly scoped services, each with a starting price. Pick what fits your business.",
  };
}

export default async function ServicesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";
  return (
    <>
      <section className="relative overflow-hidden bg-hero-light pb-10 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-b" aria-hidden />
        <Container className="relative">
          <Reveal>
            <Eyebrow>{isHe ? "קטלוג שירותים" : "Service catalog"}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold text-balance md:text-6xl">
              {isHe ? (
                <>
                  בחרו איך העסק שלכם <br />
                  <span className="text-gradient-brand">עובר לטייס אוטומטי</span>
                </>
              ) : (
                <>
                  Pick how your business <br />
                  <span className="text-gradient-brand">goes on autopilot</span>
                </>
              )}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-500">
              {isHe
                ? "10 שירותים ברורים, כל אחד עם מחיר התחלתי ולוח זמנים. אם לא בטוח מה מתאים — נתחיל משיחת ייעוץ חינם."
                : "10 clearly scoped services — each with a starting price and timeline. Not sure what fits? Start with a free consult."}
            </p>
          </Reveal>
        </Container>
      </section>
      <ServicesGrid isHe={isHe} />
      <FinalCTA isHe={isHe} />
    </>
  );
}
