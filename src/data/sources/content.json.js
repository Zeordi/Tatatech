export const testimonialsData = [
  {
    id: '1',
    quote:
      'TATATECH feels like an extension of our team. Fast delivery, clean code, and zero drama.',
    name: 'Maya Chen',
    role: 'VP Growth, Nova Retail',
    initials: 'MC',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'From infrastructure to product UI, they handled everything. Our uptime has never been better.',
    name: 'Sam Okonkwo',
    role: 'CTO, Apex Logistics',
    initials: 'SO',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'The LMS they built onboarded thousands of learners without a hitch. Highly recommend.',
    name: 'Jordan Blake',
    role: 'COO, Harbor Education',
    initials: 'JB',
    rating: 5,
  },
];

export const teamData = [
  {
    id: '1',
    name: 'Dr. Tatek Eshete',
    title: 'Founder & CEO',
    photo: '/ceo-tatek.png',
    credentials: 'PhD · Technology, Education, and Digital Transformation',
    linkedin: 'https://www.linkedin.com/in/tatatech/',
    isFounder: true,
  },
];

export const pricingData = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal for launches, landing pages, and small business sites.',
    monthlyPrice: 499,
    oneTimePrice: 2499,
    popular: false,
    features: [
      { label: 'Up to 5 pages', included: true },
      { label: 'Responsive design', included: true },
      { label: 'Basic SEO setup', included: true },
      { label: 'Contact form', included: true },
      { label: 'CMS integration', included: false },
      { label: 'Priority support', included: false },
      { label: 'Custom integrations', included: false },
    ],
    cta: 'Start with Starter',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing brands that need product-quality web experiences.',
    monthlyPrice: 1499,
    oneTimePrice: 7999,
    popular: true,
    features: [
      { label: 'Up to 15 pages', included: true },
      { label: 'Responsive design', included: true },
      { label: 'Advanced SEO', included: true },
      { label: 'Contact form', included: true },
      { label: 'CMS integration', included: true },
      { label: 'Priority support', included: true },
      { label: 'Custom integrations', included: false },
    ],
    cta: 'Choose Professional',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Tailored platforms, SLAs, and dedicated delivery pods.',
    monthlyPrice: null,
    oneTimePrice: null,
    popular: false,
    features: [
      { label: 'Unlimited pages', included: true },
      { label: 'Responsive design', included: true },
      { label: 'Advanced SEO', included: true },
      { label: 'Contact form', included: true },
      { label: 'CMS integration', included: true },
      { label: 'Priority support', included: true },
      { label: 'Custom integrations', included: true },
    ],
    cta: 'Talk to Sales',
  },
];

