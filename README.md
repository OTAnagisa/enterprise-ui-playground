# UI Library

A minimal but production-structured Vue 3 component library built with Vite, TypeScript, and TailwindCSS.

## Features

- 🚀 **Vue 3** with Composition API
- 📘 **TypeScript** for type safety
- 🎨 **TailwindCSS** for styling
- 📖 **Storybook** for component documentation and development
- 🧪 **Vitest** + **Testing Library** for unit tests
- 🎭 **MSW (Mock Service Worker)** for API mocking in stories
- ⚡ **Vite** for fast builds and HMR
- 📦 **pnpm** for efficient package management

## Component Architecture

Components are organized following the Atomic Design methodology:

```
src/components/
├── atoms/          # Basic building blocks (Button)
├── molecules/      # Simple combinations (SearchInput)
└── organisms/      # Complex compositions
```

## Installation

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install
```

## Available Scripts

### Development

```bash
# Run dev server with component playground
pnpm dev

# Open Storybook for component development
pnpm storybook

# Build Storybook for deployment
pnpm build-storybook
```

### Testing

```bash
# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Build

```bash
# Build the library for production
pnpm build

# Preview the production build
pnpm preview
```

## Components

### Button (Atom)

A versatile button component with multiple variants.

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'danger'` - Visual style variant (default: `'primary'`)
- `disabled`: `boolean` - Whether the button is disabled (default: `false`)
- `fullWidth`: `boolean` - Whether the button should take full width (default: `false`)
- `type`: `'button' | 'submit' | 'reset'` - HTML button type (default: `'button'`)

**Events:**
- `click`: Emitted when button is clicked (only when not disabled)

**Usage:**

```vue
<template>
  <Button variant="primary" @click="handleClick">
    Click me
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'ui-library'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

### SearchInput (Molecule)

A search input with debounced API suggestions and autocomplete.

**Props:**
- `modelValue`: `string` - The current value of the input
- `placeholder`: `string` - Placeholder text (default: `'Search...'`)
- `debounceMs`: `number` - Debounce delay in milliseconds (default: `300`)

**Events:**
- `update:modelValue`: Emitted when the input value changes
- `input`: Emitted on input event
- `change`: Emitted on change event
- `submit`: Emitted when the form is submitted (Enter key or form submit)

**API Integration:**
Makes GET requests to `/api/suggest?q={query}` for suggestions.

Expected response format:
```json
{
  "suggestions": ["suggestion 1", "suggestion 2"],
  "query": "search term"
}
```

**Usage:**

```vue
<template>
  <SearchInput
    v-model="searchQuery"
    placeholder="Search products..."
    @submit="handleSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchInput } from 'ui-library'

const searchQuery = ref('')

const handleSearch = (value: string) => {
  console.log('Search submitted:', value)
}
</script>
```

## Testing

### Running Tests

Tests are written using Vitest and Testing Library, following the Arrange-Act-Assert pattern.

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

Each component includes comprehensive tests:

- **Rendering tests**: Verify component renders correctly with various props
- **Props tests**: Test prop variations and their effects
- **Events tests**: Verify events are emitted correctly
- **API Integration tests**: Test network requests and responses (SearchInput)

Example test structure:

```typescript
describe('ComponentName', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      // Arrange & Act
      render(Component)
      
      // Assert
      expect(screen.getByRole('...')).toBeInTheDocument()
    })
  })
  
  describe('Props', () => {
    it('should apply prop correctly', () => {
      // Arrange & Act & Assert
    })
  })
  
  describe('Events', () => {
    it('should emit event on interaction', async () => {
      // Arrange & Act & Assert
    })
  })
})
```

## Storybook

Storybook provides an interactive environment for developing and testing components.

```bash
pnpm storybook
```

Features:
- **MSW Integration**: Mock API responses for SearchInput suggestions
- **Controls**: Interactively change props in real-time
- **Actions**: Monitor emitted events
- **Docs**: Auto-generated documentation

### MSW Handlers

API mocking is configured in `src/mocks/handlers.ts`:

```typescript
export const handlers = [
  http.get('/api/suggest', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q') || ''
    
    return HttpResponse.json({
      suggestions: [/* ... */],
      query,
    })
  }),
]
```

Stories can override handlers for specific scenarios (slow API, errors, etc.).

## Project Structure

```
ui-library/
├── .storybook/              # Storybook configuration
│   ├── main.ts              # Storybook main config
│   └── preview.ts           # Storybook preview config
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   └── Button/
│   │   │       ├── Button.vue
│   │   │       ├── Button.stories.ts
│   │   │       └── Button.test.ts
│   │   └── molecules/
│   │       └── SearchInput/
│   │           ├── SearchInput.vue
│   │           ├── SearchInput.stories.ts
│   │           └── SearchInput.test.ts
│   ├── mocks/
│   │   └── handlers.ts      # MSW handlers
│   ├── styles/
│   │   └── tailwind.css     # TailwindCSS imports
│   ├── App.vue              # Dev playground app
│   ├── main.ts              # Dev app entry
│   └── index.ts             # Library entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Building the Library

To build the library for distribution:

```bash
pnpm build
```

This creates:
- `dist/ui-library.es.js` - ES module build
- `dist/ui-library.umd.js` - UMD build for legacy support
- `dist/style.css` - Compiled styles
- `dist/index.d.ts` - TypeScript declarations

## Using the Library

### Installation (for consumers)

```bash
npm install ui-library
# or
pnpm add ui-library
# or
yarn add ui-library
```

### Import Components

```typescript
// Import individual components
import { Button, SearchInput } from 'ui-library'
import 'ui-library/style.css'

// Or import with tree-shaking
import Button from 'ui-library/dist/components/atoms/Button/Button.vue'
```

### TypeScript Support

Full TypeScript support is included with exported types:

```typescript
import type { ButtonProps, SearchInputProps } from 'ui-library'
```

## Development Guidelines

### Adding New Components

1. Create component directory in appropriate atomic level (`atoms/`, `molecules/`, or `organisms/`)
2. Create three files:
   - `ComponentName.vue` - Component implementation
   - `ComponentName.stories.ts` - Storybook stories
   - `ComponentName.test.ts` - Unit tests
3. Export component from `src/index.ts`
4. Follow existing patterns for props, events, and styling

### Code Style

- Use TypeScript strict mode
- Follow Vue 3 Composition API with `<script setup>`
- Use TailwindCSS utility classes for styling
- Write tests following Arrange-Act-Assert pattern
- Document props and events in Storybook stories

### Testing Guidelines

- Test component rendering with various props
- Test user interactions and event emissions
- Mock external dependencies (API calls, etc.)
- Aim for high coverage on critical paths
- Keep tests readable and maintainable

## Contributing

1. Create a new branch for your feature/fix
2. Write tests for new functionality
3. Ensure all tests pass: `pnpm test`
4. Create Storybook stories for new components
5. Update documentation as needed
6. Submit a pull request

## License

MIT

## Tech Stack

- **Vue 3.4+** - Progressive JavaScript framework
- **TypeScript 5.3+** - Type-safe JavaScript
- **Vite 5** - Next-generation frontend tooling
- **TailwindCSS 3.4** - Utility-first CSS framework
- **Vitest 1.3+** - Blazing fast unit test framework
- **Testing Library** - Simple and complete testing utilities
- **Storybook 7.6+** - UI component development environment
- **MSW 2+** - API mocking library
- **pnpm** - Fast, disk space efficient package manager

---

Built with ❤️ using Vue 3, TypeScript, and modern web development tools.
