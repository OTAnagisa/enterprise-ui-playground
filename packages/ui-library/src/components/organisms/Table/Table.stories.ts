import type { Meta, StoryObj } from '@storybook/vue3'
import Table from './Table.vue'
import type { TableColumn } from './Table.vue'
import Button from '../../atoms/Button/Button.vue'
import { createSourceParameters } from '../../../stories/utils/sourceCodeGenerator'

const meta: Meta<typeof Table> = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Whether to stripe table rows',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether rows show hover effect',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show borders',
    },
    dense: {
      control: 'boolean',
      description: 'Whether to use dense padding',
    },
    clickableRows: {
      control: 'boolean',
      description: 'Whether rows are clickable',
    },
  },
  args: {
    striped: false,
    hoverable: true,
    bordered: false,
    dense: false,
    clickableRows: false,
  },
}

export default meta
type Story = StoryObj<typeof Table>

const sampleColumns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, width: '20' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
]

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
]

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceParameters('Table'),
      },
    },
  },
}

export const Striped: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceParameters('Table'),
      },
    },
  },
}

export const Dense: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    dense: true,
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceParameters('Table'),
      },
    },
  },
}

export const ClickableRows: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    clickableRows: true,
  },
  render: (args) => ({
    components: { Table },
    setup() {
      const handleRowClick = (row: any) => {
        alert(`Clicked row: ${row.name}`)
      }
      return { args, handleRowClick }
    },
    template: '<Table v-bind="args" @row-click="handleRowClick" />',
  }),
  parameters: {
    docs: {
      source: {
        transform: createSourceParameters('Table', {
          events: { rowClick: 'handleRowClick' },
          setup: [
            `const handleRowClick = (row: any) => {`,
            `  console.log('Clicked row:', row.name)`,
            `}`,
          ],
        }),
      },
    },
  },
}

export const WithSorting: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
  render: (args) => ({
    components: { Table },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600">
          Click on column headers to sort (ID, Name, Email, Role are sortable)
        </p>
        <Table v-bind="args" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <div>
    <p class="mb-4 text-sm text-gray-600">
      Click on column headers to sort (ID, Name, Email, Role are sortable)
    </p>
    <Table :columns="columns" :data="data" />
  </div>
</template>

<script setup lang="ts">
import { Table } from 'ui-library'
import type { TableColumn } from 'ui-library'

const columns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, width: '20' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
]

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
]
</script>`,
      },
    },
  },
}

export const WithCustomCells: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', width: '20' },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status', align: 'center' },
      { key: 'actions', label: 'Actions', align: 'right' },
    ],
    data: sampleData,
  },
  render: (args) => ({
    components: { Table, Button },
    setup() {
      const handleEdit = (row: any) => {
        alert(`Edit: ${row.name}`)
      }
      const handleDelete = (row: any) => {
        alert(`Delete: ${row.name}`)
      }
      return { args, handleEdit, handleDelete }
    },
    template: `
      <Table v-bind="args">
        <template #cell-status="{ value }">
          <span 
            :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              value === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            ]"
          >
            {{ value }}
          </span>
        </template>
        <template #cell-actions="{ row }">
          <div class="flex gap-2 justify-end">
            <Button variant="outline" @click="handleEdit(row)">Edit</Button>
            <Button variant="danger" @click="handleDelete(row)">Delete</Button>
          </div>
        </template>
      </Table>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Table :columns="columns" :data="data">
    <template #cell-status="{ value }">
      <span 
        :class="[
          'px-2 py-1 text-xs font-medium rounded-full',
          value === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        ]"
      >
        {{ value }}
      </span>
    </template>
    <template #cell-actions="{ row }">
      <div class="flex gap-2 justify-end">
        <Button variant="outline" @click="handleEdit(row)">Edit</Button>
        <Button variant="danger" @click="handleDelete(row)">Delete</Button>
      </div>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { Table, Button } from 'ui-library'
import type { TableColumn } from 'ui-library'

const columns: TableColumn[] = [
  { key: 'id', label: 'ID', width: '20' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: 'Actions', align: 'right' },
]

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
]

const handleEdit = (row: any) => {
  console.log('Edit:', row.name)
}

const handleDelete = (row: any) => {
  console.log('Delete:', row.name)
}
</script>`,
      },
    },
  },
}

export const EmptyState: Story = {
  args: {
    columns: sampleColumns,
    data: [],
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceParameters('Table'),
      },
    },
  },
}

export const WithCustomEmptyState: Story = {
  args: {
    columns: sampleColumns,
    data: [],
  },
  render: (args) => ({
    components: { Table },
    setup() {
      return { args }
    },
    template: `
      <Table v-bind="args">
        <template #empty>
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No data</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating a new item.</p>
          </div>
        </template>
      </Table>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Table :columns="columns" :data="data">
    <template #empty>
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No data</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new item.</p>
      </div>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { Table } from 'ui-library'
import type { TableColumn } from 'ui-library'

const columns: TableColumn[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
]

const data = []
</script>`,
      },
    },
  },
}

export const WithFormattedValues: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Product', sortable: true },
      {
        key: 'price',
        label: 'Price',
        sortable: true,
        align: 'right' as const,
        format: (value: number) => `$${value.toFixed(2)}`,
      },
      {
        key: 'quantity',
        label: 'Quantity',
        sortable: true,
        align: 'center' as const,
      },
      {
        key: 'total',
        label: 'Total',
        align: 'right' as const,
        format: (value: number) => `$${value.toFixed(2)}`,
      },
    ],
    data: [
      { name: 'Widget A', price: 29.99, quantity: 5, total: 149.95 },
      { name: 'Widget B', price: 49.99, quantity: 3, total: 149.97 },
      { name: 'Widget C', price: 19.99, quantity: 10, total: 199.90 },
      { name: 'Widget D', price: 99.99, quantity: 2, total: 199.98 },
    ],
    striped: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Table :columns="columns" :data="data" striped />
</template>

<script setup lang="ts">
import { Table } from 'ui-library'
import type { TableColumn } from 'ui-library'

const columns: TableColumn[] = [
  { key: 'name', label: 'Product', sortable: true },
  {
    key: 'price',
    label: 'Price',
    sortable: true,
    align: 'right',
    format: (value: number) => \`$\${value.toFixed(2)}\`,
  },
  {
    key: 'quantity',
    label: 'Quantity',
    sortable: true,
    align: 'center',
  },
  {
    key: 'total',
    label: 'Total',
    align: 'right',
    format: (value: number) => \`$\${value.toFixed(2)}\`,
  },
]

const data = [
  { name: 'Widget A', price: 29.99, quantity: 5, total: 149.95 },
  { name: 'Widget B', price: 49.99, quantity: 3, total: 149.97 },
  { name: 'Widget C', price: 19.99, quantity: 10, total: 199.90 },
  { name: 'Widget D', price: 99.99, quantity: 2, total: 199.98 },
]
</script>`,
      },
    },
  },
}