export const blogData = [
  {
    id: '1',
    slug: 'clean-architecture-for-frontend-teams',
    title: 'Clean Architecture for Frontend Teams',
    excerpt:
      'How we keep React codebases scalable with domain, data, and presentation layers.',
    content: `
      <h2>Why architecture matters</h2>
      <p>As products grow, UI components tend to absorb business rules, data fetching, and formatting. That coupling slows delivery and makes testing painful.</p>
      <p>At TATATECH we separate concerns strictly: pages compose UI, use cases own business rules, and repositories own data access.</p>
      <h2>Practical layering</h2>
      <ul>
        <li>Domain entities stay framework-free.</li>
        <li>Use cases orchestrate repositories.</li>
        <li>Presentation never imports data sources.</li>
      </ul>
      <h3>What you gain</h3>
      <p>Faster onboarding, safer refactors, and a clear path from mock data to real APIs.</p>
    `,
    category: 'Engineering',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&h=675&q=80',
    author: 'Daniel Park',
    authorRole: 'Engineering Lead',
    authorInitials: 'DP',
    date: '2026-03-12',
    readTime: 7,
    featured: true,
  },
  {
    id: '2',
    slug: 'nfc-cards-that-actually-convert',
    title: 'NFC Cards That Actually Convert',
    excerpt:
      'Design patterns and analytics that turn tap-to-share into real pipeline.',
    content: `
      <h2>Beyond the tap</h2>
      <p>NFC cards only matter if the digital experience after the tap is useful. Profiles should capture intent, not just contact details.</p>
      <h2>What works</h2>
      <ul>
        <li>One clear CTA after tap</li>
        <li>CRM sync within seconds</li>
        <li>Event-level analytics</li>
      </ul>
    `,
    category: 'Product',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&h=675&q=80',
    author: 'Amara Wells',
    authorRole: 'Head of Design',
    authorInitials: 'AW',
    date: '2026-02-20',
    readTime: 5,
    featured: false,
  },
  {
    id: '3',
    slug: 'securing-cloud-migrations-checklist',
    title: 'Securing Cloud Migrations: A Practical Checklist',
    excerpt:
      'A field-tested checklist for identity, networking, and observability during migrations.',
    content: `
      <h2>Start with identity</h2>
      <p>Most migration risk lives in access control. Establish least-privilege IAM before moving workloads.</p>
      <h2>Then network and observe</h2>
      <p>Segment environments, encrypt transit, and ship logs from day one.</p>
    `,
    category: 'Infrastructure',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=675&q=80',
    author: 'Marcus Lee',
    authorRole: 'Infrastructure Lead',
    authorInitials: 'ML',
    date: '2026-01-18',
    readTime: 8,
    featured: false,
  },
  {
    id: '4',
    slug: 'design-systems-that-ship',
    title: 'Design Systems That Ship',
    excerpt:
      'How to keep tokens, components, and documentation close enough to production to matter.',
    content: `
      <h2>Ship tokens with code</h2>
      <p>Design tokens should live beside the components that consume them — not in a forgotten Figma page.</p>
    `,
    category: 'Design',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&h=675&q=80',
    author: 'Sofia Rahman',
    authorRole: 'Product Manager',
    authorInitials: 'SR',
    date: '2025-12-05',
    readTime: 6,
    featured: false,
  },
];

export const faqsData = [
  {
    id: '1',
    question: 'How long does a typical project take?',
    answer:
      'Most website projects ship in 3–6 weeks. Custom software ranges from 6–16 weeks depending on scope. We share a timeline during discovery.',
  },
  {
    id: '2',
    question: 'Do you work with startups and enterprises?',
    answer:
      'Yes. We support early-stage launches and enterprise delivery with dedicated pods, SLAs, and security reviews.',
  },
  {
    id: '3',
    question: 'Can we start with a ready-made app from the catalog?',
    answer:
      'Absolutely. Many clients launch with a catalog app, then customize branding, workflows, and integrations.',
  },
  {
    id: '4',
    question: 'What does your pricing include?',
    answer:
      'Listed prices cover design, development, QA, and launch support for the stated scope. Hosting and third-party licenses are billed separately when needed.',
  },
  {
    id: '5',
    question: 'Do you offer ongoing maintenance?',
    answer:
      'Yes. Monthly retainers cover updates, monitoring, content changes, and priority support.',
  },
  {
    id: '6',
    question: 'How fast do you reply to quote requests?',
    answer:
      'We reply within 24 hours on business days with next steps and a ballpark estimate.',
  },
];

export const careersData = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
  },
  {
    id: '2',
    title: 'Product Designer',
    department: 'Design',
    location: 'Alexandria, VA / Hybrid',
    type: 'Full-time',
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote (US)',
    type: 'Full-time',
  },
];

export const milestonesData = [
  { year: '2020', title: 'Founded in Alexandria', description: 'TATATECH launched as a boutique digital studio.' },
  { year: '2021', title: 'First enterprise win', description: 'Delivered a multi-region logistics platform.' },
  { year: '2022', title: 'App catalog launch', description: 'Released 100+ ready-to-deploy business apps.' },
  { year: '2023', title: 'NFC product line', description: 'Scaled tap-to-share cards for sales teams nationwide.' },
  { year: '2024', title: '300+ apps', description: 'Catalog crossed 300 production-ready solutions.' },
  { year: '2025', title: 'LMS at scale', description: 'Supported 12k+ concurrent learners on Harbor LMS.' },
  { year: '2026', title: 'Full-service expansion', description: 'Unified design, software, infra, and growth under one team.' },
];

export const trustLogos = [
  'Nova Retail',
  'Harbor Education',
  'Apex Logistics',
  'Pulse Agency',
  'BrightPath',
  'Summit Finance',
];
