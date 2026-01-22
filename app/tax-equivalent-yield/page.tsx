import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import TEYCalculator from '../components/TEYCalculator';

export const metadata: Metadata = {
  title: 'Tax Equivalent Yield Calculator (2026) | California, NY, NJ',
  description: 'Calculate the true tax-equivalent yield for municipal bonds in high-tax states like California, New York, and New Jersey. Includes 2026 marginal brackets and NIIT.',
  keywords: 'California muni bond calculator, New York tax equivalent yield, NJ municipal bonds, NIIT tax calculator, tax free yield 2026',
};

export default function TEYPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
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
      <div className="max-w-4xl mx-auto px-4 py-12 flex-grow">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Is a Tax-Free Bond Better?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            High earners in states like <strong>California</strong> and <strong>New York</strong> often lose 50%+ of their income to taxes. 
            Use this calculator to see if a Municipal Bond beats a standard CD or Corporate Bond.
          </p>
        </div>

        {/* The Calculator Component (Generic Mode) */}
        <TEYCalculator />

        {/* SEO CONTENT BLOCK */}
        <div className="mt-16 max-w-3xl mx-auto space-y-16">
          
          {/* State Comparison Table */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              2026 Yield Guide: High-Tax States
            </h3>
            
            <p className="text-slate-700 mb-8 max-w-2xl">
              Not sure if your result makes sense? Here is how a <strong>3.50% Muni Bond</strong> compares for high earners in the highest-tax states. 
              This helps validate why tax-free yields are so powerful in these specific regions.
            </p>
            
            {/* HERO CARDS (The Big 3) */}
            <div className="grid gap-4 md:grid-cols-3">
              
              {/* California Card */}
              <Link 
                href="/tax-equivalent-yield/california"
                className="group block bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🐻</span>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">California</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Top Tax Rate</span>
                    <span className="font-mono font-bold text-red-500">14.4%</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <span className="font-semibold text-slate-900">Taxable Equiv.</span>
                    <span className="text-xl font-bold text-green-600">7.81%</span>
                  </div>
                </div>
              </Link>

              {/* New York Card */}
              <Link 
                href="/tax-equivalent-yield/new-york"
                className="group block bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🍎</span>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">New York</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Top Tax Rate</span>
                    <span className="font-mono font-bold text-red-500">10.9%</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <span className="font-semibold text-slate-900">Taxable Equiv.</span>
                    <span className="text-xl font-bold text-green-600">7.65%</span>
                  </div>
                </div>
              </Link>

              {/* New Jersey Card */}
              <Link 
                href="/tax-equivalent-yield/new-jersey"
                className="group block bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🛣️</span>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">New Jersey</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Top Tax Rate</span>
                    <span className="font-mono font-bold text-red-500">10.75%</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <span className="font-semibold text-slate-900">Taxable Equiv.</span>
                    <span className="text-xl font-bold text-green-600">7.76%</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* --- LINK CLUSTER (Secondary States) --- */}
            <div className="mt-8 text-center bg-white/50 p-4 rounded-lg border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
                Also available for these high-tax states
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
                <Link href="/tax-equivalent-yield/massachusetts" className="hover:text-blue-600 hover:underline transition-colors">Massachusetts</Link>
                <Link href="/tax-equivalent-yield/oregon" className="hover:text-blue-600 hover:underline transition-colors">Oregon</Link>
                <Link href="/tax-equivalent-yield/minnesota" className="hover:text-blue-600 hover:underline transition-colors">Minnesota</Link>
                <Link href="/tax-equivalent-yield/hawaii" className="hover:text-blue-600 hover:underline transition-colors">Hawaii</Link>
                <Link href="/tax-equivalent-yield/vermont" className="hover:text-blue-600 hover:underline transition-colors">Vermont</Link>
                <Link href="/tax-equivalent-yield/connecticut" className="hover:text-blue-600 hover:underline transition-colors">Connecticut</Link>
                <Link href="/tax-equivalent-yield/dc" className="hover:text-blue-600 hover:underline transition-colors">Washington, DC</Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h3>
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-lg text-slate-800 mb-2">What is the NIIT Surtax?</h4>
                <p className="text-slate-600 leading-relaxed">
                  The <strong>Net Investment Income Tax (NIIT)</strong> is an extra 3.8% tax applied to investment income 
                  for high earners (AGI over $200k/$250k). Our calculator automatically adds this surtax to give you the real cost of taxable bonds.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-800 mb-2">Why isn't my "Effective Tax Rate" used?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Investment decisions happen at the <strong>margin</strong>. The IRS taxes your <em>next</em> dollar of interest at your highest bracket, 
                  not your average rate. Using your effective rate would underestimate your tax burden and lead to poor investment choices.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-800 mb-2">Do I pay state tax on out-of-state Munis?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Generally, yes. If you live in California and buy a New York bond, California will tax that income. 
                  To be 100% tax-free, you typically need to buy bonds issued by your home state (e.g., "California Double Tax-Free" funds).
                </p>
              </div>
            </div>
          </div>
          
          {/* Cross-Sell Box */}
          <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm">
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

      {/* --- FOOTER (Matches StatePageTemplate) --- */}
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
