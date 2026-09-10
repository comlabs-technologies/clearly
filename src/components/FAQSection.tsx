"use client";

import { useState } from "react";
import { faqs } from "@/data/site";
import { AccordionPanel } from "./motion/AccordionPanel";
import { Reveal } from "./motion/Reveal";

export function FAQSection() {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) =>
    setOpenIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );

  return (
    <section id="faq" className="bg-white">
      <div className="page-rail">
        <div className="gutter pb-10 pt-section-sm md:pt-section">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <Reveal>
                <h2 className="text-h2-mobile md:text-h2">Frequently asked questions</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-3 max-w-prose text-body text-ink-soft">
                  Can&rsquo;t find your answer? Send us a note and we&rsquo;ll be in touch.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.14}>
              <a href="#help" className="btn btn-secondary">
                Contact support
              </a>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-hairline">
          {faqs.map((faq) => {
            const open = openIds.includes(faq.id);
            return (
              <div key={faq.id} className="border-b border-hairline">
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${faq.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${faq.id}`}
                    onClick={() => toggle(faq.id)}
                    className={`flex w-full items-center justify-between gap-6 px-5 py-6 text-left transition-colors duration-150 ease-out md:px-8 ${
                      open ? "bg-surface-muted" : "hover:bg-surface"
                    }`}
                  >
                    <span className="text-[15px] font-semibold leading-6 md:text-[16px]">
                      {faq.question}
                    </span>
                    <span
                      className="shrink-0 transition-transform duration-150 ease-out"
                      style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path
                          d="M8 2v12M2 8h12"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                <AccordionPanel
                  open={open}
                  id={`faq-panel-${faq.id}`}
                  labelledBy={`faq-trigger-${faq.id}`}
                  className={open ? "bg-surface-muted" : ""}
                >
                  <div className="px-5 pb-6 md:px-8">
                    <p className="max-w-prose text-[15px] leading-[24px] text-ink-soft">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionPanel>
              </div>
            );
          })}
        </div>

        <div className="plus-grid h-24 w-full" aria-hidden="true" />
      </div>
    </section>
  );
}
