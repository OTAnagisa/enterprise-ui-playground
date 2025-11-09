import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSearch } from '@/composables/useSearch'
import * as searchApi from '@/services/searchApi'

vi.mock('@/services/searchApi')

describe('useSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with empty state', () => {
    const { query, results, loading, error } = useSearch()

    expect(query.value).toBe('')
    expect(results.value).toEqual([])
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('should return empty results when query is empty', async () => {
    const { query, results, search } = useSearch()

    query.value = ''
    await search()

    expect(results.value).toEqual([])
    expect(vi.mocked(searchApi.searchApi)).not.toHaveBeenCalled()
  })

  it('should perform search and update results', async () => {
    const mockResults = {
      results: [
        { id: '1', title: 'Test 1', description: 'Description 1' },
        { id: '2', title: 'Test 2', description: 'Description 2' }
      ],
      total: 2
    }

    vi.mocked(searchApi.searchApi).mockResolvedValue(mockResults)

    const { query, results, loading, error, search } = useSearch()

    query.value = 'test query'
    await search()

    expect(loading.value).toBe(false)
    expect(results.value).toEqual(mockResults.results)
    expect(error.value).toBeNull()
    expect(searchApi.searchApi).toHaveBeenCalledWith('test query')
  })

  it('should handle search errors', async () => {
    const errorMessage = 'Search failed: Network error'
    vi.mocked(searchApi.searchApi).mockRejectedValue(new Error(errorMessage))

    const { query, results, loading, error, search } = useSearch()

    query.value = 'test query'
    await search()

    expect(loading.value).toBe(false)
    expect(results.value).toEqual([])
    expect(error.value).toBe(errorMessage)
  })

  it('should set loading state during search', async () => {
    let resolveSearch: (value: any) => void
    const searchPromise = new Promise((resolve) => {
      resolveSearch = resolve
    })

    vi.mocked(searchApi.searchApi).mockReturnValue(searchPromise as any)

    const { query, loading, search } = useSearch()

    query.value = 'test'
    const searchCall = search()

    expect(loading.value).toBe(true)

    resolveSearch!({ results: [], total: 0 })
    await searchCall

    expect(loading.value).toBe(false)
  })
})
