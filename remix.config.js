/** @type {import('@remix-run/dev').AppConfig} */
// This file configures Remix, the full-stack web framework used in this project.
// For a backend engineer, you can think of this as the central configuration file for the web server and build process,
// similar to a settings.py in Django or an application.properties in Spring Boot.
export default {
  // This option tells Remix to ignore certain files when looking for "routes".
  // In Remix, files in the app/routes/ directory automatically become URL endpoints.
  // We're ignoring dotfiles (like .DS_Store) and any test files.
  ignoredRouteFiles: ['**/.*', '**/*.test.{js,jsx,ts,tsx}'],

  // The following lines are commented out, but show the default values.
  // 'appDirectory': "app", // The directory where Remix looks for your application code.
  // 'assetsBuildDirectory': "public/build", // The directory where compiled frontend assets (CSS, JS) are placed.
  // 'publicPath': "/build/", // The URL path for the assets.
  // 'serverBuildPath': "build/index.js", // The path to the compiled server-side code.

  // This section is for polyfilling Node.js built-in modules for the browser.
  // Some frontend libraries might have been originally written for Node.js and use modules like 'http' or 'stream'.
  // Since browsers don't have these built-in, this configuration tells the build tool (Vite) to include
  // browser-compatible versions (polyfills) of these modules in the final JavaScript bundle.
  // This is often necessary when a dependency meant for the server is used in frontend code.
  browserNodeBuiltinsPolyfill: {
    modules: {
      http: true,
      https: true,
      stream: true,
      string_decoder: true,
      events: true,
      timers: true,
      url: true,
    },
  },
};
