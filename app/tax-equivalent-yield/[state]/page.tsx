import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { STATE_CONTENT } from '../../data/state-content'; 
import TEYCalculator from '../../components/TEYCalculator'; 
import Footer from '../../components/Footer'; // <--- IMPORT SHARED FOOTER

// Helper to find state data by URL slug
function getStateContent(slug: string) {
  return STATE_CONTENT[slug];
}

// 1. GENERATE STATIC PARAMS (Filters out 'hub')
export async function generateStaticParams() {
  return Object.keys(STATE_CONTENT)
    .filter((key) => key !== 'hub') 
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

// 3. THE PAGE COMPONENT
export default function DynamicStatePage({ params }: { params: { state: string } }) {
  const content = getStateContent(params.state);

  if (!content) {
    notFound();
  }

  // Generate State List for Bottom Nav (Excludes 'hub' and current state)
  const otherStates = Object.keys(STATE_CONTENT).filter(k => k !== 'hub' && k !== params.state);

  // Map URL slug to Calculator State Code
  const stateCodeMap: Record<string, string> = {
    'california': 'CA', 'new-york-city': 'NYC', 'new-york': 'NY',
    'new-jersey': 'NJ', 'massachusetts': 'MA', 'connecticut': 'CT',
    'oregon': 'OR', 'minnesota': 'MN', 'hawaii': 'HI',
    'vermont': 'VT', 'dc': 'DC'
  };
  const calcCode = stateCodeMap[params.state] || 'CA';

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 flex flex-col">
      
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
          {/* FIX: Corrected Link to TEY Hub */}
          <Link href="/tax-equivalent-yield" className="inline-block mb-8 text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">
            ← Back to TEY Hub
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

      {/* MACRO PERSPECTIVE (Centered - Example Card Removed) */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="inline-block bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-4">
            Tax Logic
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
            {content.whySection.title}
          </h2>
          {/* Font color forced to text-slate-900 for readability */}
          <div className="space-y-4 text-sm leading-relaxed text-slate-900 font-medium">
            <p>{content.whySection.p1}</p>
            <p>{content.whySection.p2}</p>
          </div>
        </div>
      </div>

      {/* STATE SPECIFIC FAQs */}
      <div className="max-w-3xl mx-auto px-6 pb-24 flex-grow">
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

        {/* COMPARE OTHER STATES LINKS */}
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

      {/* FIX: SHARED FOOTER RESTORED */}
      <Footer variant="tey" />
    </main>
  );
}
