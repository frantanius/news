import { TApiResponse, TQueryParams, ESourceValue } from 'lib/defenitions';
import { mapQueryParameters, convertToRecord, mapResponse } from 'lib/utils';
import {
  newsApi_All,
  newsApi_Top,
  newsApi_key,
  nytimes_key,
  nyTimes_Search,
  theguardian_Search,
  theguardian_key,
} from 'lib/api/url';

export async function fetchArticles(
  params: TQueryParams,
): Promise<TApiResponse> {
  const mappedQuery = mapQueryParameters(params);
  const queryParamsRecord = convertToRecord(mappedQuery);
  const queryParams = new URLSearchParams(queryParamsRecord).toString();

  let api_url;
  let api_key;

  switch (params.source) {
    case ESourceValue.THE_GUARDIAN:
      api_url = theguardian_Search;
      api_key = 'api-key=' + theguardian_key;
      break;
    case ESourceValue.NEWS_API_TOP:
      api_url = newsApi_Top;
      api_key = 'apiKey=' + newsApi_key;
      break;
    case ESourceValue.NEWS_API_ALL:
      api_url = newsApi_All;
      api_key = 'apiKey=' + newsApi_key;
      break;
    default: //NY Times
      api_url = nyTimes_Search;
      api_key = 'api-key=' + nytimes_key;
      break;
  }

  const res = await fetch(`${api_url}?${queryParams}&${api_key}`);
  const response = await res.json();
  const mappedArticles = await mapResponse(response, params.source);

  return mappedArticles;
}
