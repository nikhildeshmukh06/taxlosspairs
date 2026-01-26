'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

// Define the shape of the props
interface FooterProps {
  variant?: 'standard' | 'tey' | 'decision'; // Added 'decision' variant
}

export default function Footer({ variant = 'standard' }: FooterProps) {
  
  // Load Tally script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-slate-400 text-sm mb-4">
          Built for the Bogleheads community. Open Source.
        </p>
        
        {/* DYNAMIC DISCLAIMER SWITCH */}
        {variant === 'standard' ? (
          // OPTION A: ETF / CORRELATION DISCLAIMER (Main Site)
          <p className="text-slate-500 text-xs max-w-2xl mx-auto mb-6 leading-relaxed">
            DISCLAIMER: Correlation and overlap estimates are based on historical data, index methodology, and public holdings. 
            They are approximations, not guarantees, and may change over time. Leveraged products often use swaps/derivatives 
            resulting in low physical overlap despite high correlation. Past performance does not guarantee future results.
          </p>
        ) : variant === 'tey' ? (
          // OPTION B: TAX / BOND DISCLAIMER (TEY Pages)
          <p className="text-slate-500 text-xs max-w-2xl mx-auto mb-6 leading-relaxed">
            DISCLAIMER: Tax-equivalent yield calculations are estimates based on projected 2026 federal marginal rates and state tax brackets. 
            This tool does not compute total tax liability, does not account for AMT, and is not a substitute for professional tax advice. 
            All investment decisions should be discussed with a qualified financial advisor.
          </p>
        ) : (
          // OPTION C: DECISION ENGINE DISCLAIMER (New)
          <p className="text-slate-500 text-xs max-w-2xl mx-auto mb-6 leading-relaxed">
            DISCLAIMER: This decision engine provides educational estimates based on user inputs and simplified market assumptions 
            (e.g., linear recovery, full liquidation of a single tax lot). It does not constitute tax advice, does not account for 
            complex wash sale chains, and is not a substitute for professional CPA guidance. Consult a tax professional before selling.
          </p>
        )}

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          
          <a 
            href="https://github.com/nikhildeshmukh06/taxlosspairs" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>

          <Link href="/legal" className="hover:text-blue-600 hover:underline transition-colors">
            Legal & Privacy
          </Link>

          {/* TALLY FORM BUTTON */}
          <button 
            data-tally-open="68Kqjo" 
            data-tally-layout="modal"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
            className="hover:text-blue-600 bg-transparent border-none cursor-pointer p-0 font-medium text-slate-500 transition-colors"
          >
            Report an Issue
          </button>

          <span className="text-slate-300">|</span>
          
          <span>Data updated: Jan 2026</span>
        </div>
      </div>
    </footer>
  );
}
