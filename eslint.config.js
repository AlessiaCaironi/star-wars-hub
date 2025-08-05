import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsParser from '@typescript-eslint/parser'

import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import prettierPlugin from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  js.configs.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    ignores: ['dist'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      semi: 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
      'import/extensions': ['warn', 'never'],
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'sort-imports': 'off',
      'import/order': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
        },
      ],
    },
  },
]
