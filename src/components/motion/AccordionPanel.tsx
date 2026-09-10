"use client";

import type { ReactNode } from "react";

type AccordionPanelProps = {
  open: boolean;
  id?: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Height transition driven by CSS grid template rows, so the panel animates to
 * its measured content height without JavaScript measurement.
 */
export function AccordionPanel({
  open,
  id,
  labelledBy,
  children,
  className,
}: AccordionPanelProps) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      className={`accordion-panel ${className ?? ""}`}
      data-open={open}
      {...(open ? {} : { inert: "" as unknown as boolean })}
    >
      <div>{children}</div>
    </div>
  );
}
