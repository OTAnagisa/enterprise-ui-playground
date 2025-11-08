# Backend - .NET 8 Clean Architecture

ASP.NET Core 8 API with Clean Architecture and Azure CosmosDB.

## Architecture

```
Backend.WebApi          → REST API Controllers
     ↓
Backend.Application     → Use Cases, DTOs, Services
     ↓
Backend.Domain          → Entities, Repository Interfaces
     ↑
Backend.Infrastructure  → CosmosDB Implementation
```

## Key Features

- ✅ Clean Architecture
- ✅ Azure CosmosDB integration
- ✅ Mapperly for DTO mapping (source generator)
- ✅ Dependency Injection
- ✅ Comprehensive test coverage
- ✅ xUnit + Moq for unit tests
- ✅ TestContainers for integration tests
- ✅ Swagger/OpenAPI documentation

## Development

```bash
# Restore dependencies
dotnet restore Backend.sln

# Build
dotnet build Backend.sln

# Run API
cd src/Backend.WebApi
dotnet run

# Run all tests
dotnet test Backend.sln

# Run specific test project
dotnet test tests/Backend.Application.UnitTests
```

## Testing Strategy

### Unit Tests (Application Layer)
- Test business logic in isolation
- Mock repositories with Moq
- Fast execution
- High coverage

### Integration Tests (Infrastructure Layer)
- Test database operations
- Use TestContainers for CosmosDB Emulator
- Verify data persistence

### API Tests (WebApi Layer)
- Minimal end-to-end tests
- Test HTTP endpoints
- Use WebApplicationFactory

## Configuration

Update `appsettings.json`:
```json
{
  "CosmosDb": {
    "ConnectionString": "your-connection-string",
    "DatabaseName": "SearchDatabase",
    "ContainerName": "SearchItems"
  }
}
```

## Why Mapperly?

- **Performance**: Source generator, no reflection
- **Type Safety**: Compile-time validation
- **Zero Overhead**: No runtime mapping logic
- **Maintainability**: Clear, generated code

Example:
```csharp
[Mapper]
public partial class SearchItemMapper
{
    public partial SearchItemDto ToDto(SearchItem entity);
}
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/search?query=test&page=1` - Search items
- `GET /api/search/{id}` - Get item by ID
- `POST /api/search` - Create new item

## Running with CosmosDB Emulator

1. Install [CosmosDB Emulator](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator)
2. Start the emulator
3. Use the default connection string in `appsettings.Development.json`
4. Run the application
