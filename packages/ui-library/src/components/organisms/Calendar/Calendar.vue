<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <button
        type="button"
        class="p-2 hover:bg-gray-100 rounded-md transition-colors"
        @click="previousMonth"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <h2 class="text-lg font-semibold text-gray-900">
        {{ currentMonthYear }}
      </h2>
      
      <button
        type="button"
        class="p-2 hover:bg-gray-100 rounded-md transition-colors"
        @click="nextMonth"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Weekday headers -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div
        v-for="day in weekDays"
        :key="day"
        class="text-center text-sm font-medium text-gray-500 py-2"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar days -->
    <div class="grid grid-cols-7 gap-1">
      <button
        v-for="day in calendarDays"
        :key="`${day.date.getTime()}`"
        type="button"
        :class="getDayClasses(day)"
        :disabled="isDisabled(day.date)"
        @click="selectDate(day.date)"
      >
        {{ day.date.getDate() }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export interface CalendarProps {
  modelValue?: Date | null
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  locale?: string
}

const props = withDefaults(defineProps<CalendarProps>(), {
  modelValue: null,
  locale: 'en-US',
})

const emit = defineEmits<{
  'update:modelValue': [value: Date]
  select: [value: Date]
}>()

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

const currentDate = ref(new Date())
const viewDate = ref(props.modelValue || new Date())

const weekDays = computed(() => {
  const formatter = new Intl.DateTimeFormat(props.locale, { weekday: 'short' })
  const days = []
  const baseDate = new Date(2024, 0, 1) // Monday
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate)
    date.setDate(baseDate.getDate() + i)
    days.push(formatter.format(date))
  }
  
  return days
})

const currentMonthYear = computed(() => {
  return new Intl.DateTimeFormat(props.locale, {
    month: 'long',
    year: 'numeric',
  }).format(viewDate.value)
})

const calendarDays = computed(() => {
  const year = viewDate.value.getFullYear()
  const month = viewDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days: CalendarDay[] = []
  
  // Add days from previous month
  const firstDayOfWeek = firstDay.getDay()
  const daysToAdd = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
  
  for (let i = daysToAdd; i > 0; i--) {
    const date = new Date(year, month, 1 - i)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isSameDay(date, currentDate.value),
      isSelected: props.modelValue ? isSameDay(date, props.modelValue) : false,
    })
  }
  
  // Add days of current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isSameDay(date, currentDate.value),
      isSelected: props.modelValue ? isSameDay(date, props.modelValue) : false,
    })
  }
  
  // Add days from next month
  const remainingDays = 42 - days.length // 6 weeks
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isSameDay(date, currentDate.value),
      isSelected: props.modelValue ? isSameDay(date, props.modelValue) : false,
    })
  }
  
  return days
})

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

const isDisabled = (date: Date): boolean => {
  if (props.minDate && date < props.minDate) return true
  if (props.maxDate && date > props.maxDate) return true
  if (props.disabledDates) {
    return props.disabledDates.some(disabledDate => isSameDay(date, disabledDate))
  }
  return false
}

const getDayClasses = (day: CalendarDay): string => {
  const classes = [
    'aspect-square',
    'flex',
    'items-center',
    'justify-center',
    'text-sm',
    'rounded-md',
    'transition-colors',
  ]
  
  if (!day.isCurrentMonth) {
    classes.push('text-gray-400')
  } else {
    classes.push('text-gray-900')
  }
  
  if (day.isToday) {
    classes.push('font-bold', 'border', 'border-primary-500')
  }
  
  if (day.isSelected) {
    classes.push('bg-primary-600', 'text-white', 'hover:bg-primary-700')
  } else if (!isDisabled(day.date)) {
    classes.push('hover:bg-gray-100')
  }
  
  if (isDisabled(day.date)) {
    classes.push('cursor-not-allowed', 'opacity-50', 'hover:bg-transparent')
  }
  
  return classes.join(' ')
}

const previousMonth = () => {
  viewDate.value = new Date(
    viewDate.value.getFullYear(),
    viewDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  viewDate.value = new Date(
    viewDate.value.getFullYear(),
    viewDate.value.getMonth() + 1,
    1
  )
}

const selectDate = (date: Date) => {
  if (isDisabled(date)) return
  
  emit('update:modelValue', date)
  emit('select', date)
}

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    viewDate.value = new Date(newValue)
  }
})
</script>
