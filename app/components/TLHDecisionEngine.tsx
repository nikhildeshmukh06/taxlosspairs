'use client';

import React from 'react';
import { useTLHCalculator } from '../hooks/useTLHCalculator'; 

export default function TLHDecisionEngine() {
  const { inputs, setInputs, results } = useTLHCalculator();

  const handleInputChange = (field: keyof typeof inputs, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

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
                type="number" 
                min="0"
                value={inputs.costBasis}
                onChange={(e) => handleInputChange('costBasis', Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Current Value ($)</label>
              <input 
                type="number" 
                min="0"
                value={inputs.currentValue}
                onChange={(e) => handleInputChange('currentValue', Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">Use Income Rate (e.g. 37%) for Short Term, Capital Rate (20%) for Long Term.</p>
            </div>

            {/* TOGGLE: Realized Gains */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={inputs.hasRealizedGains}
                  onChange={(e) => handleInputChange('hasRealizedGains', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">
                  I have other <strong>Realized Gains</strong> to offset.
                  <span className="block text-xs text-slate-500 font-normal">Uncheck if you are relying on the $3k/year deduction.</span>
                </span>
              </label>
            </div>

            {/* SLIDER: Market Recovery */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">Market Recovery (Next 30 Days)</label>
                <span className="text-sm font-bold text-blue-600">{inputs.marketRecoveryRate > 0 ? '+' : ''}{inputs.marketRecoveryRate}%</span>
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
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Flat (0%)</span>
                <span>Moderate (+2%)</span>
                <span>Rally (+10%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: OUTPUTS */}
        <div className="space-y-6 relative">
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
            /* STATE: HAS LOSS (Show Cards) */
            <>
              {/* VOID OVERLAY (If Wash Sale) */}
              {!inputs.isWashSaleCompliant && (
                <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center backdrop-blur-[1px] rounded-xl border-2 border-slate-200 border-dashed">
                  <div className="bg-red-100 border-2 border-red-500 text-red-700 px-6 py-3 rounded-lg transform -rotate-6 shadow-xl">
                    <span className="text-2xl font-black uppercase tracking-widest">VOID</span>
                    <p className="text-xs font-bold text-center mt-1">Wash Sale Violation</p>
                  </div>
                </div>
              )}

              {/* CARD A: CASH TRAP */}
              <div className={`p-5 rounded-xl border-2 transition-all ${
                results.cashOutcome.isPositive ? 'border-yellow-400 bg-yellow-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800">Strategy A: Sell to Cash</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    results.cashOutcome.isPositive ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'
                  }`}>
                    {results.cashOutcome.verdict}
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 mb-1">
                  {formatCurrency(results.cashOutcome.projectedBenefit)}
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Projected Net Benefit</p>
                <p className="text-sm text-slate-600 leading-snug">
                  {results.cashOutcome.isPositive 
                    ? "You save enough tax to cover the market rally." 
                    : <span>Warning: You save taxes, but <strong>miss out on {formatCurrency(inputs.currentValue * inputs.marketRecoveryRate/100)}</strong> of growth.</span>
                  }
                </p>
              </div>

              {/* CARD B: SMART SWITCH */}
              <div className="p-5 rounded-xl border-2 border-slate-900 bg-slate-900 text-white relative shadow-lg">
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  RECOMMENDED
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-100">Strategy B: Smart Switch</h3>
                  <span className="px-2 py-1 rounded text-xs font-bold bg-green-900 text-green-300 border border-green-700">
                    EFFICIENT
                  </span>
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  +{formatCurrency(results.switchOutcome.projectedBenefit)}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Projected Net Benefit</p>
                
                {/* Carry Forward Display */}
                {!inputs.hasRealizedGains && results.carryForward > 0 && (
                  <div className="mb-3 text-xs text-slate-400 bg-slate-800 p-2 rounded border border-slate-700">
                    <span>+ {formatCurrency(results.carryForward)} loss carried forward</span>
                  </div>
                )}

                <p className="text-sm text-slate-300 leading-snug mb-4">
                  Projected tax savings captured while staying invested in the market recovery.
                </p>
                
                {/* CTA */}
                <a href="/" className="block w-full text-center bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-slate-100 transition-colors">
                  Find a Replacement Pair →
                </a>
              </div>
            </>
          )}

          {/* COMPLIANCE CHECKBOX */}
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

        </div>
      </div>
    </div>
  );
}
