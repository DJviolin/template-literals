'use strict';

const debug = require('debug');

const err = debug('app:err');
const warn = debug('app:warn');
const log = debug('app:log');
const req = debug('app:req');
exports.err = err;
exports.warn = warn;
exports.log = log;
exports.req = req;

// Ensure require('dotenv').config() is run before this module is required

exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.PORT = Number.parseInt(process.env.PORT, 10) || 3000;

// If true, then Koa will trust the X-Forwarded-Host header
// For example, use this if you're behind Cloudflare
// https://github.com/koajs/koa/blob/master/docs/api/request.md#requesthost
exports.TRUST_PROXY = process.env.TRUST_PROXY || true;

// Set the HOSTNAME in production for basic CSRF prevention
// Ex: example.com, subdomain.example.com
exports.HOSTNAME = process.env.HOSTNAME;
if (!exports.HOSTNAME) {
  warn('Warn: CSRF checks are disabled since there is no HOSTNAME environment variable provided');
}

exports.RECAPTCHA_SITEKEY = process.env.RECAPTCHA_SITEKEY;
exports.RECAPTCHA_SITESECRET = process.env.RECAPTCHA_SITESECRET;
if (!exports.RECAPTCHA_SITEKEY) {
  warn('Warn: Recaptcha will not work since RECAPTCHA_SITEKEY is not set');
}
if (!exports.RECAPTCHA_SITESECRET) {
  warn('Warn: Recaptcha will not work since RECAPTCHA_SITESECRET is not set');
}

// //////////////////////////////////////////////////////////

// Output config object in development to help with sanity-checking
if (exports.NODE_ENV === 'development' || exports.NODE_ENV === 'test') {
  log(exports);
}
