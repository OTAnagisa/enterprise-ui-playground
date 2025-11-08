import type { Meta, StoryObj } from '@storybook/vue3'
import { http, HttpResponse } from 'msw'
import SearchInput from './SearchInput.vue'

const meta: Meta<typeof SearchInput> = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The current value of the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds',
    },
    'update:modelValue': {
      action: 'update:modelValue',
      description: 'Emitted when the input value changes',
    },
    input: {
      action: 'input',
      description: 'Emitted on input event',
    },
    change: {
      action: 'change',
      description: 'Emitted on change event',
    },
    submit: {
      action: 'submit',
      description: 'Emitted when form is submitted',
    },
  },
  args: {
    placeholder: 'Search...',
    debounceMs: 300,
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/suggest', ({ request }) => {
          const url = new URL(request.url)
          const query = url.searchParams.get('q') || ''
          
          const suggestions = query
            ? [
                `${query} - Result 1`,
                `${query} - Result 2`,
                `${query} - Result 3`,
                `Advanced ${query}`,
                `Premium ${query}`,
              ]
            : []
          
          return HttpResponse.json({
            suggestions,
            query,
          })
        }),
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  render: (args) => ({
    components: { SearchInput },
    setup() {
      return { args }
    },
    template: '<SearchInput v-bind="args" />',
  }),
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Search for products...',
  },
  render: (args) => ({
    components: { SearchInput },
    setup() {
      return { args }
    },
    template: '<SearchInput v-bind="args" />',
  }),
}

export const WithInitialValue: Story = {
  args: {
    modelValue: 'Vue',
  },
  render: (args) => ({
    components: { SearchInput },
    setup() {
      return { args }
    },
    template: '<SearchInput v-bind="args" />',
  }),
}

export const WithCustomDebounce: Story = {
  args: {
    debounceMs: 1000,
    placeholder: 'Type slowly... (1s debounce)',
  },
  render: (args) => ({
    components: { SearchInput },
    setup() {
      return { args }
    },
    template: '<SearchInput v-bind="args" />',
  }),
}

export const WithSlowAPI: Story = {
  args: {
    placeholder: 'Search with slow API...',
  },
  render: (args) => ({
    components: { SearchInput },
    setup() {
      return { args }
    },
    template: '<SearchInput v-bind="args" />',
  }),
  parameters: {
    msw: {
      handlers: [
        http.get('/api/suggest', async ({ request }) => {
          // Simulate slow API
          await new Promise((resolve) => setTimeout(resolve, 2000))
          
          const url = new URL(request.url)
          const query = url.searchParams.get('q') || ''
          
          return HttpResponse.json({
            suggestions: query
              ? [`Slow ${query}`, `Loading ${query}`, `Delayed ${query}`]
              : [],
            query,
          })
        }),
      ],
    },
  },
}

export const WithAPIError: Story = {
  args: {
    placeholder: 'Search (API will fail)...',
  },
  render: (args) => ({
    components: { SearchInput },
    setup() {
      return { args }
    },
    template: '<SearchInput v-bind="args" />',
  }),
  parameters: {
    msw: {
      handlers: [
        http.get('/api/suggest', () => {
          return HttpResponse.error()
        }),
      ],
    },
  },
}

export const Interactive: Story = {
  render: (args) => ({
    components: { SearchInput },
    setup() {
      const value = ref('')
      const submittedValue = ref('')
      
      const handleSubmit = (val: string) => {
        submittedValue.value = val
      }

      return { args, value, submittedValue, handleSubmit }
    },
    template: `
      <div class="space-y-4">
        <SearchInput 
          v-model="value" 
          v-bind="args"
          @submit="handleSubmit"
        />
        <div v-if="value" class="text-sm">
          <strong>Current value:</strong> {{ value }}
        </div>
        <div v-if="submittedValue" class="text-sm text-green-600">
          <strong>Submitted value:</strong> {{ submittedValue }}
        </div>
      </div>
    `,
  }),
}
