import type { ReactNode } from "react";

/** Dark application card that every capability demo is presented inside. */
export function DemoCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-[340px] rounded-panel border border-hairline-dark bg-dark-raised p-4 text-white ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}

/** Label / value line used across the demos. */
export function DetailRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-[12px] text-dark-soft">{label}</span>
      <span
        className={`text-[12px] tabular ${
          emphasis ? "font-semibold text-white" : "text-white/85"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function TokenDisc({
  label,
  from,
  to,
  size = 32,
}: {
  label: string;
  from: string;
  to: string;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: `linear-gradient(140deg, ${from}, ${to})`,
      }}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

/** Progress / success footer shared by the transactional demos. */
export function StatusLine({
  state,
  pendingLabel,
  doneLabel,
}: {
  state: "idle" | "pending" | "done";
  pendingLabel: string;
  doneLabel: string;
}) {
  if (state === "idle") {
    return <div className="h-[38px]" aria-hidden="true" />;
  }

  const done = state === "done";

  return (
    <div
      className={`flex h-[38px] items-center gap-2 rounded-[10px] border px-3 text-[12px] font-semibold ${
        done
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-hairline-dark bg-white/5 text-dark-soft"
      }`}
      role="status"
      aria-live="polite"
    >
      {done ? (
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <circle cx="7" cy="7" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M4.2 7.2l2 2 3.6-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <span className="relative flex h-3.5 w-3.5 items-center justify-center" aria-hidden="true">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-[1.6px] border-white/25 border-t-white/80" />
        </span>
      )}
      {done ? doneLabel : pendingLabel}
    </div>
  );
}
