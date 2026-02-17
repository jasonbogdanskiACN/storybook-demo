// @ts-check
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import * as angularParser from '@angular-eslint/template-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    // Global ignores
    ignores: [
      'dist/**',
      'node_modules/**',
      '.angular/**',
      'coverage/**',
      '.storybook-static/**',
      '**/*.js',
      '**/*.mjs',
      '.storybook/**',     // Ignore Storybook config files only
      // Note: *.stories.ts files ARE linted - they're examples!
    ],
  },
  {
    // TypeScript files (excluding stories)
    files: ['**/*.ts'],
    ignores: ['**/*.stories.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@angular-eslint': angular,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // ============================================
      // CRITICAL: Angular Modern Best Practices
      // ============================================

      // Enforce OnPush change detection
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',

      // Component best practices
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',

      // TypeScript best practices
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // Code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    // Storybook stories (examples must follow best practices!)
    files: ['**/*.stories.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // Don't use projectService for stories - they're not in tsconfig
        project: false,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // TypeScript best practices (same as main code)
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // Code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    // HTML Templates
    files: ['**/*.html'],
    languageOptions: {
      parser: angularParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    rules: {
      // ============================================
      // CRITICAL: Ban Structural Directives (*ngIf, *ngFor, *ngSwitch)
      // Force Modern Control Flow (@if, @for, @switch)
      // ============================================
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',

      // Template best practices
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/use-track-by-function': 'warn',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/no-call-expression': 'warn',
      '@angular-eslint/template/no-any': 'warn',
    },
  },
];
