type BrandMarkProps = {
  className?: string;
  /** Renders the wordmark beside the glyph. */
  withWordmark?: boolean;
  tone?: "light" | "dark";
};

/**
 * Original brand identity: a rounded square holding an aperture-like glyph of
 * two offset chevrons, suggesting a clear line of sight through a ledger.
 */
export function BrandMark({
  className,
  withWordmark = true,
  tone = "light",
}: BrandMarkProps) {
  const wordColor = tone === "light" ? "text-ink" : "text-white";

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="26" height="26" rx="7" fill="var(--accent)" />
        <path
          d="M8 8.6L12.3 13 8 17.4"
          stroke="#0d1f16"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.4 17.4h3.9"
          stroke="#0d1f16"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
      {withWordmark ? (
        <span className={`text-[17px] font-semibold tracking-[-0.03em] ${wordColor}`}>
          clearly
        </span>
      ) : null}
    </span>
  );
}
