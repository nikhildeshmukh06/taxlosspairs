import { MetadataRoute } from 'next';
import pairsData from './pairs.json';
import { STATE_CONTENT } from './data/state-content'; // Import your new TEY data

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.taxlosspairs.com';

  // 1. Generate URLs for all your ETF pages (EXISTING)
  const etfUrls = pairsData.map((etf) => ({
    url: `${baseUrl}/pairs/${etf.ticker}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 2. Generate URLs for TEY State Pages (NEW)
  const teyStateUrls = Object.values(STATE_CONTENT).map((state) => ({
    url: `${baseUrl}/tax-equivalent-yield/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3. Return everything merged together
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tax-equivalent-yield`, // TEY Hub Page
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...teyStateUrls, // Add the 10 state pages
    ...etfUrls,      // Add the ETF pages
  ];
}
