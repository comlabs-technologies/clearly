"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Steps a demo through its stages once per `runKey`. Each entry in `timings`
 * is the delay in milliseconds before advancing to the next stage. With
 * reduced motion the demo reports its final resting stage immediately.
 */
export function useDemoSequence(timings: number[], runKey: number | string) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [seenKey, setSeenKey] = useState(runKey);

  // Reset during render when the demo is re-selected — the sanctioned way to
  // adjust state from a changed input without an extra render pass.
  if (seenKey !== runKey) {
    setSeenKey(runKey);
    setStage(0);
  }

  useEffect(() => {
    if (reduced) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;

    timings.forEach((delay, index) => {
      elapsed += delay;
      timers.push(setTimeout(() => setStage(index + 1), elapsed));
    });

    return () => timers.forEach(clearTimeout);
    // `timings` is a literal recreated each render; the run is keyed instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey, reduced]);

  return reduced ? timings.length : stage;
}
