'use client';

import React, { useState, useEffect } from 'react';

// --- 1. REAL 2026 FEDERAL TAX DATA ---
const TAX_BRACKETS_2026 = {
  single: [
    { threshold: 626350, rate: 0.37 },
    { threshold: 250525, rate: 0.35 },
    { threshold: 197300, rate: 0.32 },
    { threshold: 103350, rate: 0.24 },
    { threshold: 48475, rate: 0.22 },
    { threshold: 11925, rate: 0.12 },
    { threshold: 0, rate: 0.10 },
  ],
  married: [
    { threshold: 751600, rate: 0.37 },
    { threshold: 501050, rate: 0.35 },
    { threshold: 394600, rate: 0.32 },
    { threshold: 206700, rate: 0.24 },
    { threshold: 96950, rate: 0.22 },
    { threshold: 23850, rate: 0.12 },
    { threshold: 0, rate: 0.10 },
  ],
};

const NIIT_THRESHOLDS = { single: 200000, married: 250000 };

// --- 2. STATE DATA (All 50 States + DC + NYC) ---
const STATE_DATA: Record<string, { name: string; topRate: number }> = {
  // SEO Priority & High Tax States
  'CA': { name: 'California', topRate: 13.3 },
  'NYC': { name: 'New York City (Triple Tax)', topRate: 14.77 }, // 10.9% State + ~3.87% City
  'NY': { name: 'New York (State)', topRate: 10.9 },
  'NJ': { name: 'New Jersey', topRate: 10.75 },
  'DC': { name: 'Washington, DC', topRate: 10.75 },
  'HI': { name: 'Hawaii', topRate: 11.0 },
  'OR': { name: 'Oregon', topRate: 9.9 },
  'MN': { name: 'Minnesota', topRate: 9.85 },
  'MA': { name: 'Massachusetts', topRate: 9.0 },
  'VT': { name: 'Vermont', topRate: 8.75 },
  'CT': { name: 'Connecticut', topRate: 6.99 },
  
  // Zero Tax States
  'AK': { name: 'Alaska', topRate: 0 },
  'FL': { name: 'Florida', topRate: 0 },
  'NV': { name: 'Nevada', topRate: 0 },
  'NH': { name: 'New Hampshire', topRate: 0 },
  'SD': { name: 'South Dakota', topRate: 0 },
  'TN': { name: 'Tennessee', topRate: 0 },
  'TX': { name: 'Texas', topRate: 0 },
  'WA': { name: 'Washington', topRate: 0 },
  'WY': { name: 'Wyoming', topRate: 0 },

  // Remaining States
  'AL': { name: 'Alabama', topRate: 5.0 },
  'AZ': { name: 'Arizona', topRate: 2.5 },
  'AR': { name: 'Arkansas', topRate: 3.9 },
  'CO': { name: 'Colorado', topRate: 4.4 },
  'DE': { name: 'Delaware', topRate: 6.6 },
  'GA': { name: 'Georgia', topRate: 5.49 },
  'ID': { name: 'Idaho', topRate: 5.8 },
  'IL': { name: 'Illinois', topRate: 4.95 },
  'IN': { name: 'Indiana', topRate: 3.05 },
  'IA': { name: 'Iowa', topRate: 3.8 },
  'KS': { name: 'Kansas', topRate: 5.7 },
  'KY': { name: 'Kentucky', topRate: 4.0 },
  'LA': { name: 'Louisiana', topRate: 4.25 },
  'ME': { name: 'Maine', topRate: 7.15 },
  'MD': { name: 'Maryland', topRate: 5.75 },
  'MI': { name: 'Michigan', topRate: 4.25 },
  'MS': { name: 'Mississippi', topRate: 4.7 },
  'MO': { name: 'Missouri', topRate: 4.8 },
  'MT': { name: 'Montana', topRate: 5.9 },
  'NE': { name: 'Nebraska', topRate: 5.84 },
  'NM': { name: 'New Mexico', topRate: 5.9 },
  'NC': { name: 'North Carolina', topRate: 4.5 },
  'ND': { name: 'North Dakota', topRate: 2.5 },
  'OH': { name: 'Ohio', topRate: 3.5 },
  'OK': { name: 'Oklahoma', topRate: 4.75 },
  'PA': { name: 'Pennsylvania', topRate: 3.07 },
  'RI': { name: 'Rhode Island', topRate: 5.99 },
  'SC': { name: 'South Carolina', topRate: 6.4 },
  'UT': { name: 'Utah', topRate: 4.55 },
  'VA': { name: 'Virginia', topRate: 5.75 },
  'WV': { name: 'West Virginia', topRate: 5.12 },
  'WI': { name: 'Wisconsin', topRate: 7.65 },
};

interface Props {
  defaultState?: string;
}

