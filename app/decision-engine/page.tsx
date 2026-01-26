import React from 'react';
import { Metadata } from 'next';
import TLHDecisionEngine from '../components/TLHDecisionEngine';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Tax-Loss Harvesting Decision Engine | Should I Sell?',
  description: 'Calculate if tax-loss harvesting is worth it for your specific portfolio. Compare selling to cash vs. switching to a replacement pair.',
};

export default function DecisionEnginePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-slate-50 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Tax-Loss Harvesting <span className="text-blue-600">Decision Engine</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Stop guessing. Quantify the trade-off between immediate tax savings and the risk of sitting in cash.
            </p>
          </div>

          {/* The Calculator Component */}
          <TLHDecisionEngine />

          {/* SEO Content / FAQ (Manual Styling to Force Visibility) */}
          <div className="mt-16 max-w-3xl mx-auto space-y-6 text-slate-700">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">How this tool works</h3>
              <p>
                Most investors hesitate to harvest losses because they worry about selling at the bottom. 
                This engine compares two scenarios:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-slate-900">Selling to Cash:</strong> You harvest the loss but risk missing a market rebound (Cash Drag).
                </li>
                <li>
                  <strong className="text-slate-900">The Smart Switch:</strong> You harvest the loss and immediately buy a correlated asset to capture the rebound.
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
