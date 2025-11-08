<script setup lang="ts">
import type { SearchResult } from '@/types';

defineProps<{
  result: SearchResult;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
    <h3 class="text-xl font-semibold text-gray-900 mb-2">
      <a :href="result.url" target="_blank" rel="noopener noreferrer" class="hover:text-primary-600">
        {{ result.title }}
      </a>
    </h3>
    <p class="text-gray-600 mb-2">{{ result.description }}</p>
    <a
      :href="result.url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-sm text-primary-600 hover:text-primary-800"
    >
      {{ result.url }}
    </a>
  </div>
</template>
