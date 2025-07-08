// This file defines the route for the homepage of the application (the "/" path).
// In Remix, the file path `app/routes/_index.tsx` maps to the URL `/`.
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Parser from 'rss-parser';

// This is a TypeScript type definition for an article.
// It's similar to a struct or a data class in other languages.
type Article = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
};

// This is a Remix 'loader' function. It runs on the server before the page is rendered.
// You can think of it as a controller method that fetches data for the template.
// It's a great way to keep your data-fetching logic separate from your presentation components.
export const loader: LoaderFunction = async () => {
  const parser = new Parser();
  // This is currently hardcoded to fetch from The Verge's RSS feed.
  const feed = await parser.parseURL('https://www.theverge.com/rss/index.xml');
  const articles = feed.items.map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    content: item.content,
  }));
  // The `json` function is a helper from Remix that returns a JSON response.
  // This data will be available to the component on the frontend.
  return json({ articles });
};

// This is the React component for the index page.
export default function Index() {
  // The `useLoaderData` hook is a Remix feature that gives you access to the data returned from the `loader` function.
  // It's how the frontend component gets the data that was fetched on the server.
  const { articles } = useLoaderData<{ articles: Article[] }>();
  return (
    <div className="articles">
      {/* This is JSX, which is a syntax extension for JavaScript that looks like HTML.
          We are mapping over the `articles` array and rendering a div for each article. */}
      {articles.map((article) => (
        <div key={article.link} className="article">
          <h2 className="article-title">
            <a href={article.link}>{article.title}</a>
          </h2>
          <p className="article-meta">{new Date(article.pubDate).toLocaleDateString()}</p>
          {/* The `dangerouslySetInnerHTML` attribute is React's equivalent of `innerHTML`.
              It's used here to render the HTML content of the article.
              It's called "dangerous" because it can expose your users to cross-site scripting (XSS) attacks if the content is not properly sanitized.
              In this case, we are trusting the content from the RSS feed. */}
          <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      ))}
    </div>
  );
}
