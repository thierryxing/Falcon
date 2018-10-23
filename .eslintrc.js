// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  'extends': [
    'airbnb-base',
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'import/extensions': ['off', 'always', {
      'vue': 'never'
    }],
    'import/no-unresolved': ['off', 'always', {
      'vue': 'never'
    }],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-unused-vars': 0,
    'no-trailing-spaces': 0,
    'indent': 0,
    'semi': 0,
    'object-property-newline': 0,
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

