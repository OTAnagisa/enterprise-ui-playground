<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">
      Search App
    </h1>

    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="flex gap-4">
        <div class="flex-1">
          <SearchInput
            v-model="query"
            placeholder="Enter search query..."
            @keyup.enter="search"
          />
        </div>
        <Button
          @click="search"
          :disabled="loading"
          class="px-6"
        >
          {{ loading ? 'Searching...' : 'Search' }}
        </Button>
      </div>

      <div v-if="error" class="mt-4 text-red-600">
        {{ error }}
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>

    <div v-else-if="results.length > 0">
      <SearchResultList :results="results" />
    </div>

    <div v-else-if="query" class="text-center py-8 text-gray-500">
      No results found for "{{ query }}"
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, SearchInput } from 'ui-library'
import { useSearch } from '@/composables/useSearch'
import SearchResultList from '@/components/SearchResultList.vue'

const { query, results, loading, error, search } = useSearch()
</script>
