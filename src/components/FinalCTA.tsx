"use client";

import { Reveal } from "./motion/Reveal";

export function FinalCTA() {
  return (
    <section id="final-cta" className="bg-white">
      <div className="page-rail">
        <div
          className="flex min-h-[400px] flex-col justify-center gutter py-16"
          style={{
            background:
              "linear-gradient(180deg, #65fbaa 0%, #31f49c 50%, #00ec97 100%)",
          }}
        >
          <Reveal distance={20} blur={0}>
            <h2 className="text-h2-mobile md:text-h2">
              Start in under a minute.
            </h2>
          </Reveal>
          <Reveal delay={0.08} distance={20} blur={0}>
            <p className="mt-3 max-w-prose text-body text-ink/70">
              No paperwork and no waiting. Choose a passkey or connect a wallet you
              already use.
            </p>
          </Reveal>
          <Reveal delay={0.16} distance={20} blur={0}>
            <div className="mt-7">
              <a href="#top" className="btn btn-primary">
                Create account
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
