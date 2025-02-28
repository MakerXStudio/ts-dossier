import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,mjs,ts}'],
    ignores: ['node_modules', 'dist'],
  },
  {
    rules: {
      //'prettier/prettier': 'warn',
      'node/no-missing-import': 'off',
      'no-console': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
)
