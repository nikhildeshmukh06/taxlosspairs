import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import TLHDecisionEngine from '../components/TLHDecisionEngine';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  // AUDIT FIX: Hybrid Title Tag (Calculator + Human Hook + ETF Specificity)
  title: 'Tax-Loss Harvesting Calculator: Should I Sell or Swap ETFs? | TaxLossPairs',
  description: 'Free tax-loss harvesting calculator. Quantify the "Cash Trap" risk, compare selling to cash vs. swapping ETFs, and avoid wash sales. Optimize your 2026 tax strategy.',
};

export default function DecisionEnginePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* GLOBAL NAVBAR */}
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold mb-4 tracking-wide border border-emerald-200 uppercase">
              Beta Tool
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Tax-Loss Harvesting <span className="text-blue-600">Decision Engine</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Stop guessing. Quantify the trade-off between immediate tax savings and the risk of sitting in cash.
            </p>
          </div>

          {/* The Calculator Component */}
          <TLHDecisionEngine />

          {/* --- NEXT STEPS (Closing the Loop) --- */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-8 text-center uppercase tracking-widest text-sm text-slate-400">
              Take Action on Your Results
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              {/* ACTION 1: FIND A PARTNER (Back to Home) */}
              <Link 
                href="/" 
                className="group block p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl group-hover:bg-blue-100 transition-colors">
                    🔍
                  </div>
                  <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                    Find a Replacement Asset
                  </h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  If the calculator recommends a "Smart Switch," find a correlation partner to stay invested while harvesting the loss.
                </p>
                <span className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Search Tickers &rarr;
                </span>
              </Link>

              {/* ACTION 2: OPTIMIZE INCOME (To TEY Hub) */}
              <Link 
                href="/tax-equivalent-yield" 
                className="group block p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-400 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-xl group-hover:bg-purple-100 transition-colors">
                    🏛️
                  </div>
                  <h4 className="font-bold text-lg text-slate-900 group-hover:text-purple-600 transition-colors">
                    Optimize Fixed Income
                  </h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Don't stop at capital gains. Compare tax-free municipal bonds against taxable CDs using your exact 2026 tax bracket.
                </p>
                <span className="text-purple-600 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Check Tax-Equivalent Yield &rarr;
                </span>
              </Link>

            </div>
          </div>

          {/* SEO Content / FAQ */}
          <div className="mt-20 max-w-3xl mx-auto space-y-8 text-slate-700">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">How this tool works</h3>
              <p className="mb-4 leading-relaxed">
                Most investors hesitate to harvest losses because they worry about selling at the bottom. 
                This engine compares two scenarios:
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong className="text-slate-900">Selling to Cash (The Trap):</strong> You harvest the loss but risk missing a market rebound (Cash Drag). If the market recovers faster than your tax savings, you lose money.
                </li>
                <li>
                  <strong className="text-slate-900">The Smart Switch:</strong> You harvest the loss and immediately buy a correlated asset. This captures the rebound while "banking" the tax deduction.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>
      
      {/* Global Footer with Decision Engine Context */}
      <Footer variant="decision" />
    </div>
  );
}
