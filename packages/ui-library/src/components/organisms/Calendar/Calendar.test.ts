import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Calendar from './Calendar.vue'

describe('Calendar', () => {
  describe('Rendering', () => {
    it('should render calendar', () => {
      // Arrange & Act
      const { container } = render(Calendar)

      // Assert
      const calendar = container.querySelector('.grid')
      expect(calendar).toBeInTheDocument()
    })

    it('should render current month and year', () => {
      // Arrange & Act
      render(Calendar)

      // Assert
      const today = new Date()
      const monthYear = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(today)
      expect(screen.getByText(monthYear)).toBeInTheDocument()
    })

    it('should render weekday headers', () => {
      // Arrange & Act
      render(Calendar)

      // Assert
      expect(screen.getByText(/Mon/i)).toBeInTheDocument()
      expect(screen.getByText(/Sun/i)).toBeInTheDocument()
    })

    it('should render 42 day cells (6 weeks)', () => {
      // Arrange & Act
      const { container } = render(Calendar)

      // Assert
      const dayCells = container.querySelectorAll('.grid.grid-cols-7.gap-1:last-child button')
      expect(dayCells).toHaveLength(42)
    })
  })

  describe('Navigation', () => {
    it('should navigate to previous month', async () => {
      // Arrange
      const user = userEvent.setup()
      const { container } = render(Calendar)

      const today = new Date()
      const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const expectedText = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(previousMonth)

      // Act
      const prevButton = container.querySelectorAll('button')[0]
      await user.click(prevButton)

      // Assert
      expect(screen.getByText(expectedText)).toBeInTheDocument()
    })

    it('should navigate to next month', async () => {
      // Arrange
      const user = userEvent.setup()
      const { container } = render(Calendar)

      const today = new Date()
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
      const expectedText = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(nextMonth)

      // Act
      const nextButton = container.querySelectorAll('button')[1]
      await user.click(nextButton)

      // Assert
      expect(screen.getByText(expectedText)).toBeInTheDocument()
    })
  })

  describe('Date Selection', () => {
    it('should emit update:modelValue when date is selected', async () => {
      // Arrange
      const user = userEvent.setup()
      const onUpdateModelValue = vi.fn()
      const onSelect = vi.fn()

      const { container } = render(Calendar, {
        props: {
          'onUpdate:modelValue': onUpdateModelValue,
          onSelect,
        },
      })

      // Act
      const dayCells = container.querySelectorAll('.grid.grid-cols-7.gap-1:last-child button')
      const firstCurrentMonthDay = Array.from(dayCells).find(
        (cell) => !cell.classList.contains('text-gray-400')
      )
      
      if (firstCurrentMonthDay) {
        await user.click(firstCurrentMonthDay as HTMLElement)
      }

      // Assert
      expect(onUpdateModelValue).toHaveBeenCalled()
      expect(onSelect).toHaveBeenCalled()
    })

    it('should highlight selected date', () => {
      // Arrange
      const selectedDate = new Date(2024, 0, 15)

      // Act
      const { container } = render(Calendar, {
        props: {
          modelValue: selectedDate,
        },
      })

      // Assert
      const dayCells = container.querySelectorAll('.grid.grid-cols-7.gap-1:last-child button')
      const selectedCell = Array.from(dayCells).find((cell) =>
        cell.classList.contains('bg-primary-600')
      )
      expect(selectedCell).toBeInTheDocument()
    })
  })

  describe('Date Restrictions', () => {
    it('should disable dates before minDate', () => {
      // Arrange
      const today = new Date()
      const minDate = new Date(today.getFullYear(), today.getMonth(), 15)

      // Act
      const { container } = render(Calendar, {
        props: {
          minDate,
        },
      })

      // Assert
      const dayCells = container.querySelectorAll('.grid.grid-cols-7.gap-1:last-child button')
      const disabledCells = Array.from(dayCells).filter((cell) =>
        (cell as HTMLButtonElement).disabled
      )
      expect(disabledCells.length).toBeGreaterThan(0)
    })

    it('should disable dates after maxDate', () => {
      // Arrange
      const today = new Date()
      const maxDate = new Date(today.getFullYear(), today.getMonth(), 15)

      // Act
      const { container } = render(Calendar, {
        props: {
          maxDate,
        },
      })

      // Assert
      const dayCells = container.querySelectorAll('.grid.grid-cols-7.gap-1:last-child button')
      const disabledCells = Array.from(dayCells).filter((cell) =>
        (cell as HTMLButtonElement).disabled
      )
      expect(disabledCells.length).toBeGreaterThan(0)
    })

    it('should disable specific dates', () => {
      // Arrange
      const today = new Date()
      const disabledDates = [
        new Date(today.getFullYear(), today.getMonth(), 10),
        new Date(today.getFullYear(), today.getMonth(), 20),
      ]

      // Act
      const { container } = render(Calendar, {
        props: {
          disabledDates,
        },
      })

      // Assert
      const dayCells = container.querySelectorAll('.grid.grid-cols-7.gap-1:last-child button')
      const disabledCells = Array.from(dayCells).filter((cell) =>
        (cell as HTMLButtonElement).disabled
      )
      expect(disabledCells.length).toBeGreaterThanOrEqual(2)
    })

    it('should not emit events when disabled date is clicked', async () => {
      // Arrange
      const user = userEvent.setup()
      const onUpdateModelValue = vi.fn()
      const today = new Date()
      const minDate = new Date(today.getFullYear(), today.getMonth(), 15)

      const { container } = render(Calendar, {
        props: {
          minDate,
          'onUpdate:modelValue': onUpdateModelValue,
        },
      })

      // Act
      const dayCells = container.querySelectorAll('.grid.grid-cols-7.gap-1:last-child button')
      const disabledCell = Array.from(dayCells).find((cell) =>
        (cell as HTMLButtonElement).disabled
      )

      if (disabledCell) {
        await user.click(disabledCell as HTMLElement)
      }

      // Assert
      expect(onUpdateModelValue).not.toHaveBeenCalled()
    })
  })

  describe('Localization', () => {
    it('should use specified locale for date formatting', () => {
      // Arrange & Act
      render(Calendar, {
        props: {
          locale: 'ja-JP',
        },
      })

      // Assert
      const today = new Date()
      const monthYear = new Intl.DateTimeFormat('ja-JP', {
        month: 'long',
        year: 'numeric',
      }).format(today)
      expect(screen.getByText(monthYear)).toBeInTheDocument()
    })
  })
})
