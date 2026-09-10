"use client";

import { useDemoSequence } from "@/lib/useDemoSequence";
import { DemoCard, DetailRow, StatusLine, TokenDisc } from "./DemoShell";

export function SendDemo({ runKey }: { runKey: number }) {
  const stage = useDemoSequence([1100, 1400], runKey);

  return (
    <DemoCard>
      <div className="grid grid-cols-2 gap-1 rounded-[10px] bg-white/[0.06] p-1" role="presentation">
        <span className="rounded-[7px] bg-white px-3 py-1.5 text-center text-[12px] font-semibold text-ink">
          Send
        </span>
        <span className="px-3 py-1.5 text-center text-[12px] font-semibold text-dark-soft">
          Receive
        </span>
      </div>

      <div className="mt-3 rounded-[12px] bg-white/[0.04] p-3">
        <p className="text-[11px] text-dark-soft">Amount</p>
        <p className="mt-1 text-[22px] font-semibold leading-7 tabular">$1,450.00</p>
        <p className="text-[11px] text-dark-soft">to @marlowe.clear</p>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-hairline-dark px-3 py-2">
          <TokenDisc label="U" from="#4d8dff" to="#2b5fd0" size={26} />
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold">Dollar stable</p>
            <p className="text-[11px] text-dark-soft">Balance $12,480.22</p>
          </div>
        </div>
        <div className="rounded-[10px] border border-hairline-dark px-3 py-2">
          <DetailRow label="Network" value="Auto — cheapest route" />
          <DetailRow label="Paying from" value="Main balance" />
          <DetailRow label="Network fee" value="$0.02" emphasis />
        </div>
      </div>

      <div className="mt-3">
        <StatusLine
          state={stage === 0 ? "pending" : stage === 1 ? "pending" : "done"}
          pendingLabel={stage === 0 ? "Checking recipient" : "Broadcasting transfer"}
          doneLabel="Sent successfully"
        />
      </div>
    </DemoCard>
  );
}
