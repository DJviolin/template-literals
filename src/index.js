'use strict';

// For airBnB, babel inserting strict mode
require('babel-register')({
  presets: ['es2017-node7'],
  //plugins: ['transform-flow-strip-types'],
});
require('./bin/www');
