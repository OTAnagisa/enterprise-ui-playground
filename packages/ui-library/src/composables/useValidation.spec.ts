import { describe, it, expect } from 'vitest';
import { useValidation } from './useValidation';

describe('useValidation', () => {
  it('validates minimum length', () => {
    const { validate, error } = useValidation({ minLength: 5 });

    expect(validate('test')).toBe(false);
    expect(error.value).toBe('Must be at least 5 characters');

    expect(validate('tests')).toBe(true);
    expect(error.value).toBe('');
  });

  it('validates maximum length', () => {
    const { validate, error } = useValidation({ maxLength: 5 });

    expect(validate('testing')).toBe(false);
    expect(error.value).toBe('Must be at most 5 characters');

    expect(validate('test')).toBe(true);
    expect(error.value).toBe('');
  });

  it('validates pattern', () => {
    const { validate, error } = useValidation({ pattern: /^\d+$/ });

    expect(validate('abc')).toBe(false);
    expect(error.value).toBe('Invalid format');

    expect(validate('123')).toBe(true);
    expect(error.value).toBe('');
  });

  it('validates multiple rules', () => {
    const { validate, error } = useValidation({
      minLength: 3,
      maxLength: 10,
      pattern: /^[a-z]+$/,
    });

    expect(validate('ab')).toBe(false);
    expect(error.value).toBe('Must be at least 3 characters');

    expect(validate('toolongstring')).toBe(false);
    expect(error.value).toBe('Must be at most 10 characters');

    expect(validate('ABC')).toBe(false);
    expect(error.value).toBe('Invalid format');

    expect(validate('valid')).toBe(true);
    expect(error.value).toBe('');
  });

  it('returns true when no validation rules are provided', () => {
    const { validate, error } = useValidation();

    expect(validate('anything')).toBe(true);
    expect(error.value).toBe('');
  });
});
