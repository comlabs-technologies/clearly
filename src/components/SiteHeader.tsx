"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandMark } from "./BrandMark";

/**
 * 72px sticky header. The compact primary CTA stays hidden until the hero's
 * own call to action has scrolled out of view, then reverses cleanly on the
 * way back up.
 */
export function SiteHeader() {
  const [ctaVisible, setCtaVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const target = document.getElementById("hero-cta");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reveal once the hero action is leaving the viewport upwards.
        setCtaVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { rootMargin: "-8px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 h-[72px] w-full border-b border-hairline bg-white">
      <div className="page-rail gutter flex h-[72px] items-center justify-between">
        <a
          href="#top"
          className="flex items-center rounded-[6px]"
          aria-label="Clearly — home"
        >
          <BrandMark />
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#faq" className="btn btn-tertiary">
            Log in
          </a>

          <AnimatePresence initial={false}>
            {ctaVisible ? (
              <motion.a
                href="#final-cta"
                className="btn btn-primary !min-h-[40px] !px-4 !py-2"
                initial={reduced ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Create account
              </motion.a>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
