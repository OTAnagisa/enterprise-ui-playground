<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-gray-200">
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      </slot>
    </div>
    
    <div :class="bodyClasses">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface CardProps {
  title?: string
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'md',
  hoverable: false,
  clickable: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}

const cardClasses = computed(() => {
  const baseClasses = [
    'bg-white',
    'rounded-lg',
    'overflow-hidden',
  ]

  const variantClasses = {
    default: ['border', 'border-gray-200'],
    outlined: ['border-2', 'border-gray-300'],
    elevated: ['shadow-lg'],
  }

  const interactionClasses = []
  
  if (props.hoverable) {
    interactionClasses.push('transition-shadow', 'duration-200', 'hover:shadow-xl')
  }
  
  if (props.clickable) {
    interactionClasses.push('cursor-pointer', 'transition-all', 'duration-200', 'hover:scale-[1.02]')
  }

  return [
    ...baseClasses,
    ...variantClasses[props.variant],
    ...interactionClasses,
  ].join(' ')
})

const bodyClasses = computed(() => {
  const paddingClasses = {
    none: '',
    sm: 'px-4 py-3',
    md: 'px-6 py-4',
    lg: 'px-8 py-6',
  }

  return paddingClasses[props.padding]
})
</script>
