import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PricingTable } from "@/components/sections/PricingTable";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { breadcrumbSchema } from "@/lib/jsonld";
import { bilingualLanguages, localePath } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";
  const title = isHe ? "מחירון סוכני AI ואוטומציות" : "Pricing — AI agents & automation";
  const description = isHe
    ? "טווחי מחיר ברורים לכל 10 השירותים של Automaziot AI. ללא אותיות קטנות, ללא עלויות נסתרות."
    : "Clear price ranges for all 10 Automaziot AI services. No fine print, no hidden costs.";
  return {
    title,
    description,
    alternates: {
      canonical: localePath(locale, "/pricing"),
      languages: bilingualLanguages("/pricing"),
    },
    openGraph: { title, description, url: `https://www.automaziot.ai${localePath(locale, "/pricing")}` },
    twitter: { title, description, card: "summary_large_image" },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });
  const isHe = locale === "he";
  const bc = breadcrumbSchema([
    { name: isHe ? "בית" : "Home", url: localePath(locale, "/") },
    { name: t("pricing"), url: localePath(locale, "/pricing") },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }}
      />
      <PricingTable isHe={isHe} />
      <FinalCTA isHe={isHe} />
    </>
  );
}
