import type { SearchResponse } from '@/types';

export class SearchService {
  private readonly baseUrl: string;

  constructor(baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api') {
    this.baseUrl = baseUrl;
  }

  async search(query: string, page = 1): Promise<SearchResponse> {
    const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}&page=${page}`);

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    return response.json();
  }
}

// Singleton instance
export const searchService = new SearchService();
