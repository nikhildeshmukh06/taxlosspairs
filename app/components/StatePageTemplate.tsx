import React from 'react';
import Link from 'next/link';
import TEYCalculator from './TEYCalculator';
import type { StateContent } from '../data/state-content';

interface Props {
  stateCode: string;
  content: StateContent;
}

export function StatePageTemplate({ stateCode, content }: Props) {
  // JSON-LD for SEO (Financial Application)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${content.name} Tax-Equivalent Yield Calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: content.metadata.description,
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- NAVIGATION --- */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
            TaxLossPairs
          </Link>
          <div className="text-sm font-medium text-slate-500">
            Tax-Smart Investing Tools
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-4xl mx-auto px-4 py-12 flex-grow">
        
        {/* HERO */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            {content.hero.title}
          </h1>
          <p 
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: content.hero.description }}
          />
        </div>

        {/* CALCULATOR */}
        <TEYCalculator defaultState={stateCode} />

        {/* SEO CONTENT BLOCKS */}
        <div className="mt-16 max-w-3xl mx-auto space-y-12">
          
          {/* WHY SECTION */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{content.whySection.title}</h3>
            <p 
              className="text-slate-700 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: content.whySection.p1 }}
            />
            <p 
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.whySection.p2 }}
            />
          </div>

          {/* EXAMPLE SECTION */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{content.example.title}</h3>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p 
                className="text-slate-700 mb-4"
                dangerouslySetInnerHTML={{ __html: content.example.description }}
              />
              <div className="bg-blue-50 p-4 rounded-lg text-blue-900 text-sm font-medium border border-blue-100">
                {content.example.takeaway}
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              {content.faqs.map((faq, i) => (
                <div key={i}>
                  <h4 className="font-bold text-lg text-slate-800 mb-1">{faq.q}</h4>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CROSS-SELL (Static) */}
          <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm mt-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Optimized Your Bond Yield? Now Optimize Your Capital Gains.
                </h4>
                <p className="text-slate-600 mb-6">
                  Avoiding tax on interest is step one. Step two is using <strong>Tax-Loss Harvesting</strong> to offset your stock market gains.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  Find Tax-Loss Partners &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- FOOTER (Standardized) --- */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Built for the Bogleheads community. Open Source.
          </p>
          
          <p className="text-slate-500 text-xs max-w-2xl mx-auto mb-6 leading-relaxed">
            DISCLAIMER: Tax-equivalent yield calculations are estimates based on 2026 marginal tax brackets and public bond data. 
            They do not constitute financial or tax advice. Actual tax liability depends on your specific situation. 
            Past performance does not guarantee future results.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            
            <a 
              href="https://github.com/nikhildeshmukh06/taxlosspairs" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-600"
            >
              GitHub
            </a>

            <Link href="/legal" className="hover:text-blue-600 hover:underline">
              Legal & Privacy
            </Link>

            <button 
              data-tally-open="68Kqjo" 
              data-tally-layout="modal"
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
              className="hover:text-blue-600 bg-transparent border-none cursor-pointer p-0 font-medium text-slate-500"
            >
              Report an Issue
            </button>

            <span className="text-slate-300">|</span>
            
            <span>Data updated: Jan 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
