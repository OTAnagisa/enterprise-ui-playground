# Vue Example Search App

A Vue 3 + TypeScript + Vite search application with UI Library components.

## Features

- 🔍 Search functionality with REST API integration
- 🎨 Built with UI Library components (Button, SearchInput)
- 💅 Styled with TailwindCSS
- ✅ Comprehensive test coverage with Vitest
- 🚀 Fast development with Vite

## Project Structure

```
src/
├── pages/          # Page components
├── components/     # Reusable components
├── composables/    # Vue composables
├── services/       # API services
└── assets/         # Static assets
tests/              # Test files
```

## Setup

1. Copy environment variables:
```bash
cp .env.example .env
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development server:
```bash
pnpm dev
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm preview` - Preview production build

## Environment Variables

- `VITE_API_BASE` - Base URL for the search API (default: http://localhost:3000)

## Testing

Tests are written with Vitest and @testing-library/vue:
- Composable unit tests: `tests/composables/`
- Component tests: `tests/pages/`

## CI/CD

GitHub Actions workflow runs on push to main and pull requests:
- Install dependencies
- Type checking with TypeScript
- Build application
- Run tests
