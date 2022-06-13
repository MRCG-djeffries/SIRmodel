module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  plugins: ['import', 'prettier', 'vue'],
  ignorePatterns: ['src/components/vue-datepicker/**/*.js'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],
    'max-nested-callbacks': [
      'error',
      {
        max: 3,
      },
    ],
    'max-statements': [
      'error',
      {
        max: 10,
      },
      {
        ignoreTopLevelFunctions: false,
      },
    ],
    'complexity': [
      'error',
      {
        max: 5,
      },
    ],
    'max-depth': [
      'error',
      {
        max: 2,
      },
    ],
    'max-params': [
      'error',
      {
        max: 3,
      },
    ],
    'max-lines-per-function': [
      'warn',
      {
        max: 100,
        skipComments: true,
        skipBlankLines: true,
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
      },
    ],
    'vue/no-deprecated-scope-attribute': 'error',
    'arrow-body-style': 'off',
  },
}
