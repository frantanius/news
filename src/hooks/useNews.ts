import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchArticles } from 'lib/api/actions';
import { TQueryParams } from 'lib/defenitions';

export default function useNews(params: TQueryParams) {
  const { q, from, to, category, source } = params;
  return useInfiniteQuery({
    queryKey: ['news', q, from, to, category, source],
    initialPageParam: 1,
    throwOnError: true,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 15,
    queryFn: ({ pageParam }) => fetchArticles({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, _all, lastPageParam) => {
      if (!lastPage.articles || lastPage.articles.length === 0) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.articles),
  });
}
