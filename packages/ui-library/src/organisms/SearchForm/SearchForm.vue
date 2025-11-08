<script setup lang="ts">
import { ref, computed } from 'vue';
import SearchBar from '../../molecules/SearchBar/SearchBar.vue';
import { useDebounce } from '../../composables/useDebounce';
import { useValidation } from '../../composables/useValidation';

export interface SearchFormProps {
  minLength?: number;
  debounceMs?: number;
}

const props = withDefaults(defineProps<SearchFormProps>(), {
  minLength: 3,
  debounceMs: 300,
});

const emit = defineEmits<{
  search: [query: string];
}>();

const query = ref('');
const { validate, error } = useValidation({
  minLength: props.minLength,
});

const debouncedQuery = useDebounce(query, props.debounceMs);

const isValid = computed(() => validate(query.value));

const handleSearch = (searchQuery: string) => {
  query.value = searchQuery;

  if (isValid.value) {
    emit('search', searchQuery);
  }
};
</script>

<template>
  <div class="w-full max-w-2xl mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Search</h2>
      <SearchBar placeholder="Enter search query..." @search="handleSearch" />
      <p v-if="error && query" class="mt-2 text-sm text-red-600">
        {{ error }}
      </p>
      <p v-if="debouncedQuery && isValid" class="mt-2 text-sm text-gray-600">
        Searching for: <span class="font-semibold">{{ debouncedQuery }}</span>
      </p>
    </div>
  </div>
</template>
