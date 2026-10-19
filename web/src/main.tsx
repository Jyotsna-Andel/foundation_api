import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import { router } from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      // Don't retry 4xx errors (e.g. 404); they won't fix themselves.
      retry: (failureCount, error) =>
        failureCount < 2 &&
        !(
          'statusCode' in error &&
          typeof error.statusCode === 'number' &&
          error.statusCode >= 400 &&
          error.statusCode < 500
        ),
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
