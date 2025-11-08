<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">UI Library - Dev Playground</h1>
      
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Button Component</h2>
        <div class="space-y-4">
          <div class="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="danger">Danger</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div>
            <Button full-width>Full Width Button</Button>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">SearchInput Component</h2>
        <div class="space-y-4">
          <SearchInput 
            v-model="searchValue"
            placeholder="Search for something..."
            @submit="handleSearch"
          />
          <div v-if="searchValue" class="text-sm text-gray-600">
            Current value: <strong>{{ searchValue }}</strong>
          </div>
          <div v-if="submittedValue" class="text-sm text-green-600">
            Submitted: <strong>{{ submittedValue }}</strong>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center text-gray-600">
        <p>Run <code class="bg-gray-100 px-2 py-1 rounded">pnpm storybook</code> to view components in Storybook</p>
        <p class="mt-2">Run <code class="bg-gray-100 px-2 py-1 rounded">pnpm test</code> to run unit tests</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/atoms/Button/Button.vue'
import SearchInput from './components/molecules/SearchInput/SearchInput.vue'

const searchValue = ref('')
const submittedValue = ref('')

const handleSearch = (value: string) => {
  submittedValue.value = value
  console.log('Search submitted:', value)
}
</script>
