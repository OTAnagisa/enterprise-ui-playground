import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import SearchResultItem from './SearchResultItem.vue';
import type { SearchResult } from '@/types';

describe('SearchResultItem', () => {
  const mockResult: SearchResult = {
    id: '1',
    title: 'Test Result',
    description: 'This is a test description',
    url: 'https://example.com',
  };

  it('renders search result information', () => {
    render(SearchResultItem, {
      props: {
        result: mockResult,
      },
    });

    expect(screen.getByText('Test Result')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
    expect(screen.getAllByText('https://example.com')[0]).toBeInTheDocument();
  });

  it('renders links with correct href', () => {
    render(SearchResultItem, {
      props: {
        result: mockResult,
      },
    });

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('displays different result data', () => {
    const anotherResult: SearchResult = {
      id: '2',
      title: 'Another Result',
      description: 'Different description',
      url: 'https://another.com',
    };

    render(SearchResultItem, {
      props: {
        result: anotherResult,
      },
    });

    expect(screen.getByText('Another Result')).toBeInTheDocument();
    expect(screen.getByText('Different description')).toBeInTheDocument();
  });
});
