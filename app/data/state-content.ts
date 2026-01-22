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
      p1: 'While the 2026 SALT cap has risen to $40,400, California’s 13.3% top marginal rate means high earners exhaust this deduction almost immediately. For those with a MAGI over $505,000, the OBBBA phase-out can reduce your deduction back to a $10,000 floor.',
      p2: 'Because the vast majority of your state tax bill remains non-deductible at the federal level, the tax-free status of California municipal bonds represents a pure, un-diluted saving that taxable bonds cannot match.',
    },
    example: {
      title: 'Example: California High Earner',
      description: 'A married California resident earning <strong>$800,000</strong> considering a <strong>4.50% CA municipal bond</strong> faces a combined tax drag of over 54%.',
      income: '$800,000',
      muniYield: '4.50%',
      taxableYield: '9.80%',
      takeaway: 'To match a 4.5% tax-free yield, you would need a taxable bond paying nearly 10%. In 2026, very few high-grade corporate bonds offer this return.',
    },
    faqs: [
      { q: 'How is the 13.3% rate calculated?', a: 'It combines the 12.3% base top marginal rate with the 1% Mental Health Services Surtax for taxable income exceeding $1 million.' },
      { q: 'Do I pay CA tax on out-of-state bonds?', a: 'Yes. California taxes interest from municipal bonds issued by other states (e.g., Texas or New York).' },
      { q: 'Is this applicable to CA-only Muni ETFs?', a: 'Yes. If you hold a California-specific fund, the interest is generally 100% exempt from both Federal and CA state taxes.' },
      { q: 'What about the Alternative Minimum Tax (AMT)?', a: 'This calculator assumes "AMT-Free" bonds. If you purchase Private Activity Bonds subject to the AMT, your yield may be lower.' }
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
      p1: 'Living in NYC creates a combined tax drag of nearly <strong>52%</strong> (Federal + NY State + NYC City). This makes NYC municipal bonds some of the most sought-after fixed-income assets in the world.',
      p2: 'For a Manhattan resident, a "Triple-Tax-Free" bond is the only defensive asset that escapes all three levels of government erosion, providing a yield that taxable CDs and Corporates cannot replicate.',
    },
    example: {
      title: 'Example: Manhattan High Earner',
      description: 'A Tribeca resident earning <strong>$1.5M</strong> faces the full force of the triple tax. A <strong>4.00% NYC bond</strong> provides a massive advantage over taxable options.',
      income: '$1.5M',
      muniYield: '4.00%',
      taxableYield: '8.86%',
      takeaway: 'To keep 4% in your pocket, a taxable investment would need to pay you nearly 9%.',
    },
    faqs: [
      { q: 'What is the NYC local tax rate?', a: 'The NYC local income tax tops out at 3.876% for the highest earners in 2026.' },
      { q: 'Are out-of-state bonds taxed by the city?', a: 'Yes. Interest from bonds issued outside of New York is fully taxable by both New York State and New York City.' },
      { q: 'What is the difference between NYC GO and TFA bonds?', a: 'Both are typically triple-tax-free; GO bonds are backed by city taxing power, while TFA bonds are backed by specific tax revenues.' },
      { q: 'Does this include the OBBBA AMT changes?', a: 'Yes, it assumes AMT-free bonds. The OBBBA adjusted AMT thresholds, so verify your specific status with a tax pro.' }
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
      p2: 'Because NJ state taxes are largely non-deductible under 2026 SALT rules, NJ-specific municipal bonds are the primary mechanism for preserving wealth at the top end of the income spectrum.',
    },
    example: {
      title: 'Example: NJ High Earner',
      description: 'An investor in Jersey City earning <strong>$1.2M</strong> considering a <strong>4.00% NJ muni bond</strong> would see significant savings.',
      income: '$1.2M',
      muniYield: '4.00%',
      taxableYield: '8.26%',
      takeaway: 'Few corporate bonds offer 8.26% with the same credit quality as a high-grade NJ muni.',
    },
    faqs: [
      { q: 'How is the 10.75% rate applied?', a: 'It is a marginal rate applying to NJ taxable income exceeding $1 million.' },
      { q: 'Do out-of-state bonds get taxed in NJ?', a: 'Yes. New Jersey taxes interest from municipal bonds issued by any other state.' },
      { q: 'Does NJ tax Social Security?', a: 'No, but it does tax interest from taxable bonds (Corporates/CDs) while exempting NJ muni interest.' },
      { q: 'What is the 2026 NJ SALT cap?', a: 'The Federal SALT cap is $40,400, but NJ residents often pay much more, making muni bonds essential for tax efficiency.' }
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
      p1: 'The "Fair Share" surtax creates a permanent 4% additional drag for millionaires, effectively making the state tax burden <strong>9%</strong> for taxable interest.',
      p2: 'For high earners, choosing in-state MA bonds is equivalent to an immediate 9% "bonus" compared to taxable alternatives like CDs or Corporate bonds.',
    },
    example: {
      title: 'Example: Boston Millionaire',
      description: 'A resident earning <strong>$1.5M</strong> and considering a <strong>4.00% MA muni bond</strong> needs a high taxable return to compete.',
      income: '$1.5M',
      muniYield: '4.00%',
      taxableYield: '7.97%',
      takeaway: 'The "Millionaire Tax" has fundamentally changed the math for fixed income in the Bay State.',
    },
    faqs: [
      { q: 'How does the 9% rate work?', a: 'It combines the standard 5% flat tax with the 4% surtax on income exceeding $1 million.' },
      { q: 'Are MA bonds exempt from the surtax?', a: 'Yes. In-state MA bonds escape both the 5% flat tax and the 4% surtax.' },
      { q: 'Does the surtax apply to capital gains?', a: 'Yes. The 4% surtax applies to all taxable income over $1M, including bond sale gains.' },
      { q: 'Are out-of-state munis taxed in MA?', a: 'Yes. Massachusetts taxes out-of-state muni interest at the full combined 9% rate for high earners.' }
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
      p1: 'Oregon’s top 9.9% rate is unique because it hits single filers at $125k and couples at $250k—far earlier than the $1M thresholds in CA or NJ.',
      p2: 'This makes municipal bonds a critical preservation tool for "mass affluent" professionals, not just the ultra-wealthy, due to the high state tax drag on standard taxable bonds.',
    },
    example: {
      title: 'Example: Portland Professional',
      description: 'A single resident earning <strong>$260,000</strong> falls into the 9.9% bracket immediately.',
      income: '$260k',
      muniYield: '4.00%',
      taxableYield: '8.11%',
      takeaway: 'In Oregon, you don\'t need to be a millionaire to see massive benefits from tax-free income.',
    },
    faqs: [
      { q: 'Why is the TEY so high for mid-career Oregonians?', a: 'The 9.9% rate starts early, meaning many professionals face a massive tax drag on taxable bonds.' },
      { q: 'Do I pay OR tax on out-of-state bonds?', a: 'Yes. Oregon generally taxes interest from municipal bonds issued outside of the state.' },
      { q: 'Does OR offer a credit for other state taxes?', a: 'Generally not for out-of-state bond interest.' },
      { q: 'Is this calculator updated for OBBBA?', a: 'Yes. It uses 2026 Federal brackets and the expanded SALT cap phase-out logic.' }
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
      takeaway: 'By using MN munis, you avoid "donating" 10% of your yield to the state government.',
    },
    faqs: [
      { q: 'What is the Fourth Tier bracket?', a: 'It is MN\'s highest bracket of 9.85%, applying to single filers over ~$203,150 in 2026.' },
      { q: 'Are out-of-state bonds taxed in MN?', a: 'Yes. Minnesota taxes interest from municipal bonds issued by other states.' },
      { q: 'How do MN Muni ETFs work?', a: 'For national funds, only the MN-issued bond portion is exempt from state tax.' },
      { q: 'Is MN tax deductible federally in 2026?', a: 'Only up to the SALT cap ($40,400), which high earners quickly exceed.' }
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
      p1: 'Connecticut’s "Benefit Recapture" effectively claws back the benefit of lower tax brackets for high earners, creating a higher marginal tax rate.',
      p2: 'Since the SALT cap limits your federal deductions, avoiding this ~7% state drag is one of the only risk-free ways to boost your total fixed-income return.',
    },
    example: {
      title: 'Example: Greenwich Resident',
      description: 'A resident earning <strong>$750,000</strong> considering a <strong>4.00% CT municipal bond</strong>.',
      income: '$750k',
      muniYield: '4.00%',
      taxableYield: '7.66%',
      takeaway: 'At high income levels, CT effectively taxes your marginal interest dollar at the full 6.99%.',
    },
    faqs: [
      { q: 'What is Benefit Recapture?', a: 'It is CT\'s method of phasing out lower brackets for high earners, effectively flat-taxing your income.' },
      { q: 'Are out-of-state munis taxed in CT?', a: 'Yes. Connecticut taxes interest from municipal bonds issued by other states.' },
      { q: 'Why use CT munis vs. Treasuries?', a: 'Treasuries are federally taxable. CT munis are exempt from both federal and state tax.' },
      { q: 'Does this calculator include NIIT?', a: 'Yes, it adds the 3.8% surtax for income over $200k/$250k.' }
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
      p2: 'Residents must now focus exclusively on DC-issued debt or specific regional authorities to capture the full <strong>10.75%</strong> local tax benefit.',
    },
    example: {
      title: 'Example: DC Resident',
      description: 'A resident earning <strong>$600,000</strong> considering a <strong>4.00% DC muni bond</strong>.',
      income: '$600k',
      muniYield: '4.00%',
      taxableYield: '8.26%',
      takeaway: 'Sticking to DC-specific paper is now essential to avoid a surprise 10.75% tax bill.',
    },
    faqs: [
      { q: 'Can I buy MD or VA bonds tax-free?', a: 'Generally, no. Interest from MD or VA bonds is now taxable by the District.' },
      { q: 'Which bonds ARE tax-free for DC?', a: 'Only those specifically issued by the District of Columbia or regional authorities like WMATA.' },
      { q: 'What is the top DC tax rate?', a: 'It is 10.75% for taxable income exceeding $1 million.' },
      { q: 'How does OBBBA affect DC filers?', a: 'It provides a permanent 37% federal cap and an expanded $40,400 SALT cap.' }
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
      p1: 'At 11%, Hawaii’s top rate is one of the highest in the nation. Because state taxes are largely non-deductible (SALT cap), this is a massive unrecoverable cost.',
      p2: 'This 11% state drag makes tax-free bonds almost mandatory for high-bracket Honolulu residents looking to preserve fixed-income yield.',
    },
    example: {
      title: 'Example: Honolulu High Earner',
      description: 'A resident earning <strong>$450,000</strong> considering a <strong>4.00% HI muni bond</strong>.',
      income: '$450k',
      muniYield: '4.00%',
      taxableYield: '8.30%',
      takeaway: 'HI munis offer high taxable equivalent yields with high-grade safety.',
    },
    faqs: [
      { q: 'How high is the HI top rate?', a: 'It is 11%, the highest in the US outside of CA and NYC.' },
      { q: 'Do I pay HI tax on out-of-state bonds?', a: 'Yes. Hawaii taxes interest from municipal bonds issued by other states.' },
      { q: 'Are HI munis triple tax-free?', a: 'No. Hawaii does not have a separate local income tax.' },
      { q: 'What about the NIIT?', a: 'This calculator includes the 3.8% NIIT for investment income above thresholds.' }
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
      p1: 'Vermont is a high-tax jurisdiction for portfolio income, with a top rate of 8.75%.',
      p2: 'Combining this with the 37% Federal bracket and 3.8% NIIT means you lose over half your interest to taxes. In-state bonds are a key preservation tool.',
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
      { q: 'What is the VT top rate?', a: 'It is 8.75% for the highest income earners in 2026.' },
      { q: 'Are out-of-state bonds taxed?', a: 'Yes. Vermont taxes interest from municipal bonds issued outside of the state.' },
      { q: 'Does VT tax bond capital gains?', a: 'Yes, gains are taxable, but in-state bond interest is exempt.' },
      { q: 'Does this use 2026 Federal brackets?', a: 'Yes, it is fully updated for OBBBA rates.' }
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
      p1: 'While NYC residents get "Triple" savings, other NY state residents still capture significant "Double" tax-free value by avoiding the 10.9% state tax.',
      p2: 'Because NY state taxes aren\'t federally deductible (SALT cap), this 10.9% saving is purely additive to your federal yield.',
    },
    example: {
      title: 'Example: Westchester Resident',
      description: 'A resident earning <strong>$800,000</strong> considering a <strong>4.25% NY bond</strong>.',
      income: '$800k',
      muniYield: '4.25%',
      taxableYield: '8.80%',
      takeaway: 'Finding safe corporate bonds yielding nearly 9% is difficult in 2026.',
    },
    faqs: [
      { q: 'Is this different from the NYC calculator?', a: 'Yes. This excludes the NYC local tax for residents outside the five boroughs.' },
      { q: 'Does this use the 10.9% bracket default?', a: 'Yes, it assumes the highest marginal tier for conservative estimation.' },
      { q: 'Are out-of-state munis taxed?', a: 'Yes. NY State taxes interest from bonds issued in any other state.' },
      { q: 'How does OBBBA affect NY filers?', a: 'It keeps the top federal rate at 37% and expands the SALT cap phase-out.' }
    ]
  }
};