export default function TEYCalculator({ defaultState = 'CA' }: Props) {
  const [selectedState, setSelectedState] = useState(defaultState);
  const [muniYield, setMuniYield] = useState('3.50');
  const [incomeStr, setIncomeStr] = useState('1000000');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [customStateRate, setCustomStateRate] = useState<string>('');

  useEffect(() => {
    if (defaultState) setSelectedState(defaultState);
  }, [defaultState]);

  // --- LOGIC ENGINE ---
  const income = parseFloat(incomeStr) || 0;

  const getFedRate = () => {
    const brackets = TAX_BRACKETS_2026[filingStatus];
    const bracket = brackets.find((b) => income > b.threshold);
    return bracket ? bracket.rate : 0.10;
  };
  const fedRate = getFedRate();

  const niitThreshold = NIIT_THRESHOLDS[filingStatus];
  const niitRate = income > niitThreshold ? 0.038 : 0.0;

  const defaultStateRate = STATE_DATA[selectedState]?.topRate || 0;
  const activeStateRate = customStateRate !== '' 
    ? parseFloat(customStateRate) / 100 
    : defaultStateRate / 100;

  useEffect(() => {
    setCustomStateRate('');
  }, [selectedState]);

  const totalTaxRate = fedRate + niitRate + activeStateRate;
  const muniVal = parseFloat(muniYield) || 0;
  const tey = totalTaxRate < 1 ? muniVal / (1 - totalTaxRate) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
      <div className="md:flex">
        
        {/* LEFT: INPUTS */}
        <div className="p-6 md:p-8 md:w-1/2 space-y-5 border-r border-slate-100">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">State / Locality</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="block w-full rounded-md border-slate-300 py-2 px-3 text-sm text-slate-900 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(STATE_DATA).map(([code, data]) => (
                  <option key={code} value={code}>{data.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
                className="block w-full rounded-md border-slate-300 py-2 px-3 text-sm text-slate-900 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="single">Single</option>
                <option value="married">Married (Joint)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Taxable Income (After Deductions)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                value={incomeStr}
                onChange={(e) => setIncomeStr(e.target.value)}
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 pl-7 pr-4 text-lg text-slate-900 font-semibold"
                placeholder="e.g. 250000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Muni Bond Yield (%)</label>
            <div className="relative">
              <input
                type="number"
                value={muniYield}
                onChange={(e) => setMuniYield(e.target.value)}
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg text-slate-900 font-semibold"
                placeholder="3.50"
                step="0.01"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
            </div>
          </div>

          <div className="pt-2">
             <label className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-1">
               <span>Marginal State Tax Rate (%)</span>
               <span className="text-blue-600 cursor-pointer font-normal normal-case hover:underline" onClick={() => setCustomStateRate(defaultStateRate.toString())}>
                 Reset to Top ({defaultStateRate}%)
               </span>
             </label>
             <input
               type="number"
               value={customStateRate !== '' ? customStateRate : defaultStateRate}
               onChange={(e) => setCustomStateRate(e.target.value)}
               className="block w-full rounded-md border-slate-300 bg-slate-50 py-2 px-3 text-sm text-slate-900 focus:bg-white transition-colors"
               step="0.01"
             />
             <p className="text-[10px] text-slate-400 mt-1">
               Defaults to top marginal bracket. {selectedState === 'NYC' && "Includes NYC 3.87% local tax."}
             </p>
          </div>

        </div>

        {/* RIGHT: RESULTS */}
        <div className="bg-slate-900 md:w-1/2 p-6 md:p-8 text-white flex flex-col justify-center relative overflow-hidden">
          
          <div className="text-center mb-8 relative z-10">
            <div className="inline-block bg-blue-600/20 border border-blue-500/30 rounded-full px-3 py-1 mb-3">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">
                2026 Target Yield
              </span>
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              Tax-Equivalent Yield
            </h3>
            <div className="text-5xl md:text-7xl font-black text-green-400 tracking-tighter">
              {tey.toFixed(2)}%
            </div>
          </div>

          <div className="space-y-4 text-sm border-t border-slate-800 pt-8 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Federal Marginal Rate</span>
              <span className="font-mono text-white font-bold">{(fedRate * 100).toFixed(0)}%</span>
            </div>
            
            <div className="flex justify-between items-center group relative cursor-help" title="Net Investment Income Tax applies above $200k/$250k income.">
              <div className="flex items-center gap-1">
                <span className="text-slate-400 border-b border-slate-700 border-dotted">NIIT Surtax</span>
                <span className="text-slate-600 text-[10px]">(?)</span>
              </div>
              <span className={`font-mono font-bold ${niitRate > 0 ? 'text-orange-400' : 'text-slate-600'}`}>
                {(niitRate * 100).toFixed(1)}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">State Marginal Rate</span>
              <span className="font-mono text-blue-400 font-bold">{(activeStateRate * 100).toFixed(2)}%</span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800 font-black text-xl">
              <span className="text-slate-200 uppercase text-xs tracking-wider">Combined Drag</span>
              <span className="text-red-400 font-mono">{(totalTaxRate * 100).toFixed(2)}%</span>
            </div>
          </div>

          <div className="mt-10 bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl text-center relative z-10">
             <p className="text-xs text-blue-100 leading-relaxed">
               To match a <strong>{muniYield}%</strong> tax-free yield, a taxable bond must pay <strong>{tey.toFixed(2)}%</strong>.
             </p>
          </div>

          {/* Background Decorative Blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
        </div>
      </div>
      
      <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-[10px] text-slate-400 text-center md:text-left leading-relaxed max-w-2xl">
          Estimates based on projected 2026 marginal tax brackets. Assumes in-state municipal bond (exempt from Federal & State tax). Does not include AMT considerations. Consult a tax professional for specific advice.
        </p>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest whitespace-nowrap">
          TaxLossPairs.com
        </span>
      </div>
    </div>
  );
}
