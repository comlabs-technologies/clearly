"use client";

import { CreditCard, Landmark, Repeat } from "lucide-react";
import { DemoCard, DetailRow } from "./DemoShell";

export function BankingDemo() {
  return (
    <DemoCard className="relative">
      <div className="pointer-events-none select-none" aria-hidden="true">
        <div className="rounded-[12px] border border-hairline-dark bg-gradient-to-br from-white/[0.10] to-white/[0.03] p-3.5">
          <div className="flex items-start justify-between">
            <p className="text-[11px] text-dark-soft">Spending account</p>
            <CreditCard size={16} className="text-white/60" strokeWidth={1.8} />
          </div>
          <p className="mt-4 text-[16px] font-semibold tracking-[0.14em] tabular">
            •••• •••• •••• 4192
          </p>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-[11px] text-dark-soft">A. MARLOWE</span>
            <span className="text-[11px] tabular text-dark-soft">09 / 30</span>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2.5 rounded-[10px] border border-hairline-dark px-3 py-2">
            <Landmark size={15} className="text-white/60" strokeWidth={1.8} />
            <span className="text-[12px]">Local account details</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-[10px] border border-hairline-dark px-3 py-2">
            <Repeat size={15} className="text-white/60" strokeWidth={1.8} />
            <span className="text-[12px]">Recurring payments</span>
          </div>
        </div>

        <div className="mt-2 border-t border-hairline-dark pt-2">
          <DetailRow label="Spends from" value="Main balance" />
          <DetailRow label="Foreign exchange" value="At the interbank rate" />
        </div>
      </div>

      {/* Coming-soon overlay */}
      <div className="absolute inset-0 flex items-center justify-center rounded-panel bg-dark-raised/70 backdrop-blur-[3px]">
        <span className="rounded-full border border-hairline-dark bg-dark-raised px-3.5 py-2 text-[12px] font-semibold text-white/85">
          Coming soon
        </span>
      </div>
    </DemoCard>
  );
}
