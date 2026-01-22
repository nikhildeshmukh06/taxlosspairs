import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import TEYCalculator from '../../components/TEYCalculator'; 

export const metadata: Metadata = {
  title: 'California Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
  description: 'Calculate the true tax-equivalent yield for California municipal bonds using 2026 marginal tax brackets (14.4%) and NIIT. See if a muni beats a CD.',
  keywords: 'California tax equivalent yield calculator, CA muni bond calculator, California marginal tax rate 2026, double tax free bonds CA',
};

export default function CaliforniaTEYPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      
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
        
        {/* CALIFORNIA-SPECIFIC HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            California Tax-Equivalent Yield Calculator (2026)
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            This calculator shows the taxable yield required to match a <strong>California in-state municipal bond</strong>, 
            which is exempt from both Federal and California income tax, based on your 2026 marginal tax bracket.
          </p>
        </div>

        {/* The Calculator (Pre-selected to CA) */}
        <TEYCalculator defaultState="CA" />

        {/* SEO CONTENT BLOCK (Specific to California) */}
        <div className="mt-16 max-w-3xl mx-auto space-y-12">
          
          {/* Why it matters in CA */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Tax-Equivalent Yield Matters More in California</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              California’s top marginal income tax rate is <strong>14.4%</strong> (including the Mental Health Services Surtax). Since state taxes are generally not deductible at the federal level due to the SALT cap, this hit is purely additive.
            </p>
            <p className="text-slate-700 leading-relaxed">
              When state and federal taxes stack, small differences in yield compound dramatically. A California resident in the top bracket loses over <strong>50%</strong> of every additional dollar of taxable interest. 
              For high earners, in-state municipal bonds are often the only way to preserve yield without taking on equity risk.
            </p>
          </div>

          {/* California-Specific Example */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Example: California High Earner</h3>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-slate-700 mb-4">
                Using the calculator above, a married California resident earning <strong>$650,000</strong> and considering a <strong>4.50% California municipal bond</strong> would need a taxable yield of approximately <strong>8.67%</strong> to break even.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-blue-900 text-sm font-medium border border-blue-100">
                <strong>Reality Check:</strong> Very few investment-grade corporate bonds offer an 8.67% yield. This highlights why high-net-worth Californians heavily favor munis.
              </div>
            </div>
          </div>

          {/* California-Specific FAQs */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-slate-800 mb-1">Do I pay CA tax on out-of-state bonds?</h4>
                <p className="text-slate-600">
                  Yes. California generally taxes interest from municipal bonds issued by other states (e.g., a New York muni bond is taxable in CA). 
                  To be fully tax-free, you typically need to buy bonds issued by California agencies.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-800 mb-1">Does the 1% Mental Health Services Tax apply?</h4>
                <p className="text-slate-600">
                  Yes. For taxable incomes over $1 million, California adds a 1% surtax. 
                  Our calculator automatically includes this 14.4% top bracket when your income exceeds the threshold.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-800 mb-1">Why isn't my "Effective Tax Rate" used?</h4>
                <p className="text-slate-600">
                  Investment decisions happen at the <strong>margin</strong>. The IRS taxes your <em>next</em> dollar of interest at your highest bracket, not your average rate. 
                  Using your effective rate would underestimate your tax burden and lead to poor investment choices.
                </p>
              </div>
            </div>
          </div>

          {/* Cross-Sell */}
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

      {/* --- PRO FOOTER (Identical to Hub) --- */}
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
