module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      files: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
      extends: [
        'plugin:jest/recommended',
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'jest',
  ],
  rules: {
  },
};
