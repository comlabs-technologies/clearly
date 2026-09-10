"use client";

import { motion, useReducedMotion } from "motion/react";
import { PortfolioProductDemo } from "./PortfolioProductDemo";
import { EASE_PREMIUM, HERO_START_DELAY } from "@/lib/motion";

const line = (delay: number, from: "up" | "down", reduced: boolean | null) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: from === "up" ? 10 : -10, filter: "blur(5px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.62, delay, ease: EASE_PREMIUM },
      };

export function Hero() {
  const reduced = useReducedMotion();
  const t = HERO_START_DELAY;

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* Green field behind the lower portion of the product frame */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(101,251,170,0) 0%, var(--accent-light) 22%, var(--accent-mid) 62%, var(--accent) 100%)",
        }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: t + 0.62, ease: EASE_PREMIUM }}
      />

      <div className="page-rail gutter relative">
        <div className="pt-[64px] md:pt-[96px]">
          <h1 className="max-w-[15ch] text-hero-mobile md:text-hero-tablet lg:text-hero">
            <motion.span className="block" {...line(t, "up", reduced)}>
              Your financial life,
            </motion.span>
            <motion.span className="block" {...line(t + 0.09, "up", reduced)}>
              onchain &amp; confidential.
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-prose text-body text-ink-soft"
            {...line(t + 0.2, "down", reduced)}
          >
            Crypto, stocks, bonds, precious metals, yield and more —
            <br className="hidden sm:block" /> brought together in one borderless account,
            confidential by design.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5"
            {...line(t + 0.31, "up", reduced)}
          >
            <a id="hero-cta" href="#final-cta" className="btn btn-primary">
              Create account
            </a>
            <p className="text-[13px] leading-5 text-ink-soft">
              No email. No documents. Ready in seconds.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="pb-16 pt-12 md:pt-16"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: t + 0.55, ease: EASE_PREMIUM }}
        >
          <PortfolioProductDemo baseDelay={t + 0.6} />
        </motion.div>
      </div>
    </section>
  );
}
