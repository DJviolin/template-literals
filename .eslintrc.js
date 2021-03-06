// http://eslint.org/docs/user-guide/configuring
// http://eslint.org/docs/rules/
// http://eslint.org/docs/user-guide/configuring#configuring-rules
// http://kangax.github.io/compat-table/es5/
// https://kangax.github.io/compat-table/es6/
// http://caniuse.com/#feat=es5

module.exports = {
  "root": true,

  // https://www.npmjs.com/package/babel-eslint
  // https://www.npmjs.com/package/eslint-plugin-babel
  "parser": "babel-eslint",
  "plugins": [
    "babel",
  ],

  //"extends": "eslint:recommended",
  //"extends": "airbnb", // With React
  "extends": "airbnb/base", // Without React

  "globals": {
    "jQuery": true,
    "$": true
  },

  env: {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script', // "script" or "module"
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },

  "rules": {
    "spaced-comment": "off",
    "no-param-reassign": ["error", { "props": false }],
  },
}
