'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  // Load Tally script dynamically to ensure the popup works
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
        
        {/* GLOBAL DISCLAIMER */}
        <p className="text-slate-500 text-xs max-w-2xl mx-auto mb-6 leading-relaxed">
          DISCLAIMER: Correlation and overlap estimates are based on historical data, index methodology, and public holdings. 
          They are approximations, not guarantees, and may change over time. Leveraged products often use swaps/derivatives 
          resulting in low physical overlap despite high correlation. Past performance does not guarantee future results.
        </p>

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
