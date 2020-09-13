module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/recommended',
      '@vue/airbnb',
      '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
      },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: 'off', // disable the base rule as it can report incorrect errors
        '@typescript-eslint/semi': ['error'],
        "@typescript-eslint/interface-name-prefix" : "off",
        "@typescript-eslint/no-explicit-any" : "off",
        "import/extensions": "off"
    },
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
    overrides: [
        {
          files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/unit/**/*.spec.{j,t}s?(x)',
          ],
          env: {
            jest: true,
          },
        },
      ],
  };
  