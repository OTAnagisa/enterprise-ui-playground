import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SearchPage from './SearchPage.vue';
import type { SearchResponse } from '@/types';

// Mock the searchService
vi.mock('@/services/searchService', () => ({
  searchService: {
    search: vi.fn(),
  },
}));

import { searchService } from '@/services/searchService';

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search bar', () => {
    render(SearchPage);

    expect(screen.getByPlaceholderText(/search for anything/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('performs search and displays results', async () => {
    const user = userEvent.setup();
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

    vi.mocked(searchService.search).mockResolvedValue(mockResponse);

    render(SearchPage);

    const input = screen.getByPlaceholderText(/search for anything/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'test query');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Test Result')).toBeInTheDocument();
    });

    expect(screen.getByText('Found 1 result')).toBeInTheDocument();
  });

  it('shows loading state during search', async () => {
    const user = userEvent.setup();
    let resolveSearch: (value: SearchResponse) => void;
    const searchPromise = new Promise<SearchResponse>((resolve) => {
      resolveSearch = resolve;
    });

    vi.mocked(searchService.search).mockReturnValue(searchPromise);

    render(SearchPage);

    const input = screen.getByPlaceholderText(/search for anything/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'test');
    await user.click(button);

    expect(screen.getByText(/searching/i)).toBeInTheDocument();

    resolveSearch!({ results: [], total: 0, page: 1 });

    await waitFor(() => {
      expect(screen.queryByText(/searching/i)).not.toBeInTheDocument();
    });
  });

  it('displays error message on search failure', async () => {
    const user = userEvent.setup();
    vi.mocked(searchService.search).mockRejectedValue(new Error('Search failed'));

    render(SearchPage);

    const input = screen.getByPlaceholderText(/search for anything/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'test');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/search failed/i)).toBeInTheDocument();
    });
  });

  it('shows no results message when search returns empty', async () => {
    const user = userEvent.setup();
    vi.mocked(searchService.search).mockResolvedValue({
      results: [],
      total: 0,
      page: 1,
    });

    render(SearchPage);

    const input = screen.getByPlaceholderText(/search for anything/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'nonexistent');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });
});
