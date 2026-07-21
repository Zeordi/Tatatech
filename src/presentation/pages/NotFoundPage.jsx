import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Button } from '../components/ui/Button.jsx';

export function NotFoundPage() {
  return (
    <>
      {usePageMeta({
        title: 'Page Not Found',
        description: 'The page you requested does not exist.',
        path: '/404',
      })}
      <div className="relative overflow-hidden py-24 md:py-32">
        <motion.div
          className="pointer-events-none absolute left-[10%] top-20 h-40 w-40 rounded-full bg-primary/20 blur-2xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-16 right-[15%] h-32 w-32 rounded-full bg-violet-500/20 blur-2xl"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <PageContainer className="relative text-center">
          <p className="font-heading text-8xl font-extrabold text-gradient md:text-9xl">404</p>
          <h1 className="mt-4 text-3xl md:text-4xl">
            This page doesn&apos;t exist — but your project could.
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button as={Link} to="/" variant="primary">
              Back to Home
            </Button>
            <Button as={Link} to="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </PageContainer>
      </div>
    </>
  );
}
