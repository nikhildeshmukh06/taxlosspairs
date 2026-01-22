'use client';

import { useState, useMemo } from 'react';

// --- TYPE DEFINITIONS ---
type TaxBracket = { limit: number; rate: number };
type TaxSchedule = { SINGLE: TaxBracket[]; MARRIED: TaxBracket[] };

// --- FEDERAL DATA (2026 Estimated based on Inflation Adjs) ---
const FED_BRACKETS: TaxSchedule = {
  SINGLE: [
    { limit: 640600, rate: 0.37 },
    { limit: 256225, rate: 0.35 },
    { limit: 201775, rate: 0.32 },
    { limit: 105700, rate: 0.24 },
    { limit: 50400, rate: 0.22 },
    { limit: 12400, rate: 0.12 },
    { limit: 0, rate: 0.10 },
  ],
  MARRIED: [
    { limit: 768700, rate: 0.37 },
    { limit: 512450, rate: 0.35 },
    { limit: 403550, rate: 0.32 },
    { limit: 211400, rate: 0.24 },
    { limit: 100800, rate: 0.22 },
    { limit: 24800, rate: 0.12 },
    { limit: 0, rate: 0.10 },
  ]
};

// --- STATE DATA (2026 Estimates) ---
const flat = (rate: number): TaxSchedule => ({
  SINGLE: [{ limit: 0, rate }],
  MARRIED: [{ limit: 0, rate }]
});
const zero = flat(0);

