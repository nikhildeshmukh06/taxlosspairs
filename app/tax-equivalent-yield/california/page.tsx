import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import TEYCalculator from '../../components/TEYCalculator'; // Note the double ../

export const metadata: Metadata = {
  title: 'California Tax-Equivalent Yield Calculator (2025) | TaxLossPairs',
  description: 'Calculate the true tax-equivalent yield for California municipal bonds using 2026 marginal tax brackets (14.4%) and NIIT. See if a muni beats a CD.',
  keywords: 'California tax equivalent yield calculator, CA muni bond calculator, California marginal tax rate 2026, double tax free bonds CA',
};

export default function CaliforniaTEYPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* Navigation Bar */}
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* State-Specific Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            California Tax-Equivalent Yield Calculator (2025)
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            If you live in California, taxes can quietly destroy your investment returns. 
            With a top marginal rate of <strong>14.4%</strong> plus federal tax, a "good" taxable yield often isn't good at all.
          </p>
        </div>

        {/* The Calculator (Forced to CA) */}
        <TEYCalculator defaultState="CA" />

        {/* Results Explanation */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900 mb-2">How to interpret your result</h3>
          <p className="text-slate-600">
            The <strong>Tax-Equivalent Yield (TEY)</strong> shown above is the taxable yield you would need to earn 
            (from a CD, Treasury, or Corporate Bond) to match the tax-free income from a California municipal bond. 
            If your taxable option pays <em>less</em> than this number, the Muni bond is the mathematical winner.
          </p>
        </div>

        {/* SEO Content Block */}
        <div className="mt-16 max-w-3xl mx-auto space-y-12">
          
          {/* Concrete Example */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Example: California Investor ($150k Income)</h3>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <ul className="space-y-3 text-slate-700 mb-6">
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>California Muni Yield</span>
                  <span className="font-mono font-bold">3.50%</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Federal Marginal Rate</span>
                  <span className="font-mono">24.0%</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>CA Marginal Rate</span>
                  <span className="font-mono">9.3%</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="font-bold text-slate-900">Total Tax Hit</span>
                  <span className="font-mono font-bold text-red-500">~33.3%</span>
                </li>
              </ul>
              <div className="bg-green-50 p-4 rounded-lg text-green-900 text-sm">
                <strong>The Verdict:</strong> A 3.50% CA Muni is equivalent to a <strong>5.25% Taxable Bond</strong>. 
                This means a 5.0% Corporate Bond actually puts <em>less</em> money in your pocket than the Muni.
              </div>
            </div>
          </div>

          {/* Marginal vs Effective */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why we use Marginal Rates</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Most online calculators use your effective (average) tax rate. <strong>That is incorrect for investment decisions.</strong>
            </p>
            <p className="text-slate-700 leading-relaxed">
              When you earn new investment income, the IRS taxes that income at your <strong>marginal rate</strong>—the rate on your next dollar. 
              Using effective rates understates your real tax bill and makes taxable bonds look better than they actually are.
            </p>
          </div>

          {/* CA Specific Nuance */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">The "Double Tax-Free" Advantage</h3>
            <p className="text-slate-700 leading-relaxed">
              California residents benefit from "double tax-free" status when buying California-issued municipal bonds. 
              These are exempt from both Federal income tax AND California state income tax. In high brackets, this makes CA Munis 
              one of the most efficient assets available.
            </p>
          </div>

          {/* FAQs */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-slate-800 mb-1">Do California munis avoid NIIT?</h4>
                <p className="text-slate-600">Yes. Interest from municipal bonds is generally exempt from the 3.8% Net Investment Income Tax.</p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-800 mb-1">Who should not use muni bonds?</h4>
                <p className="text-slate-600">Lower-income investors, or those investing via tax-advantaged accounts (IRAs/401ks), generally do not benefit from the lower yields of municipal bonds.</p>
              </div>
            </div>
          </div>

          {/* Cross-Sell Box */}
          <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm mt-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Already Maximized Your Yields?
                </h4>
                <p className="text-slate-600 mb-6">
                  Reducing taxes on bond income is step one. Step two is <strong>Harvesting Losses</strong> in your stock portfolio to offset your other capital gains.
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
    </main>
  );
}
