// This file configures ESLint, the linter for this project.
// A linter is a tool that analyzes source code to flag programming errors, bugs, stylistic errors, and suspicious constructs.
// It's like a code review bot that helps maintain code quality and consistency.
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  {
    // This section tells ESLint to ignore certain directories.
    // We don't want to lint build artifacts or third-party code.
    ignores: ['dist', 'build', 'public/build'],
  },
  {
    // This configuration object applies to all TypeScript and TypeScript with JSX files.
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      // 'parser': This specifies the parser ESLint should use.
      // We use the TypeScript parser to allow ESLint to understand TypeScript syntax.
      parser,
      parserOptions: {
        // 'project': This tells the TypeScript parser where to find the tsconfig.json file.
        // This is necessary for rules that require type information.
        project: './tsconfig.json',
        sourceType: 'module', // We are using ES modules.
        ecmaVersion: 'latest', // We are using the latest version of ECMAScript.
        ecmaFeatures: {
          jsx: true, // We are using JSX.
        },
      },
      globals: {
        // This defines global variables that are available in the code.
        // We are using browser globals, like 'window' and 'document'.
        ...globals.browser,
      },
    },
    plugins: {
      // This section loads ESLint plugins.
      // Plugins add new rules and configurations to ESLint.
      '@typescript-eslint': ts, // Adds TypeScript-specific rules.
      react, // Adds React-specific rules.
      'react-hooks': reactHooks, // Adds rules for React Hooks.
    },
    rules: {
      // This section configures the rules that ESLint will enforce.
      // We are using the recommended rules from the JavaScript, TypeScript, React, and React Hooks plugins.
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // This rule is turned off because with the new JSX transform, you no longer need to import React in every file.
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        // This tells the React plugin to automatically detect the version of React being used.
        version: 'detect',
      },
    },
  },
];
