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
  verdict: 'DANGEROUS' | 'SAFE' | 'EFFICIENT' | 'INEFFICIENT';
  breakdownText: string;
  isPositive: boolean;
}

export interface CalculatorResult {
  loss: number;
  hasLoss: boolean;
  taxSavings: number;
  carryForward: number; // The amount unused this year
  cashOutcome: ScenarioOutcome;
  switchOutcome: ScenarioOutcome;
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
    if (currentValue < 0 || costBasis < 0) return invalidResult("Values cannot be negative.");
    
    // 2. Calculate Loss
    // If current > cost, loss is 0.
    const rawLoss = costBasis - currentValue;
    const loss = Math.max(0, rawLoss);
    const hasLoss = rawLoss > 0;

    // 3. Calculate Tax Savings & Carry Forward
    // Rule: If no gains to offset, cap immediate benefit at $3,000.
    let effectiveDeduction = loss;
    let carryForward = 0;

    if (!hasRealizedGains) {
        effectiveDeduction = Math.min(loss, 3000);
        carryForward = Math.max(0, loss - 3000);
    }

    const taxSavings = effectiveDeduction * (taxRate / 100);

    // 4. Opportunity Cost (Cash Drag)
    // If you sit in cash, you MISS the gain on the FULL Current Value.
    const missedGain = currentValue * (marketRecoveryRate / 100);

    // 5. Scenario A: Cash Trap
    const cashNet = taxSavings - missedGain;
    const cashOutcome: ScenarioOutcome = {
      projectedBenefit: cashNet,
      netResult: cashNet,
      isPositive: cashNet > 0,
      verdict: cashNet > 0 ? 'SAFE' : 'DANGEROUS',
      breakdownText: cashNet > 0
        ? `Savings cover the missed growth.`
        : `Tax savings wiped out by market recovery.`
    };

    // 6. Scenario B: Smart Switch
    // You keep the savings + market participation cancels out missed gain
    const switchNet = taxSavings; 
    const switchOutcome: ScenarioOutcome = {
      projectedBenefit: switchNet,
      netResult: switchNet,
      isPositive: true,
      verdict: 'EFFICIENT',
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
      breakEvenRate,
      isValid: true,
      validationError: !isWashSaleCompliant ? "Wash Sale Rule Violation" : undefined
    };

  }, [inputs]);

  return { inputs, setInputs, results };
}

function invalidResult(error: string): CalculatorResult {
  return {
    loss: 0, hasLoss: false, taxSavings: 0, carryForward: 0, breakEvenRate: 0, isValid: false, validationError: error,
    cashOutcome: { projectedBenefit: 0, netResult: 0, verdict: 'INEFFICIENT', breakdownText: '', isPositive: false },
    switchOutcome: { projectedBenefit: 0, netResult: 0, verdict: 'INEFFICIENT', breakdownText: '', isPositive: false }
  };
}
