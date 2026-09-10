"use client";

import { ArrowDown } from "lucide-react";
import { useDemoSequence } from "@/lib/useDemoSequence";
import { DemoCard, DetailRow, StatusLine, TokenDisc } from "./DemoShell";

export function SwapDemo({ runKey }: { runKey: number }) {
  // idle -> quoting -> settled
  const stage = useDemoSequence([900, 1500], runKey);

  return (
    <DemoCard>
      <div className="space-y-1.5">
        <div className="rounded-[12px] bg-white/[0.04] p-3">
          <p className="text-[11px] text-dark-soft">You pay</p>
          <div className="mt-1.5 flex items-center gap-2.5">
            <TokenDisc label="U" from="#4d8dff" to="#2b5fd0" />
            <div className="min-w-0">
              <p className="text-[16px] font-semibold leading-5 tabular">9,000.00</p>
              <p className="text-[11px] text-dark-soft">Dollar stable · $9,000</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <span className="-my-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-hairline-dark bg-dark-raised">
            <ArrowDown size={13} strokeWidth={2} aria-hidden="true" />
          </span>
        </div>

        <div className="rounded-[12px] bg-white/[0.04] p-3">
          <p className="text-[11px] text-dark-soft">You receive</p>
          <div className="mt-1.5 flex items-center gap-2.5">
            <TokenDisc label="B" from="#f7b955" to="#e08b1f" />
            <div className="min-w-0">
              <p className="text-[16px] font-semibold leading-5 tabular">
                {stage === 0 ? "—" : "0.13711"}
              </p>
              <p className="text-[11px] text-dark-soft">Reserve asset · $8,995</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-hairline-dark pt-2">
        <DetailRow
          label="Exchange rate"
          value={stage === 0 ? "Finding best price…" : "1 BTC = 65,640.12"}
        />
        <DetailRow label="Max slippage" value="0.50%" />
        <DetailRow label="Minimum received" value="0.13642" emphasis />
      </div>

      <div className="mt-3">
        <StatusLine
          state={stage === 0 ? "pending" : stage === 1 ? "pending" : "done"}
          pendingLabel={stage === 0 ? "Requesting quotes" : "Routing to best market maker"}
          doneLabel="Swap complete"
        />
      </div>
    </DemoCard>
  );
}
