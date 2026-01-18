import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Changed from Geist to Inter (Standard)
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// Setup the Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'TaxLossPairs | Free Tax Loss Harvesting Tool',
  description: 'Instantly find mathematically safe ETF partners for tax loss harvesting. Avoid wash sales with correlation and sector analysis.',
  icons: {
    icon: 'https://fav.farm/📉',
  },
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
