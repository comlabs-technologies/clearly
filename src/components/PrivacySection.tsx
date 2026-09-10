"use client";

import { Eye, EyeOff, SlidersHorizontal } from "lucide-react";
import { privacyFeatures } from "@/data/site";
import { Marquee } from "./motion/Marquee";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";

const icons = {
  shield: Eye,
  "eye-off": EyeOff,
  sliders: SlidersHorizontal,
};

/** Original circular asset marks — coloured discs with a letter, no third-party logos. */
const discs = [
  { label: "A", from: "#f7b955", to: "#e08b1f" },
  { label: "E", from: "#8b9dff", to: "#5566d8" },
  { label: "C", from: "#00ec97", to: "#0bb673" },
  { label: "S", from: "#f16565", to: "#c53030" },
  { label: "M", from: "#7fd6f0", to: "#2f8fb0" },
  { label: "T", from: "#c58bf0", to: "#8b4fc0" },
  { label: "G", from: "#e8c37a", to: "#b98d2f" },
  { label: "R", from: "#6ee7c5", to: "#22a58a" },
  { label: "L", from: "#ffa4c4", to: "#d4547f" },
  { label: "V", from: "#9fb4ff", to: "#4a6bd8" },
  { label: "K", from: "#ffd08a", to: "#d99631" },
  { label: "D", from: "#8de0a5", to: "#3ba05e" },
];

function DiscRow() {
  return (
    <div className="flex items-center gap-5 pr-5">
      {discs.map((d, i) => (
        <span
          key={`${d.label}-${i}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[14px] font-bold text-white"
          style={{ background: `linear-gradient(140deg, ${d.from}, ${d.to})` }}
          aria-hidden="true"
        >
          {d.label}
        </span>
      ))}
    </div>
  );
}

export function PrivacySection() {
  return (
    <section id="privacy" className="on-dark bg-dark text-white">
      <div className="page-rail rail-dark">
        <div className="gutter pt-section-sm md:pt-section">
          <Reveal>
            <h2 className="max-w-[24ch] text-h2-mobile md:text-h2">
              Keep your financial activity confidential.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-prose text-body text-dark-soft">
              Balances and transactions stay confidential when you want them to, with control
              over what you reveal. No separate tools, and no complicated workflow.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid border-y border-hairline-dark md:grid-cols-3">
          {privacyFeatures.map((f) => {
            const Icon = icons[f.icon];
            return (
              <StaggerItem
                key={f.id}
                className="border-b border-hairline-dark p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-8"
              >
                <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-[9px] border border-accent/20 bg-accent/10">
                  <Icon size={16} className="text-accent" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3 className="text-[15px] font-semibold leading-6">{f.title}</h3>
                <p className="mt-2 max-w-prose text-[14px] leading-[22px] text-dark-soft">
                  {f.body}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Ticker with a fixed confidentiality veil */}
        <div className="relative overflow-hidden py-10">
          <Marquee duration={160} pauseOnHover>
            <DiscRow />
          </Marquee>

          {/* Veil: identities become confidential as they pass underneath */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[58%] backdrop-blur-md sm:w-[46%]"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(90deg, rgba(38,38,38,0) 0%, rgba(38,38,38,0.72) 18%, rgba(38,38,38,0.9) 55%, rgba(38,38,38,0.94) 100%)",
              maskImage:
                "linear-gradient(90deg, transparent 0%, #000 16%, #000 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, #000 16%, #000 100%)",
            }}
          />
        </div>

        <div className="plus-grid plus-grid-dark h-20 w-full" aria-hidden="true" />
      </div>
    </section>
  );
}
