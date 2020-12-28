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
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/camelcase': 'off',
    quotes: [1, 'single'],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
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
