"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "@/i18n/routing";

export function PageTransition({ children }: { children: React.ReactNode }) {
  // usePathname() from next-intl returns the locale-agnostic path (e.g. /about
  // for both /he/about and /en/about). That means flipping HE↔EN keeps the
  // same AnimatePresence key → no exit/enter animation, just an in-place
  // re-render with the new translations. Feels instant instead of a full
  // page teardown.
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
