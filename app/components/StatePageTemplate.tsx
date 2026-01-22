'use client';

import React from 'react';
import Link from 'next/link';
import { StateContent, STATE_CONTENT } from '../data/state-content'; 
import TEYCalculator from './TEYCalculator';
import Footer from './Footer';

interface Props {
  content: StateContent;
  stateCode?: string;
}

const SLUG_TO_CODE: Record<string, string> = {
  'california': 'CA',
  'new-york-city': 'NYC',
  'new-york': 'NY',
  'new-jersey': 'NJ',
  'massachusetts': 'MA',
  'oregon': 'OR',
  'minnesota': 'MN',
  'hawaii': 'HI',
  'vermont': 'VT',
  'connecticut': 'CT',
  'dc': 'DC'
};

export function StatePageTemplate({ content, stateCode }: Props) {
  // Determine correct state code for calculator
  const calcCode = stateCode || SLUG_TO_CODE[content.slug] || 'CA';

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
            <div className="flex items-center gap-3 text-sm">
              <Link href="/tax-equivalent-yield" className="font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                TEY Calculator
              </Link>
              <span className="text-slate-300">/</span>
              <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                {content.name}
              </span>
            </div>
          </div>
          <div className="hidden md:block text-xs font-mono text-slate-400">
            2026 Tax Outlook
          </div>
        </div>
      </nav>

      <div className="flex-grow">
        {/* HERO SECTION */}
        <div className="bg-white border-b border-slate-200 pb-12 pt-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                High-Earner Analysis
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              {content.hero.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
               dangerouslySetInnerHTML={{ __html: content.hero.description }} 
            />
          </div>
        </div>

        {/* CALCULATOR SECTION */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 mb-20">
          {/* FUNCTIONAL FIX: Added isLocked={true} to keep state focused */}
          <TEYCalculator defaultState={calcCode} isLocked={true} />
          
          {/* TRUST ANCHOR: FORMULA & INTENT */}
          <div className="max-w-2xl mx-auto mt-8 text-center space-y-4">
            <p className="text-xs text-slate-500 font-medium italic">
              "This tool is built for high-income investors evaluating tax-free municipal bonds versus taxable alternatives."
            </p>
            <div className="inline-block bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <code className="text-[10px] md:text-xs text-slate-600 font-mono">
                TEY = Tax-Free Yield ÷ (1 − (Federal Rate + NIIT + State Rate))
              </code>
            </div>
          </div>
        </div>

        {/* DETAILED CONTENT SECTION */}
        <div className="max-w-3xl mx-auto px-6 pb-20 space-y-20">
          
          {/* SECTION 1: WHY IT MATTERS */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold shadow-lg shadow-green-200">
                01
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                {content.whySection.title}
              </h2>
            </div>
            <div className="prose prose-slate prose-lg bg-white p-8 rounded-2xl border border-slate-200 shadow-sm leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: content.whySection.p1 }} />
              <p dangerouslySetInnerHTML={{ __html: content.whySection.p2 }} />
            </div>
          </section>

          {/* SECTION 2: EXAMPLE CALCULATION */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200">
                02
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                {content.example.title}
              </h2>
            </div>
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden relative">
              <div className="relative z-10">
                <p className="text-xl text-slate-300 mb-10 leading-relaxed font-medium" 
                   dangerouslySetInnerHTML={{ __html: content.example.description }} 
                />
                
                {/* POLISH: Glassmorphic stat blocks maintained */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">Annual Income</div>
                    <div className="text-2xl font-mono font-bold text-white">{content.example.income}</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">Muni Yield</div>
                    <div className="text-2xl font-mono font-bold text-green-400">{content.example.muniYield}</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">Taxable Equiv.</div>
                    <div className="text-2xl font-mono font-bold text-blue-400">{content.example.taxableYield}</div>
                  </div>
                </div>

                <div className="bg-blue-600/20 border border-blue-500/30 p-6 rounded-2xl flex gap-5 items-start">
                  <div className="text-3xl">💡</div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">Strategic Insight</div>
                    <p className="text-sm text-blue-50/90 leading-relaxed italic">"{content.example.takeaway}"</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-48 -mt-48 pointer-events-none"></div>
            </div>
          </section>

          {/* SECTION 3: FAQs */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {content.faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
                  <h3 className="font-bold text-slate-900 mb-3 text-lg group-hover:text-blue-700 transition-colors">{faq.q}</h3>
                  <p className="text-slate-600 leading-relaxed text-base">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* INTERNAL LINKS (The "Spoke" Network) */}
        <div className="bg-slate-100 border-t border-slate-200 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Compare Tax-Equivalent Yields</h3>
            <p className="text-slate-500 mb-12 max-w-xl mx-auto">
              Select a specific high-tax jurisdiction to see how state-level surtaxes and credits affect your true yield.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.values(STATE_CONTENT).map((state) => (
                <Link 
                  key={state.slug} 
                  href={`/tax-equivalent-yield/${state.slug}`}
                  className={`group block p-4 rounded-xl border transition-all text-center ${
                    state.slug === content.slug 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md text-slate-900'
                  }`}
                >
                  <div className={`font-bold text-sm ${state.slug === content.slug ? 'text-white' : 'group-hover:text-blue-600'}`}>
                    {state.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>

      <Footer variant="tey" />
    </main>
  );
}
