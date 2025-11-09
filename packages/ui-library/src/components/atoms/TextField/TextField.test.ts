import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import TextField from './TextField.vue'

describe('TextField', () => {
  describe('Rendering', () => {
    it('should render input field', () => {
      // Arrange & Act
      render(TextField, {
        props: {
          placeholder: 'Enter text',
        },
      })

      // Assert
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('should render with label', () => {
      // Arrange & Act
      render(TextField, {
        props: {
          label: 'Username',
        },
      })

      // Assert
      expect(screen.getByText('Username')).toBeInTheDocument()
      expect(screen.getByLabelText('Username')).toBeInTheDocument()
    })

    it('should render with initial value', () => {
      // Arrange & Act
      render(TextField, {
        props: {
          modelValue: 'Initial value',
        },
      })

      // Assert
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('Initial value')
    })

    it('should show required asterisk when required', () => {
      // Arrange & Act
      const { container } = render(TextField, {
        props: {
          label: 'Email',
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
      render(TextField, {
        props: {
          helperText: 'Please enter your name',
        },
      })

      // Assert
      expect(screen.getByText('Please enter your name')).toBeInTheDocument()
    })

    it('should render error message', () => {
      // Arrange & Act
      render(TextField, {
        props: {
          error: 'This field is required',
        },
      })

      // Assert
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('should prioritize error over helper text', () => {
      // Arrange & Act
      render(TextField, {
        props: {
          error: 'Error message',
          helperText: 'Helper text',
        },
      })

      // Assert
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
    })
  })

  describe('Props', () => {
    it('should be disabled when disabled prop is true', () => {
      // Arrange & Act
      render(TextField, {
        props: {
          disabled: true,
        },
      })

      // Assert
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })

    it('should have correct input type', () => {
      // Arrange & Act
      const { container } = render(TextField, {
        props: {
          type: 'email',
        },
      })

      // Assert
      const input = container.querySelector('input[type="email"]')
      expect(input).toBeInTheDocument()
    })

    it('should have required attribute when required', () => {
      // Arrange & Act
      render(TextField, {
        props: {
          required: true,
          label: 'Required field',
        },
      })

      // Assert
      const input = screen.getByRole('textbox')
      expect(input).toBeRequired()
    })

    it('should apply error styles when error prop is provided', () => {
      // Arrange & Act
      const { container } = render(TextField, {
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
    it('should emit update:modelValue and input events on user input', async () => {
      // Arrange
      const user = userEvent.setup()
      const onUpdateModelValue = vi.fn()
      const onInput = vi.fn()

      render(TextField, {
        props: {
          'onUpdate:modelValue': onUpdateModelValue,
          onInput,
        },
      })

      // Act
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')

      // Assert
      expect(onUpdateModelValue).toHaveBeenCalled()
      expect(onInput).toHaveBeenCalled()
      expect(onUpdateModelValue).toHaveBeenLastCalledWith('test')
    })

    it('should emit change event', async () => {
      // Arrange
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(TextField, {
        props: {
          onChange,
        },
      })

      // Act
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      await user.tab()

      // Assert
      expect(onChange).toHaveBeenCalled()
    })

    it('should emit focus event', async () => {
      // Arrange
      const user = userEvent.setup()
      const onFocus = vi.fn()

      render(TextField, {
        props: {
          onFocus,
        },
      })

      // Act
      const input = screen.getByRole('textbox')
      await user.click(input)

      // Assert
      expect(onFocus).toHaveBeenCalledTimes(1)
    })

    it('should emit blur event', async () => {
      // Arrange
      const user = userEvent.setup()
      const onBlur = vi.fn()

      render(TextField, {
        props: {
          onBlur,
        },
      })

      // Act
      const input = screen.getByRole('textbox')
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

      render(TextField, {
        props: {
          disabled: true,
          'onUpdate:modelValue': onUpdateModelValue,
          onInput,
        },
      })

      // Act
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')

      // Assert
      expect(onUpdateModelValue).not.toHaveBeenCalled()
      expect(onInput).not.toHaveBeenCalled()
    })
  })

  describe('Input Types', () => {
    it('should render password input', () => {
      // Arrange & Act
      const { container } = render(TextField, {
        props: {
          type: 'password',
        },
      })

      // Assert
      const input = container.querySelector('input[type="password"]')
      expect(input).toBeInTheDocument()
    })

    it('should render number input', () => {
      // Arrange & Act
      const { container } = render(TextField, {
        props: {
          type: 'number',
        },
      })

      // Assert
      const input = container.querySelector('input[type="number"]')
      expect(input).toBeInTheDocument()
    })
  })
})
