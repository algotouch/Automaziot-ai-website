"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop({ isHe }: { isHe: boolean }) {
  const [visible, setVisible] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label={isHe ? "חזרה לראש העמוד" : "Scroll to top"}
          onClick={onClick}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.92 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.92 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[86px] start-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-900 shadow-lift ring-1 ring-inset ring-rule transition-colors hover:bg-cream dark:bg-ink-800 dark:text-white dark:ring-ink-700 dark:hover:bg-ink-700 md:bottom-6 md:start-6"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
