// This file is the root of your application. Think of it as the main layout or template for every page.
// In a traditional backend framework like Django or Rails, this would be equivalent to your base.html or application.html.erb.
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import stylesheet from './styles/app.css';

// This is a Remix-specific function that tells the framework which stylesheets to include on the page.
// It's a bit like a static file collector in a backend framework.
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }];

// This is the main component for the application. It's a React component, which is a function that returns HTML-like syntax called JSX.
export default function App() {
  return (
    // This is the root HTML document for the entire application.
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* The <Meta /> component renders meta tags for the page, like the title and description.
            These are often dynamically set by the specific route being rendered. */}
        <Meta />
        {/* The <Links /> component renders all the <link> tags for the stylesheets defined in the `links` function above. */}
        <Links />
      </head>
      <body>
        <div className="container">
          <header className="header">
            <div className="header-content">
              <h1 className="header-title">RSS Reader</h1>
            </div>
          </header>
          <main>
            <div className="content">
              {/* The <Outlet /> component is the placeholder where the content for the specific route will be rendered.
                  For example, if you navigate to /posts/1, the component for that route will be rendered here.
                  This is similar to a template block or a `yield` in other frameworks. */}
              <Outlet />
            </div>
          </main>
        </div>
        {/* The <ScrollRestoration /> component is a Remix feature that restores the scroll position when you navigate back and forth in the browser history. */}
        <ScrollRestoration />
        {/* The <Scripts /> component renders all the <script> tags needed for the application to run on the client-side. */}
        <Scripts />
      </body>
    </html>
  );
}
