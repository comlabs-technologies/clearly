"use client";

import { useState } from "react";
import { capabilities } from "@/data/site";
import { AccordionPanel } from "./motion/AccordionPanel";
import { CrossfadePanel } from "./motion/CrossfadePanel";
import { Reveal } from "./motion/Reveal";
import { SwapDemo } from "./demos/SwapDemo";
import { SendDemo } from "./demos/SendDemo";
import { RwaDemo } from "./demos/RwaDemo";
import { EarnDemo } from "./demos/EarnDemo";
import { PerpsDemo } from "./demos/PerpsDemo";
import { BankingDemo } from "./demos/BankingDemo";
import { AiDemo } from "./demos/AiDemo";

function DemoFor({ id, runKey }: { id: string; runKey: number }) {
  switch (id) {
    case "swap":
      return <SwapDemo runKey={runKey} />;
    case "send":
      return <SendDemo runKey={runKey} />;
    case "rwa":
      return <RwaDemo runKey={runKey} />;
    case "earn":
      return <EarnDemo runKey={runKey} />;
    case "perps":
      return <PerpsDemo runKey={runKey} />;
    case "banking":
      return <BankingDemo />;
    case "ai":
      return <AiDemo runKey={runKey} />;
    default:
      return null;
  }
}

/** Vivid green stage the demos sit on. */
function DemoStage({
  id,
  runKey,
  className,
}: {
  id: string;
  runKey: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center px-5 py-8 ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(160deg, var(--accent-light) 0%, var(--accent-mid) 48%, var(--accent) 100%)",
      }}
    >
      <CrossfadePanel panelKey={`${id}-${runKey}`} className="flex w-full justify-center">
        <DemoFor id={id} runKey={runKey} />
      </CrossfadePanel>
    </div>
  );
}

export function CapabilitiesSection() {
  const [openId, setOpenId] = useState(capabilities[0].id);
  const [runKey, setRunKey] = useState(0);

  const select = (id: string) => {
    if (id === openId) return;
    setOpenId(id);
    setRunKey((k) => k + 1);
  };

  return (
    <section id="capabilities" className="bg-white">
      <div className="page-rail">
        <div className="gutter pb-12 pt-section-sm md:pb-16 md:pt-section">
          <Reveal>
            <h2 className="max-w-[22ch] text-h2-mobile md:text-h2">
              Your money always wanted to do more. Now it can.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-prose text-body text-ink-soft">
              Move it, trade it, invest it, and earn on it — from one account, without
              leaving for a different app each time.
            </p>
          </Reveal>
        </div>

        <div className="grid border-y border-hairline lg:grid-cols-2">
          {/* Accordion column */}
          <div className="lg:border-r lg:border-hairline">
            <ul>
              {capabilities.map((item) => {
                const open = item.id === openId;
                return (
                  <li key={item.id} className="border-b border-hairline last:border-b-0">
                    <h3>
                      <button
                        type="button"
                        id={`cap-trigger-${item.id}`}
                        aria-expanded={open}
                        aria-controls={`cap-panel-${item.id}`}
                        onClick={() => select(item.id)}
                        className={`flex w-full items-center gap-3 px-5 text-left transition-colors duration-150 ease-out md:px-8 ${
                          open ? "bg-surface-muted" : "bg-transparent hover:bg-surface"
                        }`}
                        style={{
                          paddingTop: "24px",
                          paddingBottom: open ? "12px" : "24px",
                          transition:
                            "padding-bottom 150ms ease-out, background-color 150ms ease-out",
                        }}
                      >
                        <span className="text-[15px] font-semibold leading-6">
                          {item.title}
                        </span>
                        {item.comingSoon ? (
                          <span className="text-[12px] font-normal text-ink-soft">
                            Coming soon
                          </span>
                        ) : null}
                      </button>
                    </h3>

                    <AccordionPanel
                      open={open}
                      id={`cap-panel-${item.id}`}
                      labelledBy={`cap-trigger-${item.id}`}
                      className={open ? "bg-surface-muted" : ""}
                    >
                      <div className="px-5 pb-6 md:px-8">
                        <p className="max-w-prose text-[15px] leading-6 text-ink-soft">
                          {item.description}
                        </p>
                      </div>

                      {/* On small screens the demo sits directly under its item */}
                      {open ? (
                        <DemoStage id={item.id} runKey={runKey} className="lg:hidden" />
                      ) : null}
                    </AccordionPanel>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Fixed-height demo stage — desktop */}
          <div className="hidden lg:block">
            <DemoStage id={openId} runKey={runKey} className="h-full min-h-[560px]" />
          </div>
        </div>

        <div className="plus-grid h-20 w-full" aria-hidden="true" />
      </div>
    </section>
  );
}
