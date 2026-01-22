import type { Metadata } from 'next';

export interface StateContent {
  slug: string;
  name: string;
  metadata: Metadata;
  hero: {
    title: string;
    description: string;
  };
  whySection: {
    title: string;
    p1: string;
    p2: string;
  };
  example: {
    title: string;
    description: string; // e.g., "A resident earning $X..."
    income: string;      // "$650,000"
    muniYield: string;   // "4.50%"
    taxableYield: string;// "8.67%"
    takeaway: string;    // The blue box text
  };
  faqs: {
    q: string;
    a: string;
  }[];
}

export const STATE_CONTENT: Record<string, StateContent> = {
  // --- CALIFORNIA ---
  'CA': {
    slug: 'california',
    name: 'California',
    metadata: {
      title: 'California Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate the true tax-equivalent yield for California municipal bonds using 2026 marginal tax brackets (14.4%) and NIIT.',
      keywords: 'California tax equivalent yield calculator, CA muni bond calculator, California marginal tax rate 2026, double tax free bonds CA',
    },
    hero: {
      title: 'California Tax-Equivalent Yield Calculator (2026)',
      description: 'This calculator shows the taxable yield required to match a <strong>California in-state municipal bond</strong>, which is exempt from both Federal and California income tax, based on your 2026 marginal tax bracket.',
    },
    whySection: {
      title: 'Why Tax-Equivalent Yield Matters More in California',
      p1: 'California’s top marginal income tax rate is <strong>14.4%</strong> (including the Mental Health Services Surtax). Since state taxes are generally not deductible at the federal level due to the SALT cap, this hit is purely additive.',
      p2: 'When state and federal taxes stack, small differences in yield compound dramatically. A California resident in the top bracket loses over <strong>50%</strong> of every additional dollar of taxable interest.',
    },
    example: {
      title: 'Example: California High Earner',
      description: 'Using the calculator above, a married California resident earning <strong>$650,000</strong> and considering a <strong>4.50% California municipal bond</strong> would need a taxable yield of approximately <strong>8.67%</strong> to break even.',
      income: '$650,000',
      muniYield: '4.50%',
      taxableYield: '8.67%',
      takeaway: 'Reality Check: Very few investment-grade corporate bonds offer an 8.67% yield. This highlights why high-net-worth Californians heavily favor munis.',
    },
    faqs: [
      { q: 'Do I pay CA tax on out-of-state bonds?', a: 'Yes. California generally taxes interest from municipal bonds issued by other states. To be fully tax-free, you typically need to buy bonds issued by California agencies.' },
      { q: 'Does the 1% Mental Health Services Tax apply?', a: 'Yes. For taxable incomes over $1 million, California adds a 1% surtax. Our calculator automatically includes this 14.4% top bracket when your income exceeds the threshold.' },
      { q: 'Why isn\'t my "Effective Tax Rate" used?', a: 'Investment decisions happen at the margin. The IRS taxes your next dollar of interest at your highest bracket, not your average rate. Using effective rate underestimates your tax burden.' }
    ]
  },

  // --- NEW YORK ---
  'NY': {
    slug: 'new-york',
    name: 'New York',
    metadata: {
      title: 'New York Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate the tax-equivalent yield for New York municipal bonds. Accounts for NY State rates (10.9%) and federal taxes.',
      keywords: 'New York tax equivalent yield calculator, NY muni bond calculator, triple tax free bonds NY',
    },
    hero: {
      title: 'New York Tax-Equivalent Yield Calculator (2026)',
      description: 'New York has some of the highest income taxes in the nation. This calculator shows the taxable yield required to match a <strong>New York in-state municipal bond</strong>, based on your 2026 marginal tax bracket.',
    },
    whySection: {
      title: 'The "Triple Tax-Free" Advantage',
      p1: 'New York State’s top marginal income tax rate is <strong>10.9%</strong>. Since state taxes are generally not deductible at the federal level due to the SALT cap, this tax hit is purely additive.',
      p2: '<strong>NYC Residents:</strong> If you live in New York City, you pay an additional local tax (up to ~3.8%), bringing your combined burden closer to <strong>14.8%</strong>. <em>Note: This calculator uses State rates (10.9%) as a conservative baseline.</em>',
    },
    example: {
      title: 'Example: New York High Earner',
      description: 'Using the calculator above, a married New York State resident earning <strong>$800,000</strong> and considering a <strong>4.25% NY municipal bond</strong> would need a taxable yield of approximately <strong>7.99%</strong> to break even.',
      income: '$800,000',
      muniYield: '4.25%',
      taxableYield: '7.99%',
      takeaway: 'Finding a safe corporate bond yielding nearly 8% is difficult in today\'s market, highlighting why NY munis are a staple for high-net-worth portfolios.',
    },
    faqs: [
      { q: 'Are NY munis triple tax-free?', a: 'Often, yes. If you live in NYC and buy "Triple Tax-Free" bonds (exempt from Federal, NY State, and NYC local taxes), your savings are maximized.' },
      { q: 'Do I pay NY tax on out-of-state bonds?', a: 'Yes. New York generally taxes interest from municipal bonds issued by other states.' }
    ]
  },

  // --- NEW JERSEY ---
  'NJ': {
    slug: 'new-jersey',
    name: 'New Jersey',
    metadata: {
      title: 'New Jersey Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate the tax-equivalent yield for New Jersey municipal bonds using 2026 marginal tax brackets (10.75%).',
      keywords: 'New Jersey tax equivalent yield calculator, NJ muni bond calculator, NJ millionaire tax',
    },
    hero: {
      title: 'New Jersey Tax-Equivalent Yield Calculator (2026)',
      description: 'New Jersey is a high-tax state with a top marginal rate of 10.75%. This calculator shows the taxable yield required to match a <strong>New Jersey in-state municipal bond</strong>.',
    },
    whySection: {
      title: 'Why NJ Muni Bonds Matter',
      p1: 'New Jersey’s top marginal income tax rate is <strong>10.75%</strong> on income over $1 million. For high earners, this is one of the steepest state tax burdens in the country.',
      p2: 'Because state taxes are generally not deductible on your federal return (due to the SALT cap), avoiding this 10.75% drag is critical for preserving real portfolio returns.',
    },
    example: {
      title: 'Example: New Jersey High Earner',
      description: 'Using the calculator above, a New Jersey resident earning <strong>$1,200,000</strong> and considering a <strong>4.00% NJ municipal bond</strong> would need a taxable yield of approximately <strong>7.76%</strong> to break even.',
      income: '$1.2M',
      muniYield: '4.00%',
      taxableYield: '7.76%',
      takeaway: 'This effectively supercharges the yield of conservative fixed-income investments without requiring you to move down the credit spectrum.',
    },
    faqs: [
      { q: 'Do I pay NJ tax on out-of-state bonds?', a: 'Yes. New Jersey taxes interest from municipal bonds issued by other states.' },
      { q: 'Does the 10.75% rate apply to all income?', a: 'No, it is a marginal rate. In 2026, the 10.75% rate applies to taxable income exceeding $1 million.' }
    ]
  },

  // --- MASSACHUSETTS ---
  'MA': {
    slug: 'massachusetts',
    name: 'Massachusetts',
    metadata: {
      title: 'Massachusetts Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate TEY for Massachusetts municipal bonds. Includes the 4% Fair Share Amendment surtax for millionaires.',
      keywords: 'Massachusetts tax equivalent yield calculator, MA muni bond calculator, Fair Share Amendment tax',
    },
    hero: {
      title: 'Massachusetts Tax-Equivalent Yield Calculator (2026)',
      description: 'With the recent "Fair Share Amendment," Massachusetts now taxes high earners significantly more. This calculator includes the 4% surtax to show the true value of <strong>MA in-state municipal bonds</strong>.',
    },
    whySection: {
      title: 'The "Fair Share" Surtax Explained',
      p1: 'Since 2023, Massachusetts applies an additional <strong>4% surtax</strong> on taxable income over $1 million. This sits on top of the standard 5% flat tax, creating a <strong>9% top marginal rate</strong>.',
      p2: 'For ultra-high-net-worth investors, this nearly doubles the state tax drag on taxable bonds, making in-state munis far more attractive than generic national funds.',
    },
    example: {
      title: 'Example: Boston High Earner',
      description: 'A Massachusetts resident earning <strong>$1.5 million</strong> facing the 9% top rate and considering a <strong>4.00% MA municipal bond</strong> would need a taxable yield of approximately <strong>7.52%</strong> to break even.',
      income: '$1.5M',
      muniYield: '4.00%',
      taxableYield: '7.52%',
      takeaway: 'This "Millionaire\'s Tax" has fundamentally changed the bond math in the Bay State.',
    },
    faqs: [
      { q: 'Does the 4% surtax apply to bond interest?', a: 'Yes. The Fair Share Amendment applies to all taxable income over the $1M threshold, including interest from corporate bonds.' },
      { q: 'Are out-of-state munis taxed in MA?', a: 'Yes. Massachusetts taxes interest from municipal bonds issued by other states.' }
    ]
  },

  // --- OREGON ---
  'OR': {
    slug: 'oregon',
    name: 'Oregon',
    metadata: {
      title: 'Oregon Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate TEY for Oregon municipal bonds. High 9.9% tax rates kick in at low income levels.',
      keywords: 'Oregon tax equivalent yield calculator, OR muni bond calculator, Oregon income tax brackets 2026',
    },
    hero: {
      title: 'Oregon Tax-Equivalent Yield Calculator (2026)',
      description: 'Oregon is unique: high tax rates (9.9%) kick in at relatively low income levels. This calculator shows the taxable yield required to match an <strong>Oregon in-state municipal bond</strong>.',
    },
    whySection: {
      title: 'High Rates Start Early',
      p1: 'Unlike New York or California, where top rates are reserved for millionaires, Oregon applies its <strong>9.9% tax rate</strong> to single filers earning over $125,000 (and couples over $250,000).',
      p2: 'This means "mass affluent" professionals—not just the ultra-wealthy—face a massive tax drag on taxable bonds. Oregon munis are essential for a much broader slice of the population here.',
    },
    example: {
      title: 'Example: Portland Professional',
      description: 'A single Oregon resident earning <strong>$150,000</strong> falls into the 9.9% bracket. A <strong>4.00% Oregon muni bond</strong> is equivalent to a taxable bond yielding <strong>7.16%</strong>.',
      income: '$150k',
      muniYield: '4.00%',
      taxableYield: '7.16%',
      takeaway: 'In most other states, you\'d need to earn $500k+ to see this kind of tax benefit. In Oregon, it starts much earlier.',
    },
    faqs: [
      { q: 'Do I pay OR tax on out-of-state bonds?', a: 'Yes. Oregon taxes interest from municipal bonds issued by other states.' }
    ]
  },

  // --- MINNESOTA ---
  'MN': {
    slug: 'minnesota',
    name: 'Minnesota',
    metadata: {
      title: 'Minnesota Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate TEY for Minnesota municipal bonds. Includes the 9.85% fourth tier tax bracket.',
      keywords: 'Minnesota tax equivalent yield calculator, MN muni bond calculator, MN tax rates 2026',
    },
    hero: {
      title: 'Minnesota Tax-Equivalent Yield Calculator (2026)',
      description: 'Minnesota has one of the steepest tax curves in the Midwest. This calculator shows the taxable yield required to match a <strong>Minnesota in-state municipal bond</strong> based on your 2026 bracket.',
    },
    whySection: {
      title: 'The 9.85% "Fourth Tier"',
      p1: 'Minnesota’s top marginal income tax rate is <strong>9.85%</strong>. This "Fourth Tier" applies to single filers over ~$197k and couples over ~$316k.',
      p2: 'For high earners, this near-10% state drag makes taxable bonds (like CDs or Treasuries) significantly less efficient compared to double tax-free MN munis.',
    },
    example: {
      title: 'Example: Minneapolis High Earner',
      description: 'A married Minnesota resident earning <strong>$400,000</strong> and considering a <strong>4.00% MN municipal bond</strong> would need a taxable yield of approximately <strong>7.16%</strong> to break even.',
      income: '$400k',
      muniYield: '4.00%',
      taxableYield: '7.16%',
      takeaway: 'Without tax-free income, you are effectively donating 10% of your yield to the state of Minnesota.',
    },
    faqs: [
      { q: 'Do I pay MN tax on out-of-state bonds?', a: 'Yes. Minnesota taxes interest from municipal bonds issued by other states.' }
    ]
  },

  // --- HAWAII ---
  'HI': {
    slug: 'hawaii',
    name: 'Hawaii',
    metadata: {
      title: 'Hawaii Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate TEY for Hawaii municipal bonds (11% top tax rate).',
      keywords: 'Hawaii tax equivalent yield calculator, HI muni bond calculator, Hawaii income tax 2026',
    },
    hero: {
      title: 'Hawaii Tax-Equivalent Yield Calculator (2026)',
      description: 'Paradise has a price: an 11% top marginal tax rate. This calculator shows the taxable yield required to match a <strong>Hawaii in-state municipal bond</strong>.',
    },
    whySection: {
      title: '11% Top Rate: Highest Outside CA/NYC',
      p1: 'Hawaii levies an <strong>11% top marginal tax rate</strong> on high earners. This is the highest state income tax rate in the country outside of California and New York City.',
      p2: 'Because state taxes are generally not deductible (SALT cap), this is a massive, unrecoverable cost for investors holding taxable bonds.',
    },
    example: {
      title: 'Example: Honolulu High Earner',
      description: 'A Hawaii resident earning <strong>$450,000</strong> facing the 11% top rate and considering a <strong>4.00% HI municipal bond</strong> would need a taxable yield of approximately <strong>7.25%</strong> to break even.',
      income: '$450k',
      muniYield: '4.00%',
      taxableYield: '7.25%',
      takeaway: 'Finding a 7.25% yield in the corporate bond market usually requires taking on significant credit risk. Hawaii munis offer this yield with high-grade safety.',
    },
    faqs: [
      { q: 'Do I pay HI tax on out-of-state bonds?', a: 'Yes. Hawaii taxes interest from municipal bonds issued by other states.' }
    ]
  },

  // --- VERMONT ---
  'VT': {
    slug: 'vermont',
    name: 'Vermont',
    metadata: {
      title: 'Vermont Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate TEY for Vermont municipal bonds (8.75% top rate).',
      keywords: 'Vermont tax equivalent yield calculator, VT muni bond calculator',
    },
    hero: {
      title: 'Vermont Tax-Equivalent Yield Calculator (2026)',
      description: 'Vermont taxes investment income heavily (8.75%). This calculator shows the taxable yield required to match a <strong>Vermont in-state municipal bond</strong>.',
    },
    whySection: {
      title: 'A Heavy Tax on Passive Income',
      p1: 'Vermont’s top marginal income tax rate is <strong>8.75%</strong>. While often overlooked in national tax discussions, Vermont is a high-tax jurisdiction for portfolio income.',
      p2: 'Combining this with the 3.8% Federal NIIT and the 37% Federal top bracket means more than half of your bond coupon could be lost to taxes without proper planning.',
    },
    example: {
      title: 'Example: Burlington High Earner',
      description: 'A Vermont resident earning <strong>$350,000</strong> and considering a <strong>4.00% VT municipal bond</strong> would need a taxable yield of approximately <strong>7.08%</strong> to break even.',
      income: '$350k',
      muniYield: '4.00%',
      taxableYield: '7.08%',
      takeaway: 'In high-tax states like Vermont, "yield" is not what you earn—it\'s what you keep.',
    },
    faqs: [
       { q: 'Do I pay VT tax on out-of-state bonds?', a: 'Yes. Vermont taxes interest from municipal bonds issued by other states.' }
    ]
  },

  // --- CONNECTICUT ---
  'CT': {
    slug: 'connecticut',
    name: 'Connecticut',
    metadata: {
      title: 'Connecticut Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate TEY for CT muni bonds. Includes "Benefit Recapture" logic for high earners.',
      keywords: 'Connecticut tax equivalent yield calculator, CT muni bond calculator, CT benefit recapture',
    },
    hero: {
      title: 'Connecticut Tax-Equivalent Yield Calculator (2026)',
      description: 'Connecticut has a hidden "Benefit Recapture" tax that hits high earners. This calculator helps you find the true taxable yield required to match a <strong>Connecticut in-state municipal bond</strong>.',
    },
    whySection: {
      title: 'The "Hidden" Flat Tax',
      p1: 'Connecticut’s headline top rate is <strong>6.99%</strong>. However, CT uses a "Benefit Recapture" mechanism where high earners lose the benefit of lower tax brackets as their income rises.',
      p2: 'This effectively creates a flat tax on your entire income, meaning your <em>marginal</em> dollar is taxed fully. Most online calculators miss this nuance.',
    },
    example: {
      title: 'Example: Greenwich High Earner',
      description: 'A Connecticut resident earning <strong>$750,000</strong> and considering a <strong>4.00% CT municipal bond</strong> would need a taxable yield of approximately <strong>6.95%</strong> to break even.',
      income: '$750k',
      muniYield: '4.00%',
      taxableYield: '6.95%',
      takeaway: 'With the SALT cap limiting deductions, avoiding this ~7% state drag is the only risk-free way to boost yield.',
    },
    faqs: [
       { q: 'Do I pay CT tax on out-of-state bonds?', a: 'Yes. Connecticut taxes interest from municipal bonds issued by other states.' }
    ]
  },

  // --- DC (UPDATED) ---
  'DC': {
    slug: 'dc',
    name: 'Washington, DC', // Changed from "District of Columbia"
    metadata: {
      title: 'Washington, DC Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate TEY for Washington, DC municipal bonds. Accounts for the repealed out-of-state bond exemption.',
      keywords: 'Washington DC tax equivalent yield calculator, DC muni bond calculator, Washington DC income tax 2026',
    },
    hero: {
      title: 'Washington, DC Tax-Equivalent Yield Calculator (2026)',
      description: 'DC recently changed its rules: out-of-state bonds are no longer tax-free. This calculator shows the yield required to match a <strong>DC-issued municipal bond</strong>.',
    },
    whySection: {
      title: 'The "Repealed Exemption" Trap',
      p1: 'For years, Washington, DC residents enjoyed tax-free income on municipal bonds from <em>any</em> state. That is no longer true.',
      p2: 'Today, DC only exempts interest from bonds issued by the District of Columbia. If you buy a bond from Virginia or Maryland, you owe DC income tax (up to 10.75%).',
    },
    example: {
      title: 'Example: DC Resident',
      description: 'A Washington, DC resident earning <strong>$600,000</strong> facing the 10.75% top rate and considering a <strong>4.00% DC municipal bond</strong> would need a taxable yield of approximately <strong>7.21%</strong> to break even.',
      income: '$600k',
      muniYield: '4.00%',
      taxableYield: '7.21%',
      takeaway: 'Buying a Virginia bond instead would likely trigger a surprise tax bill. Sticking to DC paper is now essential for tax efficiency.',
    },
    faqs: [
       { q: 'Can I still buy MD or VA bonds tax-free?', a: 'No. Unless they are specific bonds issued by certain regional authorities (like WMATA), bonds from Maryland or Virginia are now generally taxable for DC residents.' }
    ]
  };
