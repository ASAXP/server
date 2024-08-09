import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: tsParser,
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',
  },
  ignorePatterns: ['/node_modules', '/dist', '.husky'],
  root: true,
};
