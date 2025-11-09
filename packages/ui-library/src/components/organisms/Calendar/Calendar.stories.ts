import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Calendar from './Calendar.vue'

const meta: Meta<typeof Calendar> = {
  title: 'Organisms/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'date',
      description: 'Currently selected date',
    },
    minDate: {
      control: 'date',
      description: 'Minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date',
    },
    locale: {
      control: 'text',
      description: 'Locale for date formatting',
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      return { args }
    },
    template: '<Calendar v-bind="args" />',
  }),
}

export const WithSelectedDate: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      const selectedDate = ref(new Date(2024, 0, 15))
      return { args, selectedDate }
    },
    template: '<Calendar v-model="selectedDate" />',
  }),
}

export const WithMinMaxDates: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      const today = new Date()
      const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
      const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      
      return { args, minDate, maxDate }
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600">
          Only current month dates are selectable
        </p>
        <Calendar :min-date="minDate" :max-date="maxDate" />
      </div>
    `,
  }),
}

export const WithDisabledDates: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      const today = new Date()
      const disabledDates = [
        new Date(today.getFullYear(), today.getMonth(), 5),
        new Date(today.getFullYear(), today.getMonth(), 10),
        new Date(today.getFullYear(), today.getMonth(), 15),
        new Date(today.getFullYear(), today.getMonth(), 20),
        new Date(today.getFullYear(), today.getMonth(), 25),
      ]
      
      return { args, disabledDates }
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600">
          Some dates are disabled (5th, 10th, 15th, 20th, 25th)
        </p>
        <Calendar :disabled-dates="disabledDates" />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      const selectedDate = ref<Date | null>(null)
      
      const formattedDate = computed(() => {
        if (!selectedDate.value) return 'No date selected'
        return new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(selectedDate.value)
      })
      
      return { args, selectedDate, formattedDate }
    },
    template: `
      <div class="space-y-4">
        <Calendar v-model="selectedDate" />
        <div class="p-4 bg-gray-50 rounded-md">
          <p class="text-sm font-medium text-gray-700">Selected Date:</p>
          <p class="text-lg font-semibold text-gray-900">{{ formattedDate }}</p>
        </div>
      </div>
    `,
  }),
}

export const JapaneseLocale: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      return { args }
    },
    template: '<Calendar locale="ja-JP" />',
  }),
}

export const DateRangePicker: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      const startDate = ref<Date | null>(null)
      const endDate = ref<Date | null>(null)
      
      const formattedRange = computed(() => {
        if (!startDate.value || !endDate.value) {
          return 'Select start and end dates'
        }
        const formatter = new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
        return `${formatter.format(startDate.value)} - ${formatter.format(endDate.value)}`
      })
      
      return { args, startDate, endDate, formattedRange }
    },
    template: `
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <Calendar v-model="startDate" :max-date="endDate" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <Calendar v-model="endDate" :min-date="startDate" />
          </div>
        </div>
        <div class="p-4 bg-gray-50 rounded-md">
          <p class="text-sm font-medium text-gray-700">Selected Range:</p>
          <p class="text-lg font-semibold text-gray-900">{{ formattedRange }}</p>
        </div>
      </div>
    `,
  }),
}
