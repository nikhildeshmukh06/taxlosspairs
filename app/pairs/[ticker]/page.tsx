import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import pairsData from '../../pairs.json';
import WashSaleCalculator from '../../components/WashSaleCalculator';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

// 1. GENERATE STATIC PARAMS
export async function generateStaticParams() {
  return pairsData.map((etf) => ({
    ticker: etf.ticker,
  }));
}

// 2. SEO METADATA
export async function generateMetadata({ params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase();
  const etf = pairsData.find((p) => p.ticker === ticker);

  if (!etf) return { title: 'ETF Not Found' };

  return {
    title: `${ticker} ETF Correlation & Holdings Overlap | TaxLossPairs`,
    description: `Compare ${ticker} correlation and holdings overlap with similar ETFs for research into tax loss harvesting alternatives. Not tax or investment advice.`,
  };
}

// --- HELPER: DETERMINISTIC VARIANT SELECTOR ---
const getVariantIndex = (str: string, count: number) => {
  const sum = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return sum % count;
};

// --- CONTENT TEMPLATES ---
const INTRO_TEMPLATES = [
  (ticker: string, sector: string) => `Data regarding ${ticker} is frequently analyzed by investors planning tax loss harvesting strategies, specifically those seeking to maintain ${sector} exposure while navigating IRS wash sale regulations.`,
  (ticker: string, sector: string) => `For portfolios allocated to the ${sector} sector, ${ticker} is a primary vehicle. Market research often focuses on finding partner assets that preserve this specific market exposure without triggering wash sale rules.`,
  (ticker: string, sector: string) => `As a key ${sector} instrument, ${ticker} plays a central role in many portfolios. The metrics below display its historical correlation with other funds to assist in Section 1091 compliance research.`,
  (ticker: string, sector: string) => `${ticker} offers targeted access to the ${sector} market. To capture tax benefits without exiting this position entirely, market participants often evaluate pairs with high correlation but distinct underlying indices.`
];

const PARTNER_TEMPLATES = [
  (t1: string, t2: string, overlap: number) => `${t1} shows a high degree of historical similarity with ${t2}. With an estimated overlap of <strong>${overlap < 10 ? '<10' : overlap}%</strong>, this pair is often analyzed in discussions regarding "substantially identical" securities.`,
  (t1: string, t2: string, overlap: number) => `With approximately <strong>${overlap < 10 ? '<10' : overlap}%</strong> overlap in holdings, ${t1} and ${t2} exhibit highly synchronized price behavior. This structural similarity is a key data point for tax-loss harvesting research.`,
  (t1: string, t2: string, overlap: number) => `${t1} and ${t2} share a specific relationship in their market behavior. The key distinction for tax purposes often lies in their divergent index methodologies despite high correlation.`,
  (t1: string, t2: string, overlap: number) => `A holdings overlap of roughly <strong>${overlap < 10 ? '<10' : overlap}%</strong> suggests that ${t1} and ${t2} maintain aligned market exposure. This metric is frequently used to assess the potential for maintaining economic position while realizing a tax loss.`
];

// 3. PAGE COMPONENT
export default function TickerPage({ params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase();
  const etf = pairsData.find((p) => p.ticker === ticker);

  if (!etf) return notFound();

  // CHECK: Is this a leveraged or inverse fund?
  const isLeveraged = etf.sector.toLowerCase().includes('leveraged') || 
                      etf.sector.toLowerCase().includes('inverse');

  // SELECT INTRO VARIANT
  const introVariant = getVariantIndex(ticker, INTRO_TEMPLATES.length);
  const IntroText = INTRO_TEMPLATES[introVariant];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* GLOBAL NAVBAR */}
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-12">
        
        {/* HEADER & DYNAMIC INTRODUCTION */}
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
              <strong>{etf.name} ({etf.ticker})</strong> is a key instrument in the {etf.sector} category. {IntroText(etf.ticker, etf.sector)} 
              <br/><br/>
              <span className="text-xs text-gray-400 italic">
                Note: This page summarizes historical similarity metrics and does not assess tax treatment or regulatory outcomes.
              </span>
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
              
              // SELECT PARTNER VARIANT
              const partnerVariant = getVariantIndex(ticker + partner.ticker, PARTNER_TEMPLATES.length);
              const PartnerText = PARTNER_TEMPLATES[partnerVariant];

              // --- NEW "SOFT PRECISION" FORMATTING LOGIC ---
              const correlationDisplay = partner.correlation >= 0.99 
                ? '>0.99' 
                : (partner.correlation * 100).toFixed(1) + '%';
                
              const overlapDisplay = partner.overlap_estimate < 10 
                ? '< 10%' 
                : `~${partner.overlap_estimate}%`;

              return (
                <div key={partner.ticker} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-gray-800 tracking-tighter">{partner.ticker}</div>
                      
                      {/* Banded Correlation Badge */}
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide bg-slate-200 text-slate-700 font-mono" title="Based on 2-year daily price returns">
                          {isInverse ? 'INVERSE' : `CORR ${partner.correlation >= 0.99 ? '≥ 0.99' : '≥ 0.95'}*`}
                      </span>
                    </div>
                    <div className="text-right">
                      {/* SOFT PRECISION DISPLAY */}
                      <div className={`text-2xl font-mono font-bold ${isInverse ? 'text-red-600' : 'text-blue-600'}`}>
                        {correlationDisplay}
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                        {isInverse ? 'Inverse Correlation' : 'Correlation'}
                      </div>
                    </div>
                  </div>
                  
                  {/* DYNAMIC PARTNER TEXT */}
                  <div className="text-sm text-gray-600 mb-4 font-medium leading-relaxed">
                      <span dangerouslySetInnerHTML={{ __html: PartnerText(partner.ticker, etf.ticker, partner.overlap_estimate) }} />
                      
                      {/* EXPLICIT OVERLAP DATA POINT */}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          Overlap: {overlapDisplay}
                        </span>
                      </div>
                  </div>

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
              <strong>Note on Overlap:</strong> Estimates are based on the most recent publicly disclosed holdings. Leveraged/Inverse products often use swaps resulting in low physical overlap despite high correlation.
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

        {/* --- 1. WASH SALE CALCULATOR (Moved Up for Utility) --- */}
        <div className="mb-8">
            <WashSaleCalculator ticker={ticker} />
        </div>

        {/* --- 2. DECISION ENGINE CTA (Contextual Strategy) --- */}
        <div className="mb-12 p-1 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 shadow-sm">
            <div className="bg-white rounded-[10px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                        <span>Thinking of selling {ticker}?</span>
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase tracking-wide">Beta</span>
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md">
                        Avoid the <strong>"Cash Trap"</strong>. Calculate if the tax deduction is worth the risk of missing a market rebound.
                    </p>
                </div>
                <Link 
                    href="/decision-engine"
                    className="whitespace-nowrap px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2"
                >
                    Run the Math
                    <span className="text-emerald-200">→</span>
                </Link>
            </div>
        </div>

        {/* RELATED RESEARCH (Nav) */}
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

        {/* DEFINITIONS & SEO CONTENT BLOCK (Text Filler) */}
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

        {/* --- 3. CROSS-SELL BANNER (Moved to Bottom) --- */}
        <div className="mb-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-200 text-[10px] font-bold px-2 py-1 rounded mb-3 uppercase tracking-wider">
                New Tool
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Is a 4% Tax-Free Bond Better than a 7% CD?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                Don't guess. Compare municipal bonds against taxable alternatives using your exact 2026 federal and state tax bracket.
              </p>
            </div>
            <Link
              href="/tax-equivalent-yield"
              className="w-full md:w-auto text-center px-5 py-3 bg-white text-slate-900 font-bold text-sm rounded-lg hover:bg-blue-50 transition-colors shadow-md flex justify-center items-center gap-2"
            >
              Check My Tax-Equivalent Yield →
            </Link>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity"></div>
        </div>

        {/* FOOTER */}
        <Footer />

      </main>
    </div>
  );
}
