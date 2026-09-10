"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_PREMIUM } from "@/lib/motion";

type CrossfadePanelProps = {
  /** Changing this key swaps the panel. */
  panelKey: string;
  children: ReactNode;
  className?: string;
};

/**
 * Swaps one panel for another inside a fixed-height stage: the outgoing panel
 * lifts and blurs out while the incoming panel settles in from below.
 */
export function CrossfadePanel({ panelKey, children, className }: CrossfadePanelProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={panelKey}
        className={className}
        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(5px)" }}
        transition={{ duration: 0.22, ease: EASE_PREMIUM }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
