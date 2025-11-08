<script setup lang="ts">
import { SearchBar } from 'ui-library';
import SearchResultList from '@/components/SearchResultList.vue';
import { useSearch } from '@/composables/useSearch';

const { results, loading, error, total, search } = useSearch();

const handleSearch = (query: string) => {
  search(query);
};
</script>

<template>
  <div class="px-4 py-6">
    <div class="max-w-3xl mx-auto">
      <div class="mb-8">
        <SearchBar
          placeholder="Search for anything..."
          button-text="Search"
          @search="handleSearch"
        />
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p class="mt-4 text-gray-600">Searching...</p>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-800">{{ error.message }}</p>
      </div>

      <SearchResultList v-else :results="results" :total="total" />
    </div>
  </div>
</template>
