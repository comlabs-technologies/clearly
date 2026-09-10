"use client";

import { Lock } from "lucide-react";
import { useDemoSequence } from "@/lib/useDemoSequence";
import { DemoCard } from "./DemoShell";

export function AiDemo({ runKey }: { runKey: number }) {
  const stage = useDemoSequence([600, 1200], runKey);

  return (
    <DemoCard>
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
        Ask your portfolio
      </p>

      <div className="mt-3 space-y-2.5">
        <div
          className="ml-auto max-w-[85%] rounded-[12px] rounded-br-[4px] bg-white/[0.09] px-3 py-2 text-[12px] leading-[18px] transition-opacity duration-300"
          style={{ opacity: stage >= 1 ? 1 : 0 }}
        >
          How much of my portfolio is sitting in cash-like positions?
        </div>

        <div
          className="max-w-[90%] rounded-[12px] rounded-bl-[4px] border border-hairline-dark bg-white/[0.04] px-3 py-2 text-[12px] leading-[18px] text-white/85 transition-opacity duration-300"
          style={{ opacity: stage >= 2 ? 1 : 0 }}
        >
          About 24% — $36,180 across dollar stables and treasury strategies. That is up
          from 17% last month, mostly from the position you closed on the 4th.
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-[10px] border border-accent/25 bg-accent/[0.08] px-3 py-2">
        <Lock size={13} className="text-accent" strokeWidth={2} aria-hidden="true" />
        <span className="text-[11px] font-semibold text-accent">
          Answered inside a private enclave
        </span>
      </div>

      <p className="mt-2 text-[11px] leading-4 text-dark-soft">
        Your balances are never published to produce an answer.
      </p>
    </DemoCard>
  );
}
