'use client';

import React, { useState } from 'react';

// FIX: Added '?' to make ticker optional
interface Props {
  ticker?: string; 
}

export default function ReportIssueButton({ ticker }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [issueType, setIssueType] = useState('data');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Issue Reported:', { ticker: ticker || 'TEY-General', issueType, description });
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setDescription('');
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-slate-400 hover:text-slate-600 underline decoration-dotted underline-offset-4 transition-colors"
      >
        Report an issue with this page
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Report Issue</h3>
                  <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select value={issueType} onChange={(e) => setIssueType(e.target.value)} className="w-full rounded-lg border-slate-300 text-sm">
                      <option value="data">Data Error</option>
                      <option value="bug">Bug / Glitch</option>
                      <option value="typo">Typo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Details</label>
                    <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border-slate-300 text-sm h-32" placeholder="Describe the issue..." />
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-2 bg-slate-100 rounded-lg">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-2 bg-slate-900 text-white rounded-lg">Submit</button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8"><h3 className="font-bold">Sent!</h3></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
