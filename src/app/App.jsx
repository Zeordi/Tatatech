import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './providers/ThemeProvider.jsx';
import { QueryProvider } from './providers/QueryProvider.jsx';
import { router } from './router.jsx';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
