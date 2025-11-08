import { ref, Ref } from 'vue';

export interface ValidationOptions {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export interface ValidationReturn {
  validate: (value: string) => boolean;
  error: Ref<string>;
}

export function useValidation(options: ValidationOptions = {}): ValidationReturn {
  const { minLength, maxLength, pattern } = options;
  const error = ref('');

  const validate = (value: string): boolean => {
    error.value = '';

    if (minLength !== undefined && value.length < minLength) {
      error.value = `Must be at least ${minLength} characters`;
      return false;
    }

    if (maxLength !== undefined && value.length > maxLength) {
      error.value = `Must be at most ${maxLength} characters`;
      return false;
    }

    if (pattern && !pattern.test(value)) {
      error.value = 'Invalid format';
      return false;
    }

    return true;
  };

  return {
    validate,
    error,
  };
}
