import { ApiResponse, QueryParams } from 'lib/api/defenitions';
import { news_api_url, news_api_key } from './url';

export async function fetchArticles(
  { search, date, category, source }: QueryParams,
  page: number,
): Promise<ApiResponse> {
  const fromDate = date?.startDate ? date.startDate.toISOString() : undefined;
  const toDate = date?.endDate ? date.endDate.toISOString() : undefined;

  const queryParams = new URLSearchParams({
    q: search || 'Bitcoin',
    sortBy: 'popularity',
    pageSize: '5',
    ...(category && { category }),
    ...(source && { source }),
    ...(fromDate && toDate && { from: fromDate, to: toDate }),
  }).toString();

  const response = await fetch(
    `${news_api_url}?${queryParams}&page=${page}&apiKey=${news_api_key}`,
  );
  return await response.json();
}
