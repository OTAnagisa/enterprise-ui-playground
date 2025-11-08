import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import SearchResultList from './SearchResultList.vue';
import type { SearchResult } from '@/types';

describe('SearchResultList', () => {
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Result 1',
      description: 'Description 1',
      url: 'https://example1.com',
    },
    {
      id: '2',
      title: 'Result 2',
      description: 'Description 2',
      url: 'https://example2.com',
    },
  ];

  it('renders list of search results', () => {
    render(SearchResultList, {
      props: {
        results: mockResults,
        total: 2,
      },
    });

    expect(screen.getByText('Result 1')).toBeInTheDocument();
    expect(screen.getByText('Result 2')).toBeInTheDocument();
  });

  it('displays total count', () => {
    render(SearchResultList, {
      props: {
        results: mockResults,
        total: 2,
      },
    });

    expect(screen.getByText('Found 2 results')).toBeInTheDocument();
  });

  it('displays singular form for single result', () => {
    render(SearchResultList, {
      props: {
        results: [mockResults[0]],
        total: 1,
      },
    });

    expect(screen.getByText('Found 1 result')).toBeInTheDocument();
  });

  it('shows no results message when results array is empty', () => {
    render(SearchResultList, {
      props: {
        results: [],
        total: 0,
      },
    });

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('renders correct number of result items', () => {
    const { container } = render(SearchResultList, {
      props: {
        results: mockResults,
        total: 2,
      },
    });

    const resultItems = container.querySelectorAll('[class*="bg-white rounded-lg shadow"]');
    expect(resultItems.length).toBe(2);
  });
});
