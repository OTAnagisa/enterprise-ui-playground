import { ref, Ref } from 'vue';
import type { SearchResult, SearchError } from '@/types';
import { searchService } from '@/services/searchService';

export interface UseSearchReturn {
  results: Ref<SearchResult[]>;
  loading: Ref<boolean>;
  error: Ref<SearchError | null>;
  total: Ref<number>;
  search: (query: string) => Promise<void>;
  clear: () => void;
}

export function useSearch(): UseSearchReturn {
  const results = ref<SearchResult[]>([]);
  const loading = ref(false);
  const error = ref<SearchError | null>(null);
  const total = ref(0);

  const search = async (query: string): Promise<void> => {
    if (!query.trim()) {
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await searchService.search(query);
      results.value = response.results;
      total.value = response.total;
    } catch (err) {
      error.value = {
        message: err instanceof Error ? err.message : 'An error occurred',
      };
      results.value = [];
      total.value = 0;
    } finally {
      loading.value = false;
    }
  };

  const clear = () => {
    results.value = [];
    error.value = null;
    total.value = 0;
    loading.value = false;
  };

  return {
    results,
    loading,
    error,
    total,
    search,
    clear,
  };
}
