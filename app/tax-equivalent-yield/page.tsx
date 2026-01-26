import React from 'react';
import Link from 'next/link';
import TEYCalculator from '../components/TEYCalculator';
import { STATE_CONTENT } from '../data/state-content';
import Footer from '../components/Footer'; 
import Navbar from '../components/Navbar'; // <--- NEW IMPORT

// 1. Dynamic Metadata (Pulls directly from your central data file)
export const metadata = STATE_CONTENT['hub'].metadata;

export default function TEYHubPage() {
  // 2. Get Hub Data & Filter out the Hub itself from state links
  const hubData = STATE_CONTENT['hub'];
  const stateLinks = Object.values(STATE_CONTENT).filter((s) => s.slug !== 'hub');

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* GLOBAL NAVBAR */}
      <Navbar />

      <div className="flex-grow">
        {/* HERO (Now Dynamic) */}
        <div className="bg-white border-b border-slate-200 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-6">
              2026 Tax Outlook
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              {hubData.hero.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
               dangerouslySetInnerHTML={{ __html: hubData.hero.description }}
            />
          </div>
        </div>

        {/* CALCULATOR */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 mb-20">
          <TEYCalculator defaultState="CA" />
        </div>

        {/* STATE LINKS (Filtered) */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900">State-Specific Calculators</h2>
            <p className="text-slate-600 mt-2">Get precise tax rates and analysis for your state.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stateLinks.map((state) => (
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

        {/* YIELD GUIDE (With Mobile Scroll Fix) */}
        <div className="bg-white py-20 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              2026 Yield Guide (High-Tax States)
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              {/* FIX: Added overflow-x-auto wrapper for mobile responsiveness */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
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
        </div>

        {/* FAQS (Now Dynamic & Correct) */}
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {hubData.faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- TAX STRATEGY TOOLKIT --- */}
      <div className="bg-slate-900 py-12 px-6 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
                <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
                    Advanced Tax Strategy
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                    Optimize Your Capital Gains
                </h3>
                <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                    High earners often pair tax-free income with strategic loss harvesting. 
                    Have realized losses? Use our decision engine to check if you should harvest.
                </p>
            </div>
            <Link 
                href="/decision-engine"
                className="whitespace-nowrap px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-lg transition-colors shadow-lg flex items-center gap-2"
            >
                Open Decision Engine
                <span>→</span>
            </Link>
        </div>
      </div>

      {/* REUSABLE FOOTER */}
      <Footer variant="tey" />
    </main>
  );
}
