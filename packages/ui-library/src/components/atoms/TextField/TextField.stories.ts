import type { Meta, StoryObj } from '@storybook/vue3'
import TextField from './TextField.vue'
import { createSourceParameters } from '../../../stories/utils/sourceCodeGenerator'

const meta: Meta<typeof TextField> = {
  title: 'Atoms/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The value of the input',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number'],
      description: 'HTML input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
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
    ...createSourceParameters('TextField', {
      vModel: 'value',
    }),
  },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
  },
  parameters: {
    ...createSourceParameters('TextField', {
      vModel: 'name',
    }),
  },
}

export const WithValue: Story = {
  args: {
    label: 'Email',
    type: 'email',
    modelValue: 'user@example.com',
  },
  parameters: {
    ...createSourceParameters('TextField', {
      vModel: 'email',
    }),
  },
}

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true,
    helperText: 'This field is required',
  },
  parameters: {
    ...createSourceParameters('TextField', {
      vModel: 'username',
    }),
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    modelValue: 'invalid-email',
    error: 'Please enter a valid email address',
  },
  parameters: {
    ...createSourceParameters('TextField', {
      vModel: 'email',
      setup: [
        `const emailError = computed(() => {`,
        `  if (!email.value.includes('@')) {`,
        `    return 'Please enter a valid email address'`,
        `  }`,
        `  return ''`,
        `})`,
      ],
    }),
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    modelValue: 'This field is disabled',
    disabled: true,
  },
  parameters: {
    ...createSourceParameters('TextField', {
      vModel: 'value',
    }),
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
  parameters: {
    ...createSourceParameters('TextField', {
      vModel: 'password',
    }),
  },
}

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
  },
  parameters: {
    ...createSourceParameters('TextField', {
      vModel: 'age',
    }),
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Username must be 3-20 characters',
  },
  parameters: {
    ...createSourceParameters('TextField', {
      vModel: 'username',
    }),
  },
}

export const AllTypes: Story = {
  render: () => ({
    components: { TextField },
    template: `
      <div class="space-y-6 max-w-md">
        <TextField label="Text Input" placeholder="Enter text" />
        <TextField label="Email" type="email" placeholder="email@example.com" />
        <TextField label="Password" type="password" placeholder="Enter password" />
        <TextField label="Phone" type="tel" placeholder="(123) 456-7890" />
        <TextField label="Number" type="number" placeholder="Enter number" />
        <TextField 
          label="With Error" 
          error="This field has an error" 
          modelValue="Invalid value"
        />
        <TextField 
          label="Disabled" 
          disabled 
          modelValue="This is disabled"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { ref } from 'vue'
import { TextField } from 'ui-library'

const text = ref('')
const email = ref('')
const password = ref('')
const phone = ref('')
const number = ref('')
const errorField = ref('Invalid value')
</script>

<template>
  <div class="space-y-6 max-w-md">
    <TextField v-model="text" label="Text Input" placeholder="Enter text" />
    <TextField v-model="email" label="Email" type="email" placeholder="email@example.com" />
    <TextField v-model="password" label="Password" type="password" placeholder="Enter password" />
    <TextField v-model="phone" label="Phone" type="tel" placeholder="(123) 456-7890" />
    <TextField v-model="number" label="Number" type="number" placeholder="Enter number" />
    <TextField 
      v-model="errorField"
      label="With Error" 
      error="This field has an error"
    />
    <TextField 
      label="Disabled" 
      disabled 
      model-value="This is disabled"
    />
  </div>
</template>`,
      },
    },
  },
}
