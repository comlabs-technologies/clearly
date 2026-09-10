"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useDemoSequence } from "@/lib/useDemoSequence";
import { DemoCard, StatusLine, TokenDisc } from "./DemoShell";

const positions = [
  {
    symbol: "U",
    name: "Dollar stable",
    venue: "Short-duration treasury",
    apy: "8.62%",
    amount: "$14,200.00",
    from: "#4d8dff",
    to: "#2b5fd0",
  },
  {
    symbol: "E",
    name: "Staked ether",
    venue: "Validator set",
    apy: "3.41%",
    amount: "$6,874.88",
    from: "#8b9dff",
    to: "#5566d8",
  },
];

/** Live-looking earnings figure that ticks up briefly after the deposit lands. */
function EarningsCounter({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(4.2891);

  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => setValue((v) => v + 0.0007), 120);
    return () => clearInterval(id);
  }, [active, reduced]);

  return (
    <span className="text-[20px] font-semibold leading-6 tabular text-accent">
      +${value.toFixed(4)}
    </span>
  );
}

export function EarnDemo({ runKey }: { runKey: number }) {
  const stage = useDemoSequence([1100, 1300], runKey);

  return (
    <DemoCard>
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
        Open strategies
      </p>

      <ul className="mt-2 space-y-2">
        {positions.map((p) => (
          <li
            key={p.symbol}
            className="flex items-center gap-2.5 rounded-[10px] border border-hairline-dark px-3 py-2.5"
          >
            <TokenDisc label={p.symbol} from={p.from} to={p.to} size={28} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold">{p.name}</p>
              <p className="truncate text-[11px] text-dark-soft">{p.venue}</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-semibold tabular text-accent">{p.apy}</p>
              <p className="text-[11px] tabular text-dark-soft">{p.amount}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 rounded-[12px] bg-white/[0.04] p-3">
        <p className="text-[11px] text-dark-soft">Earned this month</p>
        <div className="mt-0.5">
          <EarningsCounter active={stage >= 2} />
        </div>
      </div>

      <div className="mt-3">
        <StatusLine
          state={stage === 0 ? "idle" : stage === 1 ? "pending" : "done"}
          pendingLabel="Depositing $2,000"
          doneLabel="Deposit earning from this block"
        />
      </div>
    </DemoCard>
  );
}
