import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchService } from './searchService';
import type { SearchResponse } from '@/types';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    service = new SearchService('http://test-api.com');
    vi.clearAllMocks();
  });

  it('makes a GET request to the search endpoint', async () => {
    const mockResponse: SearchResponse = {
      results: [
        {
          id: '1',
          title: 'Test Result',
          description: 'Test description',
          url: 'https://example.com',
        },
      ],
      total: 1,
      page: 1,
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await service.search('test query');

    expect(fetch).toHaveBeenCalledWith(
      'http://test-api.com/search?q=test%20query&page=1'
    );
    expect(result).toEqual(mockResponse);
  });

  it('encodes query parameters correctly', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [], total: 0, page: 1 }),
    });

    await service.search('test & special chars', 2);

    expect(fetch).toHaveBeenCalledWith(
      'http://test-api.com/search?q=test%20%26%20special%20chars&page=2'
    );
  });

  it('throws error when response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    await expect(service.search('test')).rejects.toThrow('Search failed: Not Found');
  });

  it('throws error when fetch fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(service.search('test')).rejects.toThrow('Network error');
  });
});
