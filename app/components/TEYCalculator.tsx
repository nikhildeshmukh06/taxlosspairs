'use client';

import { useState, useMemo } from 'react';

const FED_BRACKETS = [
  { label: '37% (Income > $609k)', value: 0.37 },
  { label: '35% (Income > $243k)', value: 0.35 },
  { label: '32% (Income > $191k)', value: 0.32 },
  { label: '24% (Income > $100k)', value: 0.24 },
  { label: '22% (Income > $47k)', value: 0.22 },
];

const STATE_TAXES = [
  { label: 'No State Tax', value: 0 },
  { label: 'California (13.3%)', value: 0.133 },
  { label: 'New York City (3.8% + 10.9%)', value: 0.147 }, // NYC + NY State top
  { label: 'New York State (10.9%)', value: 0.109 },
  { label: 'New Jersey (10.75%)', value: 0.1075 },
  { label: 'Massachusetts (5% + 4%)', value: 0.09 }, // 4% surtax over $1m
  { label: 'Connecticut (6.99%)', value: 0.0699 },
  { label: 'Other (5.0%)', value: 0.05 },
];

export default function TEYCalculator() {
  const [muniYield, setMuniYield] = useState<string>('3.50');
  const [fedRate, setFedRate] = useState<number>(0.37);
  const [stateRate, setStateRate] = useState<number>(0.133);
  const [niit, setNiit] = useState<boolean>(true); // Net Investment Income Tax

  const results = useMemo(() => {
    const yieldNum = parseFloat(muniYield) || 0;
    const niitRate = niit ? 0.038 : 0;
    const totalTaxRate = fedRate + stateRate + niitRate;
    
    // Tax Equivalent Yield Formula: Yield / (1 - TaxRate)
    const tey = yieldNum / (1 - totalTaxRate);
    
    return {
      tey: tey.toFixed(2),
      taxableDiff: (tey - yieldNum).toFixed(2),
      effectiveTax: (totalTaxRate * 100).toFixed(1)
    };
  }, [muniYield, fedRate, stateRate, niit]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-slate-50 p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          🏛️ Tax-Equivalent Yield Calculator
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Calculate the true value of tax-free municipal bonds for your tax bracket.
        </p>
      </div>

      <div className="p-6 grid gap-8 md:grid-cols-2">
        {/* INPUTS COLUMN */}
        <div className="space-y-6">
          
          {/* Input: Muni Yield */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Muni Bond Yield (%)
            </label>
            <div className="relative">
              <input
                type="number"
                value={muniYield}
                onChange={(e) => setMuniYield(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-lg"
                step="0.01"
              />
            </div>
          </div>

          {/* Input: Federal Bracket */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Federal Tax Bracket
            </label>
            <select
              value={fedRate}
              onChange={(e) => setFedRate(parseFloat(e.target.value))}
              className="w-full p-3 border border-slate-300 rounded-lg bg-white"
            >
              {FED_BRACKETS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>

          {/* Input: State Bracket */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              State Residency
            </label>
            <select
              value={stateRate}
              onChange={(e) => setStateRate(parseFloat(e.target.value))}
              className="w-full p-3 border border-slate-300 rounded-lg bg-white"
            >
              {STATE_TAXES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Input: NIIT Toggle */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div>
              <span className="block text-sm font-semibold text-blue-900">NIIT Surtax (+3.8%)</span>
              <span className="text-xs text-blue-700">Income &gt;$200k/$250k</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={niit}
                onChange={(e) => setNiit(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

        </div>

        {/* RESULTS COLUMN */}
        <div className="flex flex-col justify-center">
          
          <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="text-6xl font-bold">%</span>
            </div>
            
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
              Tax-Equivalent Yield
            </p>
            <div className="text-5xl font-bold text-green-400 mb-2">
              {results.tey}%
            </div>
            <p className="text-slate-300 text-sm">
              To match your <span className="text-white font-bold">{muniYield}%</span> tax-free bond, a taxable investment (like a CD or Corporate Bond) must pay <span className="text-green-300 font-bold">{results.tey}%</span>.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Your Effective Tax Rate:</span>
                <span className="font-mono font-bold">{results.effectiveTax}%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800">
            <strong>Strategy Tip:</strong> High-yield savings accounts typically pay ~4.0% fully taxable. For your bracket, this Muni bond is far superior.
          </div>

        </div>
      </div>
    </div>
  );
}
