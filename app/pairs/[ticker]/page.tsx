import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import pairsData from '../../pairs.json';
import BackButton from '../../components/BackButton';

// 1. Tell Next.js exactly which pages to build
export async function generateStaticParams() {
  return pairsData.map((etf) => ({
    ticker: etf.ticker,
  }));
}

// 2. Optimized SEO Metadata
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
        
        {/* HEADER & DYNAMIC INTRODUCTION (Added for SEO Density) */}
        <div className="mb-10 text-center">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold mb-4 tracking-wide border border-slate-200 uppercase">
            Market Research Data
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {etf.ticker} Correlation & Overlap
          </h1>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 text-left shadow-sm mb-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Fund Strategy Analysis</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>{etf.name} ({etf.ticker})</strong> is a key instrument in the {etf.sector} category. 
              Investors often research {etf.ticker} when planning tax loss harvesting strategies, 
              seeking to maintain market exposure while navigating IRS wash sale regulations. 
              The metrics below analyze how closely this fund tracks potential replacement candidates.
            </p>
          </div>
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
              const isInverse = partner.correlation < 0;
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
                  
                  <p className="text-sm text-gray-600 mb-4 font-medium leading-relaxed">
                    Estimated holding overlap is <span className="text-gray-900">{partner.overlap_estimate}%</span>. 
                    {partner.overlap_estimate > 80 
                      ? ` ${partner.ticker} and ${etf.ticker} share a significant portion of their underlying portfolios, often resulting in synchronized price movements.` 
                      : ` While highly correlated, the structural differences between these funds are often reviewed when considering wash sale safety.`}
                  </p>

                  <div className="flex gap-4 items-center">
                    <a 
                      href={`https://finance.yahoo.com/quote/${partner.ticker}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Yahoo Finance ↗
                    </a>

                    {partnerPageExists ? (
                        <Link href={`/pairs/${partner.ticker}`} className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                        View {partner.ticker} Analysis →
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
            
            {isLeveraged ? (
              <div className="p-3 bg-yellow-50 border border-yellow-100 rounded text-yellow-800">
                <strong>Leveraged/Inverse Note:</strong> Leveraged ETFs are designed to deliver multiples of daily returns and may experience significant performance divergence over longer periods.
              </div>
            ) : (
              <p>
                <strong>Benchmark Similarity:</strong> ETFs tracking similar broad-market or sector-specific benchmarks often exhibit extremely high correlation. Investors typically review additional factors such as index methodology when evaluating similarity.
              </p>
            )}

            <p className="italic">
              * Correlation calculated using 2-year daily price returns.
            </p>
          </div>
        </div>

        {/* DEFINITIONS & SEO CONTENT BLOCK (Added for Authority) */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">What is Correlation?</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                    Correlation measures the historical relationship between two assets. A value of 1.00 (100%) means they move perfectly in sync. For tax loss harvesting, high correlation is generally desired to stay in the market while realizing a loss.
                </p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Index Methodology</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                    Under the wash sale rule, "substantially identical" assets are disallowed for loss claims. Many investors argue that ETFs tracking different indices (e.g., S&P 500 vs. Russell 1000) are not substantially identical.
                </p>
            </div>
        </div>

        {/* RELATED RESEARCH */}
        <div className="mb-12">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Related ETF Research</h4>
            <div className="flex flex-wrap gap-2">
                {['VOO', 'IVV', 'SPY', 'QQQ', 'VTI'].filter(t => t !== ticker).map(t => (
                    <Link key={t} href={`/pairs/${t}`} className="px-3 py-1 bg-white border border-gray-200 rounded text-xs text-blue-600 hover:border-blue-300 transition-colors font-medium">
                        {t} Metrics
                    </Link>
                ))}
            </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 pt-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} TaxLossPairs.com • Research Utility</p>
          
          <div className="mt-4 mb-4 flex flex-wrap justify-center items-center gap-x-4">
             <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
             <Link href="/legal" className="hover:text-blue-600 hover:underline">Legal & Privacy</Link>
             <button 
               data-tally-open="68Kqjo" 
               data-tally-layout="modal"
               className="text-gray-400 hover:text-blue-600 hover:underline bg-transparent border-none cursor-pointer p-0 font-medium"
             >
               Report data issue for {etf.ticker}
             </button>
          </div>

          <p className="mt-2 max-w-lg mx-auto leading-relaxed italic">
            Market data for informational purposes only. Not financial, tax, or legal advice. 
            Correlation data through Jan 2026. Consult a tax professional regarding Section 1091.
          </p>
           <p className="mt-4">
            <Link href="/" className="text-blue-600 hover:underline">Back to Global Search</Link>
          </p>
        </div>

      </main>
    </div>
  );
}
