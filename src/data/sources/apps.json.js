const categories = [
  'Business',
  'E-Commerce',
  'Healthcare',
  'Education',
  'Productivity',
  'Security',
  'HR & Workforce',
  'CRM & Sales',
];

const icons = [
  'LayoutDashboard',
  'ShoppingCart',
  'Users',
  'BookOpen',
  'Wallet',
  'HeartPulse',
  'BarChart3',
  'Calendar',
];

const apps = [
  {
    name: 'InvoicePro',
    category: 'Business',
    description: 'Automated invoicing, payments, and financial reporting for small businesses.',
  },
  {
    name: 'ProjectFlow',
    category: 'Business',
    description: 'Project management with Gantt charts, task boards, and team collaboration.',
  },
  {
    name: 'MeetingMind',
    category: 'Business',
    description: 'Smart meeting scheduler with auto-summaries, action items, and follow-ups.',
  },
  {
    name: 'ExpenseTrack',
    category: 'Business',
    description: 'Expense tracking, receipt scanning, and budget analytics with approval workflows.',
  },
  {
    name: 'ContractVault',
    category: 'Business',
    description: 'Digital contract management, e-signatures, and automated renewal reminders.',
  },
  {
    name: 'BizReports',
    category: 'Business',
    description: 'Automated business intelligence dashboards and executive reporting.',
  },
  {
    name: 'ShopBuilder',
    category: 'E-Commerce',
    description: 'Drag-and-drop e-commerce store builder with inventory, payments, and shipping.',
  },
  {
    name: 'InventoryIQ',
    category: 'E-Commerce',
    description: 'Real-time inventory tracking across warehouses, with low-stock alerts.',
  },
  {
    name: 'ReturnHub',
    category: 'E-Commerce',
    description: 'Streamlined returns and refunds management for online retailers.',
  },
  {
    name: 'PriceWatcher',
    category: 'E-Commerce',
    description: 'Competitor price monitoring and dynamic pricing automation.',
  },
  {
    name: 'ReviewBoost',
    category: 'E-Commerce',
    description: 'Automated review collection, management, and response platform.',
  },
  {
    name: 'AbandonCart',
    category: 'E-Commerce',
    description: 'Cart abandonment recovery via email, SMS, and retargeting.',
  },
  {
    name: 'MedScheduler',
    category: 'Healthcare',
    description: 'Patient appointment scheduling with reminders, cancellations, and waitlists.',
  },
  {
    name: 'HealthRecords',
    category: 'Healthcare',
    description: 'Secure electronic health records with HIPAA-compliant storage.',
  },
  {
    name: 'TeleClinic',
    category: 'Healthcare',
    description: 'Telemedicine platform for virtual consultations, prescriptions, and follow-ups.',
  },
  {
    name: 'LabPortal',
    category: 'Healthcare',
    description: 'Patient portal for lab results, imaging reports, and care plans.',
  },
  {
    name: 'CareCoordinator',
    category: 'Healthcare',
    description: 'Care team coordination, task assignment, and patient handoff management.',
  },
  {
    name: 'PharmTrack',
    category: 'Healthcare',
    description: 'Pharmacy management system with prescription tracking and inventory.',
  },
  {
    name: 'LMS Studio',
    category: 'Education',
    description: 'Full learning management system with courses, quizzes, and certificates.',
  },
  {
    name: 'QuizEngine',
    category: 'Education',
    description: 'Advanced quiz and assessment builder with auto-grading and analytics.',
  },
  {
    name: 'ClassroomLive',
    category: 'Education',
    description: 'Live virtual classroom with whiteboards, breakout rooms, and recording.',
  },
  {
    name: 'GradeBook',
    category: 'Education',
    description: 'Teacher gradebook with rubrics, parent communication, and progress tracking.',
  },
  {
    name: 'TutorMatch',
    category: 'Education',
    description: 'Tutor marketplace with scheduling, payments, and session tracking.',
  },
  {
    name: 'CertBot',
    category: 'Education',
    description: 'Automated certificate generation and verification for course completions.',
  },
  {
    name: 'TaskZen',
    category: 'Productivity',
    description: 'Personal and team task manager with priority queues and time tracking.',
  },
  {
    name: 'DocFlow',
    category: 'Productivity',
    description: 'Document creation, collaboration, and version control with team workspaces.',
  },
  {
    name: 'TimeTracker Pro',
    category: 'Productivity',
    description: 'Time tracking with project billing, payroll integration, and utilization reports.',
  },
  {
    name: 'AutomateIt',
    category: 'Productivity',
    description: 'No-code workflow automation connecting your apps and automating repetitive tasks.',
  },
  {
    name: 'NoteVault',
    category: 'Productivity',
    description: 'Team knowledge base with rich notes, wikis, and searchable documentation.',
  },
  {
    name: 'FocusMode',
    category: 'Productivity',
    description: 'Distraction blocker and deep work timer with productivity analytics.',
  },
  {
    name: 'SecureVPN',
    category: 'Security',
    description: 'Business VPN with zero-trust architecture, MFA, and access logging.',
  },
  {
    name: 'PasswordVault',
    category: 'Security',
    description: 'Enterprise password manager with team sharing, auditing, and SSO.',
  },
  {
    name: 'ThreatWatch',
    category: 'Security',
    description: 'Real-time network threat monitoring, intrusion detection, and alerts.',
  },
  {
    name: 'ComplianceHub',
    category: 'Security',
    description: 'GDPR, HIPAA, SOC2 compliance management with audit trails and reports.',
  },
  {
    name: 'BackupShield',
    category: 'Security',
    description: 'Automated encrypted cloud backup with one-click disaster recovery.',
  },
  {
    name: 'AccessControl',
    category: 'Security',
    description: 'Centralized IAM with role-based permissions, SSO, and provisioning.',
  },
  {
    name: 'HireDesk',
    category: 'HR & Workforce',
    description: 'Applicant tracking system with job postings, screening, and offer letters.',
  },
  {
    name: 'OnboardIQ',
    category: 'HR & Workforce',
    description: 'Employee onboarding with checklists, document collection, and training.',
  },
  {
    name: 'ScheduleHQ',
    category: 'HR & Workforce',
    description: 'Staff scheduling across locations with shift swaps, availability, and alerts.',
  },
  {
    name: 'PayrollPlus',
    category: 'HR & Workforce',
    description: 'Automated payroll processing, tax filing, and direct deposit.',
  },
  {
    name: 'PerformPro',
    category: 'HR & Workforce',
    description: 'Employee performance reviews, goal tracking, and 360° feedback.',
  },
  {
    name: 'BenefitsPortal',
    category: 'HR & Workforce',
    description: 'Employee benefits management with open enrollment and carrier integrations.',
  },
  {
    name: 'SalesPilot',
    category: 'CRM & Sales',
    description: 'CRM pipeline with lead scoring, deal tracking, and AI-powered forecasting.',
  },
  {
    name: 'EmailCampaigns',
    category: 'CRM & Sales',
    description: 'Email marketing automation with segmentation, A/B testing, and analytics.',
  },
  {
    name: 'LeadCapture',
    category: 'CRM & Sales',
    description: 'Lead generation forms, landing pages, and CRM integration.',
  },
  {
    name: 'CustomerSuccess',
    category: 'CRM & Sales',
    description: 'Customer health scoring, churn prediction, and renewal management.',
  },
  {
    name: 'LiveChat',
    category: 'CRM & Sales',
    description: 'Real-time chat widget with chatbot, agent routing, and CRM sync.',
  },
  {
    name: 'SurveyBot',
    category: 'CRM & Sales',
    description: 'Customer satisfaction surveys (NPS, CSAT) with analytics and alerts.',
  },
];

export const appsData = apps.map((app, index) => {
  const priceOptions = [0, 99, 149, 199, 249, 399, 499];
  return {
    id: String(index + 1),
    slug: app.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: app.name,
    category: app.category,
    description: app.description,
    price: priceOptions[index % priceOptions.length],
    icon: icons[index % icons.length],
    demoUrl: '#',
    featured: index < 4,
  };
});

export const appCategories = categories;
