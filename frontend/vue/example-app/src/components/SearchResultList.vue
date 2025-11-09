<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">
      Results ({{ results.length }})
    </h2>
    <div
      v-for="result in results"
      :key="result.id"
      class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
    >
      <h3 class="text-lg font-semibold text-gray-800 mb-2">
        {{ result.title }}
      </h3>
      <p class="text-gray-600">
        {{ result.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '@/services/searchApi'

interface Props {
  results: SearchResult[]
}

defineProps<Props>()
</script>
