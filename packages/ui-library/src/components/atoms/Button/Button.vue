<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  disabled: false,
  fullWidth: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

const buttonClasses = computed(() => {
  const baseClasses = [
    'px-4',
    'py-2',
    'rounded-md',
    'font-medium',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
  ]

  const variantClasses = {
    primary: [
      'bg-primary-600',
      'text-white',
      'hover:bg-primary-700',
      'focus:ring-primary-500',
      'disabled:bg-primary-300',
      'disabled:cursor-not-allowed',
    ],
    secondary: [
      'bg-gray-600',
      'text-white',
      'hover:bg-gray-700',
      'focus:ring-gray-500',
      'disabled:bg-gray-300',
      'disabled:cursor-not-allowed',
    ],
    outline: [
      'bg-transparent',
      'text-primary-600',
      'border',
      'border-primary-600',
      'hover:bg-primary-50',
      'focus:ring-primary-500',
      'disabled:border-gray-300',
      'disabled:text-gray-300',
      'disabled:cursor-not-allowed',
      'disabled:hover:bg-transparent',
    ],
    danger: [
      'bg-red-600',
      'text-white',
      'hover:bg-red-700',
      'focus:ring-red-500',
      'disabled:bg-red-300',
      'disabled:cursor-not-allowed',
    ],
  }

  const widthClass = props.fullWidth ? 'w-full' : ''

  return [
    ...baseClasses,
    ...variantClasses[props.variant],
    widthClass,
  ].filter(Boolean).join(' ')
})
</script>
