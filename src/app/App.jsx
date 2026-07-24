import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './providers/ThemeProvider.jsx';
import { QueryProvider } from './providers/QueryProvider.jsx';
import { MotionProvider } from '../presentation/motion/MotionProvider.jsx';
import { router } from './router.jsx';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <QueryProvider>
          <MotionProvider>
            <RouterProvider router={router} />
          </MotionProvider>
        </QueryProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
