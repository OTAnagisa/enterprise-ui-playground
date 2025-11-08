# UI Library

A production-ready Vue3 component library built with TailwindCSS and TypeScript.

## Features

- ✅ Atomic Design Pattern (Atoms, Molecules, Organisms)
- ✅ Full TypeScript support
- ✅ TailwindCSS styling
- ✅ Comprehensive test coverage with Vitest
- ✅ Interactive Storybook documentation
- ✅ MSW for API mocking in stories
- ✅ Reusable composables

## Installation

```bash
pnpm install
```

## Development

```bash
# Run Storybook
pnpm storybook

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build library
pnpm build
```

## Components

### Atoms
- **Button**: Configurable button with variants (primary, secondary, danger) and sizes
- **Input**: Text input with label, error states, and validation support

### Molecules
- **SearchBar**: Search input with submit button

### Organisms
- **SearchForm**: Complete search form with validation and debouncing

## Composables

- **useDebounce**: Debounce reactive values
- **useValidation**: Form validation utilities

## Testing

All components are tested using @testing-library/vue with a focus on:
- User behavior rather than implementation
- Accessibility
- Component interactions

Run tests:
```bash
pnpm test
```

## Storybook

View all components interactively:
```bash
pnpm storybook
```

Visit http://localhost:6006
