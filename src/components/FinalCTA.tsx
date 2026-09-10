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
            <h2 className="max-w-[18ch] text-h2-mobile md:text-h2">
              Your account is seconds away.
            </h2>
          </Reveal>
          <Reveal delay={0.08} distance={20} blur={0}>
            <p className="mt-3 max-w-prose text-body text-ink/70">
              No email. No documents. Pick a passkey or a wallet and you&rsquo;re in.
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
