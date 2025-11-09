/**
 * Utility functions for generating Vue SFC source code in Storybook
 */

interface GenerateSourceCodeOptions {
  componentName: string
  args: Record<string, any>
  slots?: {
    default?: string
    [key: string]: string | undefined
  }
  imports?: string[]
  setup?: string[]
  vModel?: string
  events?: Record<string, string>
}

/**
 * Convert prop name from camelCase to kebab-case
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Format prop value for template
 */
function formatPropValue(key: string, value: any): string {
  if (typeof value === 'boolean') {
    return value ? key : `:${key}="false"`
  }
  if (typeof value === 'string') {
    return `${key}="${value}"`
  }
  if (typeof value === 'number') {
    return `:${key}="${value}"`
  }
  if (Array.isArray(value) || typeof value === 'object') {
    return `:${key}="${key}"`
  }
  return `:${key}="${key}"`
}

/**
 * Generate Vue SFC source code from component args
 */
export function generateSourceCode(options: GenerateSourceCodeOptions): string {
  const {
    componentName,
    args,
    slots = {},
    imports = [],
    setup = [],
    vModel,
    events = {},
  } = options

  // Filter out default/undefined props
  const propsToRender = Object.entries(args).filter(([key, value]) => {
    // Skip if value is undefined, null, or default value
    if (value === undefined || value === null) return false
    // Skip boolean false values (we'll add them explicitly if true)
    if (typeof value === 'boolean' && !value) return false
    // Skip empty strings
    if (typeof value === 'string' && value === '') return false
    return true
  })

  // Generate template props
  const templateProps: string[] = []
  
  if (vModel) {
    templateProps.push(`v-model="${vModel}"`)
  }

  propsToRender.forEach(([key, value]) => {
    const kebabKey = toKebabCase(key)
    
    // Handle boolean props
    if (typeof value === 'boolean') {
      if (value) {
        templateProps.push(kebabKey)
      }
    }
    // Handle string props
    else if (typeof value === 'string') {
      templateProps.push(`${kebabKey}="${value}"`)
    }
    // Handle number props
    else if (typeof value === 'number') {
      templateProps.push(`:${kebabKey}="${value}"`)
    }
    // Handle complex types (arrays, objects, functions)
    else {
      const varName = key
      templateProps.push(`:${kebabKey}="${varName}"`)
    }
  })

  // Add events
  Object.entries(events).forEach(([event, handler]) => {
    templateProps.push(`@${toKebabCase(event)}="${handler}"`)
  })

  // Build template
  const propsString = templateProps.length > 0
    ? '\n    ' + templateProps.join('\n    ')
    : ''

  let template = ''
  if (slots.default) {
    template = `<template>
  <${componentName}${propsString}>
    ${slots.default}
  </${componentName}>
</template>`
  } else {
    template = `<template>
  <${componentName}${propsString} />
</template>`
  }

  // Build script setup
  const allImports = ['vue', componentName, ...imports]
  const setupLines: string[] = []

  // Add imports from vue
  const vueImports = ['ref']
  if (setup.some(line => line.includes('computed'))) {
    vueImports.push('computed')
  }

  let scriptContent = `import { ${vueImports.join(', ')} } from 'vue'\n`
  scriptContent += `import { ${componentName} } from 'ui-library'\n`

  // Add type imports if needed
  const complexProps = propsToRender.filter(([_, value]) => 
    Array.isArray(value) || (typeof value === 'object' && value !== null)
  )

  if (complexProps.length > 0) {
    const typeImports: string[] = []
    complexProps.forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        // Detect type from array content
        if (key === 'columns') {
          typeImports.push('TableColumn')
        }
      }
    })
    
    if (typeImports.length > 0) {
      scriptContent += `import type { ${typeImports.join(', ')} } from 'ui-library'\n`
    }
  }

  scriptContent += '\n'

  // Add v-model variable
  if (vModel) {
    const varType = vModel.includes('Date') ? '<Date | null>' : ''
    scriptContent += `const ${vModel} = ref${varType}('')\n`
  }

  // Add complex prop definitions
  complexProps.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (key === 'columns') {
        scriptContent += `const ${key}: TableColumn[] = ${JSON.stringify(value, null, 2)}\n\n`
      } else if (key === 'data') {
        scriptContent += `const ${key} = ${JSON.stringify(value, null, 2)}\n\n`
      } else {
        scriptContent += `const ${key} = ${JSON.stringify(value, null, 2)}\n\n`
      }
    } else if (typeof value === 'object' && value !== null) {
      scriptContent += `const ${key} = ${JSON.stringify(value, null, 2)}\n\n`
    }
  })

  // Add custom setup code
  if (setup.length > 0) {
    scriptContent += setup.join('\n') + '\n'
  }

  const script = `\n<script setup lang="ts">\n${scriptContent}</script>`

  return template + script
}

/**
 * Create a source code transformer for Storybook
 */
export function createSourceCodeTransformer(
  componentName: string,
  options: Partial<Omit<GenerateSourceCodeOptions, 'componentName' | 'args'>> = {}
) {
  return (_: string, storyContext: any) => {
    return generateSourceCode({
      componentName,
      args: storyContext.args,
      ...options,
    })
  }
}
