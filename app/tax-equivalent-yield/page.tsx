import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import TEYCalculator from '../components/TEYCalculator';

export const metadata: Metadata = {
  title: 'Tax Equivalent Yield Calculator | TaxLossPairs',
  description: 'Calculate the taxable equivalent yield for municipal bonds based on your federal and state tax brackets (CA, NY, NJ, MA).',
};

export default function TEYPage() {
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
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Is a Tax-Free Bond Better?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            High earners often lose 40-50% of their investment income to taxes. 
            Use this calculator to see if a Municipal Bond beats a standard CD or Corporate Bond.
          </p>
        </div>

        {/* The Calculator Component */}
        <TEYCalculator />

        {/* The Content Block (Fixed Styling) */}
        <div className="mt-16 max-w-2xl mx-auto">
          
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Why This Calculation Matters
            </h3>
            <p className="text-slate-700 leading-relaxed text-lg">
              Municipal bonds ("munis") are generally free from federal income tax and, in many cases, state and local taxes. 
              Comparing them directly to taxable investments (like Corporate Bonds, CDs, or High-Yield Savings) is misleading 
              because you keep <strong>100% of the muni yield</strong>, but only a fraction of the taxable yield.
            </p>
          </div>
          
          {/* The Blue "Cross-Sell" Box */}
          <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Already Maximized Your Yields?
                </h4>
                <p className="text-slate-600 mb-6">
                  Optimizing your bond yield is step one. Step two is <strong>Harvesting Losses</strong> in your stock portfolio to offset your other capital gains.
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
