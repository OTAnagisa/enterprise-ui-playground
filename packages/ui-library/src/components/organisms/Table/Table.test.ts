import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Table from './Table.vue'
import type { TableColumn } from './Table.vue'

const sampleColumns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
]

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
]

describe('Table', () => {
  describe('Rendering', () => {
    it('should render table with columns', () => {
      // Arrange & Act
      render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
        },
      })

      // Assert
      expect(screen.getByText('ID')).toBeInTheDocument()
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
    })

    it('should render table with data', () => {
      // Arrange & Act
      render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
        },
      })

      // Assert
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
    })

    it('should render empty state when no data', () => {
      // Arrange & Act
      render(Table, {
        props: {
          columns: sampleColumns,
          data: [],
        },
      })

      // Assert
      expect(screen.getByText('No data available')).toBeInTheDocument()
    })

    it('should render custom empty state slot', () => {
      // Arrange & Act
      render(Table, {
        props: {
          columns: sampleColumns,
          data: [],
        },
        slots: {
          empty: 'Custom empty message',
        },
      })

      // Assert
      expect(screen.getByText('Custom empty message')).toBeInTheDocument()
    })
  })

  describe('Sorting', () => {
    it('should sort data by column in ascending order', async () => {
      // Arrange
      const user = userEvent.setup()
      const { container } = render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
        },
      })

      // Act
      const nameHeader = screen.getByText('Name')
      await user.click(nameHeader)

      // Assert
      const rows = container.querySelectorAll('tbody tr')
      const firstRowName = rows[0].querySelector('td:nth-child(2)')?.textContent
      expect(firstRowName).toBe('Bob Johnson')
    })

    it('should toggle sort direction on multiple clicks', async () => {
      // Arrange
      const user = userEvent.setup()
      const { container } = render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
        },
      })

      // Act - first click: ascending
      const nameHeader = screen.getByText('Name')
      await user.click(nameHeader)

      let rows = container.querySelectorAll('tbody tr')
      let firstRowName = rows[0].querySelector('td:nth-child(2)')?.textContent
      expect(firstRowName).toBe('Bob Johnson')

      // Act - second click: descending
      await user.click(nameHeader)

      rows = container.querySelectorAll('tbody tr')
      firstRowName = rows[0].querySelector('td:nth-child(2)')?.textContent
      expect(firstRowName).toBe('John Doe')
    })

    it('should emit sort event', async () => {
      // Arrange
      const user = userEvent.setup()
      const onSort = vi.fn()

      render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
          onSort,
        },
      })

      // Act
      const nameHeader = screen.getByText('Name')
      await user.click(nameHeader)

      // Assert
      expect(onSort).toHaveBeenCalledWith('name', 'asc')
    })

    it('should not sort non-sortable columns', async () => {
      // Arrange
      const user = userEvent.setup()
      const onSort = vi.fn()

      render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
          onSort,
        },
      })

      // Act
      const emailHeader = screen.getByText('Email')
      await user.click(emailHeader)

      // Assert
      expect(onSort).not.toHaveBeenCalled()
    })
  })

  describe('Row Interactions', () => {
    it('should emit rowClick when clickableRows is true', async () => {
      // Arrange
      const user = userEvent.setup()
      const onRowClick = vi.fn()

      const { container } = render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
          clickableRows: true,
          onRowClick,
        },
      })

      // Act
      const firstRow = container.querySelector('tbody tr')
      if (firstRow) {
        await user.click(firstRow)
      }

      // Assert
      expect(onRowClick).toHaveBeenCalledWith(sampleData[0])
    })

    it('should not emit rowClick when clickableRows is false', async () => {
      // Arrange
      const user = userEvent.setup()
      const onRowClick = vi.fn()

      const { container } = render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
          clickableRows: false,
          onRowClick,
        },
      })

      // Act
      const firstRow = container.querySelector('tbody tr')
      if (firstRow) {
        await user.click(firstRow)
      }

      // Assert
      expect(onRowClick).not.toHaveBeenCalled()
    })

    it('should have cursor-pointer class when clickableRows is true', () => {
      // Arrange & Act
      const { container } = render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
          clickableRows: true,
        },
      })

      // Assert
      const firstRow = container.querySelector('tbody tr')
      expect(firstRow).toHaveClass('cursor-pointer')
    })
  })

  describe('Styling', () => {
    it('should apply striped styles', () => {
      // Arrange & Act
      const { container } = render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
          striped: true,
        },
      })

      // Assert
      const rows = container.querySelectorAll('tbody tr')
      expect(rows[1]).toHaveClass('bg-gray-50')
    })

    it('should apply hover styles', () => {
      // Arrange & Act
      const { container } = render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
          hoverable: true,
        },
      })

      // Assert
      const firstRow = container.querySelector('tbody tr')
      expect(firstRow).toHaveClass('hover:bg-gray-100')
    })

    it('should apply dense padding', () => {
      // Arrange & Act
      const { container } = render(Table, {
        props: {
          columns: sampleColumns,
          data: sampleData,
          dense: true,
        },
      })

      // Assert
      const firstCell = container.querySelector('tbody td')
      expect(firstCell).toHaveClass('py-2')
    })
  })

  describe('Custom Formatting', () => {
    it('should format cell values using format function', () => {
      // Arrange
      const columnsWithFormat: TableColumn[] = [
        {
          key: 'price',
          label: 'Price',
          format: (value: number) => `$${value.toFixed(2)}`,
        },
      ]

      const dataWithPrice = [{ price: 29.99 }, { price: 49.5 }]

      // Act
      render(Table, {
        props: {
          columns: columnsWithFormat,
          data: dataWithPrice,
        },
      })

      // Assert
      expect(screen.getByText('$29.99')).toBeInTheDocument()
      expect(screen.getByText('$49.50')).toBeInTheDocument()
    })
  })

  describe('Column Alignment', () => {
    it('should apply center alignment', () => {
      // Arrange
      const columnsWithAlignment: TableColumn[] = [
        { key: 'name', label: 'Name', align: 'center' },
      ]

      // Act
      const { container } = render(Table, {
        props: {
          columns: columnsWithAlignment,
          data: sampleData,
        },
      })

      // Assert
      const headerCell = container.querySelector('th')
      expect(headerCell).toHaveClass('text-center')
    })

    it('should apply right alignment', () => {
      // Arrange
      const columnsWithAlignment: TableColumn[] = [
        { key: 'name', label: 'Name', align: 'right' },
      ]

      // Act
      const { container } = render(Table, {
        props: {
          columns: columnsWithAlignment,
          data: sampleData,
        },
      })

      // Assert
      const headerCell = container.querySelector('th')
      expect(headerCell).toHaveClass('text-right')
    })
  })
})
