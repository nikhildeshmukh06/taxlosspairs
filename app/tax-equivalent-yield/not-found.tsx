import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center max-w-md w-full">
        <div className="text-5xl mb-4">🗺️</div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">State Not Found</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          We couldn't find tax data for the state you requested. It may not be supported yet, or the URL might be incorrect.
        </p>
        
        <Link 
          href="/tax-equivalent-yield"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Return to Calculator Hub
        </Link>
        
        <div className="mt-6 pt-6 border-t border-slate-100">
           <Link href="/" className="text-sm text-slate-400 hover:text-slate-600">
             Go to TaxLossPairs Home
           </Link>
        </div>
      </div>
    </div>
  );
}
