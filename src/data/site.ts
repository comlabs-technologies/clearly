export type Capability = {
  id: string;
  title: string;
  description: string;
  comingSoon?: boolean;
};

export const capabilities: Capability[] = [
  {
    id: "swap",
    title: "Swap across networks",
    description:
      "Exchange between hundreds of assets in a single step, wherever they live. Orders are routed to competing liquidity providers and filled at the best quote returned — no bridging, no wrapped placeholders, no manual hopping between networks.",
  },
  {
    id: "send",
    title: "Send money anywhere",
    description:
      "Pay a username, an address, or someone from your contacts. Fees are quoted up front in the currency you already hold, and transfers settle in seconds whether the recipient is nearby or on the other side of the world.",
  },
  {
    id: "rwa",
    title: "Invest in real-world assets",
    description:
      "Hold equities, treasury exposure and precious metals beside your digital balances. Positions are fractional from a single unit, tradable outside market hours, and reported in one consolidated view.",
  },
  {
    id: "earn",
    title: "Earn on idle balances",
    description:
      "Put balances to work in vetted strategies with transparent rates and no lock-ups. Earnings accrue continuously, the underlying venue is named on every position, and you can withdraw the whole thing whenever you want it back.",
  },
  {
    id: "perps",
    title: "Trade with leverage",
    description:
      "Take long or short exposure on major markets with adjustable leverage, isolated margin, and the liquidation level shown before you confirm. Positions and funding settle against the same account balance.",
  },
  {
    id: "banking",
    title: "Spend from your balance",
    description:
      "Local account details for receiving income, plus a card that spends straight from what you hold. One account for what you own, what you earn, and what you spend.",
    comingSoon: true,
  },
  {
    id: "ai",
    title: "Ask questions about your money",
    description:
      "Ask in plain language and get answers grounded in your own activity. Analysis runs inside a secure environment, so your positions are never exposed in order to produce a response.",
    comingSoon: true,
  },
];

export type PrivacyFeature = {
  id: string;
  title: string;
  body: string;
  icon: "shield" | "eye-off" | "sliders";
};

export const privacyFeatures: PrivacyFeature[] = [
  {
    id: "payments",
    title: "A payment reveals only itself",
    icon: "shield",
    body: "Settling an invoice shouldn't hand the recipient your entire history. Here a transfer shows the transfer, and nothing that sits behind it.",
  },
  {
    id: "transfers",
    title: "Consistent across every feature",
    icon: "eye-off",
    body: "Balances, trades, positions and yield are treated alike, so your activity never leaks through the one feature that was left unshielded.",
  },
  {
    id: "control",
    title: "Disclosure on your terms",
    icon: "sliders",
    body: "Produce a signed view of one position or a date range when an accountant, auditor or counterparty needs proof. Sharing stays deliberate and scoped.",
  },
];

export type InfraCard = {
  id: string;
  name: string;
  body: string;
  swatch: string;
};

export const infrastructure: InfraCard[] = [
  {
    id: "chain",
    name: "Settlement layer",
    swatch: "chain",
    body: "A high-throughput ledger that finalises in about a second, so a confirmation feels like a confirmation rather than a waiting room.",
  },
  {
    id: "intents",
    name: "Intent engine",
    swatch: "intents",
    body: "You describe the outcome you want. Solvers compete to fill it at the best available price, and are paid only when they deliver it.",
  },
  {
    id: "confidential",
    name: "Confidential compute",
    swatch: "confidential",
    body: "Balances and order flow are processed inside attested enclaves, so activity can be verified without the amounts ever being published.",
  },
  {
    id: "intelligence",
    name: "Private intelligence",
    swatch: "intelligence",
    body: "Portfolio analysis runs against encrypted data in an isolated runtime. Your holdings shape the answer without ever leaving the account.",
  },
];

export const partners = [
  "Ledgerline",
  "Northport",
  "Axiomatic",
  "Verity Labs",
  "Brightfold",
  "Quorum",
];

export const stats = [
  { id: "volume", value: 28, prefix: "$", suffix: "B", label: "settled to date" },
  { id: "assets", value: 113, prefix: "", suffix: "", label: "supported assets" },
  { id: "chains", value: 34, prefix: "", suffix: "", label: "connected networks" },
];

export type Faq = { id: string; question: string; answer: string };

export const faqs: Faq[] = [
  {
    id: "what",
    question: "What is Clearly?",
    answer:
      "Clearly is a single account for the things people actually hold: currencies, tokenised equities and bonds, precious metals, and yield-bearing positions. It combines the reach of a self-custodied wallet with the clarity of a brokerage statement, and keeps your balances confidential unless you choose to reveal them.",
  },
  {
    id: "account",
    question: "How do I open an account?",
    answer:
      "Choose a passkey or connect a wallet you already use, pick a username, and you are in. There is no paperwork, no document upload, and no waiting period. The account is controlled by keys that stay on your device.",
  },
  {
    id: "swaps",
    question: "How do swaps across networks work?",
    answer:
      "You state the asset you hold and the asset you want. The request goes out to a network of liquidity providers who compete to fill it, and the best quote wins. Settlement across networks happens behind the scenes, so you never bridge manually or hold a wrapped stand-in asset.",
  },
  {
    id: "invest",
    question: "What can I invest in?",
    answer:
      "Major digital assets, tokenised equity and treasury exposure, gold and silver, and a curated set of yield strategies. Every position is fractional, so you can take a meaningful allocation without buying a whole unit, and all of it reports into one portfolio view.",
  },
  {
    id: "interest",
    question: "How is interest earned?",
    answer:
      "Move a balance into any listed strategy and it starts accruing immediately. Rates are variable and shown as a live figure rather than a marketing headline, the underlying venue is named on every position, and withdrawals are not subject to a lock-up.",
  },
  {
    id: "business",
    question: "Can a business use this?",
    answer:
      "Yes. Teams can settle invoices, run payroll across borders, and hold treasury positions on the same account primitives, with a scoped API and signed statements for reconciliation. Confidential balances with selective disclosure suit teams who cannot publish payroll to a public ledger.",
  },
  {
    id: "help",
    question: "How do I get help?",
    answer:
      "Support is reachable from inside the account, and the help button in the corner of this page opens a form that reaches the same team. Most questions are answered within a few hours, and recovery requests are prioritised.",
  },
];

export const footerLinks = {
  product: [
    { label: "Dashboard", href: "#portfolio" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Support", href: "#faq" },
  ],
  social: [
    { label: "Developers", href: "#infrastructure" },
    { label: "Community", href: "#privacy" },
    { label: "Changelog", href: "#stats" },
  ],
  legal: [
    { label: "Terms", href: "#faq" },
    { label: "Privacy", href: "#privacy" },
    { label: "Disclosures", href: "#faq" },
  ],
};
