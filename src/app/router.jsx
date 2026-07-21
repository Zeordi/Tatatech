import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../presentation/components/layout/RootLayout.jsx';
import { HomePage } from '../presentation/pages/HomePage.jsx';
import { ServicesPage } from '../presentation/pages/ServicesPage.jsx';
import { ServiceDetailPage } from '../presentation/pages/ServiceDetailPage.jsx';
import { PortfolioPage } from '../presentation/pages/PortfolioPage.jsx';
import { CaseStudyPage } from '../presentation/pages/CaseStudyPage.jsx';
import { AppCatalogPage } from '../presentation/pages/AppCatalogPage.jsx';
import { AboutPage } from '../presentation/pages/AboutPage.jsx';
import { PricingPage } from '../presentation/pages/PricingPage.jsx';
import { BlogPage } from '../presentation/pages/BlogPage.jsx';
import { BlogPostPage } from '../presentation/pages/BlogPostPage.jsx';
import { ContactPage } from '../presentation/pages/ContactPage.jsx';
import { CareersPage } from '../presentation/pages/CareersPage.jsx';
import { PrivacyPage } from '../presentation/pages/PrivacyPage.jsx';
import { TermsPage } from '../presentation/pages/TermsPage.jsx';
import { NotFoundPage } from '../presentation/pages/NotFoundPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:slug', element: <ServiceDetailPage /> },
      { path: 'portfolio', element: <PortfolioPage /> },
      { path: 'portfolio/:slug', element: <CaseStudyPage /> },
      { path: 'apps', element: <AppCatalogPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'careers', element: <CareersPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
