# Contributing Guide

Thank you for your interest in contributing to this project! This guide will help you understand our development workflow and standards.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/production-monorepo.git
   cd production-monorepo
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   dotnet restore packages/backend/Backend.sln
   ```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

Follow the architecture patterns established in each package:
- **Frontend**: Keep components pure, business logic in composables/services
- **BFF**: Maintain the three-layer architecture
- **Backend**: Follow clean architecture principles

### 3. Write Tests

**Required**: All new features must include tests.

- **Frontend**: Test behavior, not implementation
- **BFF**: Unit tests for services, integration tests for endpoints
- **Backend**: Unit tests for application layer, integration tests for infrastructure

Aim for 80%+ code coverage on new code.

### 4. Run Tests Locally

```bash
# All tests
pnpm test
dotnet test packages/backend/Backend.sln

# Specific package
pnpm --filter ui-library test
pnpm --filter bff test:unit
```

### 5. Lint and Format

```bash
pnpm lint
pnpm format
```

### 6. Commit Your Changes

Follow conventional commits:

```bash
git commit -m "feat(ui-library): add new button variant"
git commit -m "fix(bff): handle null search results"
git commit -m "test(backend): add unit tests for SearchService"
```

**Commit Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `style`: Code style changes (formatting)
- `chore`: Maintenance tasks

### 7. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Standards

### TypeScript/JavaScript

- Use TypeScript strict mode
- No `any` types without justification
- Prefer functional components in Vue
- Use composition API over options API
- Extract complex logic to composables

### C#

- Follow Microsoft C# coding conventions
- Use nullable reference types
- Async/await for I/O operations
- SOLID principles
- No static classes (prefer dependency injection)

### Testing

**Good Test Example**:
```typescript
it('should display error when search fails', async () => {
  // Arrange
  const errorMessage = 'Network error';
  vi.mocked(searchService.search).mockRejectedValue(new Error(errorMessage));
  
  // Act
  render(SearchPage);
  await user.type(screen.getByRole('textbox'), 'test');
  await user.click(screen.getByRole('button', { name: /search/i }));
  
  // Assert
  await waitFor(() => {
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });
});
```

**Bad Test Example**:
```typescript
it('should set loading to true', () => {
  // Testing implementation details
  expect(wrapper.vm.loading).toBe(true);
});
```

### Documentation

- Update README.md if adding new features
- Add JSDoc/XML comments for public APIs
- Include examples in complex functions
- Update Storybook stories for UI components

## Pull Request Process

1. **Title**: Use conventional commit format
   - Example: `feat(search-app): add search history feature`

2. **Description**: Include:
   - What changes were made
   - Why these changes were necessary
   - Any breaking changes
   - Screenshots (for UI changes)

3. **Checks**: Ensure all CI checks pass
   - Linting
   - Tests
   - Build

4. **Review**: Wait for review from maintainers

5. **Merge**: Squash and merge after approval

## Architecture Guidelines

### Frontend (Vue3)

```typescript
// ✅ GOOD: Separate concerns
// Component (presentation)
const { results, search } = useSearch();

// Composable (business logic)
export function useSearch() {
  const results = ref([]);
  const search = async (query) => {
    const data = await searchService.search(query);
    results.value = data;
  };
  return { results, search };
}

// Service (API communication)
export const searchService = {
  search: (query) => fetch(`/api/search?q=${query}`)
};
```

### BFF (NestJS)

```typescript
// ✅ GOOD: Layered architecture
// Controller
@Controller('search')
export class SearchController {
  constructor(private service: SearchService) {}
  
  @Get()
  search(@Query('q') query: string) {
    return this.service.search(query);
  }
}

// Service
export class SearchService {
  constructor(private client: BackendClient) {}
  
  async search(query: string) {
    const data = await this.client.search(query);
    return this.transform(data);
  }
}

// Client
export class BackendClient {
  async search(query: string) {
    return this.http.get('/api/search', { params: { query } });
  }
}
```

### Backend (.NET)

```csharp
// ✅ GOOD: Clean architecture
// Controller (WebApi layer)
[ApiController]
public class SearchController : ControllerBase
{
    private readonly ISearchService _service;
    
    public SearchController(ISearchService service)
    {
        _service = service;
    }
    
    [HttpGet]
    public async Task<ActionResult<SearchResultDto>> Search(string query)
    {
        return Ok(await _service.SearchAsync(query));
    }
}

// Service (Application layer)
public class SearchService : ISearchService
{
    private readonly ISearchRepository _repository;
    
    public async Task<SearchResultDto> SearchAsync(string query)
    {
        var items = await _repository.SearchAsync(query);
        return _mapper.ToDto(items);
    }
}

// Repository (Infrastructure layer)
public class CosmosSearchRepository : ISearchRepository
{
    // Database implementation
}
```

## Common Mistakes to Avoid

### ❌ Don't

1. **Mix concerns**:
   ```typescript
   // Component making direct API calls
   const data = await fetch('/api/search');
   ```

2. **Test implementation details**:
   ```typescript
   expect(wrapper.vm.internalMethod).toHaveBeenCalled();
   ```

3. **Mock everything**:
   ```typescript
   // Mocking pure functions
   vi.mock('./utils/formatDate');
   ```

4. **Skip tests**:
   - "I'll add tests later" (You won't)

### ✅ Do

1. **Separate concerns**: Components → Composables → Services
2. **Test behavior**: What users see and do
3. **Mock I/O only**: Database, HTTP, File System
4. **Write tests first**: Or at least with the feature

## Questions?

- Check existing issues and pull requests
- Read the main README.md
- Ask in discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
