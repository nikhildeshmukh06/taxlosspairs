import { MetadataRoute } from 'next';
import pairsData from './pairs.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.taxlosspairs.com';

  // 1. Generate URLs for all your ETF pages
  const etfUrls = pairsData.map((etf) => ({
    url: `${baseUrl}/pairs/${etf.ticker}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 2. Add the Homepage
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...etfUrls,
  ];
}
