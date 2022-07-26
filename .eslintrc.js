const { getESLintConfig } = require('@iceworks/spec');

module.exports = getESLintConfig('react-ts', {
  rules: {
    '@iceworks/best-practices/no-http-url': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/array-type': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: false,
        html: true,
      },
    ],
  },
});
