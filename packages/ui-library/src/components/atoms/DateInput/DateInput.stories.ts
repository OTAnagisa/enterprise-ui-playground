import type { Meta, StoryObj } from '@storybook/vue3'
import DateInput from './DateInput.vue'

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
}

export default meta
type Story = StoryObj<typeof DateInput>

export const Default: Story = {
  args: {
    label: 'Select Date',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Birth Date',
    modelValue: '1990-01-15',
  },
}

export const Required: Story = {
  args: {
    label: 'Start Date',
    required: true,
    helperText: 'This field is required',
  },
}

export const WithMinMax: Story = {
  args: {
    label: 'Appointment Date',
    min: '2024-01-01',
    max: '2024-12-31',
    helperText: 'Please select a date in 2024',
  },
}

export const WithError: Story = {
  args: {
    label: 'End Date',
    modelValue: '2023-01-01',
    error: 'End date must be after start date',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Locked Date',
    modelValue: '2024-01-01',
    disabled: true,
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Event Date',
    helperText: 'Select the date of your event',
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
}
