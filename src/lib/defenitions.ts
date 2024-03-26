import { DateType } from 'react-tailwindcss-datepicker';

export enum ESourceValue {
  NY_TIMES = 'nytimes',
  THE_GUARDIAN = 'theguardian',
  NEWS_API = 'newsapi',
  NEWS_API_ALL = 'newsapiall',
  NEWS_API_TOP = 'newsapitop',
}

export enum ESourceOption {
  NY_TIMES = 'New York Times',
  THE_GUARDIAN = 'The Guardian',
  NEWS_API_ALL = 'NewsApi Everything',
  NEWS_API_TOP = 'NewsApi Top Headlines',
}

export type TSourceOption = {
  value: string;
  option: string;
};

/*
  Query Parameters Type
*/
export type TNewsApiParams = {
  category?: string;
  from?: DateType;
  to?: DateType;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  country?: string;
  language?: string;
};

export type TNyTimesParams = {
  fq?: string;
  begin_date?: string;
  end_date?: string;
};

export type TTheGuardianParams = {
  'from-date'?: string;
  'to-date'?: string;
  'page-size'?: number;
  lang?: string;
  section?: string;
};

export type TQueryParams = TNewsApiParams &
  TNyTimesParams &
  TTheGuardianParams & {
    q?: string;
    page?: number;
    source?: string;
  };

/*
  Response API Type
*/
export type TNyTimesResponse = {
  byline: {
    original: string;
  };
  headline: {
    main: string;
  };
  abstract: string;
  multimedia: {
    url: string;
  }[];
  pub_date: string;
  body: string;
  web_url: string;
};

export type TTheGuardianResponse = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: string;
  pillarId: string;
  pillarName: string;
};

export interface TFormatResponse {
  source: {
    id: string;
    name: string;
    logo: string;
  };
  author?: string;
  title: string;
  description?: string;
  urlToImage?: string;
  publishedAt: string;
  url: string;
}

export type TApiResponse = { articles: TFormatResponse[] };
