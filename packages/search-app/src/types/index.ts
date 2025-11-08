export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
}

export interface SearchError {
  message: string;
  code?: string;
}
