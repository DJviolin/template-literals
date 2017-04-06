'use strict';

const debug = require('debug');

const LOG = debug('app:log');
const REQ = debug('app:req');
const ERR = debug('app:err');
const WARN = debug('app:warn');

module.exports = {
  LOG,
  REQ,
  ERR,
  WARN,
};
