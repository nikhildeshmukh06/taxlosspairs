"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import pairsData from './pairs.json';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic
  const filteredPairs = pairsData.filter((pair) =>
    pair.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pair.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pair.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- COMPLIANCE WARNING --- */}
      <div className="bg-slate-100 border-b border-slate-200 p-3 text-center">
        <p className="text-xs text-slate-600 font-medium">
          ⚠️ Market Data Only. Not financial, tax, or investment advice. Past correlation does not guarantee future results.
        </p>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            ETF Correlation & <span className="text-blue-600">Overlap Metrics</span>
          </h1>
          
          {/* SEO INTRO TEXT + "WHY THIS MATTERS" */}
          <div className="max-w-3xl mx-auto mb-10 text-slate-600 space-y-4 leading-relaxed text-lg">
            <p>
              Tax-loss harvesting involves selling securities at a loss to offset gains, but IRS wash-sale rules may restrict claiming those losses if a substantially identical security is repurchased within 30 days.
            </p>
            <p>
              This tool presents structured ETF correlation and holdings overlap metrics often reviewed when comparing economically similar ETFs for research purposes.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto relative group mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <input
              type="text"
              placeholder="Search ticker (e.g. VTI, QQQ, SMH)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative w-full p-4 pl-6 rounded-lg border border-slate-200 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
            />
          </div>

          {/* POPULAR SEARCHES */}
          <div className="text-xs text-gray-400 flex gap-3 items-center justify-center">
            <span className="font-semibold uppercase tracking-wider text-gray-300">Popular:</span>
            <Link href="/pairs/VTI" className="hover:text-blue-600 hover:underline transition-colors">VTI</Link>
            <Link href="/pairs/VOO" className="hover:text-blue-600 hover:underline transition-colors">VOO</Link>
            <Link href="/pairs/QQQ" className="hover:text-blue-600 hover:underline transition-colors">QQQ</Link>
            <Link href="/pairs/VXUS" className
