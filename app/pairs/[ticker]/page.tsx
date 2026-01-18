import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import pairsData from '../../pairs.json';

// 1. Tell Next.js exactly which pages to build (SEO Magic)
export async function generateStaticParams() {
  return pairsData.map((etf) => ({
    ticker: etf.ticker,
  }));
}

// 2. Dynamic SEO Metadata for Google
export async function generateMetadata({ params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase();
  const etf = pairsData.find((p) => p.ticker === ticker);

  if (!etf) return { title: 'ETF Not Found' };

  return {
    title: `${ticker} Tax Loss Harvesting Partners & Correlation Data`,
    description: `Find the best tax loss harvesting alternatives for ${ticker}. Compare overlap, correlation, and sector data for ${etf.name}.`,
  };
}

// 3. The Page Content
export default function TickerPage({ params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase();
  const etf = pairsData.find((p) => p.ticker === ticker);

  if (!etf) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* NAV */}
      <nav className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-blue-700 text-lg hover:underline">
            ← Back to Search
          </Link>
          <div className="text-sm font-semibold text-gray-500">TaxLossPairs.com</div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12">
        
        {/* HEADER */}
        <div className="mb-10 text-center">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold mb-4 tracking-wide">
            ETF ANALYSIS
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {etf.ticker} Tax Loss Partners
          </h1>
          <p className="text-lg text-gray-600">
            Top correlations and alternatives for <span className="font-semibold">{etf.name}</span>
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Correlation Data</h2>
            <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
              {etf.sector}
            </span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {etf.partners.map((partner) => (
              <div key={partner.ticker} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-gray-800">{partner.ticker}</div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
                      partner.verdict === "Excellent Match" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {partner.verdict}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-bold text-blue-600">
                      {(partner.correlation * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400 uppercase font-semibold">Correlation</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  Estimated holding overlap: <strong className="text-gray-900">{partner.overlap_estimate}%</strong>
                </p>

                <div className="flex gap-3">
                  <a 
                    href={`https://finance.yahoo.com/quote/${partner.ticker}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    View {partner.ticker} on Yahoo ↗
                  </a>
                  <Link href={`/pairs/${partner.ticker}`} className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                    Analyze {partner.ticker} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER / FOOTER */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} TaxLossPairs.com. Open Source.</p>
          <p className="mt-2">
            Not financial advice. Correlation data is historical. Consult a tax professional regarding wash sale rules.
          </p>
        </div>

      </main>
    </div>
  );
}
