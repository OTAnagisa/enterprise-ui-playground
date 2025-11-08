import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock API endpoint for SearchInput suggestions
  http.get('/api/suggest', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q') || ''
    
    // Return mock suggestions based on the query
    const suggestions = query
      ? [
          `${query} suggestion 1`,
          `${query} suggestion 2`,
          `${query} suggestion 3`,
          `${query} advanced`,
          `${query} premium`,
        ].slice(0, 5)
      : []
    
    return HttpResponse.json({
      suggestions,
      query,
    })
  }),
]
