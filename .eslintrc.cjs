module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/consistent-type-imports': ['warn', {disallowTypeAnnotations: false}],
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', {ignoreRestSiblings: true, destructuredArrayIgnorePattern: '^_'}],
    '@typescript-eslint/no-unnecessary-template-expression': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-object-type': 'warn',
    '@typescript-eslint/no-unsafe-function-type': 'warn',
    '@typescript-eslint/no-wrapper-object-types': 'warn',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-expect-error': 'allow-with-description',
        'minimumDescriptionLength': 20,
      },
    ],
    'prefer-const': 'warn',
    'no-useless-return': 'warn',
    'no-sequences': ['warn', {allowInParentheses: false}],
    'quote-props': ['warn', 'consistent-as-needed'],
    'dot-notation': 'warn',
    'spaced-comment': ['warn', 'always', {block: {balanced: true}}],
    'object-shorthand': 'warn',
    'no-useless-rename': 'warn',
    'no-empty-pattern': 'warn',
    'no-console': [
      'warn',
      {
        allow: Object.keys(console).filter((method) => method !== 'log'), // Allow everything except `console.log()`
      },
    ],
    'prefer-promise-reject-errors': ['error', {allowEmptyReject: true}],
    'react/jsx-filename-extension': ['error', {allow: 'as-needed', extensions: ['.jsx', '.tsx']}],
    'react/self-closing-comp': 'warn',
    'react/function-component-definition': ['error', {namedComponents: 'function-declaration'}],
    'react/jsx-curly-brace-presence': ['warn', {props: 'never', children: 'never'}],
    'react/no-unescaped-entities': 'off',
    'react/jsx-key': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'prefer-arrow-callback': ['error', {allowNamedFunctions: true}],
    'import/extensions': [
      'warn',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/first': 'warn',
    'prettier/prettier': 'warn',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'], // https://stackoverflow.com/questions/58510287/parseroptions-project-has-been-set-for-typescript-eslint-parser
    // The above config increases `eslint` startup time, about 10 sec!
    // It's required for these rules:
    // - @typescript-eslint/consistent-type-imports
  },
}
