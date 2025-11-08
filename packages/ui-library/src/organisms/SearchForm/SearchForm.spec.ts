import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm.vue';

describe('SearchForm', () => {
  it('renders search form with heading', () => {
    render(SearchForm);

    expect(screen.getByRole('heading', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter search query/i)).toBeInTheDocument();
  });

  it('emits search event with valid query', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(SearchForm, {
      props: {
        onSearch,
        minLength: 3,
      },
    });

    const input = screen.getByPlaceholderText(/enter search query/i);
    await user.type(input, 'test query');

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('test query');
  });

  it('shows error when query is too short', async () => {
    const user = userEvent.setup();

    render(SearchForm, {
      props: {
        minLength: 5,
      },
    });

    const input = screen.getByPlaceholderText(/enter search query/i);
    await user.type(input, 'test');

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    expect(screen.getByText(/must be at least 5 characters/i)).toBeInTheDocument();
  });

  it('does not emit search when validation fails', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(SearchForm, {
      props: {
        onSearch,
        minLength: 10,
      },
    });

    const input = screen.getByPlaceholderText(/enter search query/i);
    await user.type(input, 'short');

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });
});
