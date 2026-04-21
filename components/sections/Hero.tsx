"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/MagneticButton";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { whatsappLink } from "@/lib/whatsapp";
import { formatILS } from "@/lib/utils";

export function Hero({ isHe }: { isHe: boolean }) {
  const reduce = useReducedMotion();
  const [saved, setSaved] = useState(87_400);
  const [heroInView, setHeroInView] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setSaved((s) => s + Math.floor(Math.random() * 57) + 21), 2200);
    return () => clearInterval(id);
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  // Cursor-aware glow
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const glowX = useSpring(mx, { stiffness: 60, damping: 18 });
  const glowY = useSpring(my, { stiffness: 60, damping: 18 });
  const gxPct = useTransform(glowX, (v) => `${v * 100}%`);
  const gyPct = useTransform(glowY, (v) => `${v * 100}%`);

  // Only attach the mousemove listener when the hero is actually in view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !heroInView) return;
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / Math.max(rect.height, 1));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce, heroInView]);

  const line1 = isHe
    ? ["הופכים", "את", "העסק", "שלך", "לאוטומטי."]
    : ["We", "turn", "your", "business", "autopilot."];
  const line2 = isHe
    ? ["חוסכים", "בזמן,", "מגדילים", "מכירות."]
    : ["Save", "time,", "grow", "sales."];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-hero-light pb-28 pt-14 md:pb-36 md:pt-20"
    >
      <MeshGradient variant="hero" />
      {!reduce && heroInView && <CursorGlow gxPct={gxPct} gyPct={gyPct} />}

      <motion.div
        style={reduce ? undefined : { y: parallaxY, opacity: fadeOut }}
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 mask-fade-b"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-[12.5px] font-semibold text-teal-700 shadow-soft ring-1 ring-inset ring-teal-100 dark:text-teal-300 dark:ring-teal-500/30"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {isHe
                ? "אוטומציות AI לעסקים ישראליים · 24/7 בעברית"
                : "AI automation for Israeli businesses · 24/7 in Hebrew"}
            </motion.span>

            <h1 className="mt-7 text-[clamp(2.1rem,5.2vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink-950 text-balance dark:text-white">
              {line1.map((w, i) => (
                <Fragment key={`l1-${i}`}>
                  <span
                    className="reveal-word"
                    style={{ animationDelay: `${0.1 + i * 0.07}s` }}
                  >
                    {w}
                  </span>
                  {i < line1.length - 1 && " "}
                </Fragment>
              ))}
              <br />
              <span className="relative inline-block">
                {line2.map((w, i) => (
                  <Fragment key={`l2-${i}`}>
                    <span
                      className="reveal-word text-gradient-brand"
                      style={{ animationDelay: `${0.45 + i * 0.07}s` }}
                    >
                      {w}
                    </span>
                    {i < line2.length - 1 && " "}
                  </Fragment>
                ))}
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 start-0 h-3 w-full text-teal-400"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 9 Q50 2 100 7 T198 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 0.95, ease: "easeInOut" }}
                  />
                </svg>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 max-w-[40rem] text-xl font-semibold text-ink-900 dark:text-ink-100 md:text-[22px]"
            >
              {isHe
                ? "עוד יום של משימות חוזרות? תנו ל-AI לעשות את העבודה."
                : "Another day of repetitive tasks? Let AI do the work."}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-4 max-w-[40rem] text-[17px] leading-relaxed text-ink-500 dark:text-ink-300 md:text-lg"
            >
              {isHe
                ? "פתרונות אוטומציה וסוכני AI מתקדמים שחוסכים לכם שעות של עבודה ידנית, עונים ללקוחות 24/7, וממקסמים כל ליד שנכנס לעסק."
                : "Advanced automation and AI agent solutions that save you hours of manual work, answer customers 24/7, and maximize every lead that enters the business."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.18}>
                <Button
                  as="a"
                  href={whatsappLink(
                    isHe
                      ? "היי, רוצה לראות דוגמה חיה של סוכן AI לעסק שלי"
                      : "Hi, I'd like to see a live demo of an AI agent for my business",
                  )}
                  target="_blank"
                  rel="noopener"
                  variant="whatsapp"
                  size="lg"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  {isHe ? "דברו עם הסוכן שלנו" : "Chat with our agent"}
                </Button>
              </Magnetic>
              <Magnetic strength={0.12}>
                <Button as="a" href="#roi" variant="secondary" size="lg" className="group">
                  {isHe ? "חשבו כמה אתם מפספסים" : "Calculate what you're missing"}
                  <ArrowLeft className="h-4 w-4 flip-x arrow-nudge" />
                </Button>
              </Magnetic>
            </motion.div>

          </div>

          <div className="relative lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard intensity={6} className="rounded-[28px]">
                <AgentCard isHe={isHe} saved={saved} />
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="animate-floaty absolute -bottom-5 -start-4 rounded-2xl bg-ink-950 px-4 py-3 text-white shadow-lift ring-1 ring-ink-900 dark:bg-surface dark:text-ink-900 dark:ring-rule md:-start-10"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-300 dark:text-teal-700">
                {isHe ? "התראה" : "New lead"}
              </p>
              <p className="mt-1 text-sm">
                {isHe ? "✨ נסגר ב-WhatsApp, 03:22" : "✨ Closed on WhatsApp, 03:22"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="absolute -top-4 -end-2 hidden rounded-full bg-surface px-3 py-2 text-xs font-semibold text-ink-800 shadow-card ring-1 ring-inset ring-rule dark:text-white md:block"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
                </span>
                {isHe ? "12 שיחות פעילות" : "12 live conversations"}
              </span>
            </motion.div>
          </div>
        </div>

      </Container>
    </section>
  );
}

