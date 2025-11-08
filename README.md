# Production-Grade Full-Stack Monorepo

A comprehensive, production-ready monorepo demonstrating best practices in clean architecture, testing, and maintainable code across the full stack.

## 🏗️ Architecture Overview

This monorepo contains four main packages following clean architecture principles:

```
┌─────────────────────────────────────────────────────────────┐
│                       Frontend Layer                         │
│  ┌──────────────────┐          ┌──────────────────┐        │
│  │   Search App     │          │   UI Library     │        │
│  │  (Vue3 + Vite)   │          │  (Components)    │        │
│  └────────┬─────────┘          └──────────────────┘        │
│           │                                                  │
└───────────┼──────────────────────────────────────────────────┘
            │ HTTP/REST
┌───────────▼──────────────────────────────────────────────────┐
│                          BFF Layer                            │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              NestJS Backend-for-Frontend               │  │
│  │  Controller → Service → Client (Layered Architecture)  │  │
│  └─────────────────────────┬──────────────────────────────┘  │
└────────────────────────────┼─────────────────────────────────┘
                             │ HTTP/REST
┌────────────────────────────▼─────────────────────────────────┐
│                        Backend Layer                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              .NET 8 Clean Architecture                 │  │
│  │  WebApi → Application → Domain ← Infrastructure        │  │
│  │                      (CosmosDB)                         │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## 📦 Packages

### 1. **ui-library** - Vue3 Component Library
- **Tech Stack**: Vue3, Vite, TypeScript, TailwindCSS
- **Testing**: Vitest + @testing-library/vue
- **Documentation**: Storybook with MSW mock handlers
- **Architecture**:
  - Atomic Design: Atoms → Molecules → Organisms
  - Composables for reusable logic
  - Zero API calls in components (pure presentation)

**Key Features**:
- Fully typed TypeScript components
- Comprehensive test coverage (unit tests for all components)
- Interactive Storybook documentation
- TailwindCSS for styling
- MSW for API mocking in Storybook

**Components**:
```
src/
├── atoms/          # Basic building blocks (Button, Input)
├── molecules/      # Simple component compositions (SearchBar)
├── organisms/      # Complex components (SearchForm)
└── composables/    # Reusable logic (useDebounce, useValidation)
```

### 2. **search-app** - Example Search Application
- **Tech Stack**: Vue3, Vite, TypeScript, Vue Router
- **Testing**: Vitest with mocked services
- **Architecture**: Clean separation of concerns

**Folder Structure**:
```
src/
├── pages/          # Route pages
├── components/     # Page-specific components
├── composables/    # Business logic (useSearch)
├── services/       # API communication layer
└── types/          # TypeScript definitions
```

**Testing Strategy**:
- Components tested in isolation
- Services mocked using `vi.mock`
- Focus on behavior, not implementation
- No direct API calls in components

### 3. **bff** - NestJS Backend-for-Frontend
- **Tech Stack**: NestJS, TypeScript, Axios
- **Testing**: Jest (unit) + Supertest (integration)
- **Architecture**: Three-layer pattern

**Layer Separation**:
```
Controller Layer  →  Handles HTTP requests/responses
     ↓
Service Layer     →  Business logic and orchestration
     ↓
Client Layer      →  External API communication
```

**Testing Approach**:
- **Unit Tests**: Mock clients, test service logic
- **Integration Tests**: Real HTTP calls, mock external services
- Follow AAA pattern (Arrange-Act-Assert)
- Dependency Injection for testability

### 4. **backend** - .NET 8 Clean Architecture
- **Tech Stack**: ASP.NET Core 8, Azure CosmosDB, Mapperly
- **Testing**: xUnit, Moq, TestContainers
- **Architecture**: Clean Architecture with four layers

**Project Structure**:
```
Backend.Domain          → Entities & Repository Interfaces
Backend.Application     → Use Cases, DTOs, Services (Mapperly mappers)
Backend.Infrastructure  → CosmosDB Implementation
Backend.WebApi          → REST API Controllers
```

**Testing Strategy**:
- **Unit Tests** (Backend.Application.UnitTests):
  - Test business logic in isolation
  - Mock repositories using Moq
  - Fast execution
  
- **Integration Tests** (Backend.Infrastructure.IntegrationTests):
  - Test database operations
  - Use TestContainers (CosmosDB Emulator)
  - Verify data persistence
  
- **API Tests** (Backend.WebApi.ApiTests):
  - Minimal end-to-end tests
  - Test HTTP endpoints
  - Use WebApplicationFactory

**Why Mapperly?**
- Source generator (compile-time)
- Zero runtime overhead
- Type-safe mapping
- No reflection (unlike AutoMapper)

## 🧪 Testing Strategy

This project follows the **Test Pyramid** principle:

```
         ╱╲              ← Few E2E/API Tests (Slow, Expensive)
        ╱  ╲
       ╱────╲            ← Some Integration Tests (Medium Speed)
      ╱      ╲
     ╱────────╲          ← Many Unit Tests (Fast, Cheap)
    ╱          ╲
```

### Testing Best Practices Applied

1. **Unit Tests (70-80%)**:
   - Fast execution (<1s per test)
   - Test one thing at a time
   - Mock external dependencies
   - Focus on business logic

2. **Integration Tests (15-25%)**:
   - Test component interactions
   - Use real databases (TestContainers)
   - Mock only external services

3. **API/E2E Tests (5-10%)**:
   - Critical user flows only
   - Real HTTP requests
   - Minimal but comprehensive

### Frontend Testing Philosophy

```typescript
// ❌ BAD: Testing implementation details
expect(wrapper.vm.internalState).toBe(true);

