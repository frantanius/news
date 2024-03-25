import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Header from 'components/layout/header';
import { ErrorScreen } from 'components/ui/errorScreen';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="mx-auto max-w-screen-md flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorScreen error={error} reset={resetErrorBoundary} />
          )}
        >
          {children}
        </ErrorBoundary>
      </main>
    </div>
  );
}
