'use strict';

const debug = require('debug');

const err = debug('app:err');
const log = debug('app:log');
const req = debug('app:req');
exports.err = err;
exports.log = log;
exports.req = req;

// Ensure require('dotenv').config() is run before this module is required

exports.NODE_ENV = process.env.NODE_ENV || 'development';

// //////////////////////////////////////////////////////////

// Output config object in development to help with sanity-checking
if (exports.NODE_ENV === 'development' || exports.NODE_ENV === 'test') {
  log(exports);
}
