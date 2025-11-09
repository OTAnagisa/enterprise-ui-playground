import type { Meta, StoryObj } from '@storybook/vue3'
import Card from './Card.vue'
import Button from '../../atoms/Button/Button.vue'
import { createSourceCodeTransformer } from '../../../stories/utils/sourceCodeGenerator'

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title (used if header slot is not provided)',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding size for card body',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether card shows hover effect',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether card is clickable',
    },
    onClick: {
      action: 'clicked',
      description: 'Emitted when clickable card is clicked',
    },
  },
  args: {
    variant: 'default',
    padding: 'md',
    hoverable: false,
    clickable: false,
  },
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('Card', {
          slots: { default: '<p class="text-gray-700">Card content</p>' },
        }),
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-700">
          This is the default card with some content inside.
        </p>
      </Card>
    `,
  }),
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('Card', {
          slots: { 
            default: '<p class="text-gray-700">This is the default card with some content inside.</p>' 
          },
        }),
      },
    },
  },
}

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-700">
          This card has a title in the header.
        </p>
      </Card>
    `,
  }),
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('Card', {
          slots: { 
            default: '<p class="text-gray-700">This card has a title in the header.</p>' 
          },
        }),
      },
    },
  },
}

export const WithHeaderSlot: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Custom Header</h3>
            <span class="text-sm text-gray-500">Badge</span>
          </div>
        </template>
        <p class="text-gray-700">
          This card uses a custom header slot.
        </p>
      </Card>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Card>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Custom Header</h3>
        <span class="text-sm text-gray-500">Badge</span>
      </div>
    </template>
    <p class="text-gray-700">
      This card uses a custom header slot.
    </p>
  </Card>
</template>

<script setup lang="ts">
import { Card } from 'ui-library'
</script>`,
      },
    },
  },
}

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
  },
  render: (args) => ({
    components: { Card, Button },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-700">
          This card has a footer section with actions.
        </p>
        <template #footer>
          <div class="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </div>
        </template>
      </Card>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Card title="Card with Footer">
    <p class="text-gray-700">
      This card has a footer section with actions.
    </p>
    <template #footer>
      <div class="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card, Button } from 'ui-library'
</script>`,
      },
    },
  },
}

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    variant: 'outlined',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-700">
          This card has an outlined variant with a thicker border.
        </p>
      </Card>
    `,
  }),
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('Card', {
          slots: { 
            default: '<p class="text-gray-700">This card has an outlined variant with a thicker border.</p>' 
          },
        }),
      },
    },
  },
}

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    variant: 'elevated',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-700">
          This card has an elevated variant with a shadow.
        </p>
      </Card>
    `,
  }),
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('Card', {
          slots: { 
            default: '<p class="text-gray-700">This card has an elevated variant with a shadow.</p>' 
          },
        }),
      },
    },
  },
}

export const Hoverable: Story = {
  args: {
    title: 'Hoverable Card',
    hoverable: true,
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-700">
          Hover over this card to see the shadow effect.
        </p>
      </Card>
    `,
  }),
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('Card', {
          slots: { 
            default: '<p class="text-gray-700">Hover over this card to see the shadow effect.</p>' 
          },
        }),
      },
    },
  },
}

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    clickable: true,
  },
  render: (args) => ({
    components: { Card },
    setup() {
      const handleClick = () => {
        alert('Card clicked!')
      }
      return { args, handleClick }
    },
    template: `
      <Card v-bind="args" @click="handleClick">
        <p class="text-gray-700">
          Click this card to trigger an action.
        </p>
      </Card>
    `,
  }),
  parameters: {
    docs: {
      source: {
        transform: createSourceCodeTransformer('Card', {
          slots: { 
            default: '<p class="text-gray-700">Click this card to trigger an action.</p>' 
          },
          events: { click: 'handleClick' },
          setup: [
            `const handleClick = () => {`,
            `  console.log('Card clicked!')`,
            `}`,
          ],
        }),
      },
    },
  },
}

export const NoPadding: Story = {
  args: {
    title: 'Card with No Padding',
    padding: 'none',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <img 
          src="https://via.placeholder.com/400x200" 
          alt="Placeholder" 
          class="w-full"
        />
        <div class="p-4">
          <p class="text-gray-700">
            Use padding="none" for custom layouts like images.
          </p>
        </div>
      </Card>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Card title="Card with No Padding" padding="none">
    <img 
      src="https://via.placeholder.com/400x200" 
      alt="Placeholder" 
      class="w-full"
    />
    <div class="p-4">
      <p class="text-gray-700">
        Use padding="none" for custom layouts like images.
      </p>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card } from 'ui-library'
</script>`,
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { Card, Button },
    template: `
      <div class="space-y-6">
        <Card title="Default Card">
          <p class="text-gray-700">Default card variant</p>
        </Card>
        
        <Card title="Outlined Card" variant="outlined">
          <p class="text-gray-700">Outlined card variant</p>
        </Card>
        
        <Card title="Elevated Card" variant="elevated">
          <p class="text-gray-700">Elevated card variant</p>
        </Card>
        
        <Card title="Hoverable Card" hoverable>
          <p class="text-gray-700">Hover to see effect</p>
        </Card>
        
        <Card title="With Footer">
          <p class="text-gray-700">Card with footer actions</p>
          <template #footer>
            <div class="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save</Button>
            </div>
          </template>
        </Card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<template>
  <div class="space-y-6">
    <Card title="Default Card">
      <p class="text-gray-700">Default card variant</p>
    </Card>
    
    <Card title="Outlined Card" variant="outlined">
      <p class="text-gray-700">Outlined card variant</p>
    </Card>
    
    <Card title="Elevated Card" variant="elevated">
      <p class="text-gray-700">Elevated card variant</p>
    </Card>
    
    <Card title="Hoverable Card" hoverable>
      <p class="text-gray-700">Hover to see effect</p>
    </Card>
    
    <Card title="With Footer">
      <p class="text-gray-700">Card with footer actions</p>
      <template #footer>
        <div class="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Save</Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, Button } from 'ui-library'
</script>`,
      },
    },
  },
}
