import { ref, type Ref } from 'vue'
import { searchApi, type SearchResult } from '@/services/searchApi'

export interface UseSearchReturn {
  query: Ref<string>
  results: Ref<SearchResult[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  search: () => Promise<void>
}

export function useSearch(): UseSearchReturn {
  const query = ref('')
  const results = ref<SearchResult[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const search = async () => {
    if (!query.value.trim()) {
      results.value = []
      error.value = null
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await searchApi(query.value)
      results.value = response.results
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      results.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    query,
    results,
    loading,
    error,
    search
  }
}
