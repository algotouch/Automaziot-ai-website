import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { NEWS, getNewsItem } from "@/content/news";
import { articleSchema, breadcrumbSchema } from "@/lib/jsonld";
import { bilingualLanguages, localePath } from "@/lib/seo";
import { ArrowLeft, ExternalLink, Newspaper, Calendar } from "lucide-react";

export function generateStaticParams() {
  return NEWS.flatMap((n) =>
    (["he", "en"] as const).map((locale) => ({ locale, slug: n.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getNewsItem(slug);
  if (!item) return {};
  const isHe = locale === "he";
  const title = isHe ? item.titleHe : item.titleEn;
  const description = isHe ? item.excerpt : item.excerptEn;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
    alternates: {
      canonical: localePath(locale, `/news/${slug}`),
      languages: bilingualLanguages(`/news/${slug}`),
    },
  };
}

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = getNewsItem(slug);
  if (!item) notFound();
  const isHe = locale === "he";

  const related = NEWS.filter((n) => n.slug !== slug).slice(0, 2);
  const title = isHe ? item.titleHe : item.titleEn;
  const excerpt = isHe ? item.excerpt : item.excerptEn;

  const article = articleSchema({
    title,
    description: excerpt,
    url: localePath(locale, `/news/${slug}`),
    datePublished: item.date,
    author: isHe ? item.sourceHe : item.source,
    locale,
  });
  const bc = breadcrumbSchema([
    { name: isHe ? "בית" : "Home", url: localePath(locale, "/") },
    { name: isHe ? "חדשות" : "News", url: localePath(locale, "/news") },
    { name: title, url: localePath(locale, `/news/${slug}`) },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }}
      />
      <article className="relative overflow-hidden bg-hero-light pb-20 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-b" aria-hidden />
        <Container className="relative max-w-3xl">
          <Link
            href="/news"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-950 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 flip-x" />
            {isHe ? "כל הפריטים" : "All news"}
          </Link>

          <Reveal>
            <Eyebrow>{isHe ? item.sourceHe : item.source}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-balance md:text-5xl">
              {title}
            </h1>
            <div className="mt-5 flex items-center gap-4 text-sm text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {item.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Newspaper className="h-3.5 w-3.5" />
                {isHe ? item.sourceHe : item.source}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <blockquote className="mt-10 rounded-3xl bg-surface p-6 text-lg leading-relaxed text-ink-800 shadow-soft ring-1 ring-inset ring-rule dark:text-ink-100 md:p-8 md:text-xl">
              <span aria-hidden className="block text-4xl leading-none text-teal-500">
                &ldquo;
              </span>
              <p className="mt-2">{excerpt}</p>
            </blockquote>

            {item.url && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 hover:shadow-glow-teal"
                >
                  <ExternalLink className="h-4 w-4" />
                  {isHe ? "לכתבה המלאה" : "Read full article"}
                </a>
                <Link
                  href="/case-studies/nadlanist-ai"
                  className="inline-flex items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-ink-900 ring-1 ring-inset ring-rule transition hover:bg-cream dark:text-white"
                >
                  {isHe ? "סיפור Nadlanist AI" : "See Nadlanist AI case"}
                  <ArrowLeft className="h-4 w-4 flip-x" />
                </Link>
              </div>
            )}
          </Reveal>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="bg-paper py-16">
          <Container>
            <h2 className="text-center text-2xl font-extrabold text-ink-950 md:text-3xl dark:text-white">
              {isHe ? "כתבות נוספות" : "More coverage"}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/news/${r.slug}`}
                  className="group block rounded-3xl bg-surface p-6 ring-1 ring-inset ring-rule transition hover:-translate-y-1 hover:shadow-card hover:ring-teal-200 dark:hover:ring-teal-500/30"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant={r.accent ?? "teal"} size="xs">
                      {isHe ? r.sourceHe : r.source}
                    </Badge>
                    <span className="text-xs text-ink-400">{r.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-ink-950 group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300">
                    {isHe ? r.titleHe : r.titleEn}
                  </h3>
                  <p className="mt-2 text-[14px] text-muted">
                    {isHe ? r.excerpt : r.excerptEn}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <FinalCTA isHe={isHe} />
    </>
  );
}
