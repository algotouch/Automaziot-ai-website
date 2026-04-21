import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SERVICES, getService } from "@/content/services";
import { ServicePageShell } from "@/components/services/ServicePageShell";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/jsonld";
import { bilingualLanguages, localePath } from "@/lib/seo";

export function generateStaticParams() {
  const locales = ["he", "en"] as const;
  return locales.flatMap((locale) => SERVICES.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const copy = locale === "he" ? service.he : service.en;
  return {
    title: copy.title + (copy.titleHighlight ? " " + copy.titleHighlight : ""),
    description: copy.subtitle,
    alternates: {
      canonical: localePath(locale, `/services/${slug}`),
      languages: bilingualLanguages(`/services/${slug}`),
    },
    openGraph: { title: copy.nav, description: copy.subtitle, type: "article" },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getService(slug);
  if (!service) notFound();
  const isHe = locale === "he";
  const copy = isHe ? service.he : service.en;
  const fullTitle = copy.title + (copy.titleHighlight ? " " + copy.titleHighlight : "");
  const url = localePath(locale, `/services/${slug}`);

  const ld = [
    serviceSchema({
      name: fullTitle,
      description: copy.subtitle + " " + copy.lead,
      url,
      price: String(service.startingPrice),
      category: copy.nav,
      locale,
    }),
    faqPageSchema(copy.faq.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: isHe ? "בית" : "Home", url: localePath(locale, "/") },
      { name: isHe ? "שירותים" : "Services", url: localePath(locale, "/services") },
      { name: copy.nav, url },
    ]),
  ];

  return (
    <>
      {ld.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ServicePageShell service={service} isHe={isHe} />
    </>
  );
}
