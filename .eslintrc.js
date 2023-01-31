module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'react-hooks/rules-of-hooks': 'off',
    'no-unused-vars': ['error', { 'caughtErrorsIgnorePattern': '^ignore' }],
  },
};