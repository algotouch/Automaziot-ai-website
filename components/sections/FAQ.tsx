"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { HOME_FAQ_EN, HOME_FAQ_HE, type FaqItem } from "@/content/home-faq";

export type { FaqItem };

export function FAQ({
  isHe,
  items,
  title,
  eyebrow,
  lead,
}: {
  isHe: boolean;
  items?: FaqItem[];
  title?: string;
  eyebrow?: string;
  lead?: string;
}) {
  const faqs = items ?? (isHe ? HOME_FAQ_HE : HOME_FAQ_EN);

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow ?? (isHe ? "שאלות" : "FAQ")}
            title={title ?? (isHe ? "השאלות שבאמת שואלים אותנו." : "The questions we actually get asked.")}
            lead={
              lead ??
              (isHe
                ? "התחלנו מהשאלות שמהססות לחתום, לא מהקלות."
                : "We start with the questions that hesitate to sign — not the easy ones.")
            }
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion defaultOpen="faq-0">
              {faqs.map((f, i) => (
                <AccordionItem key={i} id={`faq-${i}`} question={f.q}>
                  {f.a}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
