import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { STATE_CONTENT } from '../../../data/state-content'; // Adjust path if needed
import { StatePageTemplate } from '../../../components/StatePageTemplate'; // Adjust path if needed

// Helper to find state data by URL slug (e.g. 'california' -> CA Data)
function getStateContent(slug: string) {
  return Object.values(STATE_CONTENT).find((s) => s.slug === slug);
}

// 1. GENERATE STATIC PARAMS (The "Pre-Build" Instruction)
// This tells Next.js to statically generate these pages at build time.
// It effectively recreates your 10 manual folders automatically.
export async function generateStaticParams() {
  return Object.values(STATE_CONTENT).map((state) => ({
    state: state.slug,
  }));
}

// 2. DYNAMIC METADATA (The SEO Fix)
// This automatically creates unique titles and descriptions for Google.
export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const content = getStateContent(params.state);

  if (!content) return {};

  return {
    title: `${content.name} Tax-Equivalent Yield Calculator (2026) | TaxLossPairs`,
    description: `Calculate your true bond yield in ${content.name}. Compare Municipal Bonds vs. Taxable investments using 2026 ${content.name} and Federal tax brackets.`,
    alternates: {
      canonical: `https://www.taxlosspairs.com/tax-equivalent-yield/${content.slug}`,
    },
  };
}

// 3. THE PAGE COMPONENT
export default function DynamicStatePage({ params }: { params: { state: string } }) {
  const content = getStateContent(params.state);

  // If the user types a garbage URL (e.g. /tax-equivalent-yield/mars), show 404
  if (!content) {
    notFound();
  }

  // Render the Template with the correct content
  return <StatePageTemplate content={content} />;
}