// ✅ GOOD: Testing behavior
expect(screen.getByText('Success message')).toBeInTheDocument();
```

- Use @testing-library/vue (behavior-driven)
- Mock services, not internals
- Test what users see and do

### Backend Testing Philosophy

```csharp
// ❌ BAD: Mocking everything (Mockist approach)
Mock<IDependency1> mock1;
Mock<IDependency2> mock2;
// ... mock everything

// ✅ GOOD: Mock only I/O, test real logic
var service = new SearchService(
    mockRepository.Object,  // Mock I/O
    new RealMapper()        // Real logic
);
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0
- **.NET SDK**: 8.0
- **CosmosDB Emulator** (optional, for integration tests)

### Installation

```bash
# Install all dependencies
pnpm install

# Install .NET dependencies
dotnet restore packages/backend/Backend.sln
```

### Development

```bash
# Run all projects in parallel
pnpm dev

# Or run individually:
pnpm ui-library:dev      # Storybook on http://localhost:6006
pnpm search-app:dev      # Search app on http://localhost:5173
pnpm bff:dev             # BFF on http://localhost:3000
pnpm backend:dev         # Backend on http://localhost:5000
```

### Testing

```bash
# Run all tests
pnpm test

# Frontend tests
pnpm --filter ui-library test
pnpm --filter search-app test

# BFF tests
pnpm --filter bff test:unit
pnpm --filter bff test:integration

# Backend tests
dotnet test packages/backend/Backend.sln
```

### Building

```bash
# Build all projects
pnpm build

# Build backend
dotnet build packages/backend/Backend.sln --configuration Release
```

## 📋 Project Scripts

### Root Level
- `pnpm dev` - Run all projects in development mode
- `pnpm build` - Build all projects
- `pnpm test` - Run all tests
- `pnpm lint` - Lint all projects
- `pnpm format` - Format all code

### Individual Packages
- `pnpm --filter <package-name> <script>` - Run script in specific package
- Example: `pnpm --filter ui-library test`

## 🏛️ Design Principles

### 1. Clean Architecture
- **Independence**: Business logic independent of frameworks
- **Testability**: Easy to test without UI, database, or external services
- **Dependency Rule**: Dependencies point inward (Domain ← Application ← Infrastructure)

### 2. Separation of Concerns
- **Frontend**: Components don't call APIs directly
- **BFF**: Controllers don't contain business logic
- **Backend**: Each layer has single responsibility

### 3. Dependency Injection
- **Benefits**: Testability, flexibility, maintainability
- **Implementation**: 
  - Vue3: Composables and services
  - NestJS: Built-in DI container
  - .NET: Built-in DI container

### 4. Test-Driven Development (TDD) Ready
- Every component/service is testable in isolation
- Interfaces define contracts
- Mocking is straightforward

## 🔧 Configuration

### Environment Variables

**Search App** (`.env`):
```bash
VITE_API_URL=http://localhost:3000/api
```

**BFF** (`.env`):
```bash
PORT=3000
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

**Backend** (`appsettings.json`):
```json
{
  "CosmosDb": {
    "ConnectionString": "your-cosmos-connection-string",
    "DatabaseName": "SearchDatabase",
    "ContainerName": "SearchItems"
  }
}
```

## 📊 Code Quality

### Linting & Formatting
- **ESLint**: Consistent JavaScript/TypeScript code
- **Prettier**: Consistent code formatting
- **EditorConfig**: Cross-editor consistency

### Type Safety
- Strict TypeScript configuration
- C# nullable reference types enabled
- No `any` types (enforced by linters)

## 🔄 CI/CD Pipeline

GitHub Actions workflow includes:

1. **Parallel Jobs**:
   - UI Library: Lint → Test → Build
   - Search App: Lint → Test → Build
   - BFF: Lint → Unit Tests → Integration Tests → Build
   - Backend: Build → Unit Tests → API Tests

2. **Caching**:
   - pnpm store cache
   - .NET NuGet cache

3. **Quality Gates**:
   - All tests must pass
   - Linting must pass
   - Build must succeed

## 📈 Performance Considerations

### Frontend
- Code splitting with Vite
- Lazy loading routes
- Debounced search inputs
- Memoized computations

### Backend
- Async/await everywhere
- Efficient database queries
- Connection pooling
- Response caching (where applicable)

## 🔒 Security Best Practices

1. **Input Validation**: DTOs with class-validator (NestJS), validation attributes (.NET)
2. **CORS Configuration**: Explicit allowed origins
3. **Dependency Updates**: Regular security audits
4. **No Secrets in Code**: Environment variables for sensitive data

## 📚 Learning Resources

### Clean Architecture
- "Clean Architecture" by Robert C. Martin
- "Domain-Driven Design" by Eric Evans

### Testing
- "Growing Object-Oriented Software, Guided by Tests" by Freeman & Pryce
- "The Art of Unit Testing" by Roy Osherove

### Vue.js Testing
- [Testing Library Documentation](https://testing-library.com/docs/vue-testing-library/intro/)
- [Vue Test Utils](https://test-utils.vuejs.org/)

### .NET Testing
- [xUnit Documentation](https://xunit.net/)
- [Moq Quickstart](https://github.com/moq/moq4)

## 🤝 Contributing

1. Follow the established architecture patterns
2. Write tests for new features
3. Maintain test coverage above 80%
4. Follow the commit message convention
5. Update documentation

## 📝 License

MIT

## 🙏 Acknowledgments

This project demonstrates production-grade practices including:
- Clean Architecture principles
- Test Pyramid implementation
- Dependency Injection patterns
- Separation of concerns
- SOLID principles
- Modern tooling and frameworks

---

**Built with ❤️ for maintainable, testable, and scalable applications**
