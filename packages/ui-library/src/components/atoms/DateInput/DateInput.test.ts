import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import DateInput from './DateInput.vue'

describe('DateInput', () => {
  describe('Rendering', () => {
    it('should render date input field', () => {
      // Arrange & Act
      const { container } = render(DateInput)

      // Assert
      const input = container.querySelector('input[type="date"]')
      expect(input).toBeInTheDocument()
    })

    it('should render with label', () => {
      // Arrange & Act
      render(DateInput, {
        props: {
          label: 'Birth Date',
        },
      })

      // Assert
      expect(screen.getByText('Birth Date')).toBeInTheDocument()
      expect(screen.getByLabelText('Birth Date')).toBeInTheDocument()
    })

    it('should render with initial value', () => {
      // Arrange & Act
      const { container } = render(DateInput, {
        props: {
          modelValue: '2024-01-15',
        },
      })

      // Assert
      const input = container.querySelector('input[type="date"]')
      expect(input).toHaveValue('2024-01-15')
    })

    it('should show required asterisk when required', () => {
      // Arrange & Act
      const { container } = render(DateInput, {
        props: {
          label: 'Start Date',
          required: true,
        },
      })

      // Assert
      const asterisk = container.querySelector('.text-red-500')
      expect(asterisk).toBeInTheDocument()
      expect(asterisk?.textContent).toBe('*')
    })

    it('should render helper text', () => {
      // Arrange & Act
      render(DateInput, {
        props: {
          helperText: 'Select your birth date',
        },
      })

      // Assert
      expect(screen.getByText('Select your birth date')).toBeInTheDocument()
    })

    it('should render error message', () => {
      // Arrange & Act
      render(DateInput, {
        props: {
          error: 'Invalid date',
        },
      })

      // Assert
      expect(screen.getByText('Invalid date')).toBeInTheDocument()
    })

    it('should render calendar icon', () => {
      // Arrange & Act
      const { container } = render(DateInput)

      // Assert
      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Props', () => {
    it('should be disabled when disabled prop is true', () => {
      // Arrange & Act
      const { container } = render(DateInput, {
        props: {
          disabled: true,
        },
      })

      // Assert
      const input = container.querySelector('input[type="date"]')
      expect(input).toBeDisabled()
    })

    it('should have min attribute', () => {
      // Arrange & Act
      const { container } = render(DateInput, {
        props: {
          min: '2024-01-01',
        },
      })

      // Assert
      const input = container.querySelector('input[type="date"]')
      expect(input).toHaveAttribute('min', '2024-01-01')
    })

    it('should have max attribute', () => {
      // Arrange & Act
      const { container } = render(DateInput, {
        props: {
          max: '2024-12-31',
        },
      })

      // Assert
      const input = container.querySelector('input[type="date"]')
      expect(input).toHaveAttribute('max', '2024-12-31')
    })

    it('should have required attribute when required', () => {
      // Arrange & Act
      const { container } = render(DateInput, {
        props: {
          required: true,
        },
      })

      // Assert
      const input = container.querySelector('input[type="date"]')
      expect(input).toBeRequired()
    })

    it('should apply error styles when error prop is provided', () => {
      // Arrange & Act
      const { container } = render(DateInput, {
        props: {
          error: 'Error message',
        },
      })

      // Assert
      const input = container.querySelector('input')
      expect(input).toHaveClass('border-red-300')
    })
  })

  describe('Events', () => {
    it('should emit update:modelValue and input events on date selection', async () => {
      // Arrange
      const user = userEvent.setup()
      const onUpdateModelValue = vi.fn()
      const onInput = vi.fn()

      const { container } = render(DateInput, {
        props: {
          'onUpdate:modelValue': onUpdateModelValue,
          onInput,
        },
      })

      // Act
      const input = container.querySelector('input[type="date"]') as HTMLInputElement
      await user.type(input, '2024-01-15')

      // Assert
      expect(onUpdateModelValue).toHaveBeenCalled()
      expect(onInput).toHaveBeenCalled()
    })

    it('should emit change event', async () => {
      // Arrange
      const user = userEvent.setup()
      const onChange = vi.fn()

      const { container } = render(DateInput, {
        props: {
          onChange,
        },
      })

      // Act
      const input = container.querySelector('input[type="date"]') as HTMLInputElement
      await user.type(input, '2024-01-15')
      await user.tab()

      // Assert
      expect(onChange).toHaveBeenCalled()
    })

    it('should emit focus event', async () => {
      // Arrange
      const user = userEvent.setup()
      const onFocus = vi.fn()

      const { container } = render(DateInput, {
        props: {
          onFocus,
        },
      })

      // Act
      const input = container.querySelector('input[type="date"]') as HTMLInputElement
      await user.click(input)

      // Assert
      expect(onFocus).toHaveBeenCalledTimes(1)
    })

    it('should emit blur event', async () => {
      // Arrange
      const user = userEvent.setup()
      const onBlur = vi.fn()

      const { container } = render(DateInput, {
        props: {
          onBlur,
        },
      })

      // Act
      const input = container.querySelector('input[type="date"]') as HTMLInputElement
      await user.click(input)
      await user.tab()

      // Assert
      expect(onBlur).toHaveBeenCalledTimes(1)
    })

    it('should not emit events when disabled', async () => {
      // Arrange
      const user = userEvent.setup()
      const onUpdateModelValue = vi.fn()
      const onInput = vi.fn()

      const { container } = render(DateInput, {
        props: {
          disabled: true,
          'onUpdate:modelValue': onUpdateModelValue,
          onInput,
        },
      })

      // Act
      const input = container.querySelector('input[type="date"]') as HTMLInputElement
      await user.type(input, '2024-01-15')

      // Assert
      expect(onUpdateModelValue).not.toHaveBeenCalled()
      expect(onInput).not.toHaveBeenCalled()
    })
  })
})
