/* News API */
const newsApi_baseUrl = 'https://newsapi.org/v2';
export const newsApi_key = 'c1138061ebde4c1ea7373c4eefb37d30'; //'f463419c4e4c4ebd96549c95688e979b'; //'5aeb04869f574473beddab95f71e77d3';
export const newsApi_All = `${newsApi_baseUrl}/everything`;
export const newsApi_Top = `${newsApi_baseUrl}/top-headlines`;

/* New York Times API */
const nyTimes_baseUrl = 'https://api.nytimes.com/svc/search/v2';
export const nytimes_key = '7TWQ3dQ5NAXzZeutFrcM0giibqjGTnLQ';
export const nyTimes_Search = `${nyTimes_baseUrl}/articlesearch.json`;

/* The Guardian API */
const theGuardian_baseUrl = 'https://content.guardianapis.com';
export const theguardian_key = 'bfdaac02-13eb-4315-814c-2d310abe8a86'; //'8524c013-88d0-4163-b13f-e4166c37fd68';
export const theguardian_Search = `${theGuardian_baseUrl}/search`;
