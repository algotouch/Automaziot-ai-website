"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 240, damping: 30, mass: 0.25 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: x, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700"
    />
  );
}
