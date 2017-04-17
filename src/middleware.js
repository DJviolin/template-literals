'use strict';

// Console colors
// https://dev.to/moriczgergo/nodejs-console-colors-101

// Node
//const url = require('url');
// 3rd
const bouncer = require('koa-bouncer');
// 1st
//const config = require('./config');
const db = require('./db/index');
const pre = require('./presenters');
const { LOG, REQ, ERR, WARN } = require('./include/debug.js');

// Logger middleware
exports.logger = function () {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    //
    //const str = new RegExp(/\/css\//, 'g');
    const str = new RegExp(/(\/css\/|\/js\/)/, 'g');
    const match = `${ctx.originalUrl}`;
    const found = str.test(match);
    //
    if (found === false) {
      REQ(`${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms`);
    }
  };
};

// PostgreSQL initialization
exports.pgp = function () {
  return async (ctx, next) => {
    try {
      ctx.db = db;
    } catch (err) {
      ERR(`PGP ERROR: ${err.message || err}`);
    }
    await next();
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

exports.handleBouncerValidationError = function () {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err instanceof bouncer.ValidationError) {
        ctx.flash = {
          message: ['danger', err.message || 'Validation error'],
          // CAVEAT: Max cookie size is 4096 bytes. If the user sent us a
          // body that exceeds that (for example, a large message), then
          // the cookie will not get set (silently).
          // TODO: Consider using localStorage to persist request bodies
          // so that it scales.
          params: ctx.request.body,
          bouncer: err.bouncer,
        };
        return ctx.redirect('back');
      }

      throw err;
    }
  };
};

// CSRF token
/*exports.csrfToken = function () {
  return async (ctx, next) => {
    ctx.csrfToken = Math.random().toString(36).slice(2);
    await next();
  };
};

// Cheap but simple way to protect against CSRF attacks
// TODO: Replace with something more versatile
exports.ensureReferer = function () {
  // Don't ensure referer in tests
  return async (ctx, next) => {
    // Skip get requests
    if (['GET', 'HEAD', 'OPTIONS'].includes(ctx.method)) {
      return await next();
    }
    // Skip if no HOSTNAME is set
    if (!config.HOSTNAME) {
      WARN('Skipping referer check since HOSTNAME not provided');
      return await next();
    }
    const refererHostname = url.parse(ctx.headers.referer || '').hostname;
    ctx.assert(config.HOSTNAME === refererHostname, 'Invalid referer', 403);
    await next();
  };
};*/

// Assoc ctx.currUser if the session_id cookie (a UUID v4)
// is an active session.
exports.wrapCurrUser = function () {
  return async (ctx, next) => {
    const sessionId = ctx.cookies.get('session_id');
    /*LOG(`[wrapCurrUser] session_id: ${sessionId}`);*/
    //if (!sessionId) return await next();
    if (!sessionId) return next();
    try {
      const user = await db.oneOrNone(`
        UPDATE "public".users
          SET last_online_at = NOW()
        WHERE id = (
          SELECT u.id
          FROM users u
          WHERE u.id = (
            SELECT s.user_id
            FROM active_sessions s
            WHERE s.id = '${sessionId}'
          )
        )
        RETURNING *;
      `, [], v => v);
      if (user) {
        ctx.currUser = pre.presentUser(user);
        //ctx.currUser = user;
        ctx.currSessionId = sessionId;
        /*LOG('[wrapCurrUser] User found');*/
      } else {
        /*LOG('[wrapCurrUser] No user found');*/
      }
    } catch (err) {
      ERR(`PGP ERROR: ${err.message}` || err);
    }
    await next();
  };
};