const STATE_DATA: Record<string, TaxSchedule> = {
  'AK': zero, 'FL': zero, 'NV': zero, 'NH': zero, 'SD': zero, 
  'TN': zero, 'TX': zero, 'WA': zero, 'WY': zero,

  'AZ': flat(0.025), 'CO': flat(0.044), 'IL': flat(0.0495), 
  'IN': flat(0.0305), 'KY': flat(0.04), 'MI': flat(0.0425),
  'MS': flat(0.047), 'NC': flat(0.045), 'PA': flat(0.0307), 
  'UT': flat(0.0465), 'AL': flat(0.05), 'AR': flat(0.044), 
  'DE': flat(0.066), 'GA': flat(0.0549), 'ID': flat(0.058), 
  'IA': flat(0.057), 'KS': flat(0.057), 'LA': flat(0.0425),
  'ME': flat(0.0715), 'MD': flat(0.0575), 'MO': flat(0.048), 
  'MT': flat(0.059), 'NE': flat(0.0584), 'NM': flat(0.059), 
  'ND': flat(0.025), 'OH': flat(0.035), 'OK': flat(0.0475), 
  'RI': flat(0.0599), 'SC': flat(0.064), 'VT': flat(0.0875),
  'VA': flat(0.0575), 'WV': flat(0.065), 'WI': flat(0.0765),

  // Progressive States
  'CA': {
    SINGLE: [
      { limit: 1000000, rate: 0.144 }, 
      { limit: 677275, rate: 0.123 },
      { limit: 406364, rate: 0.113 }, { limit: 338639, rate: 0.103 },
      { limit: 68350, rate: 0.093 }, { limit: 54081, rate: 0.08 },
      { limit: 37788, rate: 0.06 }, { limit: 23934, rate: 0.04 },
      { limit: 10412, rate: 0.02 }, { limit: 0, rate: 0.01 }
    ],
    MARRIED: [
      { limit: 1000000, rate: 0.144 }, 
      { limit: 812728, rate: 0.113 }, 
      { limit: 677278, rate: 0.103 }, { limit: 136700, rate: 0.093 }, 
      { limit: 108162, rate: 0.08 }, { limit: 75576, rate: 0.06 }, 
      { limit: 47868, rate: 0.04 }, { limit: 20824, rate: 0.02 }, 
      { limit: 0, rate: 0.01 }
    ]
  },
  'NY': {
    SINGLE: [
      { limit: 25000000, rate: 0.109 }, { limit: 5000000, rate: 0.103 },
      { limit: 1077550, rate: 0.0965 }, { limit: 215400, rate: 0.0685 },
      { limit: 80650, rate: 0.0633 }, { limit: 13900, rate: 0.0585 },
      { limit: 8500, rate: 0.0525 }, { limit: 0, rate: 0.04 }
    ],
    MARRIED: [
      { limit: 25000000, rate: 0.109 }, { limit: 5000000, rate: 0.103 },
      { limit: 2155350, rate: 0.0965 }, { limit: 323200, rate: 0.0685 },
      { limit: 161550, rate: 0.0633 }, { limit: 27900, rate: 0.0585 },
      { limit: 17150, rate: 0.0525 }, { limit: 0, rate: 0.04 }
    ]
  },
  'NJ': {
    SINGLE: [
      { limit: 1000000, rate: 0.1075 }, { limit: 500000, rate: 0.0897 },
      { limit: 75000, rate: 0.0637 }, { limit: 40000, rate: 0.05525 },
      { limit: 0, rate: 0.014 }
    ],
    MARRIED: [
      { limit: 1000000, rate: 0.1075 }, { limit: 500000, rate: 0.0897 },
      { limit: 150000, rate: 0.0637 }, { limit: 80000, rate: 0.05525 },
      { limit: 0, rate: 0.014 }
    ]
  },
  'MA': {
    SINGLE: [{ limit: 1000000, rate: 0.09 }, { limit: 0, rate: 0.05 }],
    MARRIED: [{ limit: 1000000, rate: 0.09 }, { limit: 0, rate: 0.05 }]
  },
  'CT': {
    SINGLE: [
      { limit: 500000, rate: 0.0699 }, { limit: 200000, rate: 0.069 },
      { limit: 100000, rate: 0.06 }, { limit: 50000, rate: 0.055 },
      { limit: 10000, rate: 0.05 }, { limit: 0, rate: 0.03 }
    ],
    MARRIED: [
      { limit: 1000000, rate: 0.0699 }, { limit: 400000, rate: 0.069 },
      { limit: 200000, rate: 0.06 }, { limit: 100000, rate: 0.055 },
      { limit: 20000, rate: 0.05 }, { limit: 0, rate: 0.03 }
    ],
  },
  'HI': {
    SINGLE: [{ limit: 200000, rate: 0.11 }, { limit: 150000, rate: 0.10 }, { limit: 0, rate: 0.08 }],
    MARRIED: [{ limit: 400000, rate: 0.11 }, { limit: 300000, rate: 0.10 }, { limit: 0, rate: 0.08 }]
  },
  'OR': {
    SINGLE: [{ limit: 125000, rate: 0.099 }, { limit: 10200, rate: 0.0875 }, { limit: 0, rate: 0.0475 }],
    MARRIED: [{ limit: 250000, rate: 0.099 }, { limit: 20400, rate: 0.0875 }, { limit: 0, rate: 0.0475 }]
  },
  'MN': {
    SINGLE: [{ limit: 197870, rate: 0.0985 }, { limit: 103300, rate: 0.0785 }, { limit: 30070, rate: 0.068 }, { limit: 0, rate: 0.0535 }],
    MARRIED: [{ limit: 316260, rate: 0.0985 }, { limit: 184040, rate: 0.0785 }, { limit: 43950, rate: 0.068 }, { limit: 0, rate: 0.0535 }]
  },
  'DC': {
    SINGLE: [{ limit: 1000000, rate: 0.1075 }, { limit: 500000, rate: 0.0925 }, { limit: 250000, rate: 0.085 }, { limit: 0, rate: 0.06 }],
    MARRIED: [{ limit: 1000000, rate: 0.1075 }, { limit: 500000, rate: 0.0925 }, { limit: 250000, rate: 0.085 }, { limit: 0, rate: 0.06 }]
  },
};

const STATE_NAMES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'DC', name: 'Washington, DC' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' }, { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' }, { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' }, { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' }, { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' }, { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' }, { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' }, { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
];

