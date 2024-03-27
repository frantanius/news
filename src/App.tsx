import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from 'components/layout';
import Articles from 'components/articles';
import { initializeFeed } from 'hooks/useStoreFilter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  useEffect(() => {
    initializeFeed();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Articles />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
