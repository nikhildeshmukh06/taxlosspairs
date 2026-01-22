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
    description: string;
    income: string;
    muniYield: string;
    taxableYield: string;
    takeaway: string;
  };
  faqs: {
    q: string;
    a: string;
  }[];
}

export const STATE_CONTENT: Record<string, StateContent> = {
  // --- CALIFORNIA ---
  'california': {
    slug: 'california',
    name: 'California',
    metadata: {
      title: 'California Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate 2026 California tax-equivalent yield. Accounts for the 13.3% top rate and new OBBBA SALT cap phase-outs.',
      keywords: 'California TEY calculator, CA muni bond tax 2026, California SALT cap 2026, double tax free bonds CA',
    },
    hero: {
      title: 'California Tax-Equivalent Yield Calculator (2026)',
      description: 'Find the taxable yield required to match a <strong>California in-state municipal bond</strong>, exempt from Federal, NIIT, and CA income tax under 2026 OBBBA guidelines.',
    },
    whySection: {
      title: 'Strategic Insight: The SALT Floor Reality',
      p1: 'While the 2026 SALT cap has risen to $40,400, California’s 13.3% top marginal rate means high earners exhaust this deduction almost immediately. For those with a MAGI over $505,000, the OBBBA phase-out can reduce your deduction back to a permanent **$10,000 floor**.',
      p2: 'Because the vast majority of your state tax bill remains non-deductible, the tax-exempt status of California municipal bonds represents a pure, un-diluted saving.',
    },
    example: {
      title: 'Example: California High Earner',
      description: 'A married California resident earning <strong>$800,000</strong> considering a <strong>4.50% CA municipal bond</strong> faces a combined tax drag of over 54%.',
      income: '$800,000',
      muniYield: '4.50%',
      taxableYield: '9.80%',
      takeaway: 'To match a 4.5% tax-free yield, a taxable bond would need to pay nearly 10%—a hurdle few corporate bonds can clear in the 2026 market.',
    },
    faqs: [
      { q: 'How is the California tax rate in this calculator determined?', a: 'We use the highest projected 2026 marginal bracket of 13.3% (including the 1% Mental Health Services Surtax) to provide a conservative "ceiling" for high-earner estimation.' },
      { q: 'Do I pay California tax on municipal bonds from other states?', a: 'Yes. California generally taxes interest from municipal bonds issued by any other state (e.g., Texas or New York). To capture the full yield shown here, you must hold California-issued bonds.' },
      { q: 'How does the 2026 SALT cap affect my muni bond savings?', a: 'Under the OBBBA, the federal SALT deduction is capped at $40,400 for 2026. For high earners facing a steep phase-out, the vast majority of your state tax bill is not deductible, making in-state bonds a "pure" saving.' },
      { q: 'Does the 1% Mental Health Services Tax apply to me?', a: 'California applies an additional 1% surtax on taxable income exceeding $1 million. Our calculator automatically includes this (bringing the top rate to 13.3%) when your input income exceeds that threshold.' }
    ]
  },

  // --- NEW YORK CITY ---
  'new-york-city': {
    slug: 'new-york-city',
    name: 'New York City',
    metadata: {
      title: 'NYC Triple Tax-Free Calculator (2026) | TaxLossPairs',
      description: 'Calculate true tax-equivalent yield for NYC residents. Accounts for Federal, NY State, and NYC Local taxes.',
      keywords: 'NYC tax equivalent yield, NYC triple tax free, NYC local income tax 2026, NYC muni bond calculator',
    },
    hero: {
      title: 'NYC Tax-Equivalent Yield Calculator (Triple Tax-Free)',
      description: 'NYC residents face a unique "Triple Tax" burden. This calculator accounts for the <strong>NYC Local Income Tax</strong> (up to 3.876%) to show the value of triple-exempt bonds.',
    },
    whySection: {
      title: 'Strategic Insight: The Global Yield Benchmark',
      p1: 'Living in NYC creates a unique "Triple Tax" burden (Federal + State + City) totaling nearly <strong>52%</strong>. This makes NYC municipal bonds some of the most sought-after defensive assets globally.',
      p2: 'For a Manhattan resident, a "Triple-Tax-Free" bond is the only defensive asset that escapes all three levels of government erosion, providing a yield that taxable alternatives cannot replicate.',
    },
    example: {
      title: 'Example: Manhattan High Earner',
      description: 'A Tribeca resident earning <strong>$1.5M</strong> faces the full force of the triple tax. A <strong>4.00% NYC bond</strong> provides a massive advantage over taxable options.',
      income: '$1.5M',
      muniYield: '4.00%',
      taxableYield: '8.86%',
      takeaway: 'To keep 4% in your pocket, a NYC resident would need a taxable investment to pay nearly 9%.',
    },
    faqs: [
      { q: 'How is the NYC rate determined?', a: 'We combine the 10.9% top New York State bracket with the 3.876% NYC local income tax to provide a conservative "ceiling" for estimation.' },
      { q: 'Do I pay NYC tax on NY State bonds?', a: 'Generally, no. NY State bonds are exempt from City tax. However, bonds from other states (like Florida) are fully taxable by both NY State and NYC.' },
      { q: 'How does the 2026 SALT cap affect NYC residents?', a: 'With a combined tax rate over 14%, most NYC investors far exceed the $40,400 SALT cap, making triple-tax-exempt income their only "leak-proof" yield.' },
      { q: 'What is the difference between NYC GO and NYC TFA bonds?', a: 'General Obligation (GO) bonds are backed by city taxing power, while Transitional Finance Authority (TFA) bonds are backed by specific tax revenues. Both are typically triple-tax-free.' }
    ]
  },

  // --- NEW JERSEY ---
  'new-jersey': {
    slug: 'new-jersey',
    name: 'New Jersey',
    metadata: {
      title: 'New Jersey TEY Calculator (2026) | TaxLossPairs',
      description: 'Calculate NJ tax-equivalent yield using the 10.75% Millionaire Tax and 2026 OBBBA Federal rates.',
      keywords: 'NJ muni bond calculator, New Jersey tax equivalent yield, NJ millionaire tax 2026',
    },
    hero: {
      title: 'New Jersey Tax-Equivalent Yield Calculator (2026)',
      description: 'Calculate the taxable yield required to match a <strong>New Jersey in-state municipal bond</strong> using 2026 marginal brackets.',
    },
    whySection: {
      title: 'Strategic Insight: Defeating the "Millionaire Tax"',
      p1: 'With New Jersey’s 10.75% marginal rate applying to income over $1 million, high earners lose over <strong>50%</strong> of taxable interest to combined taxes.',
      p2: 'Because NJ state taxes are largely non-deductible under 2026 SALT rules, NJ-specific municipal bonds are the primary mechanism for preserving wealth at the highest end of the income spectrum.',
    },
    example: {
      title: 'Example: NJ High Earner',
      description: 'An investor in Jersey City earning <strong>$1.2M</strong> considering a <strong>4.00% NJ muni bond</strong> would see significant savings.',
      income: '$1.2M',
      muniYield: '4.00%',
      taxableYield: '8.26%',
      takeaway: 'A 4.00% tax-free yield is equivalent to an 8.26% taxable return—a high bar for investment-grade corporate debt.',
    },
    faqs: [
      { q: 'How is the 10.75% NJ rate determined?', a: 'We use the highest projected 2026 marginal rate of 10.75% (for income over $1 million) to provide a conservative "ceiling" for estimation.' },
      { q: 'Do I pay NJ tax on municipal bonds from other states?', a: 'Yes. New Jersey taxes interest income from any municipal bond issued outside of its borders.' },
      { q: 'How does the 2026 SALT cap affect NJ muni bond savings?', a: 'Under the OBBBA, the $40,400 SALT cap phases down starting at $505,000 MAGI, ensuring the tax-free status of in-state bonds remains a "pure" saving.' },
      { q: 'Does NJ tax Social Security or pension income?', a: 'NJ generally does not tax Social Security. However, it does tax interest from taxable bonds while exempting NJ-specific municipal interest.' }
    ]
  },

  // --- MASSACHUSETTS ---
  'massachusetts': {
    slug: 'massachusetts',
    name: 'Massachusetts',
    metadata: {
      title: 'Massachusetts TEY Calculator (2026) | TaxLossPairs',
      description: 'Calculate MA tax-equivalent yield including the 4% Fair Share surtax and 5% flat tax.',
      keywords: 'MA muni bond calculator, Massachusetts Fair Share Tax, MA tax equivalent yield 2026',
    },
    hero: {
      title: 'Massachusetts Tax-Equivalent Yield Calculator (2026)',
      description: 'Includes the 4% "Fair Share" surtax to show the true value of <strong>MA in-state municipal bonds</strong> for high earners.',
    },
    whySection: {
      title: 'Strategic Insight: The 9% State Shield',
      p1: 'The "Fair Share" surtax adds a permanent 4% drag for millionaires on top of the 5% flat tax. In-state Massachusetts bonds shield high earners from this entire <strong>9% total state drag</strong>.',
      p2: 'Choosing in-state MA bonds provides an immediate 9% "bonus" compared to taxable alternatives like CDs or Corporate bonds.',
    },
    example: {
      title: 'Example: Boston Millionaire',
      description: 'A resident earning <strong>$1.5M</strong> and considering a <strong>4.00% MA muni bond</strong> needs a high taxable return to compete.',
      income: '$1.5M',
      muniYield: '4.00%',
      taxableYield: '7.97%',
      takeaway: 'Choosing in-state MA bonds provides an immediate 9% "bonus" compared to taxable alternatives like CDs or Corporate bonds.',
    },
    faqs: [
      { q: 'How is the 9% Massachusetts tax rate determined?', a: 'We use the combined 5% flat tax and 4% surtax (for income over $1 million) to provide a conservative "ceiling" for estimation.' },
      { q: 'Do I pay MA tax on municipal bonds from other states?', a: 'Yes. Massachusetts taxes interest from municipal bonds issued by other states at the full combined rate (up to 9%).' },
      { q: 'How does the 2026 SALT cap affect MA muni bond savings?', a: 'The $40,400 cap phase-out means millionaires cannot deduct most of their 9% state tax, making tax-free income highly efficient.' },
      { q: 'Does the 4% surtax apply to capital gains?', a: 'Yes. The 4% "Fair Share" surtax applies to all taxable income over $1M, including gains from selling bonds.' }
    ]
  },

  // --- OREGON ---
  'oregon': {
    slug: 'oregon',
    name: 'Oregon',
    metadata: {
      title: 'Oregon Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate Oregon TEY. Accounts for the 9.9% rate that hits mass-affluent professionals.',
      keywords: 'Oregon TEY calculator, OR muni bond tax, Oregon tax brackets 2026',
    },
    hero: {
      title: 'Oregon Tax-Equivalent Yield Calculator (2026)',
      description: 'Oregon’s 9.9% rate hits much earlier than other states. Find your taxable equivalent for <strong>Oregon muni bonds</strong>.',
    },
    whySection: {
      title: 'Strategic Insight: The "Early Trigger" Effect',
      p1: 'Oregon’s top 9.9% tax rate hits single filers at $125k and couples at $250k—far earlier than the $1M thresholds in other high-tax states.',
      p2: 'This makes municipal bonds a critical preservation tool for "mass affluent" professionals, due to the high state tax drag on standard taxable bonds.',
    },
    example: {
      title: 'Example: Portland Professional',
      description: 'A single resident earning <strong>$260,000</strong> falls into the 9.9% bracket immediately.',
      income: '$260k',
      muniYield: '4.00%',
      taxableYield: '8.11%',
      takeaway: 'In Oregon, you don\'t need to be a millionaire to see massive taxable equivalent yields from tax-free income.',
    },
    faqs: [
      { q: 'How is the Oregon tax rate in this calculator determined?', a: 'We use the 9.9% top marginal rate that applies to most high-earning professionals in the state.' },
      { q: 'Do I pay OR tax on municipal bonds from other states?', a: 'Yes. Oregon taxes interest income from any municipal bond issued outside of its borders.' },
      { q: 'How does the 2026 SALT cap affect Oregon muni bond savings?', a: 'The $40,400 cap provides relief, but many Oregon families quickly exceed this via combined income and property taxes.' },
      { q: 'Why is the TEY so high for mid-career Oregonians?', a: 'Because the 9.9% rate kicks in at relatively low income levels, Oregon munis provide a massive "tax shield" earlier in a career.' }
    ]
  },

  // --- MINNESOTA ---
  'minnesota': {
    slug: 'minnesota',
    name: 'Minnesota',
    metadata: {
      title: 'Minnesota Tax-Equivalent Yield Calculator (2026) | TaxLossPairs',
      description: 'Calculate Minnesota TEY. Accounts for the 9.85% Fourth Tier bracket.',
      keywords: 'MN muni bond calculator, Minnesota tax equivalent yield, MN Fourth Tier 2026',
    },
    hero: {
      title: 'Minnesota Tax-Equivalent Yield Calculator (2026)',
      description: 'Find the taxable yield required to match a <strong>Minnesota in-state municipal bond</strong>.',
    },
    whySection: {
      title: 'Strategic Insight: Yield Erosion Defense',
      p1: 'A taxable bond yielding 6% is actually only paying a high-earning Minnesotan about 3% after all taxes.',
      p2: 'The 9.85% "Fourth Tier" state tax is a massive unrecoverable cost. In-state municipal bonds are specifically designed to bypass this erosion.',
    },
    example: {
      title: 'Example: Minneapolis Resident',
      description: 'A married resident earning <strong>$400,000</strong> considering a <strong>4.00% MN bond</strong>.',
      income: '$400k',
      muniYield: '4.00%',
      taxableYield: '8.11%',
      takeaway: 'By using MN-specific munis, you avoid "donating" nearly 10% of your total yield to the state government.',
    },
    faqs: [
      { q: 'How is the Minnesota tax rate in this calculator determined?', a: 'We use the highest projected 2026 marginal rate of 9.85% (Fourth Tier) to provide a conservative ceiling.' },
      { q: 'Do I pay MN tax on municipal bonds from other states?', a: 'Yes. Minnesota taxes interest from municipal bonds issued by any other state.' },
      { q: 'How does the 2026 SALT cap affect MN muni bond savings?', a: 'The $40,400 cap phase-out for high earners ensures the tax-free status of in-state bonds remains a "pure" saving.' },
      { q: 'Is this applicable to MN-specific ETFs?', a: 'Yes. If you hold a fund composed of Minnesota debt, the interest is generally exempt from both Federal and MN tax.' }
    ]
  },

  // --- CONNECTICUT ---
  'connecticut': {
    slug: 'connecticut',
    name: 'Connecticut',
    metadata: {
      title: 'Connecticut TEY Calculator (2026) | TaxLossPairs',
      description: 'Calculate CT tax-equivalent yield. Accounts for the 6.99% Benefit Recapture.',
      keywords: 'CT muni bond calculator, Connecticut tax equivalent yield, CT benefit recapture 2026',
    },
    hero: {
      title: 'Connecticut Tax-Equivalent Yield Calculator (2026)',
      description: 'Accounts for CT’s unique "Benefit Recapture" to show true yield for <strong>CT muni bonds</strong>.',
    },
    whySection: {
      title: 'Strategic Insight: The Hidden Flat Tax',
      p1: 'Connecticut’s "Benefit Recapture" effectively claws back lower tax bracket benefits for high earners, creating a higher marginal tax rate than headlines imply.',
      p2: 'Since the SALT cap limits federal deductions, avoiding this ~7% state drag is one of the only risk-free ways to boost your total fixed-income return.',
    },
    example: {
      title: 'Example: Greenwich Resident',
      description: 'A resident earning <strong>$750,000</strong> considering a <strong>4.00% CT municipal bond</strong>.',
      income: '$750k',
      muniYield: '4.00%',
      taxableYield: '7.66%',
      takeaway: 'Avoiding the ~7% state tax drag is the most direct way to boost real-world yield for Greenwich investors.',
    },
    faqs: [
      { q: 'How is the Connecticut tax rate in this calculator determined?', a: 'We approximate the effective top 6.99% marginal rate, accounting for "Benefit Recapture" clawbacks.' },
      { q: 'Do I pay CT tax on municipal bonds from other states?', a: 'Yes. Connecticut taxes interest from municipal bonds issued by any other state.' },
      { q: 'How does the 2026 SALT cap affect CT muni bond savings?', a: 'The expanded $40,400 cap phases down starting at $505,000 MAGI, making CT muni exemption critical for top earners.' },
      { q: 'Why use CT munis vs. Treasuries?', a: 'Treasuries are state-exempt but federally taxable. CT munis are exempt from both, providing a significantly higher TEY.' }
    ]
  },

  // --- WASHINGTON, DC ---
  'dc': {
    slug: 'dc',
    name: 'Washington, DC',
    metadata: {
      title: 'Washington DC TEY Calculator (2026) | TaxLossPairs',
      description: 'Calculate DC tax-equivalent yield. Accounts for the repealed out-of-state exemption.',
      keywords: 'DC muni bond calculator, Washington DC TEY, DC tax-free bonds 2026',
    },
    hero: {
      title: 'Washington, DC Tax-Equivalent Yield Calculator (2026)',
      description: 'DC rules have changed. Find the yield required to match a <strong>DC-issued municipal bond</strong>.',
    },
    whySection: {
      title: 'Strategic Insight: The Reciprocity Trap',
      p1: 'DC’s repeal of universal tax-exemption for out-of-state bonds means residents can no longer "muni-shop" across the nation tax-free.',
      p2: 'Residents must now focus specifically on DC-issued debt or regional authorities to capture the full <strong>10.75% local tax benefit</strong>.',
    },
    example: {
      title: 'Example: DC Resident',
      description: 'A resident earning <strong>$600,000</strong> considering a <strong>4.00% DC muni bond</strong>.',
      income: '$600k',
      muniYield: '4.00%',
      taxableYield: '8.26%',
      takeaway: 'Sticking to DC-issued paper is now essential to avoid losing nearly 11% of your yield to local taxes.',
    },
    faqs: [
      { q: 'How is the DC tax rate in this calculator determined?', a: 'We use the top marginal rate of 10.75% for taxable income exceeding $1 million.' },
      { q: 'Do I pay DC tax on municipal bonds from other states?', a: 'Yes. DC repealed its universal exemption; interest from MD or VA bonds is now generally taxable.' },
      { q: 'How does the 2026 SALT cap affect DC muni bond savings?', a: 'The federal cap rose to $40,400 but phases down for high earners, keeping DC tax avoidance a high priority.' },
      { q: 'Which bonds ARE tax-free for DC?', a: 'Only bonds specifically issued by the District of Columbia or certain regional authorities like WMATA.' }
    ]
  },

  // --- HAWAII ---
  'hawaii': {
    slug: 'hawaii',
    name: 'Hawaii',
    metadata: {
      title: 'Hawaii TEY Calculator (2026) | TaxLossPairs',
      description: 'Calculate HI tax-equivalent yield with the 11% top marginal rate.',
      keywords: 'Hawaii muni bond calculator, HI tax equivalent yield, Hawaii income tax 2026',
    },
    hero: {
      title: 'Hawaii Tax-Equivalent Yield Calculator (2026)',
      description: 'Find the taxable yield required to match a <strong>Hawaii in-state municipal bond</strong>.',
    },
    whySection: {
      title: 'Strategic Insight: The Paradise Tax',
      p1: 'At 11%, Hawaii’s top rate is one of the highest in the nation. Because state taxes are largely non-deductible under 2026 rules, this is a massive unrecoverable cost.',
      p2: 'This 11% state drag makes tax-free bonds almost mandatory for high-bracket Honolulu residents looking to preserve yield.',
    },
    example: {
      title: 'Example: Honolulu High Earner',
      description: 'A resident earning <strong>$450,000</strong> considering a <strong>4.00% HI muni bond</strong>.',
      income: '$450k',
      muniYield: '4.00%',
      taxableYield: '8.30%',
      takeaway: 'The 11% state tax drag makes tax-free bonds almost mandatory for high-bracket Honolulu residents.',
    },
    faqs: [
      { q: 'How is the Hawaii tax rate in this calculator determined?', a: 'We use the 11% top marginal rate—the highest in the U.S. outside of California and NYC.' },
      { q: 'Do I pay HI tax on municipal bonds from other states?', a: 'Yes. Hawaii taxes interest income from municipal bonds issued by any other state.' },
      { q: 'How does the 2026 SALT cap affect HI muni bond savings?', a: 'The expanded $40,400 cap phases down starting at $505k MAGI, making HI muni exemption critical for top earners.' },
      { q: 'Are HI munis triple tax-free?', a: 'No. Hawaii does not have a separate city income tax; however, the 11% state exemption provides significant TEY value.' }
    ]
  },

  // --- VERMONT ---
  'vermont': {
    slug: 'vermont',
    name: 'Vermont',
    metadata: {
      title: 'Vermont TEY Calculator (2026) | TaxLossPairs',
      description: 'Calculate Vermont TEY. Accounts for the 8.75% top marginal rate.',
      keywords: 'Vermont muni bond calculator, VT tax equivalent yield, VT income tax 2026',
    },
    hero: {
      title: 'Vermont Tax-Equivalent Yield Calculator (2026)',
      description: 'Find the taxable yield required to match a <strong>Vermont in-state municipal bond</strong>.',
    },
    whySection: {
      title: 'Strategic Insight: Passive Income Drag',
      p1: 'Vermont is a high-tax jurisdiction for portfolio income, with a top rate of 8.75%. Combining this with federal brackets means high earners lose over half their interest to taxes.',
      p2: 'In-state bonds are a key preservation tool to protect your yield from one of the nation\'s steepest passive income tax burdens.',
    },
    example: {
      title: 'Example: Burlington Resident',
      description: 'A resident earning <strong>$350,000</strong> considering a <strong>4.00% VT muni bond</strong>.',
      income: '$350k',
      muniYield: '4.00%',
      taxableYield: '7.93%',
      takeaway: 'In high-tax Vermont, "yield" is not what you earn—it\'s what you keep.',
    },
    faqs: [
      { q: 'How is the Vermont tax rate in this calculator determined?', a: 'We use the top marginal 2026 bracket of 8.75% to provide a conservative estimate for high earners.' },
      { q: 'Do I pay VT tax on municipal bonds from other states?', a: 'Yes. Vermont generally taxes interest from municipal bonds issued outside of the state.' },
      { q: 'How does the 2026 SALT cap affect VT muni bond savings?', a: 'The $40,400 cap provides a higher ceiling, but high earners still face a phase-out to the $10,000 floor.' },
      { q: 'Does VT tax all out-of-state muni interest?', a: 'Yes. To be exempt at both levels, you must hold bonds specifically issued by Vermont entities.' }
    ]
  },

  // --- NEW YORK (STATE) ---
  'new-york': {
    slug: 'new-york',
    name: 'New York',
    metadata: {
      title: 'New York State TEY Calculator (2026) | TaxLossPairs',
      description: 'Calculate NY State TEY for residents outside the five boroughs.',
      keywords: 'NY muni bond calculator, New York tax equivalent yield, NY double tax free 2026',
    },
    hero: {
      title: 'New York State Tax-Equivalent Yield Calculator (2026)',
      description: 'For NY residents outside NYC. Find the yield for <strong>NY in-state municipal bonds</strong>.',
    },
    whySection: {
      title: 'Strategic Insight: The Double Tax-Free Advantage',
      p1: 'While NYC residents capture "Triple" savings, other NY state residents capture significant value by avoiding the 10.9% state tax.',
      p2: 'Since NY state taxes aren\'t federally deductible (SALT cap), this 10.9% saving is purely additive to your federal yield.',
    },
    example: {
      title: 'Example: Westchester Resident',
      description: 'A resident earning <strong>$800,000</strong> considering a <strong>4.25% NY bond</strong>.',
      income: '$800k',
      muniYield: '4.25%',
      taxableYield: '8.80%',
      takeaway: 'To match a 4.25% NY tax-free yield, a taxable bond would need to pay nearly 9%.',
    },
    faqs: [
      { q: 'How is the NY State tax rate in this calculator determined?', a: 'We use the highest projected marginal tier of 10.9% to provide a conservative ceiling.' },
      { q: 'Do I pay NY tax on municipal bonds from other states?', a: 'Yes. New York State taxes interest income from any municipal bond issued outside the state.' },
      { q: 'How does the 2026 SALT cap affect NY muni bond savings?', a: 'The $40,400 cap phases down to $10k for earners over $505k, keeping NY muni exemption essential.' },
      { q: 'Are NY bonds Triple Tax-Free for me?', a: 'Only if you live within the five boroughs of NYC. Elsewhere, they are Double Tax-Free.' }
    ]
  }
};
