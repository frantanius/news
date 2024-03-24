/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

type Article = {
  title: string;
  date: string;
  author: string;
  imgUrl: string;
  url: string;
  source: string;
};

const useRandomArticles = (): Article[] => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const generateArticle = (): Article => ({
      title: faker.lorem.sentence(),
      date: faker.date.past().toISOString().split('T')[0],
      author: faker.name.fullName(),
      imgUrl: faker.image.imageUrl(),
      url: faker.internet.url(),
      source: faker.internet.domainName(),
    });

    const generateArticles = (): Article[] => {
      const articles: Article[] = [];
      for (let i = 0; i < 5; i++) {
        articles.push(generateArticle());
      }
      return articles;
    };

    setArticles(generateArticles());
  }, []);

  return articles;
};

export default useRandomArticles;
