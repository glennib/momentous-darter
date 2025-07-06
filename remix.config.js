/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*', '**/*.test.{js,jsx,ts,tsx}'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
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
