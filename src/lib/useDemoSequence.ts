"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Steps a demo through its stages once per `runKey`. Each entry in `timings`
 * is the delay in milliseconds before advancing to the next stage. With
 * reduced motion the demo jumps straight to its final resting stage.
 */
export function useDemoSequence(timings: number[], runKey: number | string) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStage(timings.length);
      return;
    }

    setStage(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;

    timings.forEach((delay, index) => {
      elapsed += delay;
      timers.push(setTimeout(() => setStage(index + 1), elapsed));
    });

    return () => timers.forEach(clearTimeout);
    // Re-running is intentional whenever the demo is re-selected.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey, reduced]);

  return stage;
}
