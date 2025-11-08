import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar.vue';

describe('SearchBar', () => {
  it('renders with default props', () => {
    render(SearchBar);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('emits search event when button is clicked', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(SearchBar, {
      props: {
        onSearch,
      },
    });

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'test query');
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('test query');
  });

  it('emits search event when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(SearchBar, {
      props: {
        onSearch,
      },
    });

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test query{Enter}');

    expect(onSearch).toHaveBeenCalledWith('test query');
  });

  it('disables button when query is empty', () => {
    render(SearchBar);

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeDisabled();
  });

  it('enables button when query has value', async () => {
    const user = userEvent.setup();

    render(SearchBar);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    expect(button).toBeDisabled();

    await user.type(input, 'test');
    expect(button).not.toBeDisabled();
  });

  it('disables all controls when disabled prop is true', () => {
    render(SearchBar, {
      props: {
        disabled: true,
      },
    });

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('uses custom placeholder text', () => {
    render(SearchBar, {
      props: {
        placeholder: 'Enter search term',
      },
    });

    expect(screen.getByPlaceholderText('Enter search term')).toBeInTheDocument();
  });

  it('uses custom button text', () => {
    render(SearchBar, {
      props: {
        buttonText: 'Find',
      },
    });

    expect(screen.getByRole('button', { name: /find/i })).toBeInTheDocument();
  });
});
