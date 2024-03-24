import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryParams } from 'lib/api/defenitions';
import { fetchArticles } from 'lib/api/actions';

export function useNews(param: QueryParams) {
  return useInfiniteQuery({
    queryKey: ['news'],
    queryFn: ({ pageParam }) => fetchArticles({ ...param }, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.articles.length === 0) return undefined;
      return lastPageParam + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.articles),
    enabled: !!param.search,
  });
}

// type KeyParams = {
//   [key: string]: any;
// };

// type Params = { pageParam: number };

// export async function fetchArticles({
//   pageParam,
// }: Params): Promise<ApiResponse> {
//   const response = await fetch(
//     `${news_api_url}?q=bitcoin&page=${pageParam}&pageSize=10&apiKey=${news_api_key}`,
//   );
//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return await response.json();
// }

// export function useNews(
//   config: UseInfiniteQueryOptions<
//     ApiResponse,
//     unknown,
//     Article,
//     ApiResponse,
//     Array<string | KeyParams>,
//     number
//   >,
// ) {
//   return useInfiniteQuery({
//     ...config,
//   });
// }
// const data = useNews({
//   queryKey: ['news'],
//   queryFn: fetchArticles,
//   initialPageParam: 1,
//   getNextPageParam: (lastPage) => {
//     return lastPage.articles.length || undefined;
//   },
// });
