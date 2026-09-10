"use client";

import { partners } from "@/data/site";

/**
 * Monochrome wordmarks set in the page typeface — original names, equal
 * visual weight, no third-party corporate logos.
 */
function Wordmark({ name }: { name: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2 px-6 py-5 text-[15px] font-semibold tracking-[-0.02em] text-white/45 sm:px-0">
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="opacity-60">
        <rect x="0.5" y="0.5" width="11" height="11" rx="3" fill="none" stroke="currentColor" />
      </svg>
      {name}
    </span>
  );
}

export function PartnerStrip() {
  return (
    <div className="on-dark border-b border-hairline-dark bg-dark">
      <div className="page-rail rail-dark">
        <div className="no-scrollbar overflow-x-auto lg:overflow-visible">
          <div className="flex min-w-max items-center justify-between gap-2 px-5 lg:min-w-0 lg:px-8 lg:py-6">
            {partners.map((p) => (
              <Wordmark key={p} name={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
