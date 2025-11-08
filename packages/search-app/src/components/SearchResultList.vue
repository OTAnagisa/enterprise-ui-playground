<script setup lang="ts">
import type { SearchResult } from '@/types';
import SearchResultItem from './SearchResultItem.vue';

defineProps<{
  results: SearchResult[];
  total: number;
}>();
</script>

<template>
  <div>
    <div v-if="total > 0" class="mb-4 text-sm text-gray-600">
      Found {{ total }} result{{ total === 1 ? '' : 's' }}
    </div>

    <div v-if="results.length > 0" class="space-y-4">
      <SearchResultItem v-for="result in results" :key="result.id" :result="result" />
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">No results found. Try a different search term.</p>
    </div>
  </div>
</template>
