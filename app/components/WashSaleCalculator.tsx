'use client';

import React, { useState } from 'react';

interface WashSaleCalculatorProps {
  ticker: string;
}

export default function WashSaleCalculator({ ticker }: WashSaleCalculatorProps) {
  const [saleDate, setSaleDate] = useState('');
  const [reentryDate, setReentryDate] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    setSaleDate(dateStr);

    if (dateStr) {
      // Logic: Wash sale window is 30 days. 
      // Safe re-entry is Day 31 after the sale.
      // We use UTC logic to prevent timezone shifts making the date look wrong.
      const date = new Date(dateStr);
      // specific logic to ensure we don't drift due to timezones
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
      
      adjustedDate.setDate(adjustedDate.getDate() + 31);
      
      setReentryDate(
        adjustedDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      );
    } else {
      setReentryDate(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Wash Sale Re-Entry Date (Reference Tool)
      </h3>
      
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        If you sold <span className="font-bold text-gray-900">{ticker}</span> at a loss, U.S. wash sale rules generally restrict repurchasing the same or a substantially identical security within 30 days.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
        <div className="w-full sm:w-auto">
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
            Sale Date
          </label>
          <input
            type="date"
            value={saleDate}
            onChange={handleDateChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {reentryDate && (
          <div className="w-full sm:w-auto flex-1 bg-blue-50 border border-blue-100 rounded-lg p-3">
            <div className="text-xs text-blue-600 mb-1 font-bold uppercase tracking-wide">
              Earliest Repurchase Date
            </div>
            <div className="text-xl font-bold text-blue-900">
              {reentryDate}
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-400 italic border-t border-gray-100 pt-3">
        *For informational purposes only. Consult a tax professional regarding IRC §1091. This tool calculates the 31st day following a sale.
      </p>
    </div>
  );
}
