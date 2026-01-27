module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@screens': './app/screens',
          '@components': './app/components',
          '@type': './app/types',
          '@services': './app/services',
          '@storage': './app/storage',
          '@validations': './app/validations',
        },
      },
    ],
  ],
};
