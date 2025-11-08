import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import SearchBar from './SearchBar.vue';

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  args: {
    onSearch: fn(),
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search for products...',
    buttonText: 'Find',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
