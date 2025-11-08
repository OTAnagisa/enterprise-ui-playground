import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSearch } from './useSearch';
import type { SearchResponse } from '@/types';

// Mock the searchService module
vi.mock('@/services/searchService', () => ({
  searchService: {
    search: vi.fn(),
  },
}));

import { searchService } from '@/services/searchService';

describe('useSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with empty state', () => {
    const { results, loading, error, total } = useSearch();

    expect(results.value).toEqual([]);
    expect(loading.value).toBe(false);
    expect(error.value).toBe(null);
    expect(total.value).toBe(0);
  });

  it('performs search and updates results', async () => {
    const mockResponse: SearchResponse = {
      results: [
        {
          id: '1',
          title: 'Test Result',
          description: 'Description',
          url: 'https://example.com',
        },
      ],
      total: 1,
      page: 1,
    };

    vi.mocked(searchService.search).mockResolvedValue(mockResponse);

    const { results, loading, error, total, search } = useSearch();

    await search('test query');

    expect(searchService.search).toHaveBeenCalledWith('test query');
    expect(results.value).toEqual(mockResponse.results);
    expect(total.value).toBe(1);
    expect(loading.value).toBe(false);
    expect(error.value).toBe(null);
  });

  it('sets loading state during search', async () => {
    let resolveSearch: (value: SearchResponse) => void;
    const searchPromise = new Promise<SearchResponse>((resolve) => {
      resolveSearch = resolve;
    });

    vi.mocked(searchService.search).mockReturnValue(searchPromise);

    const { loading, search } = useSearch();

    const searchPromiseResult = search('test');
    expect(loading.value).toBe(true);

    resolveSearch!({
      results: [],
      total: 0,
      page: 1,
    });

    await searchPromiseResult;
    expect(loading.value).toBe(false);
  });

  it('handles search errors', async () => {
    const errorMessage = 'Search failed';
    vi.mocked(searchService.search).mockRejectedValue(new Error(errorMessage));

    const { results, error, total, search } = useSearch();

    await search('test query');

    expect(error.value).toEqual({ message: errorMessage });
    expect(results.value).toEqual([]);
    expect(total.value).toBe(0);
  });

  it('does not search with empty query', async () => {
    const { search } = useSearch();

    await search('');
    expect(searchService.search).not.toHaveBeenCalled();

    await search('   ');
    expect(searchService.search).not.toHaveBeenCalled();
  });

  it('clears search results', async () => {
    const mockResponse: SearchResponse = {
      results: [{ id: '1', title: 'Test', description: 'Desc', url: 'https://example.com' }],
      total: 1,
      page: 1,
    };

    vi.mocked(searchService.search).mockResolvedValue(mockResponse);

    const { results, total, error, loading, search, clear } = useSearch();

    await search('test');
    expect(results.value.length).toBe(1);

    clear();

    expect(results.value).toEqual([]);
    expect(total.value).toBe(0);
    expect(error.value).toBe(null);
    expect(loading.value).toBe(false);
  });
});
