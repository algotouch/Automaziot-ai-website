import type { MetadataRoute } from "next";
import { SERVICES } from "@/content/services";
import { NEWS } from "@/content/news";
import { BLOG_POSTS } from "@/content/blog";
import { localePath } from "@/lib/seo";

const base = "https://www.automaziot.ai";

// Paths mirrored across HE + EN. With `localePrefix: "as-needed"` + HE default,
// HE content lives at the bare path; EN content lives under `/en/...`.
const bilingualPaths = [
  "/",
  "/services",
  "/pricing",
  "/about",
  "/contact",
  "/case-studies",
  "/case-studies/nadlanist-ai",
  "/glossary",
  "/blog",
  "/news",
  "/privacy",
  "/terms",
  "/accessibility",
  "/editorial-standards",
];

function alternatesFor(path: string) {
  return {
    languages: {
      he: `${base}${localePath("he", path)}`,
      en: `${base}${localePath("en", path)}`,
      "x-default": `${base}${localePath("he", path)}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Emit one entry per locale per bilingual path with full hreflang set.
  for (const locale of ["he", "en"] as const) {
    for (const p of bilingualPaths) {
      urls.push({
        url: `${base}${localePath(locale, p)}`,
        changeFrequency: "weekly",
        priority: p === "/" ? 1 : 0.7,
        alternates: alternatesFor(p),
      });
    }

    for (const s of SERVICES) {
      const p = `/services/${s.slug}`;
      urls.push({
        url: `${base}${localePath(locale, p)}`,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternatesFor(p),
      });
    }

    for (const n of NEWS) {
      const p = `/news/${n.slug}`;
      urls.push({
        url: `${base}${localePath(locale, p)}`,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: alternatesFor(p),
      });
    }
  }

  // Blog posts are single-locale; no hreflang cross-reference.
  for (const post of BLOG_POSTS) {
    urls.push({
      url: `${base}${localePath(post.locale, `/blog/${post.slug}`)}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return urls;
}
