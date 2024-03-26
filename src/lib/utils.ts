/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  ESourceOption,
  ESourceValue,
  TQueryParams,
  TFormatResponse,
  TTheGuardianResponse,
  TNyTimesResponse,
  TApiResponse,
} from 'lib/defenitions';
// assets
import theGuardianLogoUrlMd from 'assets/img/the-guardian-logo-md.webp';
import theGuardianLogoUrlSm from 'assets/img/the-guardian-logo-sm.webp';
import newsApiLogoSm from 'assets/img/newsApi-sm.webp';
import newsApiLogoMd from 'assets/img/newsApi-md.webp';
import theNyTimesLogoSm from 'assets/img/the-new-york-time-sm.webp';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function filterEmptyParams(params: any) {
  return Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== '',
    ),
  );
}

export function findImgNyTimes(images: any) {
  if (images.length === 0) return theNyTimesLogoSm;
  return `https://www.nytimes.com/${[images[0].url]}`;
}
/*convert TQueryParams to Record<string, string>*/
export function convertToRecord(query: any): Record<string, string> {
  const record: Record<string, string> = {};
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      const value = query[key];
      record[key] = value instanceof Date ? value.toISOString() : String(value);
    }
  }

  return record;
}

export function mapQueryParameters(query: TQueryParams) {
  // eslint-disable-next-line prefer-const
  let mappedQuery: any = {
    q: query.q || undefined,
    page: query.page || 1,
  };

  switch (query.source) {
    case ESourceValue.THE_GUARDIAN:
      mappedQuery['page-size'] = 10;
      mappedQuery['from-date'] = query.from || undefined;
      mappedQuery['to-date'] = query.to || undefined;
      mappedQuery.section = query.category || undefined;
      mappedQuery.lang = 'en';
      break;
    case ESourceValue.NY_TIMES:
      mappedQuery.fq = query.category
        ? `news_desk:(${query.category})`
        : undefined;
      mappedQuery.begin_date = query.from || undefined;
      mappedQuery.end_date = query.to || undefined;
      break;
    case ESourceValue.NEWS_API_TOP:
      mappedQuery.category = query.category || undefined;
      mappedQuery.country = 'us';
      mappedQuery.pageSize = 10;
      break;
    case ESourceValue.NEWS_API_ALL:
      mappedQuery.q = query.q || 'Bitcoin';
      mappedQuery.from = query.from || undefined;
      mappedQuery.to = query.to || undefined;
      mappedQuery.sortBy = 'popularity';
      mappedQuery.pageSize = 10;
      mappedQuery.language = 'en';
      break;
    default:
      break;
  }

  return filterEmptyParams(mappedQuery);
}

export async function mapResponse(
  response: any,
  source: any,
): Promise<TApiResponse> {
  const articles: TFormatResponse[] = [];

  switch (source) {
    case ESourceValue.THE_GUARDIAN:
      response.response.results.map((rawResponse: TTheGuardianResponse) =>
        articles.push({
          source: {
            id: ESourceValue.THE_GUARDIAN,
            name: ESourceOption.THE_GUARDIAN,
            logo: theGuardianLogoUrlSm,
          },
          author: `The Guardian ${rawResponse.pillarName}`,
          title: rawResponse.webTitle,
          urlToImage: theGuardianLogoUrlMd,
          publishedAt: rawResponse.webPublicationDate,
          url: rawResponse.webUrl,
        }),
      );
      break;
    case ESourceValue.NY_TIMES:
      response.response.docs.map((rawResponse: TNyTimesResponse) =>
        articles.push({
          source: {
            id: ESourceValue.NY_TIMES,
            name: ESourceOption.NY_TIMES,
            logo: theNyTimesLogoSm,
          },
          author: rawResponse.byline.original,
          title: rawResponse.headline.main,
          description: rawResponse.abstract,
          urlToImage: findImgNyTimes(rawResponse.multimedia),
          publishedAt: rawResponse.pub_date,
          url: rawResponse.web_url,
        }),
      );
      break;
    case ESourceValue.NEWS_API_TOP:
    case ESourceValue.NEWS_API_ALL:
      response.articles.map((rawResponse: TFormatResponse) =>
        articles.push({
          source: {
            id: rawResponse.source.id,
            name: rawResponse.source.name,
            logo: newsApiLogoSm,
          },
          author: rawResponse.author,
          title: rawResponse.title,
          description: rawResponse.description || undefined,
          urlToImage: rawResponse.urlToImage || newsApiLogoMd,
          publishedAt: rawResponse.publishedAt,
          url: rawResponse.url,
        }),
      );
      break;
    default:
      break;
  }

  return { articles };
}
