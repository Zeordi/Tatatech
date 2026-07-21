const placeholder = (seed, w = 1200, h = 675) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const projectsData = [
  {
    id: '1',
    slug: 'nova-commerce-rebuild',
    title: 'Nova Commerce Rebuild',
    category: 'Web',
    client: 'Nova Retail',
    industry: 'E-commerce',
    year: 2025,
    result: '+340% sales',
    image: placeholder('1556742049-0cfed4f6a45d'),
    challenge:
      'Nova’s legacy storefront was slow, inaccessible, and leaking conversions on mobile.',
    solution:
      'We redesigned the entire purchase journey, rebuilt the storefront in React, and optimized checkout for sub-2s loads.',
    results: [
      { label: 'Sales lift', value: '+340%' },
      { label: 'Mobile conversion', value: '+128%' },
      { label: 'Page load', value: '1.8s' },
    ],
    gallery: [
      placeholder('1460925895917-afdab827c52f'),
      placeholder('1556742111-a301076d9d18'),
    ],
    services: ['Web Design', 'Software Development'],
    testimonial: {
      quote:
        'TATATECH rebuilt our storefront and the numbers speak for themselves. Our best quarter ever.',
      author: 'Maya Chen',
      role: 'VP Growth, Nova Retail',
    },
  },
  {
    id: '2',
    slug: 'harbor-lms-platform',
    title: 'Harbor LMS Platform',
    category: 'LMS',
    client: 'Harbor Education',
    industry: 'EdTech',
    year: 2024,
    result: '12k learners onboarded',
    image: placeholder('1522202176988-66273c2fd55f'),
    challenge:
      'Harbor needed a branded LMS to replace a patchwork of tools and fragmented learner data.',
    solution:
      'We delivered a custom LMS with course authoring, assessments, certificates, and SSO for partner schools.',
    results: [
      { label: 'Learners', value: '12k+' },
      { label: 'Course completion', value: '+62%' },
      { label: 'Support tickets', value: '-45%' },
    ],
    gallery: [
      placeholder('1516321318423-f06f85e504b3'),
      placeholder('1434030216411-0b793f4b4173'),
    ],
    services: ['LMS & Education', 'Software Development'],
    testimonial: {
      quote:
        'Our instructors finally have one place for everything. Learners love the experience.',
      author: 'Jordan Blake',
      role: 'COO, Harbor Education',
    },
  },
  {
    id: '3',
    slug: 'apex-cloud-migration',
    title: 'Apex Cloud Migration',
    category: 'Infrastructure',
    client: 'Apex Logistics',
    industry: 'Logistics',
    year: 2025,
    result: '99.99% uptime',
    image: placeholder('1451187580459-43490279c0fa'),
    challenge:
      'On-prem systems were brittle, costly, and unable to support peak shipping seasons.',
    solution:
      'We migrated workloads to AWS with infrastructure-as-code, autoscaling, and a hardened security baseline.',
    results: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Infra cost', value: '-32%' },
      { label: 'Deploy time', value: '12 min' },
    ],
    gallery: [
      placeholder('1558494949-ef010cbdcc31'),
      placeholder('1518770660439-4636190af475'),
    ],
    services: ['IT Infrastructure'],
    testimonial: {
      quote:
        'Peak season used to scare us. Now we scale without drama.',
      author: 'Sam Okonkwo',
      role: 'CTO, Apex Logistics',
    },
  },
  {
    id: '4',
    slug: 'pulse-nfc-rollout',
    title: 'Pulse NFC Rollout',
    category: 'NFC',
    client: 'Pulse Agency',
    industry: 'Marketing',
    year: 2024,
    result: '3× lead capture',
    image: placeholder('1556745753-b411f2ba5dc4'),
    challenge:
      'Sales reps wasted leads on paper cards that never made it into the CRM.',
    solution:
      'We designed branded NFC cards with tap-to-share profiles and automatic CRM sync.',
    results: [
      { label: 'Lead capture', value: '3×' },
      { label: 'CRM sync rate', value: '98%' },
      { label: 'Cards issued', value: '850' },
    ],
    gallery: [
      placeholder('1556742049-0cfed4f6a45d'),
      placeholder('1563986768609-322da13575f3'),
    ],
    services: ['NFC Digital Cards'],
    testimonial: {
      quote: 'Networking events finally feed our pipeline automatically.',
      author: 'Priya Nair',
      role: 'Head of Sales, Pulse Agency',
    },
  },
  {
    id: '5',
    slug: 'brightpath-ops-suite',
    title: 'BrightPath Ops Suite',
    category: 'Software',
    client: 'BrightPath Health',
    industry: 'Healthcare',
    year: 2025,
    result: '-40% admin time',
    image: placeholder('1576091160399-112ba8d25d1d'),
    challenge:
      'Clinical ops teams were buried in spreadsheets and manual scheduling.',
    solution:
      'We built a secure ops suite for scheduling, staffing, and compliance reporting.',
    results: [
      { label: 'Admin time', value: '-40%' },
      { label: 'Scheduling errors', value: '-70%' },
      { label: 'Staff adoption', value: '94%' },
    ],
    gallery: [
      placeholder('1581091226825-a6a2a5aee158'),
      placeholder('1551288049-bebda4e38f71'),
    ],
    services: ['Software Development', 'IT Infrastructure'],
    testimonial: {
      quote: 'The suite paid for itself in the first quarter.',
      author: 'Dr. Elena Ruiz',
      role: 'Operations Director, BrightPath',
    },
  },
  {
    id: '6',
    slug: 'summit-growth-engine',
    title: 'Summit Growth Engine',
    category: 'Web',
    client: 'Summit Finance',
    industry: 'FinTech',
    year: 2024,
    result: '+210% MQLs',
    image: placeholder('1553729459-efe44fa36e78'),
    challenge:
      'Summit’s content site ranked poorly and failed to convert high-intent visitors.',
    solution:
      'We rebuilt SEO foundations, launched conversion-focused landing pages, and wired attribution end-to-end.',
    results: [
      { label: 'MQLs', value: '+210%' },
      { label: 'Organic traffic', value: '+185%' },
      { label: 'Cost per lead', value: '-38%' },
    ],
    gallery: [
      placeholder('1460925895917-afdab827c52f'),
      placeholder('1432888498266-38ffec5c2c3a'),
    ],
    services: ['Digital Marketing', 'Web Design'],
    testimonial: {
      quote: 'Pipeline quality improved as much as volume. Exactly what we needed.',
      author: 'Chris Adler',
      role: 'CMO, Summit Finance',
    },
  },
];
