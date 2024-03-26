/* eslint-disable @typescript-eslint/no-explicit-any */
import { ESourceValue, ESourceOption, TSourceOption } from 'lib/defenitions';

export const SOURCE_OPTIONS: TSourceOption[] = [
  {
    value: ESourceValue.NY_TIMES,
    option: ESourceOption.NY_TIMES,
  },
  {
    value: ESourceValue.THE_GUARDIAN,
    option: ESourceOption.THE_GUARDIAN,
  },
  {
    value: ESourceValue.NEWS_API_TOP,
    option: ESourceOption.NEWS_API_TOP,
  },
  {
    value: ESourceValue.NEWS_API_ALL,
    option: ESourceOption.NEWS_API_ALL,
  },
];

export const CATEGORIES: any = {
  [ESourceValue.NY_TIMES]: [
    { value: 'Adventure Sports', option: 'Adventure Sports' },
    { value: 'Arts & Leisure', option: 'Arts & Leisure' },
    { value: 'Automobiles', option: 'Automobiles' },
    { value: 'Books', option: 'Books' },
    { value: 'Business', option: 'Business' },
    { value: 'Cars', option: 'Cars' },
    { value: 'Food', option: 'Food' },
  ],
  [ESourceValue.THE_GUARDIAN]: [
    { value: 'business', option: 'Business' },
    { value: 'sport', option: 'Sports' },
    { value: 'science', option: 'Science' },
    { value: 'technology', option: 'Technology' },
  ],
  [ESourceValue.NEWS_API_TOP]: [
    { value: 'general', option: 'General' },
    { value: 'business', option: 'Business' },
    { value: 'entertainment', option: 'Entertainment' },
    { value: 'science', option: 'Science' },
    { value: 'sports', option: 'Sports' },
    { value: 'technology', option: 'Technology' },
    { value: 'health', option: 'Health' },
  ],
};
