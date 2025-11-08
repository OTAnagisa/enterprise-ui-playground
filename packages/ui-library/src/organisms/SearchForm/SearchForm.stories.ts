import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import SearchForm from './SearchForm.vue';

const meta = {
  title: 'Organisms/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  args: {
    onSearch: fn(),
  },
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    minLength: 3,
    debounceMs: 300,
  },
};

export const LongerMinLength: Story = {
  args: {
    minLength: 5,
    debounceMs: 300,
  },
};

export const NoDebounce: Story = {
  args: {
    minLength: 3,
    debounceMs: 0,
  },
};
