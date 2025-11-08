import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Input from './Input.vue';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: '<Input v-model="value" v-bind="args" />',
  }),
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: '<Input v-model="value" v-bind="args" />',
  }),
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithError: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('invalid@');
      return { args, value };
    },
    template: '<Input v-model="value" v-bind="args" />',
  }),
  args: {
    label: 'Email Address',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('Disabled input');
      return { args, value };
    },
    template: '<Input v-model="value" v-bind="args" />',
  }),
  args: {
    disabled: true,
  },
};

export const Password: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: '<Input v-model="value" v-bind="args" />',
  }),
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
};
