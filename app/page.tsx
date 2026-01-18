import React from 'react';
import { Search, ArrowRight, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import pairsData from '../pairs.json'; // This reads your uploaded file

export default function Home() {
  // Simple state for search (in a real app, use useState, but for static MVP this works)
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-blue-700">TaxLossPairs</div>
          <div className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">BETA v1.0</div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <div className="bg-white pb-12 pt-16 px-4 text-center border-b border-slate-200">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Don't trigger a <span className="text-red-600">Wash Sale</span>.
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Instantly find mathematically safe ETF partners for tax loss harvesting.
          <br/>Based on correlation, overlap, and index methodology.
        </p>
        
        {/* --- SEARCH MOCKUP (Functional in V2) --- */}
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search for an ETF (e.g. VTI, ARKK)..." 
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">Currently indexing {pairsData.length} major ETFs</p>
      </div>

      {/* --- DATA DISPLAY LOOP --- */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-8">
          
          {pairsData.map((etf) => (
            <div key={etf.ticker} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
              
              {/* Card Header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{etf.ticker}</h2>
                  <p className="text-sm text-slate-500">{etf.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-700">{etf.sector}</div>
                  <div className="text-xs text-slate-400">Sector</div>
                </div>
              </div>

              {/* Partners Table */}
              <div className="px-6 py-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Top Statistical Partners</h3>
                
                <div className="space-y-3">
                  {etf.partners.map((partner) => (
                    <div key={partner.ticker} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-blue-50 hover:border-blue-100 transition group">
                      
                      {/* Left: Ticker Info */}
                      <div className="flex items-center space-x-4">
                        <div className="bg-white border border-slate-200 h-10 w-10 flex items-center justify-center rounded font-bold text-slate-700">
                          {partner.ticker}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                             <span className="font-bold text-slate-900">{partner.ticker}</span>
                             {partner.verdict === "Excellent Match" ? 
                               <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">SAFE</span> : 
                               <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700">CHECK</span>
                             }
                          </div>
                          <div className="text-xs text-slate-500 flex items-center mt-0.5">
                             <span className="flex items-center mr-3">
                               Correlation: {(partner.correlation * 100).toFixed(1)}%
                             </span>
                             <span className="flex items-center">
                               Overlap: ~{partner.overlap_estimate}%
                             </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: CTA */}
                      <a href={`https://finance.yahoo.com/quote/${partner.ticker}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                        Analyze <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition" />
                      </a>

                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Footer */}
              <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-xs text-slate-500 flex items-start gap-2">
                <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Compliance Note:</strong> {etf.ticker} and its partners track specific indices. 
                  Always verify index methodology (e.g. CRSP vs S&P) before trading to ensure they are not "substantially identical."
                </p>
              </div>

            </div>
          ))}

        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 mb-4">
            TaxLossPairs.com is a mathematical utility, not an investment advisor. 
            <br/>Data provided by Yahoo Finance & FMP.
          </p>
          <div className="flex justify-center gap-4 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600">Bogleheads Guide</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">IRS Pub 550</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
