import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import DisclaimerModal from "./components/DisclaimerModal"; // <--- ADDED THIS IMPORT

// Setup the Inter font (Standard, Safe)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'TaxLossPairs — ETF Correlation & Overlap for Tax Loss Harvesting',
    template: '%s | TaxLossPairs',
  },
  description: 'Structured ETF correlation & holdings overlap metrics to support research into potential tax loss harvesting alternatives. Not financial advice.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📉</text></svg>',
  },
};
  openGraph: {
    title: 'TaxLossPairs | Free Tax Loss Harvesting Tool',
    description: 'Instantly find mathematically safe ETF partners for tax loss harvesting. Avoid wash sales with correlation and sector analysis.',
    siteName: 'TaxLossPairs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxLossPairs | Free Tax Loss Harvesting Tool',
    description: 'Instantly find mathematically safe ETF partners for tax loss harvesting.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DisclaimerModal /> {/* <--- ADDED THIS (The Popup) */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
