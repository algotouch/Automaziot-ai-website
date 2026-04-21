import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/routing";
import { BLOG_POSTS, getBlogPost } from "@/content/blog";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { articleSchema, breadcrumbSchema, FOUNDER } from "@/lib/jsonld";
import { localePath } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ locale: p.locale, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const canonical = localePath(post.locale, `/blog/${slug}`);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://www.automaziot.ai${canonical}`,
    },
  };
}

function renderBody(body: string) {
  const blocks = body.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-12 text-2xl font-extrabold text-ink-950 md:text-3xl">
          {block.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (block.startsWith("- ")) {
      const items = block.split(/\n/).map((l) => l.replace(/^-\s+/, ""));
      return (
        <ul key={i} className="mt-4 space-y-2 text-ink-800">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="mt-4 leading-relaxed text-ink-700">
        {block}
      </p>
    );
  });
}

export default async function BlogPost({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(slug);
  if (!post) notFound();
  const isHe = locale === "he";

  const postUrl = localePath(post.locale, `/blog/${post.slug}`);
  const article = articleSchema({
    title: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: post.date,
    author: { name: FOUNDER.name, url: FOUNDER.linkedin },
    locale: post.locale,
  });
  const bc = breadcrumbSchema([
    { name: isHe ? "בית" : "Home", url: localePath(locale, "/") },
    { name: isHe ? "בלוג" : "Blog", url: localePath(locale, "/blog") },
    { name: post.title, url: postUrl },
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
      <article className="relative bg-paper pb-16 pt-20 md:pt-28">
        <Container className="max-w-3xl">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-950">
            <ArrowLeft className="h-3.5 w-3.5 flip-x" />
            {isHe ? "כל הפוסטים" : "All posts"}
          </Link>

          <Reveal>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-teal-700 ring-1 ring-inset ring-teal-100">
                  {t}
                </span>
              ))}
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-balance md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-ink-500">{post.excerpt}</p>

            <div className="mt-6 flex items-center gap-5 text-sm text-ink-400">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readMin} {isHe ? "דק׳ קריאה" : "min read"}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 border-t border-rule pt-8">{renderBody(post.body)}</div>
          </Reveal>
        </Container>
      </article>

      <FinalCTA isHe={isHe} />
    </>
  );
}
