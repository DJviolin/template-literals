'use strict';

// 1st
const { REQ } = require('./include/debug.js');

// Flash messages
// https://github.com/rkusa/koa-passport/issues/35#issuecomment-256842554
// https://github.com/embbnux/koa-flash-message
// https://github.com/ifraixedes/node-koa-flash-simple
exports.flash = function () {
  return async (ctx, next) => {
    ctx.flash = (type, msg) => {
      ctx.session.flash = {
        type,
        message: msg,
      };
    };
    await next();
  };
};

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

exports.removeTrailingSlash = function () {
  return async (ctx, next) => {
    if (ctx.path.length > 1 && ctx.path.endsWith('/')) {
      ctx.redirect(ctx.path.slice(0, ctx.path.length - 1));
      return;
    }
    await next();
  };
};
