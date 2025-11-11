'use client';

import { QueryClient, QueryClientProvider as TanStackQueryProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryClientProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto
            cacheTime: 5 * 60 * 1000, // 5 minutos
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
        },
      })
  );

  return (
    <TanStackQueryProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </TanStackQueryProvider>
  );
}