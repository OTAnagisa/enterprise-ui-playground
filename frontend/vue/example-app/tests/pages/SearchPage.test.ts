import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import SearchPage from '@/pages/SearchPage.vue'
import * as searchApi from '@/services/searchApi'

vi.mock('@/services/searchApi')

// Mock UI Library components
vi.mock('ui-library', () => ({
  Button: {
    name: 'Button',
    template: '<button @click="$emit(\'click\')" :disabled="disabled"><slot /></button>',
    props: ['disabled']
  },
  SearchInput: {
    name: 'SearchInput',
    template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" @keyup="$emit(\'keyup\', $event)" :placeholder="placeholder" />',
    props: ['modelValue', 'placeholder']
  }
}))

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render search page with title', () => {
    render(SearchPage)

    expect(screen.getByText('Search App')).toBeTruthy()
  })

  it('should render search input and button', () => {
    render(SearchPage)

    const input = screen.getByPlaceholderText('Enter search query...')
    const button = screen.getByText('Search')

    expect(input).toBeTruthy()
    expect(button).toBeTruthy()
  })

  it('should perform search when button is clicked', async () => {
    const mockResults = {
      results: [
        { id: '1', title: 'Result 1', description: 'Description 1' }
      ],
      total: 1
    }

    vi.mocked(searchApi.searchApi).mockResolvedValue(mockResults)

    render(SearchPage)

    const input = screen.getByPlaceholderText('Enter search query...')
    const button = screen.getByText('Search')

    await fireEvent.update(input, 'test query')
    await fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Result 1')).toBeTruthy()
      expect(screen.getByText('Description 1')).toBeTruthy()
    })

    expect(searchApi.searchApi).toHaveBeenCalledWith('test query')
  })

  it('should show loading state during search', async () => {
    let resolveSearch: (value: any) => void
    const searchPromise = new Promise((resolve) => {
      resolveSearch = resolve
    })

    vi.mocked(searchApi.searchApi).mockReturnValue(searchPromise as any)

    render(SearchPage)

    const input = screen.getByPlaceholderText('Enter search query...')
    const button = screen.getByText('Search')

    await fireEvent.update(input, 'test')
    await fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Searching...')).toBeTruthy()
    })

    resolveSearch!({ results: [], total: 0 })
  })

  it('should display error message on search failure', async () => {
    vi.mocked(searchApi.searchApi).mockRejectedValue(new Error('Search failed: Network error'))

    render(SearchPage)

    const input = screen.getByPlaceholderText('Enter search query...')
    const button = screen.getByText('Search')

    await fireEvent.update(input, 'test')
    await fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Search failed: Network error')).toBeTruthy()
    })
  })

  it('should show no results message when search returns empty', async () => {
    vi.mocked(searchApi.searchApi).mockResolvedValue({ results: [], total: 0 })

    render(SearchPage)

    const input = screen.getByPlaceholderText('Enter search query...')
    const button = screen.getByText('Search')

    await fireEvent.update(input, 'test')
    await fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/No results found for "test"/)).toBeTruthy()
    })
  })
})
