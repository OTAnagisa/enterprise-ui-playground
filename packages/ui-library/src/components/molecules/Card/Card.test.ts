import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Card from './Card.vue'

describe('Card', () => {
  describe('Rendering', () => {
    it('should render card with content', () => {
      // Arrange & Act
      render(Card, {
        slots: {
          default: 'Card content',
        },
      })

      // Assert
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('should render with title', () => {
      // Arrange & Act
      render(Card, {
        props: {
          title: 'Card Title',
        },
        slots: {
          default: 'Card content',
        },
      })

      // Assert
      expect(screen.getByText('Card Title')).toBeInTheDocument()
    })

    it('should render custom header slot', () => {
      // Arrange & Act
      render(Card, {
        slots: {
          header: '<div>Custom Header</div>',
          default: 'Card content',
        },
      })

      // Assert
      expect(screen.getByText('Custom Header')).toBeInTheDocument()
    })

    it('should render footer slot', () => {
      // Arrange & Act
      render(Card, {
        slots: {
          default: 'Card content',
          footer: '<div>Footer content</div>',
        },
      })

      // Assert
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })

    it('should not render header if no title or header slot', () => {
      // Arrange & Act
      const { container } = render(Card, {
        slots: {
          default: 'Card content',
        },
      })

      // Assert
      const header = container.querySelector('.border-b')
      expect(header).not.toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('should render default variant', () => {
      // Arrange & Act
      const { container } = render(Card, {
        props: {
          variant: 'default',
        },
        slots: {
          default: 'Content',
        },
      })

      // Assert
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('border')
      expect(card).toHaveClass('border-gray-200')
    })

    it('should render outlined variant', () => {
      // Arrange & Act
      const { container } = render(Card, {
        props: {
          variant: 'outlined',
        },
        slots: {
          default: 'Content',
        },
      })

      // Assert
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('border-2')
    })

    it('should render elevated variant', () => {
      // Arrange & Act
      const { container } = render(Card, {
        props: {
          variant: 'elevated',
        },
        slots: {
          default: 'Content',
        },
      })

      // Assert
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('shadow-lg')
    })
  })

  describe('Padding', () => {
    it('should apply no padding', () => {
      // Arrange & Act
      const { container } = render(Card, {
        props: {
          padding: 'none',
        },
        slots: {
          default: 'Content',
        },
      })

      // Assert
      const body = container.querySelector('div > div')
      expect(body).not.toHaveClass('px-6')
    })

    it('should apply small padding', () => {
      // Arrange & Act
      const { container } = render(Card, {
        props: {
          padding: 'sm',
        },
        slots: {
          default: 'Content',
        },
      })

      // Assert
      const body = container.querySelector('div > div')
      expect(body).toHaveClass('px-4')
      expect(body).toHaveClass('py-3')
    })

    it('should apply medium padding by default', () => {
      // Arrange & Act
      const { container } = render(Card, {
        slots: {
          default: 'Content',
        },
      })

      // Assert
      const body = container.querySelector('div > div')
      expect(body).toHaveClass('px-6')
      expect(body).toHaveClass('py-4')
    })

    it('should apply large padding', () => {
      // Arrange & Act
      const { container } = render(Card, {
        props: {
          padding: 'lg',
        },
        slots: {
          default: 'Content',
        },
      })

      // Assert
      const body = container.querySelector('div > div')
      expect(body).toHaveClass('px-8')
      expect(body).toHaveClass('py-6')
    })
  })

  describe('Interactions', () => {
    it('should have hover classes when hoverable', () => {
      // Arrange & Act
      const { container } = render(Card, {
        props: {
          hoverable: true,
        },
        slots: {
          default: 'Content',
        },
      })

      // Assert
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('hover:shadow-xl')
    })

    it('should have cursor-pointer when clickable', () => {
      // Arrange & Act
      const { container } = render(Card, {
        props: {
          clickable: true,
        },
        slots: {
          default: 'Content',
        },
      })

      // Assert
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('cursor-pointer')
    })

    it('should emit click event when clickable', async () => {
      // Arrange
      const user = userEvent.setup()
      const onClick = vi.fn()

      const { container } = render(Card, {
        props: {
          clickable: true,
          onClick,
        },
        slots: {
          default: 'Clickable content',
        },
      })

      // Act
      const card = container.firstChild as HTMLElement
      await user.click(card)

      // Assert
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should not emit click event when not clickable', async () => {
      // Arrange
      const user = userEvent.setup()
      const onClick = vi.fn()

      const { container } = render(Card, {
        props: {
          clickable: false,
          onClick,
        },
        slots: {
          default: 'Non-clickable content',
        },
      })

      // Act
      const card = container.firstChild as HTMLElement
      await user.click(card)

      // Assert
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})
