'use client';

import React, { useState, useEffect } from 'react';

interface TEYCalculatorProps {
  defaultState?: string;
}

export default function TEYCalculator({ defaultState = 'CA' }: TEYCalculatorProps) {
  // 1. STATE MANAGEMENT
  const [income, setIncome] = useState<number>(400000);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('married');
  const [stateCode, setStateCode] = useState<string>(defaultState);
  const [muniYield, setMuniYield] = useState<number>(3.50);
  const [stateRateOverride, setStateRateOverride] = useState<string>(''); // Allow user override

  // 2. CONSTANTS & DATA
  const FED_BRACKETS_2026 = {
    single: [
      { max: 11925, rate: 0.10 },
      { max: 48475, rate: 0.12 },
      { max: 103350, rate: 0.22 },
      { max: 197300, rate: 0.24 },
      { max: 250525, rate: 0.32 },
      { max: 626350, rate: 0.35 },
      { max: Infinity, rate: 0.37 },
    ],
    married: [
      { max: 23850, rate: 0.10 },
      { max: 96950, rate: 0.12 },
      { max: 206700, rate: 0.22 },
      { max: 394600, rate: 0.24 },
      { max: 501050, rate: 0.32 },
      { max: 751600, rate: 0.35 },
      { max: Infinity, rate: 0.37 },
    ],
  };

  const NIIT_THRESHOLD = filingStatus === 'single' ? 200000 : 250000;

  // Simple default top brackets for demo (User can override)
  const STATE_TOP_RATES: Record<string, number> = {
    CA: 13.3, NY: 10.9, NJ: 10.75, MA: 9.0, CT: 6.99,
    HI: 11.0, MN: 9.85, OR: 9.9, VT: 8.75, DC: 10.75,
    TX: 0, FL: 0, WA: 0, NV: 0
  };

  // 3. CALCULATION LOGIC
  const getFedRate = (inc: number, status: 'single' | 'married') => {
    const brackets = FED_BRACKETS_2026[status];
    for (const b of brackets) {
      if (inc <= b.max) return b.rate;
    }
    return 0.37;
  };

  // Derived Values
  const fedRate = getFedRate(income, filingStatus);
  const niitRate = income > NIIT_THRESHOLD ? 0.038 : 0.0;
  
  // Use override if present, else default to known top rate
  const activeStateRate = stateRateOverride !== '' 
    ? parseFloat(stateRateOverride) / 100 
    : (STATE_TOP_RATES[stateCode] || 0) / 100;

  const totalTaxRate = fedRate + niitRate + activeStateRate;
  
  // TEY Formula: MuniYield / (1 - TotalTaxRate)
  // Safety check: max tax rate cap at 99% to prevent divide by zero
  const safeTaxRate = Math.min(totalTaxRate, 0.99);
  const tey = muniYield / (1 - safeTaxRate);

  // 4. HANDLERS
  const formatPercent = (val: number) => (val * 100).toFixed(2) + '%';
  const formatCurrency = (val: number) => val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      
      {/* HEADER */}
      <div className="bg-slate-50 border-b border-slate-200 p-6 md:p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <span className="text-blue-600">Calculator</span>
            <span className="text-slate-300 text-lg font-normal">|</span>
            <span className="text-lg font-medium text-slate-500">2026 Estimate</span>
          </h2>
          {/* Result Badge (Mobile) */}
          <div className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
            {formatPercent(tey)}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        
        {/* LEFT: INPUTS */}
        <div className="p-6 md:p-8 space-y-6 flex-1">
          
          {/* State & Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">State</label>
              <select 
                value={stateCode} 
                onChange={(e) => {
                  setStateCode(e.target.value);
                  setStateRateOverride(''); // Reset override on state change
                }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {Object.keys(STATE_TOP_RATES).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Filing Status</label>
              <select 
                value={filingStatus} 
                onChange={(e) => setFilingStatus(e.target.value as any)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="single">Single</option>
                <option value="married">Married (Joint)</option>
              </select>
            </div>
          </div>

          {/* Income Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Taxable Income (After Deductions)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input 
                type="number" 
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full pl-8 p-3 bg-white border border-slate-200 rounded-lg text-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Muni Yield Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Muni Yield (%)</label>
            <div className="relative">
              <input 
                type="number" 
                step="0.01"
                value={muniYield}
                onChange={(e) => setMuniYield(Number(e.target.value))}
                className="w-full p-3 bg-white border border-slate-200 rounded-lg text-lg font-bold text-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
            </div>
          </div>

          {/* Advanced: State Rate Override */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Manual State Rate (Optional)</label>
              {stateRateOverride && (
                <button 
                  onClick={() => setStateRateOverride('')}
                  className="text-[10px] text-blue-500 hover:underline font-medium"
                >
                  Reset to Default
                </button>
              )}
            </div>
            <div className="relative">
              <input 
                type="number" 
                step="0.01"
                placeholder={STATE_TOP_RATES[stateCode] + '%'}
                value={stateRateOverride}
                onChange={(e) => setStateRateOverride(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
            </div>
          </div>

        </div>

        {/* RIGHT: RESULTS (DARK MODE) */}
        <div className="bg-slate-900 p-6 md:p-8 md:w-5/12 text-white flex flex-col justify-center relative overflow-hidden">
          
          {/* Background Decorative Blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-2 text-blue-300 font-bold uppercase tracking-wider text-xs">Tax-Equivalent Yield</div>
            <div className="text-5xl md:text-6xl font-black mb-1 tracking-tight">{formatPercent(tey)}</div>
            <div className="text-slate-400 text-sm mb-8">
              To match a {muniYield}% tax-free yield, a taxable bond must pay <b>{formatPercent(tey)}</b>.
            </div>

            {/* BREAKDOWN TABLE */}
            <div className="space-y-3 border-t border-slate-800 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Fed Marginal Rate</span>
                <span className="font-mono font-bold">{formatPercent(fedRate)}</span>
              </div>
              
              {/* DYNAMIC NIIT ROW (THE FIX) */}
              <div className={`flex justify-between text-sm ${niitRate === 0 ? 'opacity-50' : ''}`}>
                <span className="text-slate-400 flex items-center gap-1">
                  NIIT Surtax
                  {niitRate === 0 && <span className="text-[10px] bg-slate-800 px-1 rounded">(Inactive)</span>}
                </span>
                <span className="font-mono font-bold">{formatPercent(niitRate)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-400">State Marginal Rate</span>
                <span className="font-mono font-bold text-blue-400">{formatPercent(activeStateRate)}</span>
              </div>
              
              <div className="h-px bg-slate-700 my-2"></div>
              
              <div className="flex justify-between text-base font-bold">
                <span className="text-slate-200">Total Tax on Interest</span>
                <span className="font-mono text-red-400">-{formatPercent(totalTaxRate)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
