export type Capability = {
  id: string;
  title: string;
  description: string;
  comingSoon?: boolean;
};

export const capabilities: Capability[] = [
  {
    id: "swap",
    title: "Swap anything to anything",
    description:
      "Move between hundreds of assets across every supported network in a single step. Your order is routed to competing market makers, and you keep the best quote returned — no bridging, no wrapped detours, no manual chain hopping.",
  },
  {
    id: "send",
    title: "Send anything, anywhere",
    description:
      "Pay a username, an address, or a contact you saved. Fees are quoted up front in the currency you hold, and settlement happens in seconds whether the recipient is on the same network or the other side of the world.",
  },
  {
    id: "rwa",
    title: "Invest in real-world assets",
    description:
      "Hold tokenised equities, treasury bills and precious metals beside your digital assets. Fractional from a single unit, tradable outside market hours, and reported in one consolidated position view.",
  },
  {
    id: "earn",
    title: "Earn on your assets",
    description:
      "Put idle balances to work in vetted yield strategies with transparent rates and no lock-ups. Earnings accrue by the block, and you can withdraw the full position whenever you want it back.",
  },
  {
    id: "perps",
    title: "Trade perpetual markets",
    description:
      "Open long or short exposure on major markets with adjustable leverage, isolated margin, and liquidation levels shown before you confirm. Positions and funding settle against the same account balance.",
  },
  {
    id: "banking",
    title: "Bank and spend from one account",
    description:
      "Local account details for receiving salary, plus a card that spends directly from your balance. One account for what you hold, what you earn, and what you spend.",
    comingSoon: true,
  },
  {
    id: "ai",
    title: "Understand your finances with AI",
    description:
      "Ask plain questions about your portfolio and get answers grounded in your own activity. Analysis runs inside a secure environment, so your positions are never exposed to build the response.",
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
    title: "One payment shouldn't reveal everything",
    icon: "shield",
    body: "Settling an invoice today hands the recipient your entire balance history. Here, a transfer reveals the transfer — and nothing that sits behind it.",
  },
  {
    id: "transfers",
    title: "More than private transfers",
    icon: "eye-off",
    body: "Confidentiality covers balances, swaps, positions and yield alike, so activity stays consistent instead of leaking through the one feature that isn't shielded.",
  },
  {
    id: "control",
    title: "Choose what you reveal",
    icon: "sliders",
    body: "Produce a signed view of a single position or a date range when an auditor, accountant or counterparty needs proof. Disclosure stays deliberate and scoped.",
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
    body: "A high-throughput chain finalising blocks in around a second, so a confirmation feels like a confirmation rather than a waiting room.",
  },
  {
    id: "intents",
    name: "Intent engine",
    swatch: "intents",
    body: "You describe the outcome you want. Solvers compete to fill it at the best available price and are paid only when they deliver.",
  },
  {
    id: "confidential",
    name: "Confidential compute",
    swatch: "confidential",
    body: "Balances and order flow are processed inside attested enclaves. Verification happens without the underlying amounts ever being published.",
  },
  {
    id: "intelligence",
    name: "Private intelligence",
    swatch: "intelligence",
    body: "Portfolio analysis runs against encrypted data in an isolated runtime. Your holdings inform the answer without leaving your account.",
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
  { id: "volume", value: 28, prefix: "$", suffix: "B", label: "all-time volume" },
  { id: "assets", value: 113, prefix: "", suffix: "", label: "supported assets" },
  { id: "chains", value: 34, prefix: "", suffix: "", label: "supported networks" },
];

export type Faq = { id: string; question: string; answer: string };

export const faqs: Faq[] = [
  {
    id: "what",
    question: "What is Clearly?",
    answer:
      "Clearly is a single account for the assets people actually hold: digital currencies, tokenised stocks and bonds, precious metals, and yield-bearing positions. It combines the reach of an onchain wallet with the clarity of a brokerage statement, and it keeps your balances confidential unless you decide to reveal them.",
  },
  {
    id: "account",
    question: "How do I create an account?",
    answer:
      "Pick a passkey or connect a wallet you already use, choose a username, and you are in. There is no email requirement, no document upload, and no waiting period. Your account is created onchain and controlled by keys that stay on your device.",
  },
  {
    id: "swaps",
    question: "How do cross-network swaps work?",
    answer:
      "You state the asset you hold and the asset you want. The request is broadcast to a network of market makers who compete to fill it, and the best quote wins. Settlement across networks is handled behind the scenes, so you never bridge manually or hold a wrapped placeholder asset.",
  },
  {
    id: "invest",
    question: "What can I invest in through Clearly?",
    answer:
      "Major digital assets, tokenised equity and treasury exposure, gold and silver, and a set of curated yield strategies. Every position is fractional, so you can take a meaningful allocation without buying a whole unit, and everything reports into one portfolio view.",
  },
  {
    id: "interest",
    question: "How do I earn interest on my assets?",
    answer:
      "Move a balance into any listed strategy and it begins accruing immediately. Rates are variable and shown as a live figure rather than a marketing headline, the underlying venue is named on every position, and withdrawals are not subject to a lock-up period.",
  },
  {
    id: "business",
    question: "Can my business integrate?",
    answer:
      "Yes. Businesses can settle invoices, run payroll across borders, and hold treasury positions from the same account primitives, with a scoped API and signed statements for reconciliation. Confidential balances with selective disclosure work particularly well for teams that cannot publish payroll onchain.",
  },
  {
    id: "help",
    question: "Need help?",
    answer:
      "Support is available directly from the account, and the help bubble at the corner of this page opens a contact form that reaches the same team. Most questions are answered within a few hours, and account recovery requests are prioritised.",
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
