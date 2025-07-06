import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import stylesheet from './styles/app.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
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
              <Outlet />
            </div>
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
