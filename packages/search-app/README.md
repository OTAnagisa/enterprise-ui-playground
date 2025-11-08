# Search Application

A clean-architecture Vue3 search application demonstrating best practices.

## Architecture

```
src/
├── pages/          # Route pages (SearchPage)
├── components/     # Page-specific components
├── composables/    # Business logic (useSearch)
├── services/       # API communication layer
└── types/          # TypeScript definitions
```

## Key Principles

1. **No API calls in components**: All API logic is in services
2. **Composables for state management**: Business logic extracted from components
3. **Mocked tests**: Services are mocked using vi.mock for fast tests
4. **Clean separation**: Pages → Components → Composables → Services

## Development

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm test         # Run tests
pnpm lint         # Lint code
```

## Testing Strategy

- Components test behavior, not implementation
- Services are mocked with `vi.mock`
- Focus on user interactions and outcomes
- No direct dependency on API in tests

Example:
```typescript
vi.mock('@/services/searchService', () => ({
  searchService: {
    search: vi.fn(),
  },
}));
```

## Configuration

Create a `.env` file:
```
VITE_API_URL=http://localhost:3000/api
```
