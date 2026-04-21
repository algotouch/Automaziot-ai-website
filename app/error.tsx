"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-hero-light px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" aria-hidden />
      <div className="pointer-events-none absolute -top-32 -end-24 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" aria-hidden />
      <div className="relative z-10 max-w-md">
        <Link href="/" className="inline-flex" aria-label="Automaziot AI home">
          <Logo height={34} />
        </Link>
        <span className="mt-10 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-500 ring-1 ring-inset ring-rose-500/20">
          <AlertTriangle className="h-3.5 w-3.5" />
          Unexpected error
        </span>
        <h1 className="mt-5 text-4xl font-extrabold text-ink-950 md:text-5xl">
          Something went off-script.
        </h1>
        <p className="mt-4 text-ink-500">
          This isn&apos;t supposed to happen. Give it another spin, or head back home.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-[11px] text-ink-400">
            Reference: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-[1px] hover:bg-teal-800 hover:shadow-glow-teal"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 ring-1 ring-inset ring-rule hover:bg-cream"
          >
            <Home className="h-4 w-4" />
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
