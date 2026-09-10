"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full pass. */
  duration?: number;
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * Seamless horizontal ticker. The row is rendered twice and the track is
 * offset by half its width, so the loop has no visible seam.
 */
export function Marquee({
  children,
  duration = 160,
  pauseOnHover = false,
  className,
}: MarqueeProps) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div
        className="ticker-track"
        style={
          {
            "--ticker-duration": `${duration}s`,
            "--ticker-hover-state": pauseOnHover ? "paused" : "running",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
