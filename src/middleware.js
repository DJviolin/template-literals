'use strict';

// 1st
const { LOG, REQ, ERR, WARN } = require('./include/debug.js');

// Logger middleware
exports.logger = function () {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    //
    const str = new RegExp(/\/css\//, 'g');
    const match = `${ctx.originalUrl}`;
    const found = str.test(match);
    //
    if (found === false) {
      REQ(`${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms`);
    }
  };
};

// Flash messages
// https://github.com/rkusa/koa-passport/issues/35#issuecomment-256842554
// https://github.com/embbnux/koa-flash-message
// https://github.com/ifraixedes/node-koa-flash-simple
/*exports.flash = function () {
  return async (ctx, next) => {
    ctx.flash = async (type, msg) => {
      ctx.session.flash = {
        type,
        message: msg,
      };
    };
    await next();
  };
};*/

// Expose req.flash (getter) and res.flash = _ (setter)
// Flash data persists in user's sessions until the next ~successful response
exports.flash = function (cookieName = 'flash') {
  return async (ctx, next) => {
    let data;
    let tmp;
    if (ctx.cookies.get(cookieName)) {
      tmp = decodeURIComponent(ctx.cookies.get(cookieName));
      // Handle bad JSON in the cookie, possibly set by fuzzers
      try {
        data = JSON.parse(tmp);
      } catch (err) {
        ctx.cookies.set(cookieName, null);
        data = {};
      }
    } else {
      data = {};
    }

    Object.defineProperty(ctx, 'flash', {
      enumerable: true,
      get: function () {
        return data;
      },
      set: function (val) {
        const encodedVal = encodeURIComponent(JSON.stringify(val));
        ctx.cookies.set(cookieName, encodedVal, {
          // flash cookie only lasts 10 seconds to prevent stale flash messages.
          // CAVEAT: if the redirect request takes more than 10 seconds to
          // load, then the user will end up with no flash message,
          // no errors, etc.
          maxAge: 10000,
        });
      },
    });

    await next();

    // clear flash cookie if it's a successful request
    // AND if it was actually set (instead of sending extraneous set-cookie
    // on every request)
    if (ctx.response.status < 300 && ctx.cookies.get(cookieName) !== undefined) {
      ctx.cookies.set(cookieName, null);
    }
  };
};

// Removes latest "/" from URLs
exports.removeTrailingSlash = function () {
  return async (ctx, next) => {
    if (ctx.path.length > 1 && ctx.path.endsWith('/')) {
      ctx.redirect(ctx.path.slice(0, ctx.path.length - 1));
      return;
    }
    await next();
  };
};

// Quickly generate Date objects in the future.
//
//    futureDate({ days: 4 })            -> Date
//    futureDate(someDate, { years: 2 }) -> Date
/*exports.futureDate = function (nowDate, opts) {
  if (!opts) {
    opts = nowDate;
    nowDate = new Date();
  }
  return new Date(nowDate.getTime() +
    (opts.years || 0) * 1000 * 60 * 60 * 24 * 365 +
    (opts.days || 0) * 1000 * 60 * 60 * 24 +
    (opts.hours || 0) * 1000 * 60 * 60 +
    (opts.minutes || 0) * 1000 * 60 +
    (opts.seconds || 0) * 1000 +
    (opts.milliseconds || 0));
};*/
