"use client";
import React, { useState, useEffect } from 'react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already agreed
    const hasAgreed = localStorage.getItem('disclaimer_agreed');
    if (!hasAgreed) {
      setIsOpen(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem('disclaimer_agreed', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-center text-slate-900 mb-4">
            Compliance & Usage Agreement
          </h2>
          <div className="text-sm text-slate-600 space-y-3 leading-relaxed mb-6">
            <p>
              By proceeding, you acknowledge that this tool displays <strong>historical correlation and overlap metrics only</strong>.
            </p>
            <p>
              This data is for research purposes and does <strong>not</strong> constitute tax, legal, or investment advice.
            </p>
            <p>
              "Substantially identical" securities are not strictly defined by the IRS. You should always consult a qualified tax professional.
            </p>
          </div>
          <button
            onClick={handleAgree}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors text-sm"
          >
            I Understand & Agree
          </button>
        </div>
        <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400">TaxLossPairs.com • Open Source Market Data</p>
        </div>
      </div>
    </div>
  );
}
