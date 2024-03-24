import { ErrorBoundary } from 'react-error-boundary';
import Header from 'components/layout/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="mx-auto max-w-screen-md flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
          {children}
        </ErrorBoundary>
      </main>
    </div>
  );
}
