import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ThreeAmProblem } from "@/components/sections/ThreeAmProblem";
import { Transformation } from "@/components/sections/Transformation";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ROICalculator } from "@/components/sections/ROICalculator";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FlagshipCaseStudy } from "@/components/sections/FlagshipCaseStudy";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";
import { Industries } from "@/components/sections/Industries";
import { StatsBand } from "@/components/sections/StatsBand";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { HOME_FAQ_EN, HOME_FAQ_HE } from "@/content/home-faq";
import { faqPageSchema } from "@/lib/jsonld";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";
  const faqs = isHe ? HOME_FAQ_HE : HOME_FAQ_EN;
  const homeFaq = faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaq) }}
      />
      <Hero isHe={isHe} />
      <ThreeAmProblem isHe={isHe} />
      <Transformation isHe={isHe} />
      <ServicesGrid isHe={isHe} />
      <FlagshipCaseStudy isHe={isHe} />
      <Testimonials isHe={isHe} />
      <StatsBand isHe={isHe} />
      <ROICalculator isHe={isHe} />
      <HowItWorks isHe={isHe} />
      <Industries isHe={isHe} />
      <Container><div className="divider-hairline" /></Container>
      <WhyUs isHe={isHe} />
      <FAQ isHe={isHe} />
      <FinalCTA isHe={isHe} />
    </>
  );
}
