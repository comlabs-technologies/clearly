"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

/** Fixed support control with a locally rendered contact popover. */
export function HelpBubble() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div id="help" className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Contact support"
          className="w-[min(320px,calc(100vw-40px))] rounded-panel border border-hairline bg-white p-4 shadow-none"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[15px] font-semibold">Contact support</h2>
              <p className="mt-1 text-[13px] leading-5 text-ink-soft">
                Tell us what you need and we&rsquo;ll reply within a few hours.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className="btn btn-tertiary !min-h-[32px] !px-2 !py-1"
              aria-label="Close support panel"
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          {sent ? (
            <p
              className="mt-4 rounded-[10px] border border-hairline bg-surface-muted px-3 py-2.5 text-[13px] text-ink"
              role="status"
            >
              Thanks — your message is queued. This demo does not send real email.
            </p>
          ) : (
            <form
              className="mt-4 space-y-2.5"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <label className="block">
                <span className="sr-only">Your email</span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-[10px] border border-hairline bg-white px-3 py-2.5 text-[14px] outline-none transition-colors duration-150 ease-out placeholder:text-ink-soft focus:border-ink"
                />
              </label>
              <label className="block">
                <span className="sr-only">How can we help?</span>
                <textarea
                  required
                  rows={3}
                  placeholder="How can we help?"
                  className="w-full resize-none rounded-[10px] border border-hairline bg-white px-3 py-2.5 text-[14px] outline-none transition-colors duration-150 ease-out placeholder:text-ink-soft focus:border-ink"
                />
              </label>
              <button type="submit" className="btn btn-primary w-full">
                Send message
              </button>
            </form>
          )}
        </div>
      ) : null}

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close support panel" : "Open support panel"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-accent text-ink ring-1 ring-inset ring-black/10 transition-transform duration-150 ease-out hover:scale-[1.04] active:scale-[0.96]"
      >
        {open ? (
          <X size={22} strokeWidth={2} aria-hidden="true" />
        ) : (
          <MessageCircle size={22} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
