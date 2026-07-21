const processSteps = [
  {
    title: 'Discover',
    description: 'We map goals, users, and constraints with stakeholder workshops.',
  },
  {
    title: 'Design',
    description: 'Wireframes and high-fidelity UI aligned to your brand system.',
  },
  {
    title: 'Build',
    description: 'Iterative development with weekly demos and quality gates.',
  },
  {
    title: 'Launch',
    description: 'Deploy, monitor, train your team, and plan continuous improvement.',
  },
];

export const servicesData = [
  {
    id: '1',
    slug: 'web-design',
    title: 'Web Design',
    shortDescription:
      'Conversion-focused websites that look premium and perform on every device.',
    description:
      'From marketing sites to complex portals, we craft accessible, fast experiences that turn visitors into customers.',
    icon: 'Palette',
    startingPrice: 2499,
    timeline: '3–6 weeks',
    features: [
      'Responsive UI/UX design',
      'Design systems & component libraries',
      'Accessibility (WCAG 2.1 AA)',
      'Performance-first frontends',
    ],
    deliverables: [
      'Figma source files',
      'Production-ready React build',
      'Style guide documentation',
      'Launch & analytics setup',
    ],
    techStack: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion'],
    process: processSteps,
  },
  {
    id: '2',
    slug: 'software-development',
    title: 'Software Development',
    shortDescription:
      'Custom web and mobile applications engineered for scale and security.',
    description:
      'We design, build, and maintain software products — from MVPs to enterprise platforms — with clean architecture and modern tooling.',
    icon: 'Code2',
    startingPrice: 4999,
    timeline: '6–16 weeks',
    features: [
      'Custom web & mobile apps',
      'API & microservices',
      'CI/CD & automated testing',
      'Cloud-native architecture',
    ],
    deliverables: [
      'Source code & documentation',
      'Deployed environments',
      'Test suites',
      'Handover & training',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    process: processSteps,
  },
  {
    id: '3',
    slug: 'it-infrastructure',
    title: 'IT Infrastructure',
    shortDescription:
      'Reliable cloud, networking, and security foundations for growing teams.',
    description:
      'We architect and manage infrastructure that keeps your business online, secure, and ready to scale.',
    icon: 'Server',
    startingPrice: 1999,
    timeline: '2–8 weeks',
    features: [
      'Cloud migration & setup',
      'Network & VPN design',
      'Security hardening',
      '24/7 monitoring options',
    ],
    deliverables: [
      'Infrastructure diagrams',
      'Hardened environments',
      'Runbooks',
      'Monitoring dashboards',
    ],
    techStack: ['AWS', 'Azure', 'Terraform', 'Docker'],
    process: processSteps,
  },
  {
    id: '4',
    slug: 'nfc-digital-cards',
    title: 'NFC Digital Cards',
    shortDescription:
      'Smart NFC business cards that share contact info with a single tap.',
    description:
      'Replace paper cards with tap-to-share digital profiles, analytics, and instant CRM capture.',
    icon: 'CreditCard',
    startingPrice: 99,
    timeline: '1–2 weeks',
    features: [
      'Custom NFC card design',
      'Digital profile pages',
      'Lead capture analytics',
      'CRM integrations',
    ],
    deliverables: [
      'Physical NFC cards',
      'Hosted digital profile',
      'Analytics dashboard',
      'Team onboarding kit',
    ],
    techStack: ['NFC', 'React', 'Stripe', 'Analytics'],
    process: processSteps,
  },
  {
    id: '5',
    slug: 'lms-education',
    title: 'LMS & Education',
    shortDescription:
      'Learning platforms for courses, certifications, and corporate training.',
    description:
      'Launch branded learning experiences with content management, assessments, and progress tracking.',
    icon: 'GraduationCap',
    startingPrice: 3999,
    timeline: '4–12 weeks',
    features: [
      'Course & module builder',
      'Quizzes & certificates',
      'Learner dashboards',
      'SSO & role-based access',
    ],
    deliverables: [
      'Branded LMS portal',
      'Admin console',
      'Content migration',
      'Instructor training',
    ],
    techStack: ['React', 'Node.js', 'SCORM', 'PostgreSQL'],
    process: processSteps,
  },
  {
    id: '6',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortDescription:
      'SEO, paid media, and content systems that compound growth over time.',
    description:
      'We align brand, funnel, and measurement so every campaign drives measurable pipeline.',
    icon: 'Megaphone',
    startingPrice: 1499,
    timeline: 'Ongoing',
    features: [
      'SEO & content strategy',
      'Paid search & social',
      'Conversion rate optimization',
      'Analytics & attribution',
    ],
    deliverables: [
      'Campaign playbooks',
      'Landing pages',
      'Monthly performance reports',
      'Creative assets',
    ],
    techStack: ['GA4', 'Google Ads', 'Meta Ads', 'HubSpot'],
    process: processSteps,
  },
];
