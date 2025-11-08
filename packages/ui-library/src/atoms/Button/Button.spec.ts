import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Button from './Button.vue';

describe('Button', () => {
  it('renders with default props', () => {
    render(Button, {
      slots: {
        default: 'Click me',
      },
    });

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600');
  });

  it('emits click event when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(Button, {
      slots: {
        default: 'Click me',
      },
      props: {
        onClick,
      },
    });

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not emit click when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(Button, {
      slots: {
        default: 'Click me',
      },
      props: {
        disabled: true,
        onClick,
      },
    });

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(Button, {
      slots: { default: 'Button' },
      props: { variant: 'secondary' },
    });

    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-200');

    rerender({ variant: 'danger' });
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-600');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(Button, {
      slots: { default: 'Button' },
      props: { size: 'sm' },
    });

    let button = screen.getByRole('button');
    expect(button).toHaveClass('px-3');

    rerender({ size: 'lg' });
    button = screen.getByRole('button');
    expect(button).toHaveClass('px-6');
  });

  it('is disabled when disabled prop is true', () => {
    render(Button, {
      slots: { default: 'Button' },
      props: { disabled: true },
    });

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });
});
