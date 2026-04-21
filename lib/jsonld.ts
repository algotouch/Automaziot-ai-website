import { CONTACT } from "@/lib/whatsapp";

const SITE_URL = "https://www.automaziot.ai";

export const FOUNDER = {
  name: "Eyal Yakobi Miller",
  linkedin: "https://il.linkedin.com/in/eyal-yakobi-miller-aaaa50210",
  jobTitleHe: "מייסד ומנכ״ל",
  jobTitleEn: "Founder & CEO",
} as const;

export function organizationSchema(isHe: boolean) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Automaziot AI",
    alternateName: isHe ? "אוטומציות AI" : "Automaziot",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: isHe
      ? "סוכני AI ואוטומציות לעסקים בישראל — 24/7 בעברית."
      : "AI agents and automation for Israeli SMBs — Hebrew-native, 24/7.",
    sameAs: [CONTACT.social.linkedin, CONTACT.social.instagram, CONTACT.social.facebook],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+972-3-7630715",
        contactType: "customer support",
        areaServed: "IL",
        availableLanguage: ["he", "en"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+1-646-760-4854",
        contactType: "sales",
        areaServed: "US",
        availableLanguage: ["en"],
      },
    ],
  };
}

export function localBusinessSchema(isHe: boolean) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Automaziot AI",
    image: `${SITE_URL}/logo.svg`,
    url: SITE_URL,
    telephone: "+972-3-7630715",
    priceRange: "₪2000-₪25000",
    description: isHe
      ? "בונים סוכני AI, אוטומציות וואטסאפ, סוכני קול ו־CRM לעסקים ישראלים."
      : "We build AI agents, WhatsApp automations, voice agents and CRM setups for Israeli businesses.",
    address: {
      "@type": "PostalAddress",
      streetAddress: isHe ? CONTACT.addressHe : CONTACT.addressEn,
      addressLocality: "Tel Aviv",
      addressCountry: "IL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.0636,
      longitude: 34.7686,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
  };
}

export function websiteSchema(locale: string) {
  // HE is default locale with `as-needed` prefix → bare path; EN → /en
  const path = locale === "he" ? "" : "/en";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Automaziot AI",
    url: `${SITE_URL}${path || "/"}`,
    inLanguage: locale === "he" ? "he-IL" : "en-US",
    publisher: { "@type": "Organization", name: "Automaziot AI", url: SITE_URL },
  };
}

export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  url: string;
  price?: string;
  category?: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url.startsWith("http") ? input.url : `${SITE_URL}${input.url}`,
    provider: { "@type": "Organization", name: "Automaziot AI", url: SITE_URL },
    areaServed: "IL",
    serviceType: input.category ?? "AI automation",
    inLanguage: input.locale === "he" ? "he-IL" : "en-US",
    offers: input.price
      ? {
          "@type": "Offer",
          priceCurrency: "ILS",
          price: input.price,
        }
      : undefined,
  };
}

export function faqPageSchema(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export type ArticleAuthor = string | { name: string; url?: string };
export type ArticleCitation = { name: string; url?: string; publisher?: string };

export function articleSchema(input: {
  title: string;
  description?: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: ArticleAuthor;
  image?: string;
  locale: string;
  citation?: ArticleCitation[];
}) {
  const authorInput = input.author;
  const author =
    typeof authorInput === "object" && authorInput !== null
      ? { "@type": "Person" as const, name: authorInput.name, url: authorInput.url }
      : { "@type": "Person" as const, name: authorInput ?? "Automaziot AI" };

  const citation = input.citation?.map((c) => ({
    "@type": "CreativeWork" as const,
    name: c.name,
    url: c.url,
    publisher: c.publisher ? { "@type": "Organization", name: c.publisher } : undefined,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: input.url.startsWith("http") ? input.url : `${SITE_URL}${input.url}`,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author,
    publisher: {
      "@type": "Organization",
      name: "Automaziot AI",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    image: input.image ? [input.image] : undefined,
    inLanguage: input.locale === "he" ? "he-IL" : "en-US",
    citation,
  };
}

export function personSchema(input: {
  name: string;
  jobTitle: string;
  url: string;
  sameAs?: string[];
  image?: string;
  description?: string;
  knowsAbout?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    url: input.url.startsWith("http") ? input.url : `${SITE_URL}${input.url}`,
    image: input.image,
    description: input.description,
    sameAs: input.sameAs,
    knowsAbout: input.knowsAbout,
    worksFor: {
      "@type": "Organization",
      name: "Automaziot AI",
      url: SITE_URL,
    },
  };
}

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  related?: string[];
};

export function definedTermSetSchema(input: {
  name: string;
  url: string;
  terms: GlossaryTerm[];
  locale: string;
}) {
  const url = input.url.startsWith("http") ? input.url : `${SITE_URL}${input.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: input.name,
    url,
    inLanguage: input.locale === "he" ? "he-IL" : "en-US",
    hasDefinedTerm: input.terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${url}#${t.id}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: url,
      termCode: t.id,
      ...(t.related && t.related.length
        ? { relatedLink: t.related.map((r) => `${url}#${r}`) }
        : {}),
    })),
  };
}
