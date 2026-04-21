import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-hero-light px-6 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" aria-hidden />
      <div className="pointer-events-none absolute -top-32 -end-24 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -start-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" aria-hidden />
      <div className="relative z-10 w-full max-w-xl">
        <Link href="/" className="inline-flex" aria-label="Automaziot AI home">
          <Logo height={34} />
        </Link>
        <p className="mt-10 text-[13px] font-bold uppercase tracking-[0.22em] text-teal-700">
          404 · Not found
        </p>
        <h1 className="mt-4 text-5xl font-extrabold text-ink-950 md:text-6xl">
          The page wandered off.
        </h1>
        <p className="mt-5 text-ink-500">
          The link may be outdated, or the page has been moved. Try a different
          route below.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-[1px] hover:bg-teal-800 hover:shadow-glow-teal"
          >
            <Home className="h-4 w-4" />
            Back home
            <ArrowRight className="arrow-nudge h-4 w-4 flip-x" />
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 ring-1 ring-inset ring-rule transition hover:bg-cream hover:ring-ink-200"
          >
            <Search className="h-4 w-4" />
            Browse services
          </Link>
        </div>
        <div className="mt-10 grid gap-2 text-[13px] text-ink-500">
          <p>Popular pages</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-medium">
            <Link className="link-underline text-teal-700 hover:text-teal-800" href="/case-studies/nadlanist-ai">
              Nadlanist AI
            </Link>
            <span aria-hidden className="text-ink-200">·</span>
            <Link className="link-underline text-teal-700 hover:text-teal-800" href="/pricing">
              Pricing
            </Link>
            <span aria-hidden className="text-ink-200">·</span>
            <Link className="link-underline text-teal-700 hover:text-teal-800" href="/blog">
              Blog
            </Link>
            <span aria-hidden className="text-ink-200">·</span>
            <Link className="link-underline text-teal-700 hover:text-teal-800" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
