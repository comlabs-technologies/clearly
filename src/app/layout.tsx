import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Clearly — Your financial life, onchain and confidential",
  description:
    "Crypto, stocks, bonds, precious metals and yield in one borderless account. Confidential by design, open by default.",
  openGraph: {
    title: "Clearly — Your financial life, onchain and confidential",
    description:
      "Crypto, stocks, bonds, precious metals and yield in one borderless account.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>{children}</body>
    </html>
  );
}
