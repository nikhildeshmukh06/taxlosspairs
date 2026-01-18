import Link from 'next/link';
"use client";

import React, { useState } from 'react';
import pairsData from './pairs.json'; 

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pairsData.filter((etf) => 
    etf.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || 
    etf.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- COMPLIANCE WARNING (SPLIT FOR CLARITY) --- */}
      <div className="bg-amber-50 border-b border-amber-100 p-3 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-amber-900 font-bold mb-1">
            ⚠️ Data Only. Not investment or tax advice.
          </p>
          <p className="text-[11px] text-amber-800 opacity-90 leading-tight">
             This tool shows historical correlations and estimated overlap. It does not determine wash sale compliance.
          </p>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-blue-700">TaxLossPairs.com</div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">BETA</span>
        </div>
      </header>

      {/* --- HERO --- */}
      <div className="text-center py-16 px-4 border-b border-gray-100 bg-gray-50">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          ETF Correlation & <span className="text-blue-600">Overlap Data</span>
        </h1>
        
        {/* ACTION HOOK (Point 1) */}
        <p className="text-lg font-medium text-gray-800 mb-2">
          Use this tool to compare ETFs when researching potential alternatives during Tax Loss Harvesting.
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-8">
          View 2-year correlation coefficients and sector overlap estimates.
        </p>

        {/* SEARCH */}
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-xl">🔍</span>
          </div>
          <input 
            type="text" 
            placeholder="Search by Ticker (e.g. VTI, SCHD)..." 
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* POPULAR SEARCHES (Updated for SEO) */}
<div className="text-xs text-gray-400 mt-3 flex gap-2 items-center justify-center">
  <span>Popular:</span>
  <Link href="/pairs/VTI" className="hover:text-blue-600 underline decoration-dotted">VTI</Link>
  <Link href="/pairs/VOO" className="hover:text-blue-600 underline decoration-dotted">VOO</Link>
  <Link href="/pairs/QQQ" className="hover:text-blue-600 underline decoration-dotted">QQQ</Link>
  <Link href="/pairs/VXUS" className="hover:text-blue-600 underline decoration-dotted">VXUS</Link>
  <Link href="/pairs/SMH" className="hover:text-blue-600 underline decoration-dotted">SMH</Link>
</div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {filteredData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No ETFs found matching "{searchTerm}"</p>
            <button onClick={() => setSearchTerm("")} className="mt-4 text-blue-600 font-medium hover:underline">Clear Search</button>
          </div>
        )}

        {filteredData.map((etf) => (
          <div key={etf.ticker} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
            
            {/* CARD HEADER */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{etf.ticker}</h2>
                <div className="text-sm text-gray-500">{etf.name}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-700">{etf.sector}</div>
                <div className="text-xs text-gray-400">Sector</div>
              </div>
            </div>

            {/* PARTNERS LIST */}
            <div className="p-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Statistical Correlation Data</h3>
              <div className="space-y-4">
                {etf.partners.map((partner) => (
                  <div key={partner.ticker} className="p-4 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    
                    <div className="flex items-start justify-between">
                      {/* Partner Info */}
                      <div className="flex gap-4">
                        <div className="h-10 w-10 bg-white border border-gray-200 rounded-md flex items-center justify-center font-bold text-gray-600 shadow-sm shrink-0">
                          {partner.ticker}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900">{partner.ticker}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${partner.verdict === "Excellent Match" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                              {partner.verdict === "Excellent Match" ? "High Correlation" : "Moderate Correlation"}
                            </span>
                          </div>
                          
                          {/* METRICS & EXPLAINER (Points 2 & 3) */}
                          <div className="text-xs text-gray-600 font-medium">
                            2-yr Daily Correlation: <span className="text-black">{(partner.correlation * 100).toFixed(1)}%</span> 
                            <span className="mx-2">•</span> 
                            Est. Holdings Overlap: <span className="text-black">~{partner.overlap_estimate}%</span>
                          </div>
                          <div className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                            Overlap estimates shared underlying holdings. Lower overlap may indicate different index composition.
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex flex-col items-end gap-2">
                         {/* View Details (Point 4) */}
                        <a 
                          href={`https://finance.yahoo.com/quote/${partner.ticker}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-semibold text-xs hover:underline whitespace-nowrap"
                        >
                          View Details ↗
                        </a>
                        
                        {/* Share */}
                        <a 
                          href={`https://twitter.com/intent/tweet?text=Comparing ${etf.ticker} ↔️ ${partner.ticker} for tax loss harvesting. Found on taxlosspairs.com 📉`}
                          target="_blank" 
                          rel="noreferrer"
                          className="text-gray-400 hover:text-black text-[10px] font-medium flex items-center gap-1 transition-colors"
                        >
                           <span>Share</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* --- METHODOLOGY / FAQ --- */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Methodology & FAQ</h3>
        <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">How is correlation calculated?</h4>
            <p className="mb-4">We compare the daily price movement of both ETFs over a trailing 2-year period. A value of 100% means they moved in perfect lockstep historically.</p>
            
            <h4 className="font-semibold text-gray-800 mb-2">What is "Overlap"?</h4>
            <p>Overlap estimates how many underlying holdings are shared between the two funds. A lower overlap suggests the funds track different indices or hold different stocks.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Is this legal advice?</h4>
            <p className="mb-4"><strong>No.</strong> The IRS "Wash Sale" rule relies on the term "substantially identical," which is not strictly defined. This tool provides data to help <em>you</em> make that decision, but it cannot decide for you.</p>
            
            <h4 className="font-semibold text-gray-800 mb-2">About</h4>
            <p>Built using publicly available market data and methodologies commonly discussed in the Bogleheads community.</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="text-center py-12 text-gray-400 text-sm border-t border-gray-100 bg-gray-50">
        <p className="mb-4">© 2026 TaxLossPairs.com • Not Investment Advice</p>
        <div className="flex justify-center gap-6">
           <a href="mailto:nikhil@taxlosspairs.com?subject=Feedback" className="hover:text-blue-600">Report an Issue</a>
           <a href="https://twitter.com/nikhildeshmukh" target="_blank" className="hover:text-blue-600">@nikhildeshmukh</a>
        </div>
      </footer>
    </div>
  );
}
