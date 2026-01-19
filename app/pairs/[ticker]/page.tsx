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

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase();
  const etf = pairsData.find((p) => p.ticker === ticker);

  if (!etf) return { title: 'ETF Not Found' };

  return {
    title: `${ticker} Correlation & Overlap Data for Tax Loss Harvesting`,
    description: `View correlation coefficients and holdings overlap for ${ticker} (${etf.name}) against potential tax loss partners. Data for research purposes.`,
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
            {etf.ticker} Correlation Metrics
          </h1>
          <p className="text-lg text-gray-600">
            Historical correlation and overlap data for <span className="font-semibold">{etf.name}</span>
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
                    
                    {/* NEUTRAL BADGE */}
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
                
                <p className="text-sm text-gray-600 mb-4">
                  Estimated holding overlap: <strong className="text-gray-900">{partner.overlap_estimate}%</strong>
                  <span className="block text-[10px] text-gray-400 mt-1">
                    *Overlap estimates based on latest public holdings; actuals may vary.
                  </span>
                </p>

                <div className="flex gap-3">
                  <a 
                    href={`https://finance.yahoo.com/quote/${partner.ticker}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Research {partner.ticker} on Yahoo ↗
                  </a>
                  <Link href={`/pairs/${partner.ticker}`} className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                    View {partner.ticker} Data →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* INDEX DISCLAIMER */}
          <div className="bg-slate-50 p-4 border-t border-gray-100 text-xs text-gray-500">
            <p>
              <strong>Note:</strong> Different ETFs may track different indexes (e.g., CRSP vs S&P). Similar correlation does not guarantee identical index structure.
            </p>
          </div>
        </div>

        {/* DEFINITIONS BLOCK (SEO & User Education) */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">What is Correlation?</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                    Correlation measures how closely two assets move together historically. A value of 1.00 means they move perfectly in sync. We use 2 years of daily price history.
                </p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">What is Overlap?</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                   Overlap estimates the percentage of holdings that two ETFs share. This is based on publicly disclosed filings and may differ from real-time holdings.
                </p>
            </div>
        </div>

        {/* DISCLAIMER / FOOTER */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} TaxLossPairs.com. Open Source.</p>
          <p className="mt-2 max-w-lg mx-auto leading-relaxed">
            Market data for informational purposes only. Not financial, tax, or legal advice. 
            Correlation data is historical. Overlap is estimated based on public filings.
          </p>
           <p className="mt-4">
            <Link href="/" className="text-blue-600 hover:underline">Back to Search</Link>
          </p>
        </div>

      </main>
    </div>
  );
}
