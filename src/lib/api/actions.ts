import { ApiResponse, Params } from 'lib/defenitions';
import { newsApi_All, newsApi_Top, newsApi_key } from 'lib/api/url';

export async function fetchArticles(params: Params): Promise<ApiResponse> {
  const { q, category, from, to, page } = params;

  const date = {
    ...(from && to && { from: from.toString(), to: to.toString() }),
  };

  const queryParams = new URLSearchParams({
    q: q || 'Bitcoin',
    page: page ? page.toString() : '1',
    pageSize: '20',
    ...(!category && { sortBy: 'popularity', language: 'en', ...date }),
    ...(category && { country: 'us', category }),
  }).toString();

  const response = await fetch(
    `${category ? newsApi_Top : newsApi_All}?${queryParams}&apiKey=${newsApi_key}`,
  );

  return await response.json();
}
