import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useNews from 'hooks/useNews';
import { useStoreFilter } from 'hooks/useStoreFilter';
import { cn, formatDateToLocal } from 'lib/utils';
import { TFormatResponse } from 'lib/defenitions';
import { ArticlesSkeleton, ArticleSkeleton } from 'components/ui/skeletons';
import { DataNotFound } from 'components/ui/errorScreen';

export default function ArticlesWrapper() {
  const { ref, inView } = useInView({ threshold: 0 });

  const { search, date, selectedCategory, selectedSource } = useStoreFilter();
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNews({
      q: search,
      from: date?.startDate,
      to: date?.endDate,
      category: selectedCategory,
      source: selectedSource,
    });

  /*
    Trigger fetching the next page when the element
    is visible in the viewport.
  */
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <ArticlesSkeleton />;
  if (!data?.length) return <DataNotFound />;

  return (
    <div className="rounded-2 relative grid grid-cols-1 gap-0 divide-y divide-gray-500 rounded-2xl bg-primary p-4 sm:p-6 lg:p-8">
      {data.map((article, idx) => (
        <Article
          key={idx}
          className={`py-4 ${idx === data.length - 1 ? 'pb-2' : ''}`}
          data={article}
        />
      ))}
      <div ref={ref}>
        {isFetchingNextPage ? (
          <ArticleSkeleton className="p-4" />
        ) : hasNextPage ? (
          <p className="mt-5 text-center">Load more</p>
        ) : (
          <p className="mt-5 text-center">Stop! No more data</p>
        )}
      </div>
    </div>
  );
}

interface IArticles {
  className?: string;
  data: TFormatResponse;
}

function Article(props: IArticles) {
  const { title, publishedAt, url, author, urlToImage, source } = props.data;
  return (
    <article
      className={cn(
        'group relative grid w-full grid-cols-3 items-start justify-between gap-4',
        props.className,
      )}
    >
      <div className="col-span-2 h-full">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0"
        />
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="h-4 w-full">
              <img
                src={source.logo}
                alt="source"
                className="h-3 object-cover"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-300 group-hover:underline sm:text-xl">
              {title}
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1 sm:mt-9">
            {publishedAt && (
              <div className="flex items-center gap-1 text-gray-400">
                <p className="font-googleSans text-xs font-medium">
                  {formatDateToLocal(publishedAt)}
                </p>
              </div>
            )}
            {author && (
              <>
                <hr className="mx-1 my-0 h-[3px] w-[3px] shrink-0 rounded-[1.5px] border-[none] bg-[#c4c7c5]" />
                <p className="mt-0 font-googleSans text-xs font-medium text-gray-400">
                  {author}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <figure className="col-span-1">
        <img
          src={urlToImage}
          alt={title}
          className="h-24 w-48 rounded-2xl object-cover"
        />
      </figure>
    </article>
  );
}
