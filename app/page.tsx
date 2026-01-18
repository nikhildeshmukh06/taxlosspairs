"use client";

import React, { useState } from 'react';
import pairsData from './pairs.json'; // Ensure this matches your file location (./ or ../)

export default function Home() {
  // 1. Create a "State" to track what the user types
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Filter the data based on that search term
  const filteredData = pairsData.filter((etf) => 
    etf.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || 
    etf.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-blue-700">TaxLossPairs.com</div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">BETA</span>
        </div>
      </header> {/* --- COMPLIANCE WARNING --- */}
<div className="bg-amber-50 border-b border-amber-100 p-3 text-center">
  <p className="text-xs text-amber-800 font-medium">
    ⚠️ <strong>Data Only. Not Investment Advice.</strong> This tool displays historical statistical correlations. 
    It does not assess "Substantially Identical" status. You are responsible for your own tax compliance.
  </p>
</div>

      {/* --- HERO --- */}
      <div className="text-center py-16 px-4 border-b border-gray-100 bg-gray-50">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
  ETF Correlation & <span className="text-blue-600">Overlap Data</span>
</h1>
<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
  Analyze statistical relationships between ETFs for your Tax Loss Harvesting research.
  <br/>View 2-year correlation coefficients and sector overlap estimates.
</p>

        {/* --- SEARCH BAR (NOW FUNCTIONAL) --- */}
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
        
        <div className="text-sm text-gray-400 mt-4">
          Showing {filteredData.length} of {pairsData.length} Major ETFs
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* If no results found */}
        {filteredData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No ETFs found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 text-blue-600 font-medium hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* The List Loop */}
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
              <div className="space-y-3">
                {etf.partners.map((partner) => (
                  <div key={partner.ticker} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    
                    {/* Partner Info */}
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-white border border-gray-200 rounded-md flex items-center justify-center font-bold text-gray-600 shadow-sm">
                        {partner.ticker}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{partner.ticker}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            {partner.verdict === "Excellent Match" ? "HIGH MATCH" : "GOOD MATCH"}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Correlation: {(partner.correlation * 100).toFixed(1)}% • Overlap: ~{partner.overlap_estimate}%
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <a 
                      href={`https://finance.yahoo.com/quote/${partner.ticker}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-medium text-sm hover:underline"
                    >
                      Analyze ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* DISCLAIMER */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                ⚠️ <strong>Compliance Check:</strong> {etf.ticker} and its partners track specific indices. Always verify the index methodology (e.g. CRSP vs S&P) yourself.
              </p>
            </div>
          </div>
        ))}
      </main>

      {/* --- FOOTER --- */}
     {/* --- FAQ / METHODOLOGY --- */}
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
            
            <h4 className="font-semibold text-gray-800 mb-2">Data Sources</h4>
            <p>Pricing data is sourced from public market APIs (Yahoo Finance / FMP). Calculations are performed daily.</p>
          </div>
        </div>
      </section> <footer className="text-center py-12 text-gray-400 text-sm border-t border-gray-100">
        <p>© 2026 TaxLossPairs.com • Not Investment Advice</p>
      </footer>
    </div>
  );
}
