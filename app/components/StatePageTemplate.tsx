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
    <main className="min-h-screen bg-slate-50">
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 mb-20">
        <TEYCalculator defaultState={calcCode} />
      </div>

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
            <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center
