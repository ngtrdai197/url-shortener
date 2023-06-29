module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:import/typescript',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
        paths: ['src'],
      },
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['import', 'react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    // ESLint default rules
    // `comma-dangle` conflicts with `prettier`
    // `comma-spacing` conflicts with `prettier`
    complexity: [0, 5],
    camelcase: 0,
    'consistent-return': 2,
    'default-case': 2,
    'eol-last': 2,
    // `indent` conflicts with `prettier`
    // `key-spacing` conflicts with `prettier`
    // `linebreak-style` conflicts with `prettier`
    'new-parens': 2,
    'no-alert': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 2,
    'no-debugger': 0,
    'no-dupe-class-members': 2,
    'no-eq-null': 2,
    'no-eval': 2,
    // `no-floating-decimal` conflicts with `prettier`
    'no-irregular-whitespace': 0,
    'no-magic-numbers': 0,
    // `no-multi-spaces` conflicts with `prettier`
    // `no-trailing-spaces` conflicts with `prettier`
    'no-use-before-define': 2,
    // `object-curly-spacing` conflicts with `prettier`
    // `quotes` conflicts with `prettier`
    // `semi` conflicts with `prettier`
    // `semi-spacing` conflicts with `prettier`
    // `space-infix-ops` conflicts with `prettier`
    // `space-in-parens` conflicts with `prettier`
    '@typescript-eslint/no-unused-vars': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/restrict-plus-operands': 0,
    '@typescript-eslint/no-misused-promises': 0,
    yoda: 2,
  },

  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],

      rules: {
        // Disable ESLint default rules
        'no-use-before-define': 0,

        // Import plugin rules
        'import/no-relative-parent-imports': 0,

        // TypeScript rules
        '@typescript-eslint/no-use-before-define': 2,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/consistent-type-definitions': 0,
        '@typescript-eslint/consistent-type-imports': 0,
        '@typescript-eslint/consistent-indexed-object-style': 0,

        // React rules
        'react/jsx-no-target-blank': 0,
        'react/prop-types': 0,

        // React Hooks rules
        'react-hooks/exhaustive-deps': 1,
        'react-hooks/rules-of-hooks': 2,
      },
    },
    {
      files: ['src/**/*.tsx'],
      rules: {
        'no-restricted-imports': 0,
      },
    },
    {
      files: ['src/**/*.stories.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 0,
      },
    },
  ],
};
