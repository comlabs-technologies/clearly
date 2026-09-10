"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_PREMIUM } from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between children. */
  stagger?: number;
  delay?: number;
  onMount?: boolean;
};

/**
 * Parent that sequences its <StaggerItem> children. Children opt in by using
 * the exported item component so the variant names line up.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  onMount = false,
}: StaggerGroupProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const container = {
    hidden: {},
    shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const viewProps = onMount
    ? { animate: "shown" as const }
    : {
        whileInView: "shown" as const,
        viewport: { once: true, margin: "0px 0px -12% 0px" },
      };

  return (
    <motion.div className={className} initial="hidden" variants={container} {...viewProps}>
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  blur?: number;
  duration?: number;
};

export function StaggerItem({
  children,
  className,
  distance = 10,
  blur = 4,
  duration = 0.55,
}: StaggerItemProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance, filter: `blur(${blur}px)` },
        shown: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration, ease: EASE_PREMIUM },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
