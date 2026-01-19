import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import pairsData from '../../pairs.json';

// 1. Tell Next.js exactly which pages to build
export async function generateStaticParams() {
  return pairsData.map((etf) => ({
    ticker: etf.ticker,
  }));
}

// 2. Optimized SEO Metadata (Fix #1: Match Search Intent)
export async function generateMetadata({ params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase();
  const etf = pairsData.find((p) => p.ticker === ticker);

  if (!etf) return { title: 'ETF Not Found' };

  return {
    title: `${ticker} ETF Correlation & Holdings Overlap | TaxLossPairs`,
    description: `View quantitative correlation and estimated holdings overlap metrics for ${ticker} (${etf.name}) to support wash sale research.`,
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
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold mb-4 tracking-wide border border-slate-200">
            MARKET DATA
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {etf.ticker} Correlation & Overlap
          </h1>
          {/* Fix #2: Intent Clarification Sentence */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            This page shows historical correlation and estimated holdings overlap between {etf.ticker} and other ETFs, metrics commonly reviewed when researching wash sale considerations.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Top Correlated ETFs</h2>
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
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide bg-slate-200 text-slate-700 font-mono">
                      CORR ≥ {partner.correlation >= 0.99 ? '0.99' : '0.95'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-bold text-blue-600">
                      {(partner.correlation * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400 uppercase font-semibold">Correlation</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 font-medium">
                  Estimated holding overlap: <span className="text-gray-900">{partner.overlap_estimate}%</span>
                </p>

                <div className="flex gap-4">
                  <a 
                    href={`https://finance.yahoo.com/quote/${partner.ticker}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    External Fund Data ↗
                  </a>
                  <Link href={`/pairs/${partner.ticker}`} className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                    View {partner.ticker} Metrics →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Fix #3 & #4: Consolidated Disclaimer & Benchmark Reality Note */}
          <div className="bg-slate-50 p-6 border-t border-gray-100 text-xs text-gray-500 space-y-3">
            <p>
              <strong>Note on Overlap:</strong> Estimates are based on the most recent publicly disclosed holdings and may differ from current portfolio composition.
            </p>
            <p>
              <strong>Benchmark Similarity:</strong> ETFs tracking the same benchmark (e.g., S&P 500) often exhibit extremely high correlation and overlap. Investors typically review additional factors such as index methodology, fund structure, and reconstitution rules when evaluating similarity.
            </p>
          </div>
        </div>

        {/* DEFINITIONS BLOCK */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">What is Correlation?</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                    Correlation measures how closely two assets move together historically. A value of 1.00 means they move perfectly in sync. This tool uses 2 years of daily price history.
                </p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">What is Overlap?</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                   Overlap estimates the percentage of holdings that two ETFs share. High overlap may indicate similar economic exposure.
                </p>
            </div>
        </div>

        {/* INTERNAL LINKING (Good-to-Have #2) */}
        <div className="mb-12">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Related Research</h4>
            <div className="flex flex-wrap gap-2">
                {['VOO', 'IVV', 'SPY', 'QQQ', 'VTI'].filter(t => t !== ticker).map(t => (
                    <Link key={t} href={`/pairs/${t}`} className="px-3 py-1 bg-white border border-gray-200 rounded text-xs text-blue-600 hover:border-blue-300 transition-colors">
                        {t} Correlation & Overlap
                    </Link>
                ))}
            </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 pt-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} TaxLossPairs.com. Open Source.</p>
          <p className="mt-2 max-w-lg mx-auto leading-relaxed">
            Market data for informational purposes only. Not financial, tax, or legal advice. 
            Data snapshot: Jan 2026.
          </p>
        </div>

      </main>
    </div>
  );
}
