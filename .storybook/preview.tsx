import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';

import { getTheme } from '../src/shared/styles/theme/theme';

// The previous preview passed the *default export* of theme.ts to ThemeProvider,
// but that export is the `useCustomTheme` hook, not a theme object - so every
// story rendered against MUI's fallback theme instead of the app's.
const themes = {
  dark: getTheme('dark'),
  light: getTheme('light')
} as const;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  globalTypes: {
    colorMode: {
      description: 'Material UI palette mode',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    colorMode: 'dark'
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.colorMode as keyof typeof themes) ?? 'dark';

      return (
        <ThemeProvider theme={themes[mode]}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    }
  ]
};

export default preview;
