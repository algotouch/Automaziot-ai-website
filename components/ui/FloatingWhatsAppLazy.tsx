"use client";

import dynamic from "next/dynamic";

// Client-only dynamic wrapper: defers JS until after the first paint and skips SSR.
// This is imported from the server layout via a client boundary to stay compliant
// with Next.js rules (`ssr: false` isn't allowed in Server Components).
const FloatingWhatsApp = dynamic(
  () => import("@/components/ui/FloatingWhatsApp").then((m) => m.FloatingWhatsApp),
  { ssr: false },
);

export function FloatingWhatsAppLazy({ isHe }: { isHe: boolean }) {
  return <FloatingWhatsApp isHe={isHe} />;
}
