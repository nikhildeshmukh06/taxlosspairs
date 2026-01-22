'use client';

import React, { useState, useEffect } from 'react';

// --- 1. REAL 2026 FEDERAL TAX DATA ---
// Source: Projected 2026 Brackets based on inflation adjustments
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

// --- 2. STATE DATA (Defaults) ---
const STATE_DATA: Record<string, { name: string; topRate: number }> = {
  'CA': { name: 'California', topRate: 13.3 },
  'NY': { name: 'New York', topRate: 10.9 },
  'NJ': { name: 'New Jersey', topRate: 10.75 },
  'MA': { name: 'Massachusetts', topRate: 9.0 },
  'OR': { name: 'Oregon', topRate: 9.9 },
  'MN': { name: 'Minnesota', topRate: 9.85 },
  'HI': { name: 'Hawaii', topRate: 11.0 },
  'VT': { name: 'Vermont', topRate: 8.75 },
  'CT': { name: 'Connecticut', topRate: 6.99 },
  'DC': { name: 'Washington, DC', topRate: 10.75 },
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

  // Update selectedState if prop changes
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

  // Reset custom state rate when state changes
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
        <div className="p-6 md:p-8 md:w-1/2 space-y-5">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">State</label>
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
                <option value="married">Married</option>
              </select>
            </div>
          </div>

          <div>
            {/* FIX: Updated Label for Clarity */}
            <label className="block text-sm font-bold text-slate-700 mb-2">Taxable Income (After Deductions)</label>
            <input
              type="number"
              value={incomeStr}
              onChange={(e) => setIncomeStr(e.target.value)}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg text-slate-900"
              placeholder="e.g. 250000"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Muni Bond Yield (%)</label>
            <input
              type="number"
              value={muniYield}
              onChange={(e) => setMuniYield(e.target.value)}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg text-slate-900"
              placeholder="3.50"
              step="0.01"
            />
          </div>

          <div className="pt-2">
             <label className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-1">
               <span>Marginal State Tax Rate (%)</span>
               <span className="text-blue-600 cursor-pointer font-normal normal-case" onClick={() => setCustomStateRate(defaultStateRate.toString())}>
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
               Defaults to top marginal state rate. Advanced users may override.
             </p>
          </div>

        </div>

        {/* RIGHT: RESULTS */}
        <div className="bg-slate-900 md:w-1/2 p-6 md:p-8 text-white flex flex-col justify-center relative">
          
          <div className="text-center mb-8">
            <div className="inline-block bg-slate-800 rounded-full px-3 py-1 mb-3">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">
                Based on Marginal Tax Bracket
              </span>
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              Tax-Equivalent Yield
            </h3>
            <div className="text-5xl md:text-6xl font-black text-green-400 tracking-tight">
              {tey.toFixed(2)}%
            </div>
          </div>

          <div className="space-y-3 text-sm border-t border-slate-800 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Fed Marginal Rate (Next $1)</span>
              <div className="text-right">
                <span className="font-mono text-white block">{(fedRate * 100).toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center group relative cursor-help" title="Net Investment Income Tax (3.8%) applies to investment income above $200k (single) or $250k (married).">
              <div className="flex items-center gap-1">
                <span className="text-slate-400 border-b border-slate-700 border-dotted">NIIT Surtax</span>
                <span className="text-slate-600 text-[10px]">(?)</span>
              </div>
              <span className={`font-mono ${niitRate > 0 ? 'text-orange-400' : 'text-slate-600'}`}>
                {(niitRate * 100).toFixed(1)}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">State Marginal Rate</span>
              <span className="font-mono text-green-400">{(activeStateRate * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-800 font-bold text-lg">
              <span>Total Tax on Interest</span>
              <span>{(totalTaxRate * 100).toFixed(2)}%</span>
            </div>
          </div>

          <div className="mt-8 bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-center">
             <p className="text-xs text-slate-300">
               To match a <strong>{muniYield}%</strong> tax-free yield, you need <strong>{tey.toFixed(2)}%</strong> in a taxable bond.
             </p>
          </div>

        </div>
      </div>
      
      <div className="bg-slate-50 px-6 py-4 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
          This calculator estimates tax-equivalent yield using 2026 estimated marginal tax rates. 
          It does not compute total tax liability and does not replace professional tax advice. 
          Assumes in-state municipal bond (exempt from Federal & State tax).
        </p>
      </div>
    </div>
  );
}
