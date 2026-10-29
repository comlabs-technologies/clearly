"use client";

/**
 * HeroWithNav — a self-contained sticky navbar + hero section with an
 * animated product dashboard.
 *
 * Portability notes:
 * - Zero dependencies. React only. No Tailwind, no Motion, no icon library.
 * - All styles are scoped under `.clh-root` and shipped in the <style> tag
 *   below, so nothing is inherited from a global stylesheet.
 * - Entrance motion is CSS keyframes with staggered delays, and is disabled
 *   under `prefers-reduced-motion`.
 * - Drop the file in, import it, render <HeroWithNav />. Every string and the
 *   dashboard data are props, so it re-skins without touching the markup.
 *
 * If you render it more than once on a page, lift the <style> tag out to a
 * layout so the CSS is only emitted a single time.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* ------------------------------------------------------------------ types */

export type Avatar = { label: string; from: string; to: string };

export type BalanceRow = {
  title: string;
  meta: string;
  value: string;
  /** Small coloured delta, e.g. "+$1,736". */
  change?: string;
  /** Muted trailing note, e.g. "unrealised P&L" or "+5 more". */
  note?: string;
  avatars?: Avatar[];
};

export type NavItem = { label: string; icon: IconName };

export type HeroWithNavProps = {
  brand?: string;
  /** Headline rendered one array entry per line. */
  headline?: string[];
  subhead?: string;
  ctaLabel?: string;
  /** Short reassurance line beside the primary call to action. */
  ctaNote?: string;
  loginLabel?: string;
  /** Pill overlapping the dashboard's top-left edge. */
  badgeLabel?: string;
  badgeNote?: string;
  balanceLabel?: string;
  balanceValue?: string;
  primaryNav?: NavItem[];
  marketsNav?: NavItem[];
  footerNav?: NavItem[];
  rows?: BalanceRow[];
  /** Where the header and hero buttons link. */
  ctaHref?: string;
  loginHref?: string;
  /** Override the typeface without editing the stylesheet. */
  fontFamily?: string;
};

/* --------------------------------------------------------------- defaults */

const DEFAULT_ROWS: BalanceRow[] = [
  {
    title: "Digital assets",
    meta: "8 assets",
    value: "$63,148.72",
    note: "+5 more",
    avatars: [
      { label: "A", from: "#f7b955", to: "#e08b1f" },
      { label: "E", from: "#8b9dff", to: "#5566d8" },
      { label: "N", from: "#00ec97", to: "#0bb673" },
    ],
  },
  {
    title: "Tokenised markets",
    meta: "6 holdings",
    value: "$37,429.15",
    note: "+3 more",
    avatars: [
      { label: "S", from: "#f16565", to: "#c53030" },
      { label: "G", from: "#e8c37a", to: "#b98d2f" },
      { label: "T", from: "#7fd6f0", to: "#2f8fb0" },
    ],
  },
  {
    title: "Perpetual positions",
    meta: "4 open",
    value: "$28,563.40",
    change: "+$1,736",
    note: "unrealised P&L",
  },
  {
    title: "Earn",
    meta: "2 strategies",
    value: "$21,074.88",
    change: "+8.6%",
    note: "blended APY",
  },
];

const DEFAULT_PRIMARY: NavItem[] = [
  { label: "Portfolio", icon: "grid" },
  { label: "Swap", icon: "swap" },
];

const DEFAULT_MARKETS: NavItem[] = [
  { label: "Assets", icon: "coins" },
  { label: "Positions", icon: "chart" },
  { label: "Earn", icon: "piggy" },
];

const DEFAULT_FOOTER: NavItem[] = [
  { label: "History", icon: "clock" },
  { label: "Contacts", icon: "users" },
];

/* ------------------------------------------------------------------ icons */

export type IconName =
  | "grid"
  | "swap"
  | "coins"
  | "chart"
  | "piggy"
  | "clock"
  | "users"
  | "chevron"
  | "in"
  | "out";

