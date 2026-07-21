const categories = [
  'CRM',
  'E-commerce',
  'HR',
  'Education',
  'Finance',
  'Healthcare',
  'Marketing',
  'Productivity',
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

const names = [
  'ClientFlow CRM',
  'ShopForge',
  'PeopleHub',
  'CourseNest',
  'LedgerLite',
  'CareSync',
  'CampaignKit',
  'TaskOrbit',
  'InvoicePro',
  'FleetTrack',
  'EventSpark',
  'SupportDesk',
  'PayRoll+',
  'InventoryIQ',
  'FormBuilder X',
  'ChatRelay',
  'BookingBase',
  'SurveyPulse',
  'WikiSpace',
  'AssetGuard',
  'RecruitFlow',
  'Posify',
  'LearnLoop',
  'BudgetBoard',
];

export const appsData = names.map((name, index) => {
  const category = categories[index % categories.length];
  const priceOptions = [0, 99, 149, 199, 249, 399, 499];
  return {
    id: String(index + 1),
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name,
    category,
    description: `Ready-to-deploy ${category.toLowerCase()} application with admin tools, analytics, and white-label options.`,
    price: priceOptions[index % priceOptions.length],
    icon: icons[index % icons.length],
    demoUrl: '#',
    featured: index < 4,
  };
});

export const appCategories = categories;
