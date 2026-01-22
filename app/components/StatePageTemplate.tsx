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
  stateCode?: string;
}

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

export function StatePageTemplate({ content, stateCode }: Props) {
  const calcCode = stateCode || SLUG_TO_CODE[content.slug] || 'CA';

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* 1. UNIVERSAL NAV BAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* HOME LINK (RESTORED) */}
            <Link href="/" className="text-lg font-black text-slate-900 tracking-tight hover:text-blue-600 transition-colors">
              TaxLossPairs
            </Link>
            
            <div className="h-6 w-px bg-slate-200 hidden md:block" />
            
            {/* BREADCRUMB NAV */}
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
        {/* HERO */}
        <div className="bg-white border-b border-slate-200 pb-12 pt-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              {content.hero.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
               dangerouslySetInnerHTML={{ __html: content.hero.description }} 
            />
          </div>
        </div>

        {/* CALCULATOR */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 mb-20">
          <TEYCalculator defaultState={calcCode} />
        </div>

        {/* CONTENT BLOCKS */}
        <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10 -mr-32 -mt-32"></div>
            </div>
          </section>

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
      </div>

      {/* FOOTER SECTION */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
             <div>
               <Link href="/" className="text-lg font-black text-slate-900">TaxLossPairs</Link>
               <p className="text-sm text-slate-500 mt-2">Smart tools for tax-sensitive investors.</p>
             </div>
             <div className="flex gap-6 md:justify-end text-sm text-slate-600">
               <Link href="/" className="hover:text-blue-600">Home</Link>
               <Link href="/tax-equivalent-yield" className="hover:text-blue-600">TEY Calculator</Link>
             </div>
          </div>
          <div className="border-t border-slate-100 pt-8 text-center">
            <DisclaimerModal />
            <p className="text-xs text-slate-400 mt-4">&copy; {new Date().getFullYear()} TaxLossPairs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
