// This file configures Vitest, the test runner for this project.
// Vitest is a modern, fast test runner that is compatible with Vite, the build tool used by Remix.
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // This option makes Vitest's APIs (like 'describe', 'it', 'expect') available globally in all test files,
    // so you don't have to import them manually.
    globals: true,
    // This sets the test environment to 'node'. This means the tests will run in a Node.js environment,
    // which is suitable for testing server-side code. For frontend components, you might use 'jsdom' to simulate a browser environment.
    environment: 'node',
    // This configures code coverage reporting.
    coverage: {
      // This specifies the formats for the coverage report.
      // 'text' will output a summary to the console.
      // 'html' will generate a detailed HTML report that you can view in a browser.
      reporter: ['text', 'html'],
    },
  },
});
