"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

export function FloatingWhatsApp({ isHe }: { isHe: boolean }) {
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setHint(true), 1200);
    const t2 = setTimeout(() => setHint(false), 7000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 end-5 z-40 flex items-end gap-3"
        >
          <AnimatePresence>
            {hint && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="relative mb-1.5 hidden max-w-[240px] rounded-2xl bg-surface px-4 py-3 text-sm text-ink-800 shadow-card ring-1 ring-inset ring-rule dark:text-ink-100 md:block"
              >
                <button
                  type="button"
                  onClick={() => setHint(false)}
                  className="absolute -top-2 -end-2 grid h-6 w-6 place-items-center rounded-full bg-ink-950 text-white ring-2 ring-paper dark:bg-ink-100 dark:text-ink-950"
                  aria-label="dismiss"
                >
                  <X className="h-3 w-3" />
                </button>
                <p className="font-semibold text-ink-950 dark:text-white">
                  {isHe ? "יש שאלה?" : "Question?"}
                </p>
                <p className="mt-0.5 text-ink-500 dark:text-ink-300">
                  {isHe
                    ? "אנחנו עונים בוואטסאפ תוך דקות."
                    : "We reply on WhatsApp within minutes."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={whatsappLink(
              isHe ? "היי, יש לי שאלה לגבי אוטומציות לעסק" : "Hi, I have a question about automation",
            )}
            target="_blank"
            rel="noopener"
            aria-label={isHe ? "שיחה בוואטסאפ" : "WhatsApp chat"}
            className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1F8C5C] text-white shadow-[0_12px_30px_-6px_rgba(31,140,92,0.55)] transition-transform hover:-translate-y-0.5 hover:brightness-110"
          >
            <span className="absolute inset-0 rounded-full bg-[#1F8C5C] pulse-ring" aria-hidden />
            <MessageCircle className="relative h-6 w-6" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
