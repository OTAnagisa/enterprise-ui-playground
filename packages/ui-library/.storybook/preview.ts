import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { initialize, mswLoader } from 'msw-storybook-addon'
import '../src/styles/tailwind.css'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
})

setup((app) => {
  // You can configure your Vue app here
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
}

export default preview
