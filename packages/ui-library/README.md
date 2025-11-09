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
├── atoms/          # Basic building blocks (Button, TextField, DateInput)
├── molecules/      # Simple combinations (Card)
└── organisms/      # Complex compositions (Calendar, Table)
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

### TextField (Atom)

A text input field with label, error states, and various input types.

**Props:**
- `modelValue`: `string` - The value of the input
- `label`: `string` - Label text for the input
- `type`: `'text' | 'email' | 'password' | 'tel' | 'url' | 'number'` - HTML input type (default: `'text'`)
- `placeholder`: `string` - Placeholder text
- `disabled`: `boolean` - Whether the input is disabled
- `required`: `boolean` - Whether the input is required
- `error`: `string` - Error message to display
- `helperText`: `string` - Helper text to display below input
- `fullWidth`: `boolean` - Whether the input should take full width (default: `true`)

**Events:**
- `update:modelValue`: Emitted when the input value changes
- `input`: Emitted on input event
- `change`: Emitted on change event
- `blur`: Emitted on blur
- `focus`: Emitted on focus

### DateInput (Atom)

A date input field with calendar icon and date restrictions.

**Props:**
- `modelValue`: `string` - The date value (YYYY-MM-DD format)
- `label`: `string` - Label text for the input
- `min`: `string` - Minimum date allowed (YYYY-MM-DD format)
- `max`: `string` - Maximum date allowed (YYYY-MM-DD format)
- `disabled`: `boolean` - Whether the input is disabled
- `required`: `boolean` - Whether the input is required
- `error`: `string` - Error message to display
- `helperText`: `string` - Helper text to display below input
- `fullWidth`: `boolean` - Whether the input should take full width (default: `true`)

**Events:**
- `update:modelValue`: Emitted when the date value changes
- `input`: Emitted on input event
- `change`: Emitted on change event
- `blur`: Emitted on blur
- `focus`: Emitted on focus

### Card (Molecule)

A flexible card component with header, body, and footer sections.

**Props:**
- `title`: `string` - Card title (used if header slot is not provided)
- `variant`: `'default' | 'outlined' | 'elevated'` - Visual style variant (default: `'default'`)
- `padding`: `'none' | 'sm' | 'md' | 'lg'` - Padding size for card body (default: `'md'`)
- `hoverable`: `boolean` - Whether card shows hover effect (default: `false`)
- `clickable`: `boolean` - Whether card is clickable (default: `false`)

**Events:**
- `click`: Emitted when clickable card is clicked

**Slots:**
- `header`: Custom header content
- `default`: Card body content
- `footer`: Footer content

### Calendar (Organism)

A full-featured calendar component with date selection and restrictions.

**Props:**
- `modelValue`: `Date | null` - Currently selected date
- `minDate`: `Date` - Minimum selectable date
- `maxDate`: `Date` - Maximum selectable date
- `disabledDates`: `Date[]` - Array of disabled dates
- `locale`: `string` - Locale for date formatting (default: `'en-US'`)

**Events:**
- `update:modelValue`: Emitted when a date is selected
- `select`: Emitted when a date is selected

### Table (Organism)

A powerful table component with sorting, custom cells, and various styling options.

**Props:**
- `columns`: `TableColumn[]` - Array of column definitions
- `data`: `Record<string, any>[]` - Array of row data
- `striped`: `boolean` - Whether to stripe table rows (default: `false`)
- `hoverable`: `boolean` - Whether rows show hover effect (default: `true`)
- `bordered`: `boolean` - Whether to show borders (default: `false`)
- `dense`: `boolean` - Whether to use dense padding (default: `false`)
- `clickableRows`: `boolean` - Whether rows are clickable (default: `false`)

**Events:**
- `rowClick`: Emitted when a clickable row is clicked
- `sort`: Emitted when a column is sorted

**TableColumn Interface:**
```typescript
interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
  format?: (value: any) => string
}
```

**Slots:**
- `cell-{columnKey}`: Custom cell content for specific column
- `empty`: Custom empty state content

## Usage Examples

### Basic Usage

```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick">
      Click me
    </Button>
    
    <TextField
      v-model="name"
      label="Name"
      placeholder="Enter your name"
    />
    
    <DateInput
      v-model="birthDate"
      label="Birth Date"
    />
    
    <Card title="User Profile">
      <p>Card content goes here</p>
    </Card>
    
    <Calendar v-model="selectedDate" />
    
    <Table
      :columns="columns"
      :data="data"
      striped
      hoverable
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, TextField, DateInput, Card, Calendar, Table } from 'ui-library'
import 'ui-library/style.css'

const name = ref('')
const birthDate = ref('')
const selectedDate = ref<Date | null>(null)

const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
]

const data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
]

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

## Testing

Tests are written using Vitest and Testing Library, following the Arrange-Act-Assert pattern.

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test:coverage
```

## Storybook

Storybook provides an interactive environment for developing and testing components.

```bash
pnpm storybook
```

Features:
- **MSW Integration**: Mock API responses
- **Controls**: Interactively change props in real-time
- **Actions**: Monitor emitted events
- **Docs**: Auto-generated documentation

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
