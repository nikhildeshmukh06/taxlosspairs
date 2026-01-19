"use client";

import React from 'react';

export default function ReportIssueButton({ ticker }: { ticker: string }) {
  return (
    <button
      onClick={() => {
        // Safe check for window and Tally
        if (typeof window !== 'undefined' && (window as any).Tally) {
          (window as any).Tally.openPopup('68Kqjo', {
            layout: 'modal',
            emoji: {
              text: '👋',
              animation: 'wave'
            },
            hidden: {
              ticker: ticker, // Dynamic ticker passed from parent
            }
          });
        }
      }}
      className="text-gray-400 hover:text-blue-600 hover:underline bg-transparent border-none cursor-pointer p-0 font-medium"
    >
      Report data issue for {ticker}
    </button>
  );
}
