<script setup lang="ts">
import { computed } from 'vue';

export interface InputProps {
  modelValue: string;
  type?: 'text' | 'email' | 'password' | 'search';
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  error: '',
  label: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputClasses = computed(() => {
  const baseClasses =
    'block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm';

  const errorClasses = props.error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';

  const disabledClasses = 'opacity-50 cursor-not-allowed bg-gray-50';

  return [baseClasses, errorClasses, props.disabled && disabledClasses].filter(Boolean).join(' ');
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      :aria-invalid="!!error"
      :aria-describedby="error ? 'input-error' : undefined"
      @input="handleInput"
    />
    <p v-if="error" id="input-error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>
