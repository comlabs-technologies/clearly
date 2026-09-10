"use client";

import { Search } from "lucide-react";
import { useDemoSequence } from "@/lib/useDemoSequence";
import { DemoCard, DetailRow, StatusLine, TokenDisc } from "./DemoShell";

const assets = [
  {
    symbol: "N",
    name: "Northport Index",
    meta: "Equity basket",
    price: "$214.86",
    change: "+0.94%",
    from: "#7fd6f0",
    to: "#2f8fb0",
  },
  {
    symbol: "G",
    name: "Gold, 1oz",
    meta: "Precious metal",
    price: "$2,388.40",
    change: "+0.21%",
    from: "#e8c37a",
    to: "#b98d2f",
  },
];

export function RwaDemo({ runKey }: { runKey: number }) {
  const stage = useDemoSequence([1000, 1400], runKey);

  return (
    <DemoCard>
      <div className="flex items-center gap-2 rounded-[10px] border border-hairline-dark bg-white/[0.04] px-3 py-2">
        <Search size={14} className="text-dark-soft" strokeWidth={2} aria-hidden="true" />
        <span className="text-[12px] text-dark-soft">
          {stage === 0 ? "Searching markets…" : "Search stocks, bonds, metals"}
        </span>
      </div>

      <ul className="mt-3 space-y-2">
        {assets.map((a) => (
          <li
            key={a.symbol}
            className="flex items-center gap-2.5 rounded-[10px] border border-hairline-dark px-3 py-2.5"
          >
            <TokenDisc label={a.symbol} from={a.from} to={a.to} size={28} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold">{a.name}</p>
              <p className="text-[11px] text-dark-soft">{a.meta}</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-semibold tabular">{a.price}</p>
              <p className="text-[11px] font-semibold tabular text-accent">{a.change}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 border-t border-hairline-dark pt-2">
        <DetailRow label="Allocation" value="$4,000.00" emphasis />
        <DetailRow label="Fractional units" value="18.62 + 0.84" />
      </div>

      <div className="mt-3">
        <StatusLine
          state={stage === 0 ? "idle" : stage === 1 ? "pending" : "done"}
          pendingLabel="Placing allocation"
          doneLabel="Positions opened"
        />
      </div>
    </DemoCard>
  );
}
