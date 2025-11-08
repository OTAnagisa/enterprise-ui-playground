import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Input from './Input.vue';

describe('Input', () => {
  it('renders with default props', () => {
    render(Input, {
      props: {
        modelValue: '',
      },
    });

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(Input, {
      props: {
        modelValue: 'test value',
      },
    });

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('emits update:modelValue when user types', async () => {
    const user = userEvent.setup();
    const onUpdateModelValue = vi.fn();

    render(Input, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': onUpdateModelValue,
      },
    });

    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');

    expect(onUpdateModelValue).toHaveBeenCalled();
  });

  it('renders label when provided', () => {
    render(Input, {
      props: {
        modelValue: '',
        label: 'Email Address',
      },
    });

    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(Input, {
      props: {
        modelValue: '',
        error: 'This field is required',
      },
    });

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-600');
  });

  it('applies error styles when error is present', () => {
    render(Input, {
      props: {
        modelValue: '',
        error: 'Invalid',
      },
    });

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-300');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when disabled prop is true', () => {
    render(Input, {
      props: {
        modelValue: '',
        disabled: true,
      },
    });

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50');
  });

  it('displays placeholder text', () => {
    render(Input, {
      props: {
        modelValue: '',
        placeholder: 'Enter your email',
      },
    });

    const input = screen.getByPlaceholderText('Enter your email');
    expect(input).toBeInTheDocument();
  });
});
