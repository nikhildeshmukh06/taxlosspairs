'use client';

import React from 'react';
import { useTLHCalculator } from '../hooks/useTLHCalculator'; 

export default function TLHDecisionEngine() {
  const { inputs, setInputs, results } = useTLHCalculator();

  // Helper to handle comma inputs safely (prevents cursor jumping on empty string)
  const handleNumberInput = (field: keyof typeof inputs, rawValue: string) => {
    // 1. Handle empty input explicitly to avoid defaulting to 0
    if (rawValue.trim() === '') {
      setInputs(prev => ({ ...prev, [field]: 0 })); 
      return;
    }

    // 2. Remove commas to get raw number
    const numericValue = Number(rawValue.replace(/,/g, ''));
    if (!isNaN(numericValue)) {
      setInputs(prev => ({ ...prev, [field]: numericValue }));
    }
  };

  const handleInputChange = (field: keyof typeof inputs, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  
  // Helper for input display (adds commas)
  // We check for 0 to ensure user can delete everything and type from scratch if needed
  const formatInputDisplay = (val: number) => 
    val === 0 ? '' : val.toLocaleString('en-US');

  // Compute CTA state locally (UI logic, not Math logic)
  const canProceed = results.recommendation === 'switch' && inputs.isWashSaleCompliant;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">1. Portfolio Details</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Cost Basis ($)</label>
              <input 
                type="text" 
                inputMode="numeric"
                placeholder="0"
                value={formatInputDisplay(inputs.costBasis)}
                onChange={(e) => handleNumberInput('costBasis', e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder:text-slate-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Current Value ($)</label>
              <input 
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={formatInputDisplay(inputs.currentValue)}
                onChange={(e) => handleNumberInput('currentValue', e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder:text-slate-300"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tax Rate on Gains (%)</label>
                <span className="text-xs text-slate-500">Max 60%</span>
              </div>
              <input 
                type="number" 
                min="0"
                max={60}
                value={inputs.taxRate}
                onChange={(e) => handleInputChange('taxRate', Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
              />
              <p className="text-xs text-slate-500 mt-1">Use Income Rate (e.g. 37%) for Short Term, Capital Rate (20%) for Long Term.</p>
            </div>

            {/* TOGGLE: Realized Gains */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={inputs.hasRealizedGains}
                  onChange={(e) => handleInputChange('hasRealizedGains', e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 shrink-0"
                />
                <div className="text-sm text-slate-700">
                  <span>I have other <strong>Realized Gains</strong> to offset.</span>
                  <div className="text-xs text-slate-500 mt-1 space-y-1">
                    {/* UPDATED TEXT BELOW */}
                    <p>• <strong>Checked:</strong> Offsets gains (assumes sufficient gains to cover entire loss).</p>
                    <p>• <strong>Unchecked:</strong> Deduction capped at $3,000/year (IRS Limit).</p>
                  </div>
                </div>
              </label>
            </div>

            {/* SLIDER: Market Recovery */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">Market Recovery Expectation (30 Days)</label>
                <span className={`text-sm font-bold ${inputs.marketRecoveryRate < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                    {inputs.marketRecoveryRate > 0 ? '+' : ''}{inputs.marketRecoveryRate}%
                </span>
              </div>
              <input 
                type="range" 
                min="-5" 
                max="10" 
                step="0.5"
                value={inputs.marketRecoveryRate}
                onChange={(e) => handleInputChange('marketRecoveryRate', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              {/* Slider Labels */}
              <div className="relative h-6 text-xs text-slate-400 mt-1 font-mono">
                <span className="absolute left-0">-5%</span>
                <span className="absolute left-[33.3%] -translate-x-1/2">0%</span>
                <span className="absolute right-0">+10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: OUTPUTS */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">2. Decision Analysis</h2>

          {/* STATE: NO LOSS */}
          {!results.hasLoss ? (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="text-blue-800 font-bold text-lg mb-2">No Loss Detected</h3>
              <p className="text-blue-700">
                Your Current Value is higher than (or equal to) your Cost Basis. 
                You have a <strong>Capital Gain</strong>, so Tax-Loss Harvesting does not apply.
              </p>
            </div>
          ) : (
            /* STATE: HAS LOSS */
            <>
              {/* RESULTS WRAPPER (Relative for VOID overlay) */}
              <div className="relative space-y-4">
                
                {/* VOID OVERLAY */}
                {!inputs.isWashSaleCompliant && (
                  <div className="absolute inset-0 z-20 bg-white/60 flex items-center justify-center backdrop-blur-[1px] rounded-xl border-2 border-slate-200 border-dashed">
                    <div className="bg-red-100 border-2 border-red-500 text-red-700 px-6 py-3 rounded-lg transform -rotate-6 shadow-xl">
                      <span className="text-2xl font-black uppercase tracking-widest">VOID</span>
                      <p className="text-xs font-bold text-center mt-1">Wash Sale Violation</p>
                    </div>
                  </div>
                )}

                {/* CARD A: CASH TRAP */}
                <div className={`p-5 rounded-xl border-2 transition-all relative ${
                  results.recommendation === 'cash' 
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xl' 
                    : results.cashOutcome.isPositive 
                      ? 'border-yellow-400 bg-yellow-50' 
                      : 'border-red-200 bg-red-50'
                }`}>
                  {results.recommendation === 'cash' && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      HIGHER NET VALUE
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold ${results.recommendation === 'cash' ? 'text-slate-100' : 'text-slate-800'}`}>
                      Strategy A: Sell to Cash
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      results.recommendation === 'cash'
                          ? 'bg-slate-700 text-slate-300'
                          : results.cashOutcome.isPositive ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {results.cashOutcome.verdict}
                    </span>
                  </div>
                  <div className={`text-2xl font-black mb-1 ${results.recommendation === 'cash' ? 'text-white' : 'text-slate-900'}`}>
                    {formatCurrency(results.cashOutcome.projectedBenefit)}
                  </div>
                  <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${results.recommendation === 'cash' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Projected Net Benefit
                  </p>
                  <p className={`text-sm leading-snug ${results.recommendation === 'cash' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {results.cashOutcome.isPositive 
                      ? "Savings cover the market move." 
                      : <span>Warning: You save taxes, but <strong>miss out on {formatCurrency(results.modeledMissedGrowth)}</strong> of growth.</span>
                    }
                  </p>
                </div>

                {/* CARD B: SMART SWITCH */}
                <div className={`p-5 rounded-xl border-2 transition-all relative ${
                   results.recommendation === 'switch'
                   ? 'border-slate-900 bg-slate-900 text-white shadow-xl' 
                   : 'border-slate-200 bg-white text-slate-900 opacity-60' 
                }`}>
                  {results.recommendation === 'switch' && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      HIGHER NET VALUE
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold ${results.recommendation === 'switch' ? 'text-slate-100' : 'text-slate-800'}`}>
                      Strategy B: Smart Switch
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                        results.recommendation === 'switch' 
                        ? 'bg-green-900 text-green-300 border border-green-700' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {results.switchOutcome.verdict}
                    </span>
                  </div>
                  <div className={`text-3xl font-black mb-1 ${results.recommendation === 'switch' ? 'text-white' : 'text-slate-900'}`}>
                    +{formatCurrency(results.switchOutcome.projectedBenefit)}
                  </div>
                  <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${results.recommendation === 'switch' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Projected Net Benefit
                  </p>
                  
                  {/* Carry Forward Display */}
                  {!inputs.hasRealizedGains && results.carryForward > 0 && (
                    <div className={`mb-3 text-xs p-2 rounded border ${
                        results.recommendation === 'switch' 
                        ? 'text-slate-400 bg-slate-800 border-slate-700' 
                        : 'text-slate-600 bg-slate-50 border-slate-200'
                    }`}>
                      <span>+ {formatCurrency(results.carryForward)} loss carried forward</span>
                    </div>
                  )}

                  <p className={`text-sm leading-snug mb-1 ${results.recommendation === 'switch' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Projected tax savings captured while staying invested in the market recovery.
                  </p>
                </div>

                {/* SEPARATE CTA BOX */}
                <div className="bg-slate-900 rounded-xl p-5 shadow-lg border border-slate-800 mt-6">
                   <div className="text-sm text-slate-300 mb-4 bg-slate-800/50 p-3 rounded border border-slate-700/50">
                      <strong>Tip:</strong> When harvesting losses on individual stocks, investors often use sector ETFs to maintain exposure while avoiding wash sales.
                   </div>
                   
                   <a href="/" className={`block w-full text-center font-bold py-3 rounded-lg transition-colors ${
                      canProceed
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md ring-1 ring-blue-500' 
                      : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                   }`}>
                    Find a Replacement ETF Pair →
                  </a>
                </div>

                {/* Legal Assumptions Footer (Moved to Bottom) */}
                <p className="text-[10px] text-slate-500 text-center mt-6 leading-tight max-w-xs mx-auto">
                    *Assumes full liquidation of a single tax lot at the provided tax rate. 
                    Transaction costs excluded. Estimates are for educational purposes only.
                </p>

              </div>
              {/* END RESULTS WRAPPER */}

              {/* COMPLIANCE CHECKBOX - OUTSIDE */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={inputs.isWashSaleCompliant}
                    onChange={(e) => handleInputChange('isWashSaleCompliant', e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
                  />
                  <span className="text-xs text-slate-500">
                    I confirm I have <strong>NOT</strong> purchased this asset (or a substantially identical one) in the last 30 days, including dividend reinvestments.
                  </span>
                </label>
              </div>

            </>
          )}

        </div>
      </div>
    </div>
  );
}
