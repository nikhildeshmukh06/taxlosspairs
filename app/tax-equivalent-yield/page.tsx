import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import TEYCalculator from '../components/TEYCalculator';
import { STATE_CONTENT } from '../data/state-content';
import Footer from '../components/Footer'; // <--- NEW SHARED FOOTER

export const metadata: Metadata = {
  title: 'Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
  description: 'Calculate the true after-tax return of municipal bonds vs taxable corporate bonds. Supports 2026 federal brackets, NIIT, and state-specific taxes.',
  keywords: 'tax equivalent yield calculator, muni bond calculator, tax free yield',
};

export default function TEYHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* NAV BAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-black text-slate-900 tracking-tight hover:text-blue-600 transition-colors">
              TaxLossPairs
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden md:block" />
            <span className="font-semibold text-slate-900 text-sm">
              Tax-Equivalent Yield Calculator
            </span>
          </div>
          <div className="hidden md:block text-xs font-mono text-slate-400">
            2026 Tax Outlook
          </div>
        </div>
      </nav>

      <div className="flex-grow">
        {/* HERO */}
        <div className="bg-white border-b border-slate-200 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-6">
              2026 Tax Outlook
            </div>
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

        {/* STATE LINKS */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
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

        {/* YIELD GUIDE */}
        <div className="bg-white py-20 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              2026 Yield Guide (High-Tax States)
            </h2>
            <div className="overflow-hidden bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-500 uppercase font-bold text-xs">
                  <tr>
                    <th className="px-6 py-4">State</th>
                    <th className="px-6 py-4">Top Rate</th>
                    <th className="px-6 py-4 text-right">If Muni Yield is 3.50%...</th>
                    <th className="px-6 py-4 text-right">Taxable Equiv.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">California</td>
                    <td className="px-6 py-4 text-slate-500">13.3%</td>
                    <td className="px-6 py-4 text-right font-mono text-slate-600">3.50%</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-green-600">7.63%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">New York (NYC)</td>
                    <td className="px-6 py-4 text-slate-500">14.8%</td>
                    <td className="px-6 py-4 text-right font-mono text-slate-600">3.50%</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-green-600">7.84%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">New Jersey</td>
                    <td className="px-6 py-4 text-slate-500">10.75%</td>
                    <td className="px-6 py-4 text-right font-mono text-slate-600">3.50%</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-green-600">7.21%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQS */}
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">What is Tax-Equivalent Yield (TEY)?</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                TEY represents the pre-tax yield you would need on a taxable bond (like a Corporate Bond or CD) to match the tax-free yield of a Municipal Bond. It helps you compare "apples to apples."
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Does this calculator include NIIT?</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Yes. If your income exceeds $200k (Single) or $250k (Married), our calculator automatically adds the 3.8% Net Investment Income Tax (NIIT) to your federal rate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REUSABLE FOOTER (With Tax Disclaimer) */}
      <Footer variant="tey" />
    </main>
  );
}
