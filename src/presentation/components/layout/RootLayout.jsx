import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer } from './Footer.jsx';
import { Navbar } from './Navbar.jsx';
import { Toast } from '../ui/Toast.jsx';
import {
  PageTransition,
  ParticleField,
  ScrollProgressHUD,
  SmoothScroll,
} from '../../motion/index.js';

export function RootLayout() {
  return (
    <SmoothScroll>
      <div id="app-scale-root" className="relative z-10 flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="tech-backdrop" aria-hidden="true" />
        <ParticleField />
        <PageTransition />
        <ScrollProgressHUD />
        <Navbar />
        <main id="main-content" className="relative z-10 flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toast />
        <ScrollRestoration />
      </div>
    </SmoothScroll>
  );
}
