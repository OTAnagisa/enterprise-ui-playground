export interface SearchResult {
  id: string
  title: string
  description: string
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
}

export async function searchApi(query: string): Promise<SearchResponse> {
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
  const url = `${apiBase}/api/search?q=${encodeURIComponent(query)}`
  
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`)
  }
  
  return response.json()
}
