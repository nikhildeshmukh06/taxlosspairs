import React from 'react';
import Link from 'next/link';
import BackButton from '../components/BackButton';

export const metadata = {
  title: 'Legal & Privacy | TaxLossPairs',
  description: 'Legal disclaimer and privacy policy for TaxLossPairs.com.',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* NAV */}
      <nav className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <BackButton />
          <div className="text-sm font-semibold text-gray-500 tracking-tight">TaxLossPairs.com</div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Legal Disclaimer & Privacy Policy</h1>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-8 text-slate-700 leading-relaxed">
          
          {/* SECTION 1: NO ADVICE (Updated for TEY) */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. No Investment or Tax Advice</h2>
            <p>
              The content provided on <strong>TaxLossPairs.com</strong> is for informational and research purposes only. 
              It does <strong>not</strong> constitute financial, investment, tax, or legal advice.
            </p>
            <p className="mt-2">
              We are not financial advisors or tax professionals. The tools on this site—including ETF correlation metrics and 
              Tax-Equivalent Yield (TEY) calculators—are based on historical data, public filings, and estimated projections. 
              You should consult a qualified professional (CPA, CFP, or attorney) before making any investment decisions, 
              especially regarding tax-loss harvesting, municipal bond selection, or tax planning.
            </p>
          </section>

          {/* SECTION 2: DATA ACCURACY (Updated for Tax Rates) */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. No Warranty of Accuracy</h2>
            <p>
              All data is provided "as is" without warranty of any kind. We make no representations regarding the accuracy, 
              completeness, or timeliness of the information.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>ETF Data:</strong> Correlation and overlap estimates are algorithmically generated and may contain errors.
              </li>
              <li>
                <strong>Tax Data:</strong> Federal and state tax brackets used in the TEY Calculator are <strong>estimates</strong> based on 
                inflation projections or current statutes. Actual tax rates for future tax years (e.g., 2026) may differ due to legislative changes.
              </li>
              <li>
                <strong>Bond Rules:</strong> State-specific tax rules (e.g., AMT liability, reciprocity) are complex and subject to change.
              </li>
            </ul>
          </section>

          {/* SECTION 3: PRIVACY */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Privacy Policy</h2>
            <p>
              We respect your privacy. If you choose to submit feedback or report an issue via our forms:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>We collect the information you voluntarily provide (email, comments).</li>
              <li>We use this information <strong>only</strong> to improve the website and respond to your report.</li>
              <li>We do not sell, rent, or share your personal information with third parties.</li>
            </ul>
          </section>

          {/* SECTION 4: EXTERNAL LINKS */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. External Links</h2>
            <p>
              This website may contain links to third-party websites (e.g., Yahoo Finance). We are not responsible for the 
              content or privacy practices of these external sites.
            </p>
          </section>

          <hr className="border-slate-100 my-6" />

          <p className="text-sm text-slate-500">
            Last Updated: January 2026
          </p>

        </div>
      </main>
    </div>
  );
}
