import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import SearchInput from './SearchInput.vue'

// Mock fetch
global.fetch = vi.fn()

describe('SearchInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  describe('Rendering', () => {
    it('should render input with default placeholder', () => {
      // Arrange & Act
      render(SearchInput)

      // Assert
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    })

    it('should render input with custom placeholder', () => {
      // Arrange & Act
      render(SearchInput, {
        props: {
          placeholder: 'Search products...',
        },
      })

      // Assert
      expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument()
    })

    it('should render with initial value', () => {
      // Arrange & Act
      render(SearchInput, {
        props: {
          modelValue: 'Initial value',
        },
      })

      // Assert
      const input = screen.getByPlaceholderText('Search...')
      expect(input).toHaveValue('Initial value')
    })

    it('should show clear button when input has value', () => {
      // Arrange & Act
      const { container } = render(SearchInput, {
        props: {
          modelValue: 'Some text',
        },
      })

      // Assert
      const clearButton = container.querySelector('button[type="button"]')
      expect(clearButton).toBeInTheDocument()
    })

    it('should not show clear button when input is empty', () => {
      // Arrange & Act
      const { container } = render(SearchInput, {
        props: {
          modelValue: '',
        },
      })

      // Assert
      const clearButton = container.querySelector('button[type="button"]')
      expect(clearButton).not.toBeInTheDocument()
    })
  })

  describe('Props', () => {
    it('should update input value when modelValue prop changes', async () => {
      // Arrange
      const { rerender } = render(SearchInput, {
        props: {
          modelValue: 'Initial',
        },
      })

      // Act
      await rerender({
        modelValue: 'Updated',
      })

      // Assert
      const input = screen.getByPlaceholderText('Search...')
      expect(input).toHaveValue('Updated')
    })
  })

  describe('Events', () => {
    it('should emit update:modelValue and input events on user input', async () => {
      // Arrange
      const user = userEvent.setup()
      const onUpdateModelValue = vi.fn()
      const onInput = vi.fn()
      
      render(SearchInput, {
        props: {
          'onUpdate:modelValue': onUpdateModelValue,
          onInput,
        },
      })

      // Act
      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, 'test')

      // Assert
      expect(onUpdateModelValue).toHaveBeenCalled()
      expect(onInput).toHaveBeenCalled()
      expect(onUpdateModelValue).toHaveBeenLastCalledWith('test')
    })

    it('should emit change event on blur', async () => {
      // Arrange
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(SearchInput, {
        props: {
          onChange,
        },
      })

      // Act
      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, 'test')
      await user.tab() // Trigger blur

      // Assert
      expect(onChange).toHaveBeenCalled()
    })

    it('should emit submit event when form is submitted', async () => {
      // Arrange
      const user = userEvent.setup()
      const onSubmit = vi.fn()
      
      render(SearchInput, {
        props: {
          modelValue: 'search query',
          onSubmit,
        },
      })

      // Act
      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, '{Enter}')

      // Assert
      expect(onSubmit).toHaveBeenCalledWith('search query')
    })

    it('should clear input when clear button is clicked', async () => {
      // Arrange
      const user = userEvent.setup()
      const onUpdateModelValue = vi.fn()
      const onInput = vi.fn()
      const onChange = vi.fn()
      
      const { container } = render(SearchInput, {
        props: {
          modelValue: 'test value',
          'onUpdate:modelValue': onUpdateModelValue,
          onInput,
          onChange,
        },
      })

      // Act
      const clearButton = container.querySelector('button[type="button"]')
      expect(clearButton).toBeInTheDocument()
      await user.click(clearButton!)

      // Assert
      expect(onUpdateModelValue).toHaveBeenCalledWith('')
      expect(onInput).toHaveBeenCalledWith('')
      expect(onChange).toHaveBeenCalledWith('')
    })
  })

  describe('API Integration', () => {
    it('should fetch suggestions when user types', async () => {
      // Arrange
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      
      ;(global.fetch as any).mockResolvedValueOnce({
        json: async () => ({
          suggestions: ['vue suggestion 1', 'vue suggestion 2'],
          query: 'vue',
        }),
      })

      render(SearchInput, {
        props: {
          debounceMs: 300,
        },
      })

      // Act
      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, 'vue')
      
      // Fast-forward debounce timer
      vi.advanceTimersByTime(300)

      // Assert
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/suggest?q=vue')
      })

      vi.useRealTimers()
    })

    it('should display suggestions when API returns data', async () => {
      // Arrange
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      
      ;(global.fetch as any).mockResolvedValueOnce({
        json: async () => ({
          suggestions: ['react suggestion 1', 'react suggestion 2', 'react suggestion 3'],
          query: 'react',
        }),
      })

      render(SearchInput)

      // Act
      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, 'react')
      
      vi.advanceTimersByTime(300)

      // Assert
      await waitFor(() => {
        expect(screen.getByText('react suggestion 1')).toBeInTheDocument()
        expect(screen.getByText('react suggestion 2')).toBeInTheDocument()
        expect(screen.getByText('react suggestion 3')).toBeInTheDocument()
      })

      vi.useRealTimers()
    })

    it('should update input value when suggestion is clicked', async () => {
      // Arrange
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      const onUpdateModelValue = vi.fn()
      
      ;(global.fetch as any).mockResolvedValueOnce({
        json: async () => ({
          suggestions: ['typescript suggestion'],
          query: 'type',
        }),
      })

      render(SearchInput, {
        props: {
          'onUpdate:modelValue': onUpdateModelValue,
        },
      })

      // Act
      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, 'type')
      
      vi.advanceTimersByTime(300)

      await waitFor(() => {
        expect(screen.getByText('typescript suggestion')).toBeInTheDocument()
      })

      await user.click(screen.getByText('typescript suggestion'))

      // Assert
      expect(onUpdateModelValue).toHaveBeenCalledWith('typescript suggestion')

      vi.useRealTimers()
    })

    it('should handle API errors gracefully', async () => {
      // Arrange
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      ;(global.fetch as any).mockRejectedValueOnce(new Error('API Error'))

      render(SearchInput)

      // Act
      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, 'error')
      
      vi.advanceTimersByTime(300)

      // Assert
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled()
      })

      consoleErrorSpy.mockRestore()
      vi.useRealTimers()
    })

    it('should debounce API calls', async () => {
      // Arrange
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      
      ;(global.fetch as any).mockResolvedValue({
        json: async () => ({
          suggestions: [],
          query: '',
        }),
      })

      render(SearchInput, {
        props: {
          debounceMs: 300,
        },
      })

      // Act
      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, 'a')
      vi.advanceTimersByTime(100)
      await user.type(input, 'b')
      vi.advanceTimersByTime(100)
      await user.type(input, 'c')
      vi.advanceTimersByTime(300)

      // Assert - should only call API once after debounce period
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith('/api/suggest?q=abc')
      })

      vi.useRealTimers()
    })
  })
})
