"use client";

import { stats } from "@/data/site";
import { CountUp } from "./motion/CountUp";

export function StatsRow() {
  return (
    <section id="stats" className="on-dark bg-dark text-white">
      <div className="page-rail rail-dark">
        <div className="grid border-b border-hairline-dark sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.id}
              className="border-b border-hairline-dark p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:p-8"
            >
              <p className="text-[36px] font-semibold leading-[42px] tracking-[-0.035em] md:text-[40px] md:leading-[46px]">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-[13px] text-dark-soft">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="plus-grid plus-grid-dark h-24 w-full" aria-hidden="true" />
      </div>
    </section>
  );
}
