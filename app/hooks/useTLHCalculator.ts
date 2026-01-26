import { useState, useMemo } from 'react';

// --- Types ---
export interface CalculatorInputs {
  currentValue: number;
  costBasis: number;
  taxRate: number; // 0-60
  hasRealizedGains: boolean; // Toggle for $3k cap
  marketRecoveryRate: number; // -5 to 10
  isWashSaleCompliant: boolean; // Checkbox
}

export interface ScenarioOutcome {
  projectedBenefit: number;
  netResult: number;
  verdict: 'DANGEROUS' | 'SAFE' | 'EFFICIENT' | 'INEFFICIENT' | 'OPTIMAL';
  breakdownText: string;
  isPositive: boolean;
}

export interface CalculatorResult {
  loss: number;
  hasLoss: boolean;
  taxSavings: number;
  carryForward: number;
  cashOutcome: ScenarioOutcome;
  switchOutcome: ScenarioOutcome;
  recommendation: 'cash' | 'switch'; // NEW: Tells UI which card wins
  breakEvenRate: number;
  isValid: boolean;
  validationError?: string;
}

export function useTLHCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentValue: 90000,
    costBasis: 100000,
    taxRate: 35,
    hasRealizedGains: false,
    marketRecoveryRate: 1.0,
    isWashSaleCompliant: true,
  });

  const results: CalculatorResult = useMemo(() => {
    const { currentValue, costBasis, taxRate, hasRealizedGains, marketRecoveryRate, isWashSaleCompliant } = inputs;

    // 1. Basic Validation
    const rawLoss = costBasis - currentValue;
    const loss = Math.max(0, rawLoss);
    const hasLoss = rawLoss > 0;

    // 2. Calculate Tax Savings & Carry Forward
    let effectiveDeduction = loss;
    let carryForward = 0;

    if (!hasRealizedGains) {
        effectiveDeduction = Math.min(loss, 3000);
        carryForward = Math.max(0, loss - 3000);
    }

    const taxSavings = effectiveDeduction * (taxRate / 100);

    // 3. Opportunity Cost (Cash Drag)
    const missedGain = currentValue * (marketRecoveryRate / 100);

    // 4. Scenario A: Cash Trap
    const cashNet = taxSavings - missedGain;
    
    // 5. Scenario B: Smart Switch
    const switchNet = taxSavings; 

    // 6. Determine Recommendation
    // If market is going DOWN (recovery < 0), Cash is mathematically better.
    // If market is going UP or Flat, Switching is better.
    const recommendation = cashNet > switchNet ? 'cash' : 'switch';

    const cashOutcome: ScenarioOutcome = {
      projectedBenefit: cashNet,
      netResult: cashNet,
      isPositive: cashNet > 0,
      verdict: cashNet > 0 ? 'SAFE' : 'DANGEROUS',
      breakdownText: cashNet > 0
        ? `Savings cover the missed growth.`
        : `Tax savings wiped out by market recovery.`
    };

    const switchOutcome: ScenarioOutcome = {
      projectedBenefit: switchNet,
      netResult: switchNet,
      isPositive: true,
      verdict: recommendation === 'switch' ? 'OPTIMAL' : 'INEFFICIENT', // Update verdict text
      breakdownText: `You capture tax value while staying invested.`
    };

    const breakEvenRate = currentValue > 0 ? (taxSavings / currentValue) * 100 : 0;

    return {
      loss,
      hasLoss,
      taxSavings,
      carryForward,
      cashOutcome,
      switchOutcome,
      recommendation,
      breakEvenRate,
      isValid: true,
      validationError: !isWashSaleCompliant ? "Wash Sale Rule Violation" : undefined
    };

  }, [inputs]);

  return { inputs, setInputs, results };
}
