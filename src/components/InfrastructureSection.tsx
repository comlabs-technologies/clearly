"use client";

import { infrastructure } from "@/data/site";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";

/** Original geometric icon per technology — drawn, not imported. */
function SwatchIcon({ kind }: { kind: string }) {
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-[9px]"
      style={{ background: "linear-gradient(150deg, var(--accent-light), var(--accent))" }}
      aria-hidden="true"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        {kind === "chain" ? (
          <path
            d="M4 9h10M9 4v10"
            stroke="#0d1f16"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : null}
        {kind === "intents" ? (
          <path
            d="M3 12l4-6 4 4 4-6"
            stroke="#0d1f16"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
        {kind === "confidential" ? (
          <>
            <rect
              x="4"
              y="8"
              width="10"
              height="7"
              rx="2"
              stroke="#0d1f16"
              strokeWidth="1.8"
            />
            <path d="M6.5 8V6a2.5 2.5 0 015 0v2" stroke="#0d1f16" strokeWidth="1.8" />
          </>
        ) : null}
        {kind === "intelligence" ? (
          <>
            <circle cx="9" cy="9" r="2.2" stroke="#0d1f16" strokeWidth="1.8" />
            <path
              d="M9 3v1.6M9 13.4V15M3 9h1.6M13.4 9H15"
              stroke="#0d1f16"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        ) : null}
      </svg>
    </span>
  );
}

export function InfrastructureSection() {
  return (
    <section id="infrastructure" className="on-dark bg-dark text-white">
      <div className="page-rail rail-dark">
        <div className="gutter pt-section-sm md:pt-section">
          <Reveal>
            <h2 className="text-h2-mobile md:text-h2">
              Open infrastructure, all the way down.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-prose text-body text-dark-soft">
              Every layer of the account is independently verifiable, and none of it is
              ours alone to switch off.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-10 grid border-y border-hairline-dark sm:grid-cols-2 lg:grid-cols-4">
          {infrastructure.map((card) => (
            <StaggerItem
              key={card.id}
              className="group border-b border-hairline-dark last:border-b-0 sm:border-b sm:border-r sm:last:border-r-0 lg:border-b-0"
            >
              <div className="h-full bg-transparent p-6 transition-colors duration-[180ms] ease-out hover:bg-white/[0.025] md:p-8">
                <span className="block transition-[transform,filter] duration-[180ms] ease-out group-hover:-translate-y-0.5 group-hover:brightness-110">
                  <SwatchIcon kind={card.swatch} />
                </span>
                <h3 className="mt-5 text-[15px] font-semibold">{card.name}</h3>
                <p className="mt-2 text-[14px] leading-[22px] text-dark-soft">{card.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
