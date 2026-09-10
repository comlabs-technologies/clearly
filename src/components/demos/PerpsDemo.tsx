"use client";

import { useDemoSequence } from "@/lib/useDemoSequence";
import { DemoCard, DetailRow, StatusLine, TokenDisc } from "./DemoShell";

/** Restrained position chart — a single stroked path, no grid or axes. */
function PositionChart({ drawn }: { drawn: boolean }) {
  const path =
    "M0 46 L18 41 L36 44 L54 34 L72 37 L90 28 L108 30 L126 21 L144 24 L162 14 L180 9";

  return (
    <svg
      viewBox="0 0 180 56"
      className="h-[56px] w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: drawn ? 0 : 1,
          transition: "stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </svg>
  );
}

export function PerpsDemo({ runKey }: { runKey: number }) {
  const stage = useDemoSequence([700, 1500], runKey);

  return (
    <DemoCard>
      <div className="flex items-center gap-2.5">
        <TokenDisc label="B" from="#f7b955" to="#e08b1f" size={28} />
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold">Reserve asset · perpetual</p>
          <p className="text-[11px] text-dark-soft">Isolated margin</p>
        </div>
        <span className="rounded-[6px] bg-accent/12 px-2 py-1 text-[11px] font-semibold text-accent">
          Long 5×
        </span>
      </div>

      <div className="mt-3 rounded-[12px] bg-white/[0.04] p-3">
        <p className="text-[11px] text-dark-soft">Unrealised P&amp;L</p>
        <p className="mt-0.5 text-[22px] font-semibold leading-7 tabular text-accent">
          +$1,736.04
        </p>
        <div className="mt-2">
          <PositionChart drawn={stage >= 1} />
        </div>
      </div>

      <div className="mt-2 border-t border-hairline-dark pt-2">
        <DetailRow label="Entry price" value="$62,410.00" />
        <DetailRow label="Mark price" value="$64,592.30" />
        <DetailRow label="Liquidation" value="$52,880.00" emphasis />
      </div>

      <div className="mt-3">
        <StatusLine
          state={stage === 0 ? "idle" : stage === 1 ? "pending" : "done"}
          pendingLabel="Submitting margin update"
          doneLabel="Position updated"
        />
      </div>
    </DemoCard>
  );
}
