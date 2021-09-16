module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
