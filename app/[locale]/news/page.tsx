import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/Badge";
import { NEWS } from "@/content/news";
import { ArrowLeft, ExternalLink } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";
  return {
    title: isHe ? "חדשות וכיסוי תקשורתי" : "News & press coverage",
    description: isHe ? "עדכונים ומה שנכתב עלינו ועל הפרויקטים שלנו." : "Updates and what's been written about us.",
  };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";

  return (
    <>
      <section className="relative overflow-hidden bg-hero-light pb-10 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-b" aria-hidden />
        <Container className="relative">
          <Reveal>
            <Eyebrow>{isHe ? "חדשות" : "News"}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold text-balance md:text-6xl">
              {isHe ? (
                <>מה שקורה ואיפה <span className="text-gradient-brand">כתבו עלינו.</span></>
              ) : (
                <>What's happening and <span className="text-gradient-brand">where we've been featured.</span></>
              )}
            </h1>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={isHe ? "כיסוי תקשורתי" : "Press coverage"}
              title={isHe ? "מה כתבו עלינו" : "What the press wrote"}
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {NEWS.map((n) => (
              <StaggerItem key={n.slug}>
                <Link
                  href={`/news/${n.slug}`}
                  className="group relative block h-full overflow-hidden rounded-3xl bg-surface p-6 ring-1 ring-inset ring-rule transition hover:-translate-y-1 hover:shadow-card hover:ring-teal-200 dark:hover:ring-teal-500/30"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant={n.accent ?? "teal"} size="xs">
                      {isHe ? n.sourceHe : n.source}
                    </Badge>
                    <span className="text-xs text-ink-400">{n.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-ink-950 group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300">
                    {isHe ? n.titleHe : n.titleEn}
                  </h3>
                  <p className="mt-2 text-[14.5px] text-muted">
                    {isHe ? n.excerpt : n.excerptEn}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-teal-700 dark:text-teal-300">
                    {isHe ? "קראו עוד" : "Read more"}
                    <ArrowLeft className="arrow-nudge h-3.5 w-3.5 flip-x" />
                    {n.url && <ExternalLink className="h-3.5 w-3.5" />}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
