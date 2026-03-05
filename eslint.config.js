import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import boundaries, { Config } from "eslint-plugin-boundaries";
import featureSlicedConfig from '@feature-sliced/eslint-config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },

    ...featureSlicedConfig,

   // Simple FSD boundaries
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "app/**/*" },
        { type: "pages", pattern: "pages/**/*" },
        { type: "widgets", pattern: "widgets/**/*" },
        { type: "features", pattern: "features/**/*" },
        { type: "entities", pattern: "entities/**/*" },
        { type: "shared", pattern: "shared/**/*" },
      ],
    },
    rules: {
      "boundaries/element-types": [2, {
        default: "disallow",
        rules: [
          { from: "app", allow: ["pages", "widgets", "features", "entities", "shared"] },
          { from: "pages", allow: ["widgets", "features", "entities", "shared"] },
          { from: "widgets", allow: ["features", "entities", "shared"] },
          { from: "features", allow: ["entities", "shared"] },
          { from: "entities", allow: ["shared"] },
          { from: "shared", allow: [] }, // No imports from other layers
        ]
      }]
    }
  }
])
