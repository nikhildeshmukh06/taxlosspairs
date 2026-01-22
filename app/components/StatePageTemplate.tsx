'use client';

import React from 'react';
import Link from 'next/link';
import { StateContent } from '../data/state-content';
import TEYCalculator from './TEYCalculator';
import BackButton from './BackButton';
import ReportIssueButton from './ReportIssueButton';
import DisclaimerModal from './DisclaimerModal';

interface Props {
  content: StateContent;
}

// Map the "Slug" (URL) to the "ID" (Calculator Code)
const SLUG_TO_CODE: Record<string, string> = {
  'california': 'CA',
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

export default function StatePageTemplate({ content }: Props) {
  // Determine the correct calculator code (Default to CA if missing)
  const calcCode = SLUG_TO_CODE[content.slug] || 'CA';

  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* 1. NAV BAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div className="h-6 w-px bg-slate-200" />
            <Link href="/tax-equivalent-yield" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Tax-Equivalent Yield Hub
            </Link>
          </div>
          <div className="text-xs font-mono text-slate-400">
            {content.name} Edition
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <div className="bg-white border-b border-slate-200 pb-12 pt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-6">
            2026 Tax Outlook
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            {content.hero.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
             dangerouslySetInnerHTML={{ __html: content.hero.description }} 
          />
        </div>
      </div>

      {/* 3. CALCULATOR SECTION */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 mb-20">
        {/* Pass the correct state code (e.g., 'NY') to the calculator */}
        <TEYCalculator defaultState={calcCode} />
      </div>

      {/* 4. CONTENT BLOCKS */}
      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">
        
        {/* Why It Matters */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            {content.whySection.title}
          </h2>
          <div className="prose prose-slate prose-lg bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <p dangerouslySetInnerHTML={{ __html: content.whySection.p1 }} />
            <p dangerouslySetInnerHTML={{ __html: content.whySection.p2 }} />
          </div>
        </section>

        {/* Real World Example */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            {content.example.title}
          </h2>
          <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-lg text-slate-300 mb-8 leading-relaxed" 
                 dangerouslySetInnerHTML={{ __html: content.example.description }} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Annual Income</div>
                  <div className="text-xl font-mono font-bold">{content.example.income}</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Muni Yield</div>
                  <div className="text-xl font-mono font-bold text-green-400">{content.example.muniYield}</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Taxable Equiv.</div>
                  <div className="text-xl font-mono font-bold text-white">{content.example.taxableYield}</div>
                </div>
              </div>

              <div className="bg-blue-600/20 border border-blue-500/30 p-4 rounded-lg flex gap-4 items-start">
                <div className="text-2xl">💡</div>
                <p className="text-sm text-blue-100 leading-relaxed italic">
                  "{content.example.takeaway}"
                </p>
              </div>
            </div>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10 -mr-32 -mt-32"></div>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
        
        <div className="flex justify-center pt-8">
          <ReportIssueButton />
        </div>

      </div>

      <div className="text-center py-8">
        <DisclaimerModal />
      </div>
    </main>
  );
}