function CursorGlow({ gxPct, gyPct }: { gxPct: MotionValue<string>; gyPct: MotionValue<string> }) {
  const bg = useMotionTemplate`radial-gradient(600px circle at ${gxPct} ${gyPct}, rgba(54,198,192,0.18), transparent 40%)`;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ background: bg }}
    />
  );
}

function AgentCard({ isHe, saved }: { isHe: boolean; saved: number }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-teal-100/60 via-cream to-white blur-2xl dark:from-teal-700/30 dark:via-ink-900 dark:to-ink-950" />
      <div className="relative rounded-[28px] bg-surface p-5 shadow-lift ring-1 ring-inset ring-rule">
        <div className="flex items-center justify-between border-b border-rule-soft pb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 font-bold text-white">
                AI
              </div>
              <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-surface" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-white">
                {isHe ? "הסוכן שלך" : "Your agent"}
              </p>
              <p className="text-[11px] font-medium text-emerald-500">
                {isHe ? "מחובר · עונה ב-8 שניות" : "Online · replies in 8s"}
              </p>
            </div>
          </div>
          <span className="rounded-full bg-cream px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">
            WhatsApp
          </span>
        </div>

        <div className="mt-4 space-y-2.5 text-sm">
          <Bubble side="them" time="03:47" delay={0.9}>
            {isHe ? "היי, יש לכם חבילת אימונים פרטיים?" : "Hi, any personal training packages?"}
          </Bubble>
          <Bubble side="us" time="03:47" delay={1.4} typing>
            {isHe
              ? "היי חיים 👋 יש לנו 3 חבילות, מ-₪1,200. רוצה שאחסום לך שיחת היכרות חינם למחר ב-10:30?"
              : "Hey Chaim 👋 We've got 3, starting at ₪1,200. Want me to hold a free intro call for tomorrow at 10:30?"}
          </Bubble>
          <Bubble side="them" time="03:48" delay={2.0}>
            {isHe ? "כן, תודה 🙏" : "Yes please 🙏"}
          </Bubble>
          <Bubble side="us" time="03:48" delay={2.4}>
            {isHe
              ? "סגור. שלחתי לך הזמנה ליומן + כתובת הסטודיו 📍"
              : "Done. Calendar invite + studio address on their way 📍"}
          </Bubble>
        </div>

        <div className="mt-5 rounded-2xl bg-cream p-4 ring-1 ring-inset ring-rule-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">
                {isHe ? "חיסכון החודש" : "Savings this month"}
              </p>
              <p key={saved} className="animate-tick mt-0.5 font-display text-2xl font-extrabold text-teal-700 dark:text-teal-300">
                {formatILS(saved)}
              </p>
            </div>
            <div className="text-end">
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-300">
                {isHe ? "שיחות היום" : "Conversations today"}
              </p>
              <p className="mt-0.5 font-display text-2xl font-extrabold text-ink-900 dark:text-white">127</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  side,
  children,
  typing,
  time,
  delay = 0,
}: {
  side: "us" | "them";
  children: React.ReactNode;
  typing?: boolean;
  time?: string;
  delay?: number;
}) {
  const isUs = side === "us";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUs ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
          isUs
            ? "bg-gradient-to-bl from-teal-600 to-teal-700 text-white"
            : "bg-cream text-ink-900 ring-1 ring-inset ring-rule-soft dark:text-white"
        }`}
      >
        <span>{children}</span>
        {typing && (
          <span className="ms-2 inline-flex gap-0.5 align-middle">
            <span className="animate-blink-1 h-1 w-1 rounded-full bg-white/90" />
            <span className="animate-blink-2 h-1 w-1 rounded-full bg-white/90" />
            <span className="animate-blink-3 h-1 w-1 rounded-full bg-white/90" />
          </span>
        )}
        {time && (
          <span className={`ms-2 text-[10px] ${isUs ? "text-teal-100" : "text-ink-400"}`} dir="ltr">
            {time}
          </span>
        )}
      </div>
    </motion.div>
  );
}
