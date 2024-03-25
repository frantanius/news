import { DateType } from 'react-tailwindcss-datepicker';

export type Params = {
  q?: string;
  category?: string;
  from?: DateType;
  to?: DateType;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  page?: number;
};

export type IArticle = {
  source: {
    id: string;
    name: string;
  };
  author?: string;
  title: string;
  description: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
  url: string;
};

export type ApiResponse = {
  articles: IArticle[];
};
