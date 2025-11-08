import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial value immediately', () => {
    const value = ref('initial');
    const debounced = useDebounce(value, 500);

    expect(debounced.value).toBe('initial');
  });

  it('debounces value changes', () => {
    const value = ref('initial');
    const debounced = useDebounce(value, 500);

    value.value = 'changed';
    expect(debounced.value).toBe('initial');

    vi.advanceTimersByTime(499);
    expect(debounced.value).toBe('initial');

    vi.advanceTimersByTime(1);
    expect(debounced.value).toBe('changed');
  });

  it('resets timer on multiple changes', () => {
    const value = ref('initial');
    const debounced = useDebounce(value, 500);

    value.value = 'first';
    vi.advanceTimersByTime(300);

    value.value = 'second';
    vi.advanceTimersByTime(300);

    // Should still be initial because timer was reset
    expect(debounced.value).toBe('initial');

    vi.advanceTimersByTime(200);
    expect(debounced.value).toBe('second');
  });

  it('handles zero delay', () => {
    const value = ref('initial');
    const debounced = useDebounce(value, 0);

    value.value = 'changed';
    expect(debounced.value).toBe('initial');

    vi.advanceTimersByTime(0);
    expect(debounced.value).toBe('changed');
  });
});
