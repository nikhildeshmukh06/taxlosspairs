import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { STATE_CONTENT } from '../../data/state-content'; 
import { StatePageTemplate } from '../../components/StatePageTemplate'; 

// Helper to find state data by URL slug (e.g. 'california' -> CA Data)
function getStateContent(slug: string) {
  return Object.values(STATE_CONTENT).find((s) => s.slug === slug);
}

// 1. GENERATE STATIC PARAMS
export async function generateStaticParams() {
  return Object.values(STATE_CONTENT).map((state) => ({
    state: state.slug,
  }));
}

// 2. DYNAMIC METADATA (Updated to use your rich data)
export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const content = getStateContent(params.state);

  if (!content) return {};

  // USE THE EXACT METADATA FROM YOUR FILE (includes keywords & custom descriptions)
  return {
    ...content.metadata,
    alternates: {
      canonical: `https://www.taxlosspairs.com/tax-equivalent-yield/${content.slug}`,
    },
  };
}

// 3. THE PAGE COMPONENT
export default function DynamicStatePage({ params }: { params: { state: string } }) {
  const content = getStateContent(params.state);

  if (!content) {
    notFound();
  }

  return <StatePageTemplate content={content} />;
}
