import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'danger'],
      description: 'Visual style variant of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute',
    },
    onClick: {
      action: 'clicked',
      description: 'Emitted when button is clicked',
    },
  },
  args: {
    variant: 'primary',
    disabled: false,
    fullWidth: false,
    type: 'button',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Primary Button</Button>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Button variant="primary">
    Primary Button
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'ui-library'
</script>`,
      },
    },
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Secondary Button</Button>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Button variant="secondary">
    Secondary Button
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'ui-library'
</script>`,
      },
    },
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Outline Button</Button>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Button variant="outline">
    Outline Button
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'ui-library'
</script>`,
      },
    },
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Danger Button</Button>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Button variant="danger">
    Danger Button
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'ui-library'
</script>`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Disabled Button</Button>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Button disabled>
    Disabled Button
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'ui-library'
</script>`,
      },
    },
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Full Width Button</Button>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Button full-width>
    Full Width Button
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'ui-library'
</script>`,
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <div>
          <Button variant="primary">Primary</Button>
        </div>
        <div>
          <Button variant="secondary">Secondary</Button>
        </div>
        <div>
          <Button variant="outline">Outline</Button>
        </div>
        <div>
          <Button variant="danger">Danger</Button>
        </div>
        <div>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <div class="space-y-4">
    <div>
      <Button variant="primary">Primary</Button>
    </div>
    <div>
      <Button variant="secondary">Secondary</Button>
    </div>
    <div>
      <Button variant="outline">Outline</Button>
    </div>
    <div>
      <Button variant="danger">Danger</Button>
    </div>
    <div>
      <Button disabled>Disabled</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'ui-library'
</script>`,
      },
    },
  },
}
