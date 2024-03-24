export interface QueryParams {
  search?: string;
  date?: {
    startDate?: Date;
    endDate?: Date;
  };
  category?: string;
  source?: string;
}

export interface IArticle {
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
}

export interface ApiResponse {
  articles: IArticle[];
}
