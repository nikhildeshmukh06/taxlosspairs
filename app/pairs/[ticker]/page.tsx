import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import pairsData from '../../pairs.json';
import BackButton from '../../components/BackButton';
import ReportIssueButton from '../../components/ReportIssueButton'; // <--- Import the new client component

// 1. Tell Next.js exactly which pages to build
export async function generateStaticParams() {
  return pairsData.map((etf) => ({
    ticker: etf.ticker,
  }));
}

// 2. Optimized SEO Metadata (Server Side Only)
export async function generateMetadata({ params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase();
  const etf = pairsData.find((p) => p.ticker === ticker);

  if (!etf) return { title: 'ETF Not Found' };

  return {
    title: `${ticker} ETF Correlation & Holdings Overlap | TaxLossPairs`,
    description: `Compare ${ticker} correlation and holdings overlap with similar ETFs for research into tax loss harvesting alternatives. Not tax or investment advice.`,
  };
}

// 3. The Page Content
export default function TickerPage({ params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase();
  const etf = pairsData.find((p) => p.ticker === ticker);

  if (!etf) return notFound();

  // CHECK: Is this a leveraged or inverse fund?
  const isLeveraged = etf.sector.toLowerCase().includes('leveraged') || 
                      etf.sector.toLowerCase().includes('inverse');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* NAV */}
      <nav className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          
          {/* SMART BACK BUTTON */}
          <BackButton />
          
          <div className="text-sm font-semibold text-gray-500 tracking-tight">TaxLossPairs.com</div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12">
        
        {/* HEADER */}
        <div className="mb-10 text-center">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold mb-4 tracking-wide border border-slate-200 uppercase">
            Market Research Data
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {etf.ticker} Correlation & Overlap
          </h1>
          
          {/* SMART HERO TEXT */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            This page shows historical correlation and estimated holdings overlap between {etf.ticker} and other ETFs, 
            {isLeveraged 
              ? " metrics sometimes reviewed when researching market similarity and wash sale considerations." 
              : " metrics commonly reviewed when researching wash sale considerations."}
          </p>
        </div>

        {/* MAIN DATA CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Top Correlated ETFs</h2>
            <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 font-medium lowercase">
              {etf.sector}
            </span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {etf.partners.map((partner) => {
              // 1. Check for inverse relationship
              const isInverse = partner.correlation < 0;
              
              // 2. Check if the partner actually has a page in our DB
              const partnerPageExists = pairsData.some(p => p.ticker === partner.ticker);
              
              return (
                <div key={partner.ticker} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-gray-800 tracking-tighter">{partner.ticker}</div>
                      
                      {/* Correlation Badge */}
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide bg-slate-200 text-slate-700 font-mono" title="Based on 2-year daily price returns">
                          {isInverse ? 'INVERSE' : `CORR ≥ ${partner.correlation >= 0.99 ? '0.99' : '0.95'}*`}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-mono font-bold ${isInverse ? 'text-red-600' : 'text-blue-600'}`}>
                        {(partner.correlation * 100).toFixed(1)}%
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                        {isInverse ? 'Inverse Correlation' : 'Correlation'}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 font-medium">
                    Estimated holding overlap: <span className="text-gray-900">{partner.overlap_estimate}%</span>
                  </p>

                  <div className="flex gap-4 items-center">
                    <a 
                      href={`https://finance.yahoo.com/quote/${partner.ticker}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      View external fund information ↗
                    </a>

                    {/* CONDITIONAL LINK LOGIC */}
                    {partnerPageExists ? (
                        <Link href={`/pairs/${partner.ticker}`} className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                        View {partner.ticker} Metrics →
                        </Link>
                    ) : (
                        <span className="text-xs font-medium text-gray-400 cursor-not-allowed select-none">
                            {partner.ticker} Data Coming Soon
                        </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* DISCLAIMER BLOCK */}
          <div className="bg-slate-50 p-6 border-t border-gray-100 text-xs text-gray-500 space-y-3 leading-relaxed">
            <p>
              <strong>Note on Overlap:</strong> Estimates are based on the most recent publicly disclosed holdings and may differ from current portfolio composition.
            </p>
            
            {/* CONDITIONAL LEVERAGED WARNING */}
            {isLeveraged ? (
              <div className="p-3 bg-yellow-50 border border-yellow-100 rounded text-yellow-800">
                <strong>Leveraged/Inverse Note:</strong> Leveraged ETFs are designed to deliver multiples of daily returns and may experience significant performance divergence over longer periods. Overlap metrics may be less predictive due to derivative exposure.
              </div>
            ) : (
              <p>
                <strong>Benchmark Similarity:</strong> ETFs tracking similar broad-market or sector-specific benchmarks often exhibit extremely high correlation and overlap. Investors typically review additional factors such as index methodology, fund structure, and reconstitution rules when evaluating similarity.
              </p>
            )}

            <p className="italic">
              * Correlation calculated using 2-year daily price returns.
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

        {/* RELATED RESEARCH */}
        <div className="mb-12">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Related ETF Correlation Research</h4>
            <div className="flex flex-wrap gap-2">
                {['VOO', 'IVV', 'SPY', 'QQQ', 'VTI'].filter(t => t !== ticker).map(t => (
                    <Link key={t} href={`/pairs/${t}`} className="px-3 py-1 bg-white border border-gray-200 rounded text-xs text-blue-600 hover:border-blue-300 transition-colors font-medium">
                        {t} Correlation & Overlap
                    </Link>
                ))}
            </div>
            <p className="mt-6 text-xs text-slate-400 italic">
              Tip: Many investors review multiple correlation and overlap pairs before making research-based decisions.
            </p>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 pt-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} TaxLossPairs.com • Open Source</p>
          
          <div className="mt-4 mb-4">
             {/* THE FIX: Use our new Client Component here */}
             <ReportIssueButton ticker={etf.ticker} />
          </div>

          <p className="mt-2 max-w-lg mx-auto leading-relaxed">
            Market data for informational purposes only. Not financial, tax, or legal advice. 
            Correlation data through Jan 2026. Overlap based on most recent publicly available filings.
          </p>
           <p className="mt-4">
            <Link href="/" className="text-blue-600 hover:underline">Back to Global Search</Link>
          </p>
        </div>

      </main>
    </div>
  );
}
