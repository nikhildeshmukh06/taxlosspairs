'use client';

import React, { useState } from 'react';

// --- CONFIGURATION ---
// 2026 Estimated Tax Brackets & Rates
const FEDERAL_TOP_RATE = 0.37; // 37% (Current Law)
const NIIT_RATE = 0.038;       // 3.8% Net Investment Income Tax

interface StateTaxConfig {
  name: string;
  rate: number; // Top Marginal Rate
}

const STATE_DATA: Record<string, StateTaxConfig> = {
  'CA': { name: 'California', rate: 0.133 }, // 13.3% Corrected Rate
  'NY': { name: 'New York', rate: 0.109 },
  'NJ': { name: 'New Jersey', rate: 0.1075 },
  'MA': { name: 'Massachusetts', rate: 0.09 },
  'OR': { name: 'Oregon', rate: 0.099 },
  'MN': { name: 'Minnesota', rate: 0.0985 },
  'HI': { name: 'Hawaii', rate: 0.11 },
  'VT': { name: 'Vermont', rate: 0.0875 },
  'CT': { name: 'Connecticut', rate: 0.0699 },
  'DC': { name: 'Washington, DC', rate: 0.1075 },
};

interface Props {
  defaultState?: string;
}

export default function TEYCalculator({ defaultState = 'CA' }: Props) {
  const [selectedState, setSelectedState] = useState(defaultState);
  const [muniYield, setMuniYield] = useState('3.50');
  const [income, setIncome] = useState('1000000');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');

  // Derived Values
  const stateConfig = STATE_DATA[selectedState] || STATE_DATA['CA'];
  
  // Calculate Rates
  const fedRate = FEDERAL_TOP_RATE;
  const niitVal = NIIT_RATE;
  const stateRate = stateConfig.rate;
  
  // Total Tax Burden
  const totalTaxRate = fedRate + niitVal + stateRate;
  
  // TEY Formula
  const muniVal = parseFloat(muniYield) || 0;
  const tey = muniVal / (1 - totalTaxRate);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
      <div className="md:flex">
        
        {/* LEFT: INPUTS */}
        <div className="p-6 md:p-8 md:w-1/2 space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Muni Bond Yield (%)
            </label>
            <div className="relative">
              {/* Added text-slate-900 to ensure black text */}
              <input
                type="number"
                value={muniYield}
                onChange={(e) => setMuniYield(e.target.value)}
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg text-slate-900 bg-white"
                placeholder="3.50"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Annual Taxable Income ($)
            </label>
            {/* Added text-slate-900 to ensure black text */}
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg text-slate-900 bg-white"
              placeholder="1000000"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Filing Status
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setFilingStatus('single')}
                className={`py-2 text-sm font-semibold rounded-md transition-all ${
                  filingStatus === 'single'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Single
              </button>
              <button
                onClick={() => setFilingStatus('married')}
                className={`py-2 text-sm font-semibold rounded-md transition-all ${
                  filingStatus === 'married'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Married
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              State Residency
            </label>
            {/* Added text-slate-900 to ensure black text */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-slate-900 bg-white"
            >
              {Object.entries(STATE_DATA).map(([code, data]) => (
                <option key={code} value={code}>
                  {data.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-400">
              Assumes the municipal bond is issued by your home state.
            </p>
          </div>

        </div>

        {/* RIGHT: RESULTS (Dark Mode) */}
        <div className="bg-slate-900 md:w-1/2 p-6 md:p-8 text-white flex flex-col justify-center">
          
          <div className="mb-8 text-center">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              Tax-Equivalent Yield
            </h3>
            {/* Ensure text color is explicit */}
            <div className="text-6xl font-black text-green-400 tracking-tight">
              {tey.toFixed(2)}%
            </div>
            <div className="text-slate-500 text-6xl font-black opacity-20 absolute top-8 right-8 pointer-events-none">
              %
            </div>
          </div>

          <div className="space-y-3 text-sm border-t border-slate-800 pt-6">
            <div className="flex justify-between">
              <span className="text-slate-400">Fed Marginal Rate</span>
              {/* Added text-white explicitly */}
              <span className="font-mono text-white">{(fedRate * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">NIIT Surtax</span>
              <span className="font-mono text-orange-400">{(niitVal * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">State Marginal Rate</span>
              <span className="font-mono text-green-400">{(stateRate * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-slate-800 font-bold text-lg text-white">
              <span>Total Tax on Next $1</span>
              <span>{(totalTaxRate * 100).toFixed(2)}%</span>
            </div>
          </div>

          <div className="mt-8 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">The Verdict:</strong> You would need a taxable yield of <strong className="text-white">{tey.toFixed(2)}%</strong> (on a CD or Corporate Bond) to match this <strong className="text-white">{muniYield}%</strong> Muni bond.
            </p>
          </div>

          <div className="mt-6 text-[10px] text-slate-500 leading-tight text-center">
            *Calculated using 2026 estimated marginal tax brackets. State tax rates are estimates. 
            Assumes in-state municipal bond (exempt from Federal & State tax). 
            Assumes state taxes are not federally deductible (SALT cap). 
            Reflects top statewide marginal brackets including 1% Mental Health Services Surtax on income &gt;$1M.
          </div>

        </div>
      </div>
    </div>
  );
}
