import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Button from './Button.vue'

describe('Button', () => {
  describe('Rendering', () => {
    it('should render button with text content', () => {
      // Arrange & Act
      render(Button, {
        slots: {
          default: 'Click me',
        },
      })

      // Assert
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('should render with primary variant by default', () => {
      // Arrange & Act
      const { container } = render(Button, {
        slots: {
          default: 'Button',
        },
      })

      // Assert
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-primary-600')
    })

    it('should render with secondary variant when specified', () => {
      // Arrange & Act
      const { container } = render(Button, {
        props: {
          variant: 'secondary',
        },
        slots: {
          default: 'Button',
        },
      })

      // Assert
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-gray-600')
    })

    it('should render with outline variant when specified', () => {
      // Arrange & Act
      const { container } = render(Button, {
        props: {
          variant: 'outline',
        },
        slots: {
          default: 'Button',
        },
      })

      // Assert
      const button = container.querySelector('button')
      expect(button).toHaveClass('border-primary-600')
    })

    it('should render with danger variant when specified', () => {
      // Arrange & Act
      const { container } = render(Button, {
        props: {
          variant: 'danger',
        },
        slots: {
          default: 'Button',
        },
      })

      // Assert
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-red-600')
    })

    it('should render full width button when fullWidth prop is true', () => {
      // Arrange & Act
      const { container } = render(Button, {
        props: {
          fullWidth: true,
        },
        slots: {
          default: 'Button',
        },
      })

      // Assert
      const button = container.querySelector('button')
      expect(button).toHaveClass('w-full')
    })
  })

  describe('Props', () => {
    it('should be disabled when disabled prop is true', () => {
      // Arrange & Act
      render(Button, {
        props: {
          disabled: true,
        },
        slots: {
          default: 'Disabled Button',
        },
      })

      // Assert
      const button = screen.getByRole('button', { name: 'Disabled Button' })
      expect(button).toBeDisabled()
    })

    it('should have correct type attribute', () => {
      // Arrange & Act
      render(Button, {
        props: {
          type: 'submit',
        },
        slots: {
          default: 'Submit',
        },
      })

      // Assert
      const button = screen.getByRole('button', { name: 'Submit' })
      expect(button).toHaveAttribute('type', 'submit')
    })
  })

  describe('Events', () => {
    it('should emit click event when clicked', async () => {
      // Arrange
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(Button, {
        props: {
          onClick,
        },
        slots: {
          default: 'Click me',
        },
      })

      // Act
      const button = screen.getByRole('button', { name: 'Click me' })
      await user.click(button)

      // Assert
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent))
    })

    it('should not emit click event when disabled', async () => {
      // Arrange
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(Button, {
        props: {
          disabled: true,
          onClick,
        },
        slots: {
          default: 'Disabled',
        },
      })

      // Act
      const button = screen.getByRole('button', { name: 'Disabled' })
      await user.click(button)

      // Assert
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})