export default function TEYCalculator({ defaultState = 'CA' }: { defaultState?: string }) {
  const [muniYield, setMuniYield] = useState<string>('3.50');
  const [income, setIncome] = useState<string>('150000');
  const [status, setStatus] = useState<'SINGLE' | 'MARRIED'>('SINGLE');
  const [stateCode, setStateCode] = useState<string>(defaultState);

  const calculation = useMemo(() => {
    const yieldNum = parseFloat(muniYield) || 0;
    const cleanIncome = income.toString().replace(/[$,]/g, '');
    const incomeNum = parseFloat(cleanIncome) || 0;

    // 1. Get Federal Marginal Rate (Defensive Sort: High to Low)
    const fBrackets = [...FED_BRACKETS[status]].sort((a,b) => b.limit - a.limit);
    const fedBracket = fBrackets.find(b => incomeNum > b.limit) || fBrackets[fBrackets.length - 1];
    const fedRate = fedBracket.rate;

    // 2. Get NIIT (3.8% Surtax)
    const niitThreshold = status === 'SINGLE' ? 200000 : 250000;
    const niitRate = incomeNum > niitThreshold ? 0.038 : 0;

    // 3. Get State Marginal Rate (Defensive Sort: High to Low)
    let stateRate = 0;
    const schedule = STATE_DATA[stateCode];
    if (schedule) {
      const sBrackets = [...schedule[status]].sort((a,b) => b.limit - a.limit);
      const stateBracket = sBrackets.find(b => incomeNum > b.limit) || sBrackets[sBrackets.length - 1];
      stateRate = stateBracket.rate;
    }

    // 4. Calculate TEY (Capped at 90% for realism)
    const totalTaxRate = fedRate + niitRate + stateRate;
    const safeTaxRate = Math.min(totalTaxRate, 0.90); 
    const tey = yieldNum / (1 - safeTaxRate);

    return {
      tey: tey.toFixed(2),
      fedRate: (fedRate * 100).toFixed(2),
      niitApplies: niitRate > 0,
      stateRate: (stateRate * 100).toFixed(2),
      totalTax: (totalTaxRate * 100).toFixed(2)
    };
  }, [muniYield, income, status, stateCode]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          Tax-Equivalent Yield Calculator
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Calculates your marginal tax impact using 2026 estimated federal and state brackets.
        </p>
      </div>

      <div className="p-6 grid gap-8 md:grid-cols-2">
        {/* INPUTS */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Muni Bond Yield (%)</label>
            <input
              type="number"
              value={muniYield}
              onChange={(e) => setMuniYield(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-lg text-slate-900"
              step="0.01"
              placeholder="e.g. 3.50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Annual Taxable Income ($)</label>
            <input
              type="text"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-lg text-slate-900"
              placeholder="e.g. 250,000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Filing Status</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStatus('SINGLE')}
                className={`p-2 rounded-lg text-sm font-medium transition-colors ${status === 'SINGLE' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Single
              </button>
              <button
                onClick={() => setStatus('MARRIED')}
                className={`p-2 rounded-lg text-sm font-medium transition-colors ${status === 'MARRIED' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Married
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">State Residency</label>
            <div className="relative">
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg bg-white appearance-none text-slate-900"
              >
                {STATE_NAMES.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {/* NEW: Inline Helper Text */}
            <p className="text-[10px] text-slate-400 mt-1">
              Assumes the municipal bond is issued by your home state.
            </p>
          </div>
        </div>

        {/* RESULTS */}
        <div className="flex flex-col justify-center">
          <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><span className="text-6xl font-bold">%</span></div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Tax-Equivalent Yield</p>
            <div className="text-5xl font-bold text-green-400 mb-3">{calculation.tey}%</div>
            
            <div className="mt-6 pt-6 border-t border-slate-700 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Fed Marginal Rate</span>
                <span className="font-mono">{calculation.fedRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">NIIT Surtax</span>
                <span className={`font-mono ${calculation.niitApplies ? 'text-yellow-400' : 'text-slate-600'}`}>
                  {calculation.niitApplies ? '3.80%' : '0.00%'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">State Marginal Rate</span>
                <span className="font-mono text-green-300">{calculation.stateRate}%</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-white font-bold">
                <span>Total Tax on Next $1</span>
                <span className="font-mono">{calculation.totalTax}%</span>
              </div>
            </div>
          </div>
          
          {/* PLAIN ENGLISH VERDICT */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
             <p className="text-sm text-slate-700 leading-relaxed">
               <strong>The Verdict:</strong> You would need a taxable yield of <strong>{calculation.tey}%</strong> (on a CD or Corporate Bond) to match this <strong>{muniYield}%</strong> Muni bond.
             </p>
          </div>

          {/* DISCLOSURES / NOTES */}
          <div className="mt-4 text-[10px] text-slate-400 space-y-1 text-center">
             <p>*Calculated using 2026 estimated marginal tax brackets. State tax rates are estimates.</p>
             <p>Assumes in-state municipal bond (exempt from Federal & State tax). Assumes state taxes are not federally deductible (SALT cap).</p>
             {stateCode === 'NY' && (
                <p>Includes NY State tax only. Does not include NYC or Yonkers local taxes.</p>
             )}
             {stateCode === 'CA' && (
               <p>Reflects top statewide marginal brackets including 1% Mental Health Services Surtax on income &gt;$1M.</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
