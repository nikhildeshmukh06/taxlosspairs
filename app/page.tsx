"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import pairsData from './pairs.json';

// Define the order for the "Bloomberg Terminal" clusters
const CATEGORY_ORDER = [
  'Core US ETFs',
  'Technology & Growth',
  'Leveraged & Inverse',
  'Dividends & Income',
  'International ETFs',
  'Sector & Commodities',
  'Bonds & Rates'
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  // 1. FILTER LOGIC
  const filteredTickers = useMemo(() => {
    if (!searchTerm) return pairsData;
    const lower = searchTerm.toLowerCase();
    return pairsData.filter(
      (p) =>
        p.ticker.toLowerCase().includes(lower) ||
        p.name.toLowerCase().includes(lower) ||
        p.sector.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  // 2. GROUPING LOGIC
  const groupedTickers = useMemo(() => {
    const groups: Record<string, typeof pairsData> = {};
    
    // Initialize groups
    CATEGORY_ORDER.forEach(cat => { groups[cat] = []; });

    // Sort items into groups
    filteredTickers.forEach((etf) => {
      // Fallback for any old data without a category
      const cat = etf.category || 'Other'; 
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(etf);
    });

    return groups;
  }, [filteredTickers]);

  // Check if we have any results at all
  const hasResults = Object.values(groupedTickers).some(group => group.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- COMPLIANCE WARNING --- */}
      <div className="bg-slate-100 border-b border-slate-200 p-3 text-center">
        <p className="text-xs text-slate-600 font-medium">
          ⚠️ Market Data Only. Not financial, tax, or investment advice. Past correlation does not guarantee future results.
        </p>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            ETF Correlation & <span className="text-blue-600">Overlap Metrics</span>
          </h1>
          
          {/* SEO INTRO TEXT */}
          <div className="max-w-3xl mx-auto mb-10 text-slate-600 space-y-4 leading-relaxed text-lg">
            <p>
              Tax-loss harvesting involves selling securities at a loss to offset gains, but IRS wash-sale rules may restrict claiming those losses if a substantially identical security is repurchased within 30 days.
            </p>
            <p>
              This tool presents structured ETF correlation and holdings overlap metrics often reviewed when comparing economically similar ETFs for research purposes.
            </p>
          </div>

          {/* SEARCH BAR WITH GLOW EFFECT */}
          <div className="max-w-xl mx-auto relative group mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <input
              type="text"
              placeholder="Search ticker (e.g. VTI, TQQQ, SCHD)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative w-full p-4 pl-6 rounded-lg border border-slate-200 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
            />
            {/* Search Icon visual cue */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                🔍
            </div>
          </div>

        </div>
      </header>

      {/* --- RESULTS SECTION --- */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        
        {/* --- EXISTING ETF GRID --- */}
        {!hasResults ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
             <p className="text-slate-400 text-lg">No ETF found matching "{searchTerm}"</p>
             <button 
               onClick={() => setSearchTerm('')}
               className="mt-4 text-blue-600 font-bold hover:underline"
             >
               Clear Search
             </button>
          </div>
        ) : (
          <div className="space-y-12">
            {CATEGORY_ORDER.map((category) => {
              const tickers = groupedTickers[category];
              if (!tickers || tickers.length === 0) return null;

              return (
                <section key={category}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-2">
                    <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
                      {category}
                    </h2>
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {tickers.length}
                    </span>
                  </div>

                  {/* Grid Layout */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {tickers.map((etf) => {
                      const isLeveraged = category === 'Leveraged & Inverse';
                      
                      return (
                        <Link 
                          href={`/pairs/${etf.ticker}`} 
                          key={etf.ticker} 
                          className={`
                            group relative bg-white p-4 rounded-lg border shadow-sm hover:shadow-md hover:z-20 transition-all
                            ${isLeveraged ? 'border-red-100 hover:border-red-300' : 'border-slate-200 hover:border-blue-300'}
                          `}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                              {etf.ticker}
                            </h3>
                            
                            {/* SMART "TACTICAL" BADGE WITH MOBILE TAP SUPPORT */}
                            {isLeveraged && (
                              <div 
                                className="group/badge relative z-10 ml-auto outline-none" 
                                role="button"
                                tabIndex={0} 
                                onClick={(e) => e.preventDefault()}
                              >
                                <span className="cursor-help flex items-center gap-1 text-[9px] font-bold text-red-600 bg-white px-2 py-0.5 rounded border border-red-200 uppercase tracking-wide hover:bg-red-50 transition-colors">
                                  Tactical
                                  <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </span>

                                {/* TOOLTIP */}
                                <div className="absolute bottom-full right-0 mb-2 w-48 p-2.5 bg-slate-800 text-white text-[10px] font-medium leading-relaxed rounded-md shadow-xl opacity-0 translate-y-2 group-hover/badge:opacity-100 group-hover/badge:translate-y-0 group-focus/badge:opacity-100 group-focus/badge:translate-y-0 transition-all pointer-events-none group-focus/badge:pointer-events-auto">
                                  <div className="mb-1 text-red-300 font-bold uppercase tracking-wider">High Risk Structure</div>
                                  Leveraged ETFs reset daily and are not designed for long-term buy-and-hold strategies.
                                  <div className="absolute top-full right-3 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="text-xs text-slate-500 truncate font-medium mb-3">
                            {etf.name}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            {etf.sector}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* --- MOVED: RELATED TAX TOOLS (Now at the bottom) --- */}
        <section className="mt-20 pt-10 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
              Related Tax-Smart Tools
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TEY Calculator Card */}
            <Link 
              href="/tax-equivalent-yield" 
              className="group block p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl">🏛️</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  %
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                  TEY Calculator
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Compare tax-free municipal bonds to taxable CDs and corporate bonds using your marginal federal and state tax rates.
              </p>
              <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Calculate Yield &rarr;
              </span>
            </Link>
          </div>
        </section>

      </main>

      {/* --- METHODOLOGY STRIP --- */}
      <div className="bg-slate-100 border-y border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Data Methodology</p>
          <p className="text-sm text-slate-700">
            Correlation based on 2-year daily returns. Overlap estimates derived from latest publicly disclosed holdings.
          </p>
        </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">What is "Overlap"?</h3>
              <p className="text-slate-600 leading-relaxed">
                Overlap reflects the percentage of shared securities based on the latest publicly reported holdings. 
                Values are estimates and may lag actual current holdings.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">How is Correlation calculated?</h3>
              <p className="text-slate-600 leading-relaxed">
                We utilize 2 years of historical daily price returns to calculate the correlation coefficient. 
                A value of 1.00 indicates perfect positive correlation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Is this investment advice?</h3>
              <p className="text-slate-600 leading-relaxed">
                No. This tool displays historical market data only. It does not provide tax, legal, or investment advice. 
                You should consult a qualified professional before making trading decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER (UPDATED DISCLAIMER) --- */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Built for the Bogleheads community. Open Source.
          </p>
          
          {/* NEW GLOBAL DISCLAIMER */}
          <p className="text-slate-500 text-xs max-w-2xl mx-auto mb-6 leading-relaxed">
            DISCLAIMER: Correlation and overlap estimates are based on historical data, index methodology, and public holdings. 
            They are approximations, not guarantees, and may change over time. Leveraged products often use swaps/derivatives 
            resulting in low physical overlap despite high correlation. Past performance does not guarantee future results.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            
            <a 
              href="https://github.com/nikhildeshmukh06/taxlosspairs" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-600"
            >
              GitHub
            </a>

            <Link href="/legal" className="hover:text-blue-600 hover:underline">
              Legal & Privacy
            </Link>

            <button 
              data-tally-open="68Kqjo" 
              data-tally-layout="modal"
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
              className="hover:text-blue-600 bg-transparent border-none cursor-pointer p-0 font-medium text-slate-500"
            >
              Report an Issue
            </button>

            <span className="text-slate-300">|</span>
            
            <span>Data updated: Jan 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
