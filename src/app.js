'use strict';

// Dotenv (initialize before everything else)
require('dotenv').config();
// Node
const path = require('path');
// 3rd
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const CSRF = require('koa-csrf').default; // https://github.com/koajs/csrf
const helmet = require('koa-helmet');
const json = require('koa-json');
const Koa = require('koa');
/*const passport = require('koa-passport');*/
//const ratelimit = require('koa-ratelimit');
const serve = require('koa-static');
const session = require('koa-session-minimal');
// 1st
const config = require('./config');
const mw = require('./middleware');
const { LOG, ERR } = require('./include/debug.js');

// Routes
const index = require('./routes/index');
const query = require('./routes/query');
const login = require('./routes/login');
const test = require('./routes/test');

const app = new Koa();

// set the session keys
app.keys = ['your-session-secret', 'another-session-secret'];

//const RedisStore = require('koa-redis');
//const PgStore = require('koa-pg-session');
const days = 1000 * 60 * 60 * 24;
app.use(session({
  key: 'SESSID',
  //store: new RedisStore(),
  cookie: ctx => ({
    maxAge: ctx.session.user ? days * 30 : 0,
    //httpOnly: false,
    httpOnly: true,
  }),
}));

// Middlewares
app.use(bodyParser({ enableTypes: [/*'json', */'form'], strict: true }));
//app.use(methodOverride()); // Must come after body parser
app.use(helmet()); // https://blog.risingstack.com/node-js-security-checklist/
app.use(compress());
app.use(json({ pretty: false, param: 'pretty' }));
app.use(mw.logger()); // Logger middleware
app.use(mw.flash()); // Flash messages
app.use(mw.pgp()); // PostgreSQL
app.use(mw.removeTrailingSlash()); // Removes latest "/" from URLs
app.use(mw.periodOfTime()); // Returns a period of time in milliseconds
app.use(mw.wrapCurrUser());

app.use(async (ctx, next) => {
  console.log(ctx.periodOfTime({ days: 3, hours: 6 }));
  await next();
});

// Templating setup - Must be used before any router
// Thanks to template literals, this part not needed

// Static file serving middleware
if (config.NODE_ENV !== 'production') {
  app.use(serve(path.join(__dirname, 'public'), {
    // cache static assets for 365 days in production (if not nginx serving it)
    maxage: config.NODE_ENV === 'production' ? 1000 * 60 * 60 * 24 * 365 : 0,
  }));
  LOG('serveStatic is ON!');
}

// CSRF middleware
app.use(new CSRF({
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
  disableQuery: false,
}));

// authentication
/*require('./include/auth'); // include
app.use(passport.initialize());
app.use(passport.session());*/

// Global data sharing middleware initialization
app.use(async (ctx, next) => {
  // res.locals.global = {}; // Express 4+
  ctx.state.global = {
    sitename: 'Sitename',
    /*isAuthenticated: ctx.isAuthenticated(), // http://stackoverflow.com/a/20056529/1442219*/
    //flash: ctx.session.flash,
    flash: ctx.flash,
  };
  ctx.state.filters = { // Act as a helper functions in templating engines
    isEmpty: (obj) => {
      // Check if object is empty
      // http://stackoverflow.com/a/32108184/1442219
      let bool = false;
      if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        bool = true;
      }
      return bool;
    },
  };
  /*// clear flash after if it was actually set (so on the next request)
  //console.log(`ctx.session.flash == ${JSON.stringify(ctx.session.flash, null, 4)}`);
  //if (ctx.session.flash !== undefined) {
  //  ctx.session.flash = undefined;
  //}
  ctx.session.flash = this || undefined; // shorthand for if*/
  console.log(`ctx.currUser === ${JSON.stringify(ctx.currUser, null, 4)}\nctx.currSessionId === ${ctx.currSessionId}`);
  await next();
});

// CSRF middleware (e.g. parse a form submit)
app.use(async (ctx, next) => {
  if (!['GET', 'POST'].includes(ctx.method)) {
    return next();
  }
  if (ctx.method === 'GET') {
    ctx.state.global.csrf = await ctx.csrf;
  }
  await next();
});

// Routes
app.use(index.routes(), index.allowedMethods());
app.use(query.routes(), query.allowedMethods());
// Routes (authorized)
app.use(login.routes(), login.allowedMethods());
app.use(test.routes(), test.allowedMethods());

app.use((ctx) => {
  //if (ctx.path === '/test') {
  if (ctx.url.match(/^\/json/)) {
    ctx.body = {
      json: 'works!!!',
    };
  }
});

// Error handling
app.on('error', (err, ctx) => {
  ERR('server error', err, ctx);
});

module.exports = app;
