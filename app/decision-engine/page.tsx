import React from 'react';
import { Metadata } from 'next';
import TLHDecisionEngine from '../components/TLHDecisionEngine';

export const metadata: Metadata = {
  title: 'Tax-Loss Harvesting Decision Engine | Should I Sell?',
  description: 'Calculate if tax-loss harvesting is worth it for your specific portfolio. Compare selling to cash vs. switching to a replacement pair.',
};

export default function DecisionEnginePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
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

        {/* SEO Content / FAQ (Static HTML for Googlebot) */}
        <div className="mt-16 max-w-3xl mx-auto prose prose-slate">
          <h3>How this tool works</h3>
          <p>
            Most investors hesitate to harvest losses because they worry about selling at the bottom. 
            This engine compares two scenarios:
          </p>
          <ul>
            <li><strong>Selling to Cash:</strong> You harvest the loss but risk missing a market rebound (Cash Drag).</li>
            <li><strong>The Smart Switch:</strong> You harvest the loss and immediately buy a correlated asset to capture the rebound.</li>
          </ul>
          <p className="text-sm text-slate-500 italic">
            Disclaimer: This tool provides educational estimates only. It does not constitute tax advice. 
            Consult a CPA for your specific situation.
          </p>
        </div>

      </div>
    </main>
  );
}
