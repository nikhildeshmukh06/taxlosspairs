import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
