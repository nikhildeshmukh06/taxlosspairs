import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { STATE_CONTENT } from '../../data/state-content'; 
import TEYCalculator from '../../components/TEYCalculator'; // Ensure path is correct

// Helper to find state data by URL slug
function getStateContent(slug: string) {
  // We use direct lookup now to be safer with the record key
  return STATE_CONTENT[slug];
}

// 1. GENERATE STATIC PARAMS (Now Filters out 'hub')
export async function generateStaticParams() {
  return Object.keys(STATE_CONTENT)
    .filter((key) => key !== 'hub') // <--- FIX: Don't build a page for the Hub data
    .map((slug) => ({
      state: slug,
    }));
}

// 2. DYNAMIC METADATA
export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const content = getStateContent(params.state);

  if (!content) return {};

  return {
    ...content.metadata,
    alternates: {
      canonical: `https://www.taxlosspairs.com/tax-equivalent-yield/${content.slug}`,
    },
  };
}

// 3. THE PAGE COMPONENT (Inlined UI to guarantee Font/Layout fixes)
export default function DynamicStatePage({ params }: { params: { state: string } }) {
  const content = getStateContent(params.state);

  if (!content) {
    notFound();
  }

  // Generate State List for Bottom Nav (Excludes 'hub' and current state)
  const otherStates = Object.keys(STATE_CONTENT).filter(k => k !== 'hub' && k !== params.state);

  // Logic to map URL slug to Calculator State Code (e.g. 'california' -> 'CA')
  const stateCodeMap: Record<string, string> = {
    'california': 'CA', 'new-york-city': 'NYC', 'new-york': 'NY',
    'new-jersey': 'NJ', 'massachusetts': 'MA', 'connecticut': 'CT',
    'oregon': 'OR', 'minnesota': 'MN', 'hawaii': 'HI',
    'vermont': 'VT', 'dc': 'DC'
  };
  const calcCode = stateCodeMap[params.state] || 'CA';

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
          <Link href="/" className="inline-block mb-8 text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">
            ← Back to National Hub
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            {content.hero.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
             dangerouslySetInnerHTML={{ __html: content.hero.description }} 
          />
        </div>
      </div>

      {/* CALCULATOR (Locked to State) */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <TEYCalculator defaultState={calcCode} isLocked={true} />
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        
        {/* LEFT: MACRO TAX PERSPECTIVE (Font Color Fixed here) */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="inline-block bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-4">
            Tax Logic
          </div>
          {/* Using content.whySection.title ("Macro Tax Perspective") */}
          <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
            {content.whySection.title}
          </h2>
          {/* FIX: Forced text-slate-900 for readability */}
          <div className="space-y-4 text-sm leading-relaxed text-slate-900 font-medium">
            <p>{content.whySection.p1}</p>
            <p>{content.whySection.p2}</p>
          </div>
        </div>

        {/* RIGHT: PORTFOLIO IMPACT */}
        <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-block bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-4">
              The Math
            </div>
            {/* Using content.example.title ("Portfolio Impact") */}
            <h2 className="text-xl font-black text-white mb-2 tracking-tight">
              {content.example.title}
            </h2>
            <p className="text-slate-400 text-sm mb-6" dangerouslySetInnerHTML={{ __html: content.example.description }} />
            
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                <span className="text-slate-400">Taxable Income</span>
                <span className="font-mono font-bold">{content.example.income}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                <span className="text-slate-400">Muni Yield</span>
                <span className="font-mono text-green-400 font-bold">{content.example.muniYield}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-black pt-2">
                <span className="text-white">Taxable Equiv.</span>
                <span className="font-mono text-blue-400">{content.example.taxableYield}</span>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                "{content.example.takeaway}"
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* STATE SPECIFIC FAQs */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">
          Local Tax FAQs
        </h2>
        <div className="space-y-4">
          {content.faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {faq.q}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* FOOTER STATE LINKS (Filtered to exclude Hub) */}
        <div className="mt-16 pt-8 border-t border-slate-200">
           <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Compare Other Jurisdictions</h4>
           <div className="flex flex-wrap gap-2">
             {otherStates.map(slug => (
               <Link key={slug} href={`/tax-equivalent-yield/${slug}`} className="text-xs font-bold text-slate-500 hover:text-blue-600 bg-white border border-slate-200 px-3 py-1 rounded-full transition-colors">
                 {STATE_CONTENT[slug].name}
               </Link>
             ))}
           </div>
        </div>
      </div>

    </main>
  );
}
