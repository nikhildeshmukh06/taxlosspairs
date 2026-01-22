'use client';

import { useState, useMemo } from 'react';

// --- TYPE DEFINITIONS ---
type TaxBracket = { limit: number; rate: number };
type TaxSchedule = { SINGLE: TaxBracket[]; MARRIED: TaxBracket[] };

// --- FEDERAL DATA (2025 Projected) ---
const FED_BRACKETS: TaxSchedule = {
  SINGLE: [
    { limit: 609350, rate: 0.37 },
    { limit: 243725, rate: 0.35 },
    { limit: 191950, rate: 0.32 },
    { limit: 100525, rate: 0.24 },
    { limit: 47150, rate: 0.22 },
    { limit: 11600, rate: 0.12 },
    { limit: 0, rate: 0.10 },
  ],
  MARRIED: [
    { limit: 731200, rate: 0.37 },
    { limit: 487450, rate: 0.35 },
    { limit: 383900, rate: 0.32 },
    { limit: 201050, rate: 0.24 },
    { limit: 94300, rate: 0.22 },
    { limit: 23200, rate: 0.12 },
    { limit: 0, rate: 0.10 },
  ]
};

// --- STATE DATA (2025 Marginal Rates) ---
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
      { limit: 1000000, rate: 0.144 }, { limit: 677275, rate: 0.123 },
      { limit: 406364, rate: 0.113 }, { limit: 338639, rate: 0.103 },
      { limit: 68350, rate: 0.093 }, { limit: 54081, rate: 0.08 },
      { limit: 37788, rate: 0.06 }, { limit: 23934, rate: 0.04 },
      { limit: 10412, rate: 0.02 }, { limit: 0, rate: 0.01 }
    ],
    MARRIED: [
      { limit: 1354550, rate: 0.133 }, { limit: 812728, rate: 0.113 }, 
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
      { limit:
