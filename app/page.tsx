import React from 'react';
// We are importing the JSON file. 
// Ensure 'pairs.json' is uploaded to the SAME folder as this file, 
// OR inside the 'app' folder. If it fails, move the JSON file next to this file.
import pairsData from '../pairs.json'; 

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
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
          Avoid the <span className="text-red-600">Wash Sale</span> Rule.
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Instantly find mathematically safe ETF partners for tax loss harvesting.
          <br/>Based on 2-year correlation and sector overlap.
        </p>
        <div className="text-sm text-gray-400">
          Indexing {pairsData.length} Major ETFs • Updated for 2026
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {pairsData.map((etf) => (
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
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Best Tax Loss Partners</h3>
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
      <footer className="text-center py-12 text-gray-400 text-sm border-t border-gray-100">
        <p>© 2026 TaxLossPairs.com • Not Investment Advice</p>
      </footer>
    </div>
  );
}
