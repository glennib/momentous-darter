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
    <div className="articles">
      {articles.map((article) => (
        <div key={article.link} className="article">
          <h2 className="article-title">
            <a href={article.link}>{article.title}</a>
          </h2>
          <p className="article-meta">{new Date(article.pubDate).toLocaleDateString()}</p>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      ))}
    </div>
  );
}
