import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/routing";
import { byLocale } from "@/content/blog";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowLeft, Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";
  return {
    title: isHe ? "בלוג — תובנות על אוטומציה ו-AI" : "Blog — insights on automation & AI",
    description: isHe ? "מה שאנחנו לומדים מהטמעות אמיתיות בעסקים ישראלים." : "What we learn from real rollouts in Israeli businesses.",
  };
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHe = locale === "he";
  const posts = byLocale(isHe ? "he" : "en");

  return (
    <>
      <section className="relative overflow-hidden bg-hero-light pb-10 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-b" aria-hidden />
        <Container className="relative">
          <Reveal>
            <Eyebrow>{isHe ? "בלוג" : "Blog"}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold text-balance md:text-6xl">
              {isHe ? (
                <>מה שלמדנו <span className="text-gradient-brand">מהשטח.</span></>
              ) : (
                <>What we learned <span className="text-gradient-brand">in the field.</span></>
              )}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-500">
              {isHe ? "לא דעות. נתונים מ-40+ הטמעות אמיתיות." : "No hot takes. Data from 40+ real rollouts."}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={isHe ? "פוסטים אחרונים" : "Recent posts"}
              title={isHe ? "הכתבות שהעסקים הכי לוחצים עליהן" : "The pieces businesses click on most"}
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.length === 0 && (
              <p className="text-ink-400">{isHe ? "עדיין אין פוסטים." : "No posts yet."}</p>
            )}
            {posts.map((p) => (
              <StaggerItem key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block h-full rounded-3xl bg-white p-6 ring-1 ring-inset ring-rule transition hover:-translate-y-1 hover:shadow-card hover:ring-teal-200">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-teal-700 ring-1 ring-inset ring-teal-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold text-ink-950 group-hover:text-teal-700">{p.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-500">{p.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-ink-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {p.readMin} {isHe ? "דק׳" : "min"}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-teal-700">
                      {isHe ? "לקריאה" : "Read"} <ArrowLeft className="h-3.5 w-3.5 flip-x" />
                    </span>
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
