import type { Meta, StoryObj } from '@storybook/vue3'
import DateInput from './DateInput.vue'
import { createSourceCodeTransformer } from '../../../stories/utils/sourceCodeGenerator'

const meta: Meta<typeof DateInput> = {
  title: 'Atoms/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The date value (YYYY-MM-DD format)',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    min: {
      control: 'text',
      description: 'Minimum date allowed (YYYY-MM-DD format)',
    },
    max: {
      control: 'text',
      description: 'Maximum date allowed (YYYY-MM-DD format)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below input',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take full width',
    },
  },
  args: {
    fullWidth: true,
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('DateInput', {
          vModel: 'date',
        }),
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DateInput>

export const Default: Story = {
  args: {
    label: 'Select Date',
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('DateInput', {
          vModel: 'date',
        }),
      },
    },
  },
}

export const WithValue: Story = {
  args: {
    label: 'Birth Date',
    modelValue: '1990-01-15',
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('DateInput', {
          vModel: 'birthDate',
        }),
      },
    },
  },
}

export const Required: Story = {
  args: {
    label: 'Start Date',
    required: true,
    helperText: 'This field is required',
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('DateInput', {
          vModel: 'startDate',
        }),
      },
    },
  },
}

export const WithMinMax: Story = {
  args: {
    label: 'Appointment Date',
    min: '2024-01-01',
    max: '2024-12-31',
    helperText: 'Please select a date in 2024',
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('DateInput', {
          vModel: 'appointmentDate',
        }),
      },
    },
  },
}

export const WithError: Story = {
  args: {
    label: 'End Date',
    modelValue: '2023-01-01',
    error: 'End date must be after start date',
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('DateInput', {
          vModel: 'endDate',
        }),
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Locked Date',
    modelValue: '2024-01-01',
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('DateInput', {
          vModel: 'lockedDate',
        }),
      },
    },
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Event Date',
    helperText: 'Select the date of your event',
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('DateInput', {
          vModel: 'eventDate',
        }),
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { DateInput },
    template: `
      <div class="space-y-6 max-w-md">
        <DateInput label="Default Date Input" />
        <DateInput 
          label="With Value" 
          modelValue="2024-01-15"
        />
        <DateInput 
          label="With Range" 
          min="2024-01-01" 
          max="2024-12-31"
          helperText="Select a date in 2024"
        />
        <DateInput 
          label="Required" 
          required
        />
        <DateInput 
          label="With Error" 
          error="Invalid date selected"
          modelValue="2023-01-01"
        />
        <DateInput 
          label="Disabled" 
          disabled 
          modelValue="2024-01-01"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <div class="space-y-6 max-w-md">
    <DateInput v-model="date1" label="Default Date Input" />
    <DateInput 
      v-model="date2"
      label="With Value"
    />
    <DateInput 
      v-model="date3"
      label="With Range" 
      min="2024-01-01" 
      max="2024-12-31"
      helper-text="Select a date in 2024"
    />
    <DateInput 
      v-model="date4"
      label="Required" 
      required
    />
    <DateInput 
      v-model="date5"
      label="With Error" 
      error="Invalid date selected"
    />
    <DateInput 
      label="Disabled" 
      disabled 
      model-value="2024-01-01"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DateInput } from 'ui-library'

const date1 = ref('')
const date2 = ref('2024-01-15')
const date3 = ref('')
const date4 = ref('')
const date5 = ref('2023-01-01')
</script>`,
      },
    },
  },
}
