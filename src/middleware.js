'use strict';

// 3rd
const db = require('./db/index'); // Postgres
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

const presentUser = function (x) {
  if (!x) return;
  // Fix embedded json representation
  if (typeof x.created_at === 'string') {
    x.created_at = new Date(x.created_at);
  }
  x.url = `/users/${x.uname}`;
  return x;
};
// Assoc ctx.currUser if the session_id cookie (a UUID v4)
// is an active session.
exports.wrapCurrUser = function () {
  return async (ctx, next) => {
    const sessionId = ctx.cookies.get('session_id');
    LOG(`[wrapCurrUser] session_id: ${sessionId}`);
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
      //console.log(`wrapCurrUser === ${JSON.stringify(user, null, 4)}`);
      if (user) {
        ctx.currUser = presentUser(user);
        ctx.currSessionId = sessionId;
        LOG('[wrapCurrUser] User found');
        console.log(`ctx.currUser === ${JSON.stringify(ctx.currUser, null, 4)}\nctx.currSessionId === ${ctx.currSessionId}`);
      } else {
        LOG('[wrapCurrUser] No user found');
      }
    } catch (err) {
      ERR(`PGP ERROR: ${err.message}` || err);
    }
    await next();
  };
};
