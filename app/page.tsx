"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import pairsData from './pairs.json';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic
  const filteredPairs = pairsData.filter((pair) =>
    pair.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pair.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pair.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- COMPLIANCE WARNING --- */}
      <div className="bg-amber-50 border-b border-amber-100 p-3 text-center">
        <p className="text-xs text-amber-800 font-medium">
          ⚠️ For informational purposes only. Not financial or tax advice. Past correlation does not guarantee future results.
        </p>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Tax Loss Harvesting <span className="text-blue-600">Partner Finder</span>
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Instantly find mathematically safe ETF partners to avoid wash sales. 
            Based on 10-year historical correlation and sector overlap.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <input
              type="text"
              placeholder="Search ticker (e.g. VTI, QQQ, SMH)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative w-full p-4 pl-6 rounded-lg border border-slate-200 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
            />
          </div>

          {/* POPULAR SEARCHES (SEO Links) */}
          <div className="text-xs text-gray-400 mt-4 flex gap-3 items-center justify-center">
            <span className="font-semibold uppercase tracking-wider text-gray-300">Popular:</span>
            <Link href="/pairs/VTI" className="hover:text-blue-600 hover:underline transition-colors">VTI</Link>
            <Link href="/pairs/VOO" className="hover:text-blue-600 hover:underline transition-colors">VOO</Link>
            <Link href="/pairs/QQQ" className="hover:text-blue-600 hover:underline transition-colors">QQQ</Link>
            <Link href="/pairs/VXUS" className="hover:text-blue-600 hover:underline transition-colors">VXUS</Link>
            <Link href="/pairs/SMH" className="hover:text-blue-600 hover:underline transition-colors">SMH</Link>
          </div>
        </div>
      </header>

      {/* --- RESULTS SECTION --- */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {filteredPairs.length === 0 ? (
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
          <div className="grid gap-6">
            {filteredPairs.map((etf) => (
              <Link href={`/pairs/${etf.ticker}`} key={etf.ticker} className="block group">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-200 cursor-pointer relative overflow-hidden">
                  
                  {/* Hover Accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {etf.ticker}
                      </h2>
                      <p className="text-slate-500 font-medium text-sm mt-1">{etf.name}</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full border border-slate-200">
                      {etf.sector}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {etf.partners.map((partner) => (
                      <div key={partner.ticker} className="bg-slate-50 rounded-lg p-4 border border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-slate-800 text-lg">{partner.ticker}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            partner.verdict === 'Excellent Match' ? 'bg-emerald-100 text-emerald-700' : 
                            partner.verdict === 'Good Match' ? 'bg-blue-100 text-blue-700' : 
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {partner.verdict === 'Excellent Match' ? 'Excellent' : 'Good'}
                          </span>
                        </div>
                        <div className="flex items-end justify-between">
                           <div>
                             <div className="text-xs text-slate-400 font-medium uppercase">Correlation</div>
                             <div className="text-sm font-mono font-bold text-slate-700">
                               {(partner.correlation * 100).toFixed(1)}%
                             </div>
                           </div>
                           <div className="text-right">
                             <div className="text-xs text-slate-400 font-medium uppercase">Overlap</div>
                             <div className="text-sm font-mono font-bold text-slate-700">
                               ~{partner.overlap_estimate}%
                             </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <span className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                      View Full Analysis →
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* --- FAQ SECTION (RESTORED) --- */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">What is the "Wash Sale" rule?</h3>
              <p className="text-slate-600 leading-relaxed">
                The IRS Wash Sale rule prevents you from claiming a loss on the sale of a security if you buy a 
                "substantially identical" security within 30 days before or after the sale. This tool helps you find 
                alternatives that are correlated but track different indices, which is a common strategy to avoid this rule.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">How are "Partners" selected?</h3>
              <p className="text-slate-600 leading-relaxed">
                We analyze 10 years of historical price data to find ETFs with high correlation (typically &gt;0.98) 
                and similar sector exposure. We prioritize funds that track <strong>different underlying indices</strong> 
                (e.g., CRSP vs. Dow Jones) to minimize wash sale risk.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Is this financial advice?</h3>
              <p className="text-slate-600 leading-relaxed">
                No. This tool is for informational purposes only. "Substantially identical" is not strictly defined 
                by the IRS. You should always consult a qualified tax professional before making trading decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Built for the Bogleheads community. Open Source. No Ads.
          </p>
          <div className="flex justify-center gap-6 text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <a href="https://github.com/nikhildeshmukh/taxlosspairs" target="_blank" rel="noreferrer" className="hover:text-blue-600">GitHub</a>
            <span className="text-slate-300">|</span>
            <span>Data updated: Jan 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
