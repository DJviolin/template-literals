'use strict';

/*
Returns a period of time in milliseconds
Usage:
const belt = require('./belt');
belt.periodOfTime({ days: 1, hours: 6 })
*/
exports.periodOfTime = function (opts) {
  return (opts.years || 0) * 1000 * 60 * 60 * 24 * 365 +
         (opts.days || 0) * 1000 * 60 * 60 * 24 +
         (opts.hours || 0) * 1000 * 60 * 60 +
         (opts.minutes || 0) * 1000 * 60 +
         (opts.seconds || 0) * 1000 +
         (opts.milliseconds || 0);
};