const PATHS: Record<IconName, string> = {
  grid: "M3 3h5v5H3zM10 3h5v5h-5zM3 10h5v5H3zM10 10h5v5h-5z",
  swap: "M3 6h11l-3-3M15 12H4l3 3",
  coins: "M9 5.5c3.3 0 6 .9 6 2s-2.7 2-6 2-6-.9-6-2 2.7-2 6-2zM3 7.5v4c0 1.1 2.7 2 6 2s6-.9 6-2v-4",
  chart: "M3 14V7M7 14V4M11 14v-5M15 14V8",
  piggy: "M3 9a5 5 0 015-5h2a5 5 0 015 5v3H3zM5 12v2M13 12v2",
  clock: "M9 4.5v5l3 1.6M9 16a7 7 0 100-14 7 7 0 000 14z",
  users: "M12 15v-1.5a3 3 0 00-3-3H5a3 3 0 00-3 3V15M7 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16 15v-1.5a3 3 0 00-2.2-2.9",
  chevron: "M7 4l5 5-5 5",
  in: "M12 6l-6 6M6 7v5h5",
  out: "M6 12l6-6M12 11V6H7",
};

function Icon({ name, size = 15 }: { name: IconName; size?: number }) {
  const filled = name === "grid";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/** Original brand glyph — a rounded tile with an offset chevron. */
function BrandMark({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span className="clh-brand">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect width="26" height="26" rx="7" fill="var(--clh-accent)" />
        <path
          d="M8 8.6L12.3 13 8 17.4"
          stroke="#0d1f16"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14.4 17.4h3.9" stroke="#0d1f16" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
      <span className={dark ? "clh-wordmark clh-wordmark-dark" : "clh-wordmark"}>{label}</span>
    </span>
  );
}

/* -------------------------------------------------------------- component */

export default function HeroWithNav({
  brand = "clearly",
  headline = ["Every asset you own,", "in one clear account."],
  subhead = "Currencies, equities, metals and yield — held together in a single account that settles in seconds and shows exactly where you stand.",
  ctaLabel = "Create account",
  ctaNote = "No paperwork. Ready in under a minute.",
  loginLabel = "Log in",
  badgeLabel = "Live demo",
  badgeNote = "Explore the interface below",
  balanceLabel = "Total balance",
  balanceValue = "$150,216.15",
  primaryNav = DEFAULT_PRIMARY,
  marketsNav = DEFAULT_MARKETS,
  footerNav = DEFAULT_FOOTER,
  rows = DEFAULT_ROWS,
  ctaHref = "#get-started",
  loginHref = "#login",
  fontFamily,
}: HeroWithNavProps) {
  const [navCta, setNavCta] = useState(false);
  const heroCta = useRef<HTMLAnchorElement>(null);

  // Reveal the compact header CTA once the hero's own button scrolls away.
  useEffect(() => {
    const target = heroCta.current;
    if (!target || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setNavCta(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: "-8px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // One shared clock for the entrance, in seconds.
  const T = 0.47;
  const d = (delay: number): CSSProperties => ({ animationDelay: `${delay}s` });

  return (
    <div className="clh-root" style={fontFamily ? ({ "--clh-font": fontFamily } as CSSProperties) : undefined}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ---------------------------------------------------------- navbar */}
      <header className="clh-header">
        <div className="clh-rail clh-gutter clh-header-inner">
          <a href="#top" className="clh-brand-link" aria-label={`${brand} — home`}>
            <BrandMark label={brand} />
          </a>

          <div className="clh-header-actions">
            <a href={loginHref} className="clh-btn clh-btn-ghost">
              {loginLabel}
            </a>
            <a
              href={ctaHref}
              className={`clh-btn clh-btn-primary clh-btn-sm clh-nav-cta${navCta ? " is-shown" : ""}`}
              tabIndex={navCta ? 0 : -1}
              aria-hidden={!navCta}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------ hero */}
      <section className="clh-hero" id="top">
        <div className="clh-hero-glow clh-anim clh-fade" style={d(T + 0.62)} aria-hidden="true" />

        <div className="clh-rail clh-gutter clh-hero-inner">
          <h1 className="clh-h1">
            {headline.map((lineText, i) => (
              <span key={lineText} className="clh-anim clh-rise" style={d(T + i * 0.09)}>
                {lineText}
              </span>
            ))}
          </h1>

          <p className="clh-lede clh-anim clh-drop" style={d(T + 0.2)}>
            {subhead}
          </p>

          <div className="clh-cta-row clh-anim clh-rise" style={d(T + 0.31)}>
            <a href={ctaHref} ref={heroCta} className="clh-btn clh-btn-primary">
              {ctaLabel}
            </a>
            <p className="clh-cta-note">{ctaNote}</p>
          </div>

          {/* ------------------------------------------------- dashboard */}
          <div className="clh-demo-wrap clh-anim clh-fade" style={d(T + 0.55)}>
            <div className="clh-badge clh-anim clh-pop" style={d(T + 0.7)}>
              <span className="clh-badge-pill">
                <span className="clh-dot" aria-hidden="true" />
                {badgeLabel}
                {badgeNote ? (
                  <>
                    <span className="clh-badge-sep" aria-hidden="true" />
                    <span className="clh-badge-note">{badgeNote}</span>
                  </>
                ) : null}
              </span>
            </div>

            <div className="clh-frame clh-anim clh-rise-sm" style={d(T + 0.6)}>
              <div className="clh-frame-inner">
                <nav className="clh-sidebar" aria-label="Product demo">
                  <div className="clh-sidebar-brand">
                    <BrandMark label={brand} dark />
                  </div>

                  <ul className="clh-nav-list">
                    {primaryNav.map((item, i) => (
                      <li key={item.label}>
                        <span className={i === 0 ? "clh-nav-item is-active" : "clh-nav-item"}>
                          <Icon name={item.icon} />
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="clh-nav-label">Markets</p>
                  <ul className="clh-nav-list">
                    {marketsNav.map((item) => (
                      <li key={item.label}>
                        <span className="clh-nav-item">
                          <Icon name={item.icon} />
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="clh-nav-list clh-nav-list-end">
                    {footerNav.map((item) => (
                      <li key={item.label}>
                        <span className="clh-nav-item">
                          <Icon name={item.icon} />
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="clh-canvas">
                  {/* Slim top nav stands in for the sidebar on small screens */}
                  <div className="clh-toptabs">
                    {[...primaryNav, ...marketsNav].slice(0, 4).map((item, i) => (
                      <span key={item.label} className={i === 0 ? "clh-tab is-active" : "clh-tab"}>
                        {item.label}
                      </span>
                    ))}
                  </div>

                  <div className="clh-canvas-head clh-anim clh-rise-sm" style={d(T + 0.78)}>
                    <div>
                      <p className="clh-muted-sm">{balanceLabel}</p>
                      <p className="clh-balance">{balanceValue}</p>
                    </div>
                    <div className="clh-canvas-actions">
                      <span className="clh-btn clh-btn-primary clh-btn-xs">
                        <Icon name="in" size={14} />
                        Receive
                      </span>
                      <span className="clh-btn clh-btn-primary clh-btn-xs">
                        <Icon name="out" size={14} />
                        Send
                      </span>
                    </div>
                  </div>

                  <div className="clh-card clh-anim clh-rise-sm" style={d(T + 0.9)}>
                    <p className="clh-card-head">Balances</p>
                    <ul className="clh-rows">
                      {rows.map((row, i) => (
                        <li
                          key={row.title}
                          className="clh-row clh-anim clh-rise-sm"
                          style={d(T + 1.02 + i * 0.065)}
                        >
                          <div className="clh-row-main">
                            <p className="clh-row-title">{row.title}</p>
                            <p className="clh-muted-xs">{row.meta}</p>
                          </div>

                          <div className="clh-row-end">
                            <div className="clh-row-aside">
                              {row.avatars?.length ? (
                                <span className="clh-avatars" aria-hidden="true">
                                  {row.avatars.map((a) => (
                                    <span
                                      key={a.label}
                                      className="clh-avatar"
                                      style={{
                                        background: `linear-gradient(140deg, ${a.from}, ${a.to})`,
                                      }}
                                    >
                                      {a.label}
                                    </span>
                                  ))}
                                </span>
                              ) : null}
                              {row.change ? <span className="clh-change">{row.change}</span> : null}
                              {row.note ? <span className="clh-muted-xs">{row.note}</span> : null}
                            </div>
                            <span className="clh-row-value">{row.value}</span>
                            <span className="clh-chevron">
                              <Icon name="chevron" size={15} />
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------- css */

const CSS = `
.clh-root {
  --clh-white: #ffffff;
  --clh-surface: #fcfcfc;
  --clh-surface-muted: #f5f5f5;
  --clh-border: rgba(0, 0, 0, 0.11);
  --clh-ink: #171717;
  --clh-ink-soft: #737373;
  --clh-dark-raised: #1f1f1f;
  --clh-dark-border: rgba(255, 255, 255, 0.1);
  --clh-dark-soft: #a1a1a1;
  --clh-accent: #00ec97;
  --clh-accent-mid: #31f49c;
  --clh-accent-light: #65fbaa;
  --clh-gutter: 20px;
  --clh-max: 1280px;
  font-family: var(--clh-font, "Figtree", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif);
  color: var(--clh-ink);
  background: var(--clh-white);
  font-size: 16px;
  line-height: 24px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.clh-root *, .clh-root *::before, .clh-root *::after { box-sizing: border-box; }
.clh-root h1, .clh-root p { margin: 0; }
.clh-root ul { margin: 0; padding: 0; list-style: none; }
@media (min-width: 768px) { .clh-root { --clh-gutter: 24px; } }
@media (min-width: 1024px) { .clh-root { --clh-gutter: 32px; } }

.clh-rail { width: 100%; max-width: var(--clh-max); margin-inline: auto; }
@media (min-width: 1280px) {
  .clh-rail { border-left: 1px solid var(--clh-border); border-right: 1px solid var(--clh-border); }
}
.clh-gutter { padding-inline: var(--clh-gutter); }

/* --- header --- */
.clh-header {
  position: sticky; top: 0; z-index: 50; height: 72px;
  background: var(--clh-white); border-bottom: 1px solid var(--clh-border);
}
.clh-header-inner { display: flex; height: 72px; align-items: center; justify-content: space-between; }
.clh-header-actions { display: flex; align-items: center; gap: 4px; }
.clh-brand-link { display: inline-flex; text-decoration: none; border-radius: 6px; }
.clh-brand { display: inline-flex; align-items: center; gap: 8px; }
.clh-wordmark { font-size: 17px; font-weight: 600; letter-spacing: -0.03em; color: var(--clh-ink); }
.clh-wordmark-dark { color: #fff; }

/* --- buttons --- */
.clh-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 44px; padding: 12px 20px; border: 0; border-radius: 11px;
  font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 600;
  white-space: nowrap; text-decoration: none; cursor: pointer;
  transition: background-color 180ms cubic-bezier(.25,.46,.45,.94),
              color 180ms cubic-bezier(.25,.46,.45,.94),
              border-color 180ms cubic-bezier(.25,.46,.45,.94),
              opacity 180ms cubic-bezier(.25,.46,.45,.94),
              transform 100ms cubic-bezier(.25,.46,.45,.94);
}
.clh-btn:focus-visible { outline: 2px solid var(--clh-ink); outline-offset: 2px; }
.clh-btn:active { transform: scale(0.97); }
.clh-btn-primary { background: var(--clh-ink); color: #fff; }
.clh-btn-primary:hover { background: #000; }
.clh-btn-ghost { background: transparent; color: var(--clh-ink-soft); padding-inline: 12px; }
.clh-btn-ghost:hover { color: var(--clh-ink); }
.clh-btn-sm { min-height: 40px; padding: 10px 16px; }
.clh-btn-xs { min-height: 36px; padding: 8px 14px; font-size: 13px; border-radius: 9px; }

.clh-nav-cta {
  opacity: 0; transform: translateY(-6px); pointer-events: none;
  transition: opacity 220ms cubic-bezier(.25,.46,.45,.94),
              transform 220ms cubic-bezier(.25,.46,.45,.94),
              background-color 180ms cubic-bezier(.25,.46,.45,.94);
}
.clh-nav-cta.is-shown { opacity: 1; transform: translateY(0); pointer-events: auto; }

/* --- hero --- */
.clh-hero { position: relative; overflow: hidden; background: var(--clh-white); }
.clh-hero-glow {
  position: absolute; left: 0; right: 0; bottom: 0; height: 46%; pointer-events: none;
  background: linear-gradient(180deg, rgba(101,251,170,0) 0%, var(--clh-accent-light) 22%,
              var(--clh-accent-mid) 62%, var(--clh-accent) 100%);
}
.clh-hero-inner { position: relative; padding-top: 64px; }
@media (min-width: 768px) { .clh-hero-inner { padding-top: 96px; } }

.clh-h1 { font-weight: 500; letter-spacing: -0.035em; font-size: 40px; line-height: 44px; }
.clh-h1 span { display: block; }
@media (min-width: 768px) { .clh-h1 { font-size: 48px; line-height: 52px; } }
@media (min-width: 1024px) { .clh-h1 { font-size: 60px; line-height: 60px; } }

.clh-lede { margin-top: 24px; max-width: 62ch; color: var(--clh-ink-soft); }
.clh-cta-row { margin-top: 32px; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
@media (min-width: 640px) { .clh-cta-row { flex-direction: row; align-items: center; gap: 20px; } }
.clh-cta-note { font-size: 13px; line-height: 20px; color: var(--clh-ink-soft); }

/* --- dashboard --- */
.clh-demo-wrap { position: relative; padding-top: 48px; padding-bottom: 64px; }
@media (min-width: 768px) { .clh-demo-wrap { padding-top: 64px; } }

.clh-badge { position: absolute; top: 34px; left: 16px; z-index: 20; }
@media (min-width: 640px) { .clh-badge { left: 32px; } }
.clh-badge-pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px 6px 12px; border: 1px solid var(--clh-border); border-radius: 999px;
  background: var(--clh-white); font-size: 12px; font-weight: 600; color: var(--clh-ink);
}
.clh-dot { width: 6px; height: 6px; border-radius: 999px; background: var(--clh-accent); }
.clh-badge-sep { display: none; width: 1px; height: 12px; background: var(--clh-border); }
.clh-badge-note { display: none; font-weight: 400; color: var(--clh-ink-soft); }
@media (min-width: 640px) { .clh-badge-sep, .clh-badge-note { display: inline-block; } }

.clh-frame { border-radius: 16px; background: var(--clh-dark-raised); padding: 8px; overflow: hidden; }
@media (min-width: 640px) { .clh-frame { padding: 10px; } }
.clh-frame-inner { display: flex; gap: 8px; min-height: 420px; }
@media (min-width: 640px) { .clh-frame-inner { min-height: 460px; } }

.clh-sidebar { display: none; width: 190px; flex-shrink: 0; flex-direction: column; padding: 12px 8px; }
@media (min-width: 768px) { .clh-sidebar { display: flex; } }
.clh-sidebar-brand { padding: 0 8px 20px; }
.clh-nav-list { display: flex; flex-direction: column; gap: 2px; }
.clh-nav-list-end { margin-top: auto; padding-top: 24px; }
.clh-nav-item {
  display: flex; align-items: center; gap: 10px; padding: 8px 10px;
  border-radius: 8px; font-size: 13px; color: var(--clh-dark-soft);
}
.clh-nav-item.is-active { background: rgba(255,255,255,0.1); color: #fff; font-weight: 600; }
.clh-nav-label {
  padding: 20px 10px 6px; font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.35);
}

.clh-canvas { flex: 1; min-width: 0; border-radius: 12px; background: #fff; padding: 16px; }
@media (min-width: 640px) { .clh-canvas { padding: 24px; } }

.clh-toptabs {
  display: flex; gap: 4px; overflow-x: auto; margin-bottom: 20px;
  padding-bottom: 12px; border-bottom: 1px solid var(--clh-border);
  scrollbar-width: none;
}
.clh-toptabs::-webkit-scrollbar { display: none; }
@media (min-width: 768px) { .clh-toptabs { display: none; } }
.clh-tab { flex-shrink: 0; padding: 6px 10px; border-radius: 8px; font-size: 12px; color: var(--clh-ink-soft); }
.clh-tab.is-active { background: var(--clh-surface-muted); color: var(--clh-ink); font-weight: 600; }

.clh-canvas-head { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 12px; }
.clh-canvas-actions { display: flex; align-items: center; gap: 8px; }
.clh-muted-sm { font-size: 13px; color: var(--clh-ink-soft); }
.clh-muted-xs { font-size: 12px; color: var(--clh-ink-soft); }
.clh-balance {
  margin-top: 4px; font-size: 28px; line-height: 34px; font-weight: 600;
  letter-spacing: -0.03em; font-variant-numeric: tabular-nums;
}
@media (min-width: 640px) { .clh-balance { font-size: 32px; line-height: 38px; } }

.clh-card { margin-top: 20px; border: 1px solid var(--clh-border); border-radius: 12px; overflow: hidden; }
.clh-card-head {
  padding: 10px 16px; border-bottom: 1px solid var(--clh-border);
  background: var(--clh-surface); font-size: 12px; font-weight: 600; color: var(--clh-ink-soft);
}
.clh-row {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 14px 16px; border-bottom: 1px solid var(--clh-border);
}
.clh-row:last-child { border-bottom: 0; }
.clh-row-main { min-width: 0; }
.clh-row-title { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.clh-row-end { display: flex; align-items: center; gap: 12px; }
.clh-row-aside { display: none; align-items: center; gap: 8px; }
@media (min-width: 640px) { .clh-row-aside { display: flex; } }
.clh-row-value { font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums; }
.clh-chevron { display: inline-flex; color: var(--clh-ink-soft); }
.clh-change { font-size: 12px; font-weight: 600; color: #0f9d63; font-variant-numeric: tabular-nums; }

.clh-avatars { display: inline-flex; }
.clh-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; margin-right: -6px; border-radius: 999px;
  box-shadow: 0 0 0 2px #fff; font-size: 9px; font-weight: 700; color: #fff;
}
.clh-avatar:last-child { margin-right: 0; }

/* --- entrance motion --- */
.clh-anim { animation-duration: 0.62s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); animation-fill-mode: both; }
.clh-rise { animation-name: clh-rise; }
.clh-drop { animation-name: clh-drop; }
.clh-fade { animation-name: clh-fade; }
.clh-rise-sm { animation-name: clh-rise-sm; animation-duration: 0.5s; }
.clh-pop { animation-name: clh-pop; animation-duration: 0.55s; }

@keyframes clh-rise {
  from { opacity: 0; transform: translateY(10px); filter: blur(5px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes clh-drop {
  from { opacity: 0; transform: translateY(-10px); filter: blur(5px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes clh-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes clh-rise-sm {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes clh-pop {
  from { opacity: 0; transform: translateY(16px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .clh-root .clh-anim { animation: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
  .clh-root .clh-btn, .clh-root .clh-nav-cta { transition-duration: 1ms !important; }
}
`;
