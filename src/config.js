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
exports.PORT = Number.parseInt(process.env.PORT, 10) || 3000;

// If true, then Koa will trust the X-Forwarded-Host header
// For example, use this if you're behind Cloudflare
// https://github.com/koajs/koa/blob/master/docs/api/request.md#requesthost
exports.TRUST_PROXY = process.env.TRUST_PROXY === 'true';

// //////////////////////////////////////////////////////////

// Output config object in development to help with sanity-checking
if (exports.NODE_ENV === 'development' || exports.NODE_ENV === 'test') {
  log(exports);
}
