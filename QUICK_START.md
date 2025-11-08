# 🚀 Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

Install these first:
- **Node.js** v18+ → [Download](https://nodejs.org/)
- **pnpm** v8+ → `npm install -g pnpm`
- **.NET SDK 8** → [Download](https://dotnet.microsoft.com/download)

## Step 1: Install Dependencies

```bash
# Clone and navigate to project
cd /workspace

# Install Node.js dependencies
pnpm install

# Restore .NET dependencies
dotnet restore packages/backend/Backend.sln
```

## Step 2: Run Tests

Verify everything works:

```bash
# Frontend + BFF tests
pnpm test

# Backend tests
dotnet test packages/backend/Backend.sln
```

Expected: All tests pass ✅

## Step 3: Start Development

### Option A: Run Everything

```bash
# Terminal 1: Frontend (Storybook)
pnpm --filter ui-library storybook
# Opens http://localhost:6006

# Terminal 2: Search App
pnpm --filter search-app dev
# Opens http://localhost:5173

# Terminal 3: BFF
pnpm --filter bff dev
# Runs on http://localhost:3000

# Terminal 4: Backend
cd packages/backend/src/Backend.WebApi
dotnet run
# Runs on http://localhost:5000
```

### Option B: Run One Thing

```bash
# Just Storybook (component library)
pnpm --filter ui-library storybook

# Just Search App (needs BFF + Backend running)
pnpm --filter search-app dev

# Just BFF (needs Backend running)
pnpm --filter bff dev

# Just Backend
cd packages/backend/src/Backend.WebApi && dotnet run
```

## Step 4: Explore

### 📚 Storybook (UI Components)
1. Open http://localhost:6006
2. Browse components in sidebar
3. Play with component props
4. See MSW mock handlers in action

### 🔍 Search App
1. Open http://localhost:5173
2. Enter a search query
3. See the clean architecture in action
4. Check browser console for API calls

### 🔌 API Endpoints

**BFF** (http://localhost:3000):
- `GET /api/health` - Health check
- `GET /api/search?q=test&page=1` - Search

**Backend** (http://localhost:5000):
- `GET /api/health` - Health check
- `GET /api/search?query=test&page=1` - Search
- `GET /swagger` - API documentation

## Step 5: Make Changes

### Add a New Component

1. Create files:
```bash
# In packages/ui-library/src/atoms/YourComponent/
- YourComponent.vue
- YourComponent.spec.ts
- YourComponent.stories.ts
```

2. Write component:
```vue
<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <div>{{ text }}</div>
</template>
```

3. Write test:
```typescript
import { render, screen } from '@testing-library/vue';
import YourComponent from './YourComponent.vue';

it('renders text', () => {
  render(YourComponent, { props: { text: 'Hello' } });
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

4. Run test:
```bash
pnpm --filter ui-library test
```

### Add a New API Endpoint

**Backend** (C#):
```csharp
// In SearchController.cs
[HttpGet("stats")]
public async Task<ActionResult<StatsDto>> GetStats()
{
    var stats = await _service.GetStatsAsync();
    return Ok(stats);
}
```

**BFF** (NestJS):
```typescript
// In search.controller.ts
@Get('stats')
async getStats() {
  return this.service.getStats();
}
```

## Common Commands

```bash
# Development
pnpm dev              # Run all Node.js projects
pnpm backend:dev      # Run .NET backend

# Testing
pnpm test             # All frontend + BFF tests
pnpm test:watch       # Watch mode
dotnet test packages/backend/Backend.sln  # Backend tests

# Building
pnpm build            # Build all Node.js packages
dotnet build packages/backend/Backend.sln --configuration Release

# Linting
pnpm lint             # Lint all packages
pnpm format           # Format all code

# Storybook
pnpm storybook        # Run Storybook
pnpm build-storybook  # Build static Storybook
```

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 3000 (or 5000, 5173, 6006)
lsof -ti:3000 | xargs kill -9
```

### pnpm Install Fails

```bash
# Clear cache and reinstall
pnpm store prune
rm -rf node_modules
pnpm install
```

### .NET Build Fails

```bash
# Clean and rebuild
dotnet clean packages/backend/Backend.sln
dotnet restore packages/backend/Backend.sln
dotnet build packages/backend/Backend.sln
```

### Tests Fail

```bash
# Update snapshots (if needed)
pnpm test -- -u

# Run specific test
pnpm --filter ui-library test Button.spec.ts

# Backend specific test
dotnet test packages/backend/tests/Backend.Application.UnitTests --filter SearchServiceTests
```

## What to Do Next

1. ✅ **Read the main README**: `/workspace/README.md`
2. ✅ **Explore Storybook**: See all components
3. ✅ **Run tests**: Understand the testing strategy
4. ✅ **Check the code**: See clean architecture in action
5. ✅ **Make changes**: Follow the patterns
6. ✅ **Read CONTRIBUTING.md**: Before making PRs

## Need Help?

- 📖 **Main README**: Complete architecture overview
- 📖 **CONTRIBUTING.md**: Development guidelines
- 📖 **PROJECT_OVERVIEW.md**: Detailed file structure
- 📦 **Package READMEs**: Specific package documentation

---

**Ready to code!** 🎉

Happy coding! If you get stuck, check the documentation or existing code for examples.
