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
      
      {/* Navigation Bar (Simplified) */}
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

        {/* The SEO Content Block (Below the fold) */}
        <div className="mt-16 max-w-2xl mx-auto prose prose-slate">
          <h3>How Tax Equivalent Yield Works</h3>
          <p>
            Municipal bonds ("munis") are generally free from federal income tax and, in many cases, state and local taxes. 
            Comparing them directly to taxable investments (like Corporate Bonds, CDs, or High-Yield Savings) is misleading 
            because you keep 100% of the muni yield, but only a fraction of the taxable yield.
          </p>
          
          <h3>The "Closed Loop" Strategy</h3>
          <div className="not-prose bg-blue-50 p-6 rounded-xl border border-blue-100 my-8">
            <h4 className="text-blue-900 font-bold text-lg mb-2">Harvesting Losses?</h4>
            <p className="text-blue-800 mb-4">
              If you are managing a taxable portfolio, maximizing after-tax yield is only half the battle. 
              You should also be harvesting losses to offset your capital gains.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Find Tax-Loss Partners &rarr;
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
