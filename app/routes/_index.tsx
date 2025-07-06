import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Parser from 'rss-parser';

type Article = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
};

export const loader: LoaderFunction = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL('https://www.theverge.com/rss/index.xml');
  const articles = feed.items.map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    content: item.content,
  }));
  return json({ articles });
};

export default function Index() {
  const { articles } = useLoaderData<{ articles: Article[] }>();
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <div key={article.link} className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold">
            <a href={article.link}>{article.title}</a>
          </h2>
          <p className="text-gray-500">{new Date(article.pubDate).toLocaleDateString()}</p>
          <div className="prose mt-2" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      ))}
    </div>
  );
}
