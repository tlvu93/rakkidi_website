import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import importPlugin from 'eslint-plugin-import';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '.next/**',
      'out/**',
      'storybook-static/**',
      'node_modules/**',
      'next-env.d.ts'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextCoreWebVitals,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: { import: importPlugin },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true }
      }
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  },
  {
    // Build/config scripts are plain Node modules, not typed app source.
    files: ['*.{js,mjs,cjs}', '.storybook/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  },
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      // The rule wants story types imported from the framework package, but
      // @storybook/nextjs-vite does not re-export `Meta`/`StoryObj` - they only
      // exist on the renderer package. Revisit if that changes upstream.
      'storybook/no-renderer-packages': 'off'
    }
  }
);
