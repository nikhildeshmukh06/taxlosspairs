import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import TEYCalculator from '../components/TEYCalculator';
import { STATE_CONTENT } from '../data/state-content';

export const metadata: Metadata = {
  title: 'Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
  description: 'Calculate the true after-tax return of municipal bonds vs taxable corporate bonds. Supports 2026 federal brackets, NIIT, and state-specific taxes.',
  keywords: 'tax equivalent yield calculator, muni bond calculator, tax free yield',
};

export default function TEYHubPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* HERO */}
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Is a Tax-Free Bond Better?
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            High earners often lose 50%+ of their income to taxes. Use this calculator to see if a Municipal Bond beats a standard CD or Corporate Bond.
          </p>
        </div>
      </div>

      {/* CALCULATOR */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 mb-20">
        <TEYCalculator defaultState="CA" />
      </div>

      {/* STATE LINKS (SEO Fix) */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">State-Specific Calculators</h2>
          <p className="text-slate-600 mt-2">Get precise tax rates and analysis for your state.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.values(STATE_CONTENT).map((state) => (
            <Link 
              key={state.slug} 
              href={`/tax-equivalent-yield/${state.slug}`}
              className="group block bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-center"
            >
              <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {state.name}
              </div>
              <div className="text-xs text-slate-400 mt-1 group-hover:text-blue-400">
                View Rates →
              </div>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}
