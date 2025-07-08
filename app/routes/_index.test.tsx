// This is a test file for the index route. It uses Vitest, the test runner.
import { describe, it, expect, vi } from 'vitest';
import { loader } from './_index';
import Parser from 'rss-parser';

// 'describe' is a way to group related tests together.
describe('Index route loader', () => {
  // 'it' defines an individual test case.
  it('should fetch and parse the RSS feed and return the articles', async () => {
    // This is a mock of the RSS feed data that we expect to receive.
    const mockFeed = {
      items: [
        {
          title: 'Test Article 1',
          link: 'https://example.com/1',
          pubDate: new Date().toISOString(),
          content: 'Test content 1',
        },
        {
          title: 'Test Article 2',
          link: 'https://example.com/2',
          pubDate: new Date().toISOString(),
          content: 'Test content 2',
        },
      ],
    };

    // We are mocking the 'rss-parser' library to avoid making a real network request during the test.
    // This makes the test faster and more reliable.
    vi.spyOn(Parser.prototype, 'parseURL').mockResolvedValue(mockFeed);

    // We call the loader function directly to test its logic.
    // We need to pass a mock request object to the loader.
    const request = new Request('https://example.com');
    const response = await loader({ request, context: {}, params: {} });

    // We need to assert that the response is a Response object before calling .json()
    expect(response).toBeInstanceOf(Response);

    // The loader returns a Response object, so we need to call .json() to get the data.
    const { articles } = await (response as Response).json();

    // 'expect' is used to make assertions about the result.
    // We are checking that the articles returned by the loader match our mock data.
    expect(articles).toHaveLength(2);
    expect(articles[0].title).toBe('Test Article 1');
    expect(articles[1].title).toBe('Test Article 2');
  });
});
