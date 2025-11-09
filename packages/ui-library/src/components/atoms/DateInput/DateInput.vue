<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        :id="inputId"
        type="date"
        :value="modelValue"
        :min="min"
        :max="max"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="helperText" class="mt-1 text-sm text-gray-500">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface DateInputProps {
  modelValue?: string
  label?: string
  min?: string
  max?: string
  disabled?: boolean
  required?: boolean
  error?: string
  helperText?: string
  fullWidth?: boolean
}

const props = withDefaults(defineProps<DateInputProps>(), {
  modelValue: '',
  disabled: false,
  required: false,
  fullWidth: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = computed(() => {
  return `dateinput-${Math.random().toString(36).substr(2, 9)}`
})

const inputClasses = computed(() => {
  const baseClasses = [
    'block',
    'px-3',
    'py-2',
    'border',
    'rounded-md',
    'shadow-sm',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-0',
    'transition-colors',
    'duration-200',
  ]

  const widthClass = props.fullWidth ? 'w-full' : ''

  const stateClasses = props.error
    ? [
        'border-red-300',
        'text-red-900',
        'focus:ring-red-500',
        'focus:border-red-500',
      ]
    : props.disabled
    ? [
        'bg-gray-50',
        'border-gray-200',
        'text-gray-500',
        'cursor-not-allowed',
      ]
    : [
        'border-gray-300',
        'focus:ring-primary-500',
        'focus:border-primary-500',
        'hover:border-gray-400',
      ]

  return [...baseClasses, widthClass, ...stateClasses].filter(Boolean).join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', target.value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>
