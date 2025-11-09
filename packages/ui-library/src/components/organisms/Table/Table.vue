<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead :class="theadClasses">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :class="getHeaderClasses(column)"
            @click="handleSort(column)"
          >
            <div class="flex items-center gap-2">
              <span>{{ column.label }}</span>
              <span v-if="column.sortable" class="flex flex-col">
                <svg
                  class="w-3 h-3"
                  :class="getSortIconClass(column, 'asc')"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 10l5-5 5 5H5z" />
                </svg>
                <svg
                  class="w-3 h-3 -mt-1"
                  :class="getSortIconClass(column, 'desc')"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M15 10l-5 5-5-5h10z" />
                </svg>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(row, index) in sortedData"
          :key="index"
          :class="getRowClasses(row, index)"
          @click="handleRowClick(row)"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="getCellClasses(column)"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
              {{ formatCellValue(row[column.key], column) }}
            </slot>
          </td>
        </tr>
        <tr v-if="sortedData.length === 0">
          <td :colspan="columns.length" class="px-6 py-12 text-center text-gray-500">
            <slot name="empty">
              No data available
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
  format?: (value: any) => string
}

export interface TableProps {
  columns: TableColumn[]
  data: Record<string, any>[]
  striped?: boolean
  hoverable?: boolean
  bordered?: boolean
  dense?: boolean
  clickableRows?: boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  striped: false,
  hoverable: true,
  bordered: false,
  dense: false,
  clickableRows: false,
})

const emit = defineEmits<{
  rowClick: [row: Record<string, any>]
  sort: [column: string, direction: 'asc' | 'desc']
}>()

interface SortState {
  column: string | null
  direction: 'asc' | 'desc' | null
}

const sortState = ref<SortState>({
  column: null,
  direction: null,
})

const theadClasses = computed(() => {
  return ['bg-gray-50'].join(' ')
})

const getHeaderClasses = (column: TableColumn): string => {
  const classes = [
    'px-6',
    props.dense ? 'py-2' : 'py-3',
    'text-xs',
    'font-medium',
    'text-gray-500',
    'uppercase',
    'tracking-wider',
  ]

  if (column.align === 'center') {
    classes.push('text-center')
  } else if (column.align === 'right') {
    classes.push('text-right')
  } else {
    classes.push('text-left')
  }

  if (column.sortable) {
    classes.push('cursor-pointer', 'select-none', 'hover:bg-gray-100')
  }

  if (column.width) {
    classes.push(`w-${column.width}`)
  }

  return classes.join(' ')
}

const getCellClasses = (column: TableColumn): string => {
  const classes = [
    'px-6',
    props.dense ? 'py-2' : 'py-4',
    'whitespace-nowrap',
    'text-sm',
    'text-gray-900',
  ]

  if (column.align === 'center') {
    classes.push('text-center')
  } else if (column.align === 'right') {
    classes.push('text-right')
  }

  return classes.join(' ')
}

const getRowClasses = (row: Record<string, any>, index: number): string => {
  const classes = []

  if (props.striped && index % 2 === 1) {
    classes.push('bg-gray-50')
  }

  if (props.hoverable) {
    classes.push('hover:bg-gray-100', 'transition-colors')
  }

  if (props.clickableRows) {
    classes.push('cursor-pointer')
  }

  return classes.join(' ')
}

const getSortIconClass = (column: TableColumn, direction: 'asc' | 'desc'): string => {
  if (sortState.value.column === column.key && sortState.value.direction === direction) {
    return 'text-primary-600'
  }
  return 'text-gray-400'
}

const handleSort = (column: TableColumn) => {
  if (!column.sortable) return

  if (sortState.value.column === column.key) {
    if (sortState.value.direction === 'asc') {
      sortState.value.direction = 'desc'
    } else if (sortState.value.direction === 'desc') {
      sortState.value.column = null
      sortState.value.direction = null
    } else {
      sortState.value.direction = 'asc'
    }
  } else {
    sortState.value.column = column.key
    sortState.value.direction = 'asc'
  }

  if (sortState.value.column && sortState.value.direction) {
    emit('sort', sortState.value.column, sortState.value.direction)
  }
}

const handleRowClick = (row: Record<string, any>) => {
  if (props.clickableRows) {
    emit('rowClick', row)
  }
}

const sortedData = computed(() => {
  if (!sortState.value.column || !sortState.value.direction) {
    return props.data
  }

  const column = sortState.value.column
  const direction = sortState.value.direction

  return [...props.data].sort((a, b) => {
    const aVal = a[column]
    const bVal = b[column]

    if (aVal === bVal) return 0

    let comparison = 0
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal - bVal
    } else {
      comparison = String(aVal).localeCompare(String(bVal))
    }

    return direction === 'asc' ? comparison : -comparison
  })
})

const formatCellValue = (value: any, column: TableColumn): string => {
  if (column.format) {
    return column.format(value)
  }
  return String(value ?? '')
}
</script>
