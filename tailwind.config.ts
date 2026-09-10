import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
        },
        ink: {
          DEFAULT: "var(--text-primary)",
          soft: "var(--text-secondary)",
        },
        dark: {
          DEFAULT: "var(--dark-surface)",
          raised: "var(--dark-surface-raised)",
          soft: "var(--dark-text-secondary)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          mid: "var(--accent-mid)",
          light: "var(--accent-light)",
        },
      },
      borderColor: {
        hairline: "var(--border-light)",
        "hairline-dark": "var(--dark-border)",
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        // label / UI
        label: ["14px", { lineHeight: "20px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px" }],
        lead: ["18px", { lineHeight: "28px" }],
        // headings
        "h2-mobile": ["30px", { lineHeight: "36px", letterSpacing: "-0.035em", fontWeight: "500" }],
        h2: ["40px", { lineHeight: "44px", letterSpacing: "-0.035em", fontWeight: "500" }],
        "hero-mobile": ["40px", { lineHeight: "44px", letterSpacing: "-0.035em", fontWeight: "500" }],
        "hero-tablet": ["48px", { lineHeight: "52px", letterSpacing: "-0.035em", fontWeight: "500" }],
        hero: ["60px", { lineHeight: "60px", letterSpacing: "-0.035em", fontWeight: "500" }],
      },
      maxWidth: {
        page: "1280px",
        prose: "62ch",
      },
      borderRadius: {
        btn: "11px",
        panel: "16px",
      },
      spacing: {
        "section-sm": "64px",
        section: "96px",
        "section-lg": "128px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quiet": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
