import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../presentation/components/layout/RootLayout.jsx';

const lazyPage = (importer, exportName) => async () => {
  const module = await importer();
  return { Component: module[exportName] };
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, lazy: lazyPage(() => import('../presentation/pages/HomePage.jsx'), 'HomePage') },
      { path: 'services', lazy: lazyPage(() => import('../presentation/pages/ServicesPage.jsx'), 'ServicesPage') },
      { path: 'services/:slug', lazy: lazyPage(() => import('../presentation/pages/ServiceDetailPage.jsx'), 'ServiceDetailPage') },
      { path: 'portfolio', lazy: lazyPage(() => import('../presentation/pages/PortfolioPage.jsx'), 'PortfolioPage') },
      { path: 'portfolio/:slug', lazy: lazyPage(() => import('../presentation/pages/CaseStudyPage.jsx'), 'CaseStudyPage') },
      { path: 'apps', lazy: lazyPage(() => import('../presentation/pages/AppCatalogPage.jsx'), 'AppCatalogPage') },
      { path: 'about', lazy: lazyPage(() => import('../presentation/pages/AboutPage.jsx'), 'AboutPage') },
      { path: 'pricing', lazy: lazyPage(() => import('../presentation/pages/PricingPage.jsx'), 'PricingPage') },
      { path: 'blog', lazy: lazyPage(() => import('../presentation/pages/BlogPage.jsx'), 'BlogPage') },
      { path: 'blog/:slug', lazy: lazyPage(() => import('../presentation/pages/BlogPostPage.jsx'), 'BlogPostPage') },
      { path: 'contact', lazy: lazyPage(() => import('../presentation/pages/ContactPage.jsx'), 'ContactPage') },
      { path: 'support', lazy: lazyPage(() => import('../presentation/pages/SupportPage.jsx'), 'SupportPage') },
      { path: 'careers', lazy: lazyPage(() => import('../presentation/pages/CareersPage.jsx'), 'CareersPage') },
      { path: 'privacy', lazy: lazyPage(() => import('../presentation/pages/PrivacyPage.jsx'), 'PrivacyPage') },
      { path: 'terms', lazy: lazyPage(() => import('../presentation/pages/TermsPage.jsx'), 'TermsPage') },
      { path: '*', lazy: lazyPage(() => import('../presentation/pages/NotFoundPage.jsx'), 'NotFoundPage') },
    ],
  },
]);
