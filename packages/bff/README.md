# Backend-for-Frontend (BFF)

NestJS API service following three-layer architecture.

## Architecture

```
Controller Layer  →  HTTP request/response handling
     ↓
Service Layer     →  Business logic and orchestration
     ↓
Client Layer      →  External API communication
```

## Key Features

- ✅ Three-layer architecture
- ✅ Dependency Injection
- ✅ Request validation with DTOs
- ✅ Comprehensive test coverage
- ✅ Integration tests with Supertest
- ✅ CORS configuration
- ✅ Global error handling

## Development

```bash
pnpm dev              # Start in watch mode
pnpm build            # Build for production
pnpm start:prod       # Start production server
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests only
pnpm test:integration # Run integration tests
pnpm lint             # Lint code
```

## Testing Strategy

### Unit Tests
- Mock external clients
- Test service logic in isolation
- Fast execution

### Integration Tests
- Test full HTTP request/response cycle
- Mock external APIs only
- Use Supertest

Example unit test:
```typescript
const mockBackendClient = {
  search: jest.fn(),
};

const module = await Test.createTestingModule({
  providers: [
    SearchService,
    { provide: BackendClient, useValue: mockBackendClient },
  ],
}).compile();
```

## Configuration

Create a `.env` file:
```
PORT=3000
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/search?q=query&page=1` - Search endpoint
- `GET /api/search/:id` - Get item by ID
- `POST /api/search` - Create search item
