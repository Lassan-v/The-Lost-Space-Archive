import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['dist/**', 'node_modules/**', '.agents/**', '.claude/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        SpeechSynthesisUtterance: 'readonly',
        speechSynthesis: 'readonly',
        AudioContext: 'readonly',
        webkitAudioContext: 'readonly',
        HTMLElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLAnchorElement: 'readonly',
        React: 'readonly',
        JSX: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        CustomEvent: 'readonly',
        location: 'readonly',
        MediaQueryListEvent: 'readonly',
        MediaQueryList: 'readonly',
        matchMedia: 'readonly',
        Window: 'readonly',
        Node: 'readonly',
        KeyboardEvent: 'readonly',
        StorageEvent: 'readonly',
        TouchEvent: 'readonly',
        SpeechSynthesis: 'readonly',
        SpeechSynthesisVoice: 'readonly',
      },
    },
    settings: {
      react: { version: '18.3' },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '*.config.*', '*.md', '.agents/', 'src/**/__test__*', '.agents/'],
    languageOptions: {
      parserOptions: { ecmaVersion: 2020 },
    },
    rules: {
      'no-console': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
