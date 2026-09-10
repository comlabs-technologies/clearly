"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRightLeft,
  ChevronRight,
  Clock3,
  Coins,
  LayoutGrid,
  LineChart,
  PiggyBank,
  Users,
} from "lucide-react";
import { BrandMark } from "./BrandMark";
import { EASE_PREMIUM } from "@/lib/motion";

const navPrimary = [
  { label: "Portfolio", icon: LayoutGrid, active: true },
  { label: "Swap", icon: ArrowRightLeft, active: false },
];

const navMarkets = [
  { label: "Assets", icon: Coins },
  { label: "Positions", icon: LineChart },
  { label: "Earn", icon: PiggyBank },
];

const navFooter = [
  { label: "History", icon: Clock3 },
  { label: "Contacts", icon: Users },
];

type Avatar = { label: string; from: string; to: string };

type BalanceRow = {
  id: string;
  title: string;
  meta: string;
  value: string;
  change?: { text: string; positive: boolean };
  avatars: Avatar[];
  extra?: string;
};

const rows: BalanceRow[] = [
  {
    id: "assets",
    title: "Digital assets",
    meta: "8 assets",
    value: "$63,148.72",
    avatars: [
      { label: "A", from: "#f7b955", to: "#e08b1f" },
      { label: "E", from: "#8b9dff", to: "#5566d8" },
      { label: "N", from: "#00ec97", to: "#0bb673" },
    ],
    extra: "+5 more",
  },
  {
    id: "markets",
    title: "Tokenised markets",
    meta: "6 holdings",
    value: "$37,429.15",
    avatars: [
      { label: "S", from: "#f16565", to: "#c53030" },
      { label: "G", from: "#e8c37a", to: "#b98d2f" },
      { label: "T", from: "#7fd6f0", to: "#2f8fb0" },
    ],
    extra: "+3 more",
  },
  {
    id: "positions",
    title: "Perpetual positions",
    meta: "4 open",
    value: "$28,563.40",
    change: { text: "+$1,736", positive: true },
    avatars: [],
    extra: "unrealised P&L",
  },
  {
    id: "earn",
    title: "Earn",
    meta: "2 strategies",
    value: "$21,074.88",
    change: { text: "+8.6%", positive: true },
    avatars: [],
    extra: "blended APY",
  },
];

function AvatarStack({ avatars }: { avatars: Avatar[] }) {
  if (avatars.length === 0) return null;
  return (
    <div className="flex -space-x-1.5" aria-hidden="true">
      {avatars.map((a) => (
        <span
          key={a.label}
          className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-white"
          style={{ background: `linear-gradient(140deg, ${a.from}, ${a.to})` }}
        >
          {a.label}
        </span>
      ))}
    </div>
  );
}

/**
 * Original portfolio application mockup, built entirely from semantic markup.
 * The entrance runs once: frame, then header, then the balance container and
 * its rows. Nothing loops after it settles.
 */
