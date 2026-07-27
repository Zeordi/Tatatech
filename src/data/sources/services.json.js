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
    title: 'Web Design & Development',
    shortDescription:
      'Custom, responsive websites and web applications built with modern frameworks — from landing pages to full-scale platforms.',
    description:
      'Custom, responsive websites and web applications built with modern frameworks — from landing pages to full-scale platforms.',
    icon: 'Palette',
    startingPrice: 2499,
    timeline: '3–6 weeks',
    features: [
      'Custom UI/UX design',
      'Responsive on all devices',
      'SEO-optimized structure',
      'CMS integration',
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
    title: 'Computer Systems & Software Design',
    shortDescription:
      'End-to-end software design for desktop, web, and enterprise systems including custom communication equipment software.',
    description:
      'End-to-end software design for desktop, web, and enterprise systems including custom communication equipment software.',
    icon: 'Code2',
    startingPrice: 4999,
    timeline: '6–16 weeks',
    features: [
      'Requirements analysis',
      'System architecture',
      'Custom development',
      'QA & testing',
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
    slug: 'electronic-chips-programming',
    title: 'Electronic Chips Programming',
    shortDescription:
      'Embedded systems programming for microcontrollers, FPGAs, and custom silicon. IoT solutions and firmware development.',
    description:
      'Embedded systems programming for microcontrollers, FPGAs, and custom silicon. IoT solutions and firmware development.',
    icon: 'Cpu',
    startingPrice: 2999,
    timeline: '4–10 weeks',
    features: [
      'Microcontroller programming',
      'FPGA / CPLD design',
      'IoT firmware',
      'Hardware-software integration',
    ],
    deliverables: [
      'Firmware binaries & source',
      'Hardware integration guides',
      'Test & validation reports',
      'Deployment documentation',
    ],
    techStack: ['C/C++', 'VHDL', 'ARM', 'ESP32'],
    process: processSteps,
  },
  {
    id: '4',
    slug: 'internet-content-provider',
    title: 'Internet Content Provider',
    shortDescription:
      'Professional content creation, management, and distribution for websites, portals, and digital platforms.',
    description:
      'Professional content creation, management, and distribution for websites, portals, and digital platforms.',
    icon: 'Newspaper',
    startingPrice: 999,
    timeline: 'Ongoing',
    features: [
      'Content strategy & planning',
      'SEO copywriting',
      'Multimedia production',
      'Content management',
    ],
    deliverables: [
      'Content calendars',
      'Published articles & media',
      'SEO performance reports',
      'CMS workflows',
    ],
    techStack: ['WordPress', 'Contentful', 'GA4', 'Adobe CC'],
    process: processSteps,
  },
  {
    id: '5',
    slug: 'lms-education',
    title: 'Education & Training Software',
    shortDescription:
      'Custom e-learning platforms and LMS systems that deliver engaging educational experiences at any scale.',
    description:
      'Custom e-learning platforms and LMS systems that deliver engaging educational experiences at any scale.',
    icon: 'GraduationCap',
    startingPrice: 3999,
    timeline: '4–12 weeks',
    features: [
      'LMS platform development',
      'Interactive course builders',
      'Progress tracking',
      'Video & multimedia integration',
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
    slug: 'social-media-app-development',
    title: 'Social Media App Development',
    shortDescription:
      'Full-featured social media applications — community platforms to marketplace apps. Native iOS, Android, and web versions.',
    description:
      'Full-featured social media applications — community platforms to marketplace apps. Native iOS, Android, and web versions.',
    icon: 'Smartphone',
    startingPrice: 5999,
    timeline: '8–16 weeks',
    features: [
      'iOS & Android development',
      'Real-time messaging',
      'User profiles & feeds',
      'Push notifications',
    ],
    deliverables: [
      'iOS & Android apps',
      'Web version',
      'Admin dashboard',
      'App store submission',
    ],
    techStack: ['React Native', 'Node.js', 'WebSockets', 'Firebase'],
    process: processSteps,
  },
  {
    id: '7',
    slug: 'it-infrastructure',
    title: 'IT Infrastructure',
    shortDescription:
      'Design, deployment, and management of robust IT infrastructure — servers, networks, cloud systems, and security.',
    description:
      'Design, deployment, and management of robust IT infrastructure — servers, networks, cloud systems, and security.',
    icon: 'Server',
    startingPrice: 1999,
    timeline: '2–8 weeks',
    features: [
      'Server setup & config',
      'Network design & security',
      'Cloud migration',
      '24/7 monitoring',
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
    id: '8',
    slug: 'portal-development',
    title: 'Portal Development',
    shortDescription:
      'Custom portals — client portals, employee intranets, government portals, and B2B platforms with role-based access control.',
    description:
      'Custom portals — client portals, employee intranets, government portals, and B2B platforms with role-based access control.',
    icon: 'LayoutDashboard',
    startingPrice: 4499,
    timeline: '6–12 weeks',
    features: [
      'Role-based access control',
      'API integrations',
      'Dashboard & reporting',
      'Multi-tenant architecture',
    ],
    deliverables: [
      'Deployed portal',
      'Admin console',
      'API documentation',
      'User onboarding guides',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'OAuth'],
    process: processSteps,
  },
  {
    id: '9',
    slug: 'digital-marketing',
    title: 'Marketing via Social Media',
    shortDescription:
      'Data-driven social media campaigns. Strategy, content creation, paid ads, and performance analytics.',
    description:
      'Data-driven social media campaigns. Strategy, content creation, paid ads, and performance analytics.',
    icon: 'Megaphone',
    startingPrice: 1499,
    timeline: 'Ongoing',
    features: [
      'Platform strategy',
      'Paid social advertising',
      'Content calendar',
      'ROI tracking',
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
  {
    id: '10',
    slug: 'data-entry-services',
    title: 'Data Entry Services',
    shortDescription:
      'Accurate, high-volume data entry and processing. OCR, digitization, and database management with 99.9% accuracy.',
    description:
      'Accurate, high-volume data entry and processing. OCR, digitization, and database management with 99.9% accuracy.',
    icon: 'ClipboardList',
    startingPrice: 499,
    timeline: 'Ongoing',
    features: [
      'Manual & automated entry',
      'Document digitization & OCR',
      'Database management',
      'Data cleaning & validation',
    ],
    deliverables: [
      'Cleaned & validated datasets',
      'Digitized document archives',
      'Database reports',
      'Quality assurance logs',
    ],
    techStack: ['OCR', 'Excel', 'SQL', 'Python'],
    process: processSteps,
  },
];
