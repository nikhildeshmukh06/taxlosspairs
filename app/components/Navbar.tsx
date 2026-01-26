'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsToolsDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'ETF Search', href: '/', description: 'Find correlation pairs' },
    { name: 'TEY Calculator', href: '/tax-equivalent-yield', description: 'Optimize fixed income' },
    { name: 'Decision Engine', href: '/decision-engine', description: 'Harvesting math check', badge: 'New' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* LOGO AREA */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-blue-600 transition-colors">
                TL
              </div>
              <span className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-blue-600 transition-colors">
                TaxLossPairs
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Home
            </Link>

            {/* TOOLS DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors outline-none ${
                    isToolsDropdownOpen || pathname.includes('decision') || pathname.includes('tax-equivalent') 
                    ? 'text-blue-600' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tools
                <svg className={`w-4 h-4 transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isToolsDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-2 space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-semibold text-slate-900 group-hover:text-blue-600">
                            {link.name}
                          </span>
                          {link.badge && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          {link.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a 
              href="https://github.com/nikhildeshmukh06/taxlosspairs" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              GitHub
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-slate-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Tools
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-white"
              >
                <div className="flex items-center gap-2">
                    {link.name}
                    {link.badge && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase">
                        {link.badge}
                        </span>
                    )}
                </div>
              </Link>
            ))}
            <div className="border-t border-slate-200 my-2 pt-2">
                <a 
                href="https://github.com/nikhildeshmukh06/taxlosspairs" 
                target="_blank" 
                rel="noreferrer"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-500 hover:text-slate-900"
                >
                GitHub Repo
                </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
