"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Milliseconds. */
  duration?: number;
  className?: string;
};

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/** Counts from zero to `value` once, when the element first enters view. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 900,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const [counted, setCounted] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out without overshoot.
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounted(value * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCounted(value);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduced]);

  // With reduced motion the final figure is shown outright rather than counted.
  const display = reduced ? value : counted;

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {prefix}
      {format(display, decimals)}
      {suffix}
    </span>
  );
}
