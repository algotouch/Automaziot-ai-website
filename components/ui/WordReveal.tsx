"use client";

import { useReducedMotion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

type WordRevealProps = {
  children: React.ReactNode;
  delay?: number;
  step?: number;
  className?: string;
};

function toWords(node: React.ReactNode): Array<{ text: string; highlight?: boolean }> {
  const words: Array<{ text: string; highlight?: boolean }> = [];
  React.Children.forEach(node, (child) => {
    if (typeof child === "string") {
      child.split(/(\s+)/).forEach((segment) => {
        if (segment.length) words.push({ text: segment });
      });
    } else if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
      const inner = child.props.children;
      if (typeof inner === "string") {
        inner.split(/(\s+)/).forEach((segment) => {
          if (segment.length) words.push({ text: segment, highlight: true });
        });
      }
    }
  });
  return words;
}

export function WordReveal({ children, delay = 0, step = 0.05, className }: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = toWords(children);

  if (reduce) return <span className={className}>{children}</span>;

  let wordIndex = 0;
  return (
    <span className={cn("inline", className)}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w.text)) return <span key={i}>{w.text}</span>;
        const d = delay + wordIndex * step;
        wordIndex += 1;
        return (
          <span
            key={i}
            className={cn("reveal-word", w.highlight && "text-gradient-brand")}
            style={{ animationDelay: `${d}s` }}
          >
            {w.text}
          </span>
        );
      })}
    </span>
  );
}
