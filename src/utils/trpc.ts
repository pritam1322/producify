// utils/trpc.ts
import { createTRPCNext } from '@trpc/next';

import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { AppRouter } from '@/server/routers/appRouter';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''; // Use relative URL in browser
  }
  return `http://localhost:3000`; // Full URL for Node
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`, // Adjust to your API route
        }),
      ],
    };
  },
  ssr: true, // Enable server-side rendering for tRPC queries
});
