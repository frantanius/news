import { cn } from 'lib/utils';

interface IArticleSkeleton {
  className?: string;
}

export function ArticleSkeleton({ className }: IArticleSkeleton) {
  return (
    <article
      className={cn(
        'relative grid w-full grid-cols-3 items-start justify-between gap-4 py-4',
        className,
      )}
    >
      <div className="col-span-2 h-full">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="h-3 w-20 animate-pulse rounded bg-gray-500" />
            <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-500" />
          </div>

          <div className="mt-4 flex items-center gap-1 sm:mt-9">
            <div className="flex items-center gap-1 text-gray-400">
              <div className="h-3 w-20 animate-pulse rounded bg-gray-500" />
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <div className="h-3 w-20 animate-pulse rounded bg-gray-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="hidden h-24 w-48 animate-pulse rounded-2xl bg-gray-500 sm:block" />
        <div className="w-30 block h-24 animate-pulse rounded-2xl bg-gray-500 sm:hidden" />
      </div>
    </article>
  );
}

export function ArticlesSkeleton() {
  return (
    <div className="rounded-2 relative grid grid-cols-1 gap-0 divide-y divide-gray-500 rounded-2xl bg-primary p-4 sm:p-6 lg:p-8">
      <ArticleSkeleton />
      <ArticleSkeleton />
      <ArticleSkeleton />
      <ArticleSkeleton />
      <ArticleSkeleton />
    </div>
  );
}
