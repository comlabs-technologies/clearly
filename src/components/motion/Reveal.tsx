"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_PREMIUM, type RevealDirection } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  /** Seconds. */
  duration?: number;
  from?: RevealDirection;
  distance?: number;
  blur?: number;
  className?: string;
  /** Animate on mount instead of on scroll entry. */
  onMount?: boolean;
  as?: "div" | "span" | "li" | "section";
};

/**
 * Single-element entrance. Translates + de-blurs into place, or renders
 * statically when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  from = "up",
  distance = 10,
  blur = 5,
  className,
  onMount = false,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const offset = from === "up" ? distance : -distance;

  const animation = {
    initial: { opacity: 0, y: offset, filter: `blur(${blur}px)` },
    to: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration, delay, ease: EASE_PREMIUM },
  };

  if (onMount) {
    return (
      <Tag
        className={className}
        initial={animation.initial}
        animate={animation.to}
        transition={animation.transition}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={animation.initial}
      whileInView={animation.to}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={animation.transition}
    >
      {children}
    </Tag>
  );
}
