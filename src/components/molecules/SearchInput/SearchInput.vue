<template>
  <div class="relative w-full">
    <form @submit.prevent="handleSubmit">
      <div class="relative">
        <input
          ref="inputRef"
          :value="modelValue"
          :placeholder="placeholder"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          @input="handleInput"
          @change="handleChange"
          @focus="showDropdown = true"
          @blur="handleBlur"
        />
        <button
          v-if="modelValue"
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          @click="handleClear"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </form>

    <!-- Suggestions Dropdown -->
    <div
      v-if="showDropdown && suggestions.length > 0"
      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <ul class="py-1">
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
          @mousedown.prevent="handleSuggestionClick(suggestion)"
        >
          {{ suggestion }}
        </li>
      </ul>
    </div>

    <!-- Loading indicator -->
    <div
      v-if="isLoading"
      class="absolute right-3 top-1/2 -translate-y-1/2"
    >
      <svg
        class="animate-spin h-5 w-5 text-primary-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

export interface SearchInputProps {
  modelValue?: string
  placeholder?: string
  debounceMs?: number
}

const props = withDefaults(defineProps<SearchInputProps>(), {
  modelValue: '',
  placeholder: 'Search...',
  debounceMs: 300,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  submit: [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const suggestions = ref<string[]>([])
const showDropdown = ref(false)
const isLoading = ref(false)
let debounceTimeout: ReturnType<typeof setTimeout> | null = null

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  emit('update:modelValue', value)
  emit('input', value)
  
  // Debounce API call
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  
  if (value.trim()) {
    debounceTimeout = setTimeout(() => {
      fetchSuggestions(value)
    }, props.debounceMs)
  } else {
    suggestions.value = []
    showDropdown.value = false
  }
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleSubmit = () => {
  emit('submit', props.modelValue)
  showDropdown.value = false
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('input', '')
  emit('change', '')
  suggestions.value = []
  showDropdown.value = false
  inputRef.value?.focus()
}

const handleBlur = () => {
  // Delay to allow click on suggestion
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

const handleSuggestionClick = (suggestion: string) => {
  emit('update:modelValue', suggestion)
  emit('input', suggestion)
  emit('change', suggestion)
  showDropdown.value = false
}

const fetchSuggestions = async (query: string) => {
  if (!query.trim()) {
    suggestions.value = []
    return
  }

  isLoading.value = true
  
  try {
    const response = await fetch(`/api/suggest?q=${encodeURIComponent(query)}`)
    const data = await response.json()
    suggestions.value = data.suggestions || []
    showDropdown.value = true
  } catch (error) {
    console.error('Failed to fetch suggestions:', error)
    suggestions.value = []
  } finally {
    isLoading.value = false
  }
}

// Watch for external value changes
watch(() => props.modelValue, (newValue) => {
  if (newValue && newValue.trim()) {
    fetchSuggestions(newValue)
  } else {
    suggestions.value = []
  }
})
</script>