export function PortfolioProductDemo({ baseDelay = 0 }: { baseDelay?: number }) {
  const reduced = useReducedMotion();

  const step = (delay: number, y = 8) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: baseDelay + delay, ease: EASE_PREMIUM },
        };

  return (
    <div className="relative">
      {/* Live demo label, overlapping the top-left edge of the frame */}
      <motion.div
        className="absolute -top-3.5 left-4 z-20 sm:left-8"
        initial={reduced ? false : { opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: baseDelay + 0.1, ease: EASE_PREMIUM }}
      >
        {/* Everything sits inside the pill so it stays legible where the label
            overlaps the dark frame beneath it. */}
        <span className="flex items-center gap-2 rounded-full border border-hairline bg-white py-1.5 pl-3 pr-3.5 text-[12px] font-semibold text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Live demo
          <span
            className="hidden h-3 w-px bg-[color:var(--border-light)] sm:block"
            aria-hidden="true"
          />
          <span className="hidden font-normal text-ink-soft sm:inline">
            Explore the interface below
          </span>
        </span>
      </motion.div>

      <motion.div
        className="overflow-hidden rounded-panel bg-dark-raised p-2 sm:p-2.5"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: baseDelay, ease: EASE_PREMIUM }}
      >
        <div className="flex min-h-[420px] gap-2 sm:min-h-[460px]">
          {/* Sidebar — desktop only */}
          <nav
            className="hidden w-[190px] shrink-0 flex-col rounded-[12px] px-2 py-3 md:flex"
            aria-label="Demo application"
          >
            <div className="px-2 pb-5">
              <BrandMark tone="dark" />
            </div>

            <ul className="space-y-0.5">
              {navPrimary.map((item) => (
                <li key={item.label}>
                  <span
                    className={`flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[13px] ${
                      item.active
                        ? "bg-white/10 font-semibold text-white"
                        : "text-dark-soft"
                    }`}
                  >
                    <item.icon size={15} strokeWidth={1.8} aria-hidden="true" />
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <p className="px-2.5 pb-1.5 pt-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/35">
              Markets
            </p>
            <ul className="space-y-0.5">
              {navMarkets.map((item) => (
                <li key={item.label}>
                  <span className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[13px] text-dark-soft">
                    <item.icon size={15} strokeWidth={1.8} aria-hidden="true" />
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mt-auto space-y-0.5 pt-6">
              {navFooter.map((item) => (
                <li key={item.label}>
                  <span className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[13px] text-dark-soft">
                    <item.icon size={15} strokeWidth={1.8} aria-hidden="true" />
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Application canvas */}
          <div className="min-w-0 flex-1 rounded-[12px] bg-white p-4 sm:p-6">
            {/* Slim top navigation replaces the sidebar on small screens */}
            <div className="mb-5 flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-hairline pb-3 md:hidden">
              {["Portfolio", "Swap", "Assets", "Earn"].map((label, i) => (
                <span
                  key={label}
                  className={`shrink-0 rounded-[8px] px-2.5 py-1.5 text-[12px] ${
                    i === 0 ? "bg-surface-muted font-semibold text-ink" : "text-ink-soft"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>

            <motion.div
              className="flex flex-wrap items-start justify-between gap-3"
              {...step(0.18, 6)}
            >
              <div>
                <p className="text-[13px] text-ink-soft">Total balance</p>
                <p className="mt-1 text-[28px] font-semibold leading-[34px] tracking-[-0.03em] tabular sm:text-[32px] sm:leading-[38px]">
                  $150,216.15
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="btn btn-primary !min-h-[36px] !px-3.5 !py-2 !text-[13px]">
                  <ArrowDownLeft size={14} strokeWidth={2.2} aria-hidden="true" />
                  Receive
                </span>
                <span className="btn btn-primary !min-h-[36px] !px-3.5 !py-2 !text-[13px]">
                  <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                  Send
                </span>
              </div>
            </motion.div>

            <motion.div
              className="mt-5 overflow-hidden rounded-[12px] border border-hairline"
              {...step(0.3, 8)}
            >
              <p className="border-b border-hairline bg-surface px-4 py-2.5 text-[12px] font-semibold text-ink-soft">
                Balances
              </p>

              <ul>
                {rows.map((row, i) => (
                  <motion.li
                    key={row.id}
                    className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3.5 last:border-b-0"
                    {...step(0.42 + i * 0.065, 6)}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold">{row.title}</p>
                      <p className="text-[12px] text-ink-soft">{row.meta}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="hidden items-center gap-2 sm:flex">
                        <AvatarStack avatars={row.avatars} />
                        {row.change ? (
                          <span
                            className={`text-[12px] font-semibold tabular ${
                              row.change.positive ? "text-[#0f9d63]" : "text-[#c53030]"
                            }`}
                          >
                            {row.change.text}
                          </span>
                        ) : null}
                        {row.extra ? (
                          <span className="text-[12px] text-ink-soft">{row.extra}</span>
                        ) : null}
                      </div>
                      <span className="text-[13px] font-semibold tabular">{row.value}</span>
                      <ChevronRight
                        size={15}
                        className="text-ink-soft"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
