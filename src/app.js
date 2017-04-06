'use strict';

// https://github.com/danneu/koa-skeleton
// https://koa-skeleton.danneu.com/register
// https://github.com/danneu/koa-bouncer
//
// https://github.com/danneu/koa-skeleton/blob/master/sql/schema.sql
// https://github.com/danneu/koa-skeleton/blob/master/sql/seeds.sql

// 3rd party
require('dotenv').config();
const bodyParser = require('koa-bodyparser');
const CSRF = require('koa-csrf').default; // https://github.com/koajs/csrf
const helmet = require('koa-helmet');
const json = require('koa-json');
const Koa = require('koa');
const path = require('path');
const passport = require('koa-passport');
//const ratelimit = require('koa-ratelimit');
const serve = require('koa-static');
// https://github.com/silenceisgolden/koa-server-push
// const serverpush = require('koa-server-push');
const session = require('koa-session-minimal');
// 1st party
const config = require('./config');

// Routes
const index = require('./routes/index');
const query = require('./routes/query');
const login = require('./routes/login');

const app = new Koa();

// Sessions
// https://www.npmjs.com/package/connect-pg-simple
// https://www.npmjs.com/package/koa-pg-session
//
// http://mherman.org/blog/2016/09/25/node-passport-and-postgres/
// https://github.com/longztian/koa-session-minimal
// https://github.com/koajs/koa-redis
// https://github.com/TMiguelT/koa-pg-session
//app.keys = ['your-session-secret'];
// set the session keys
app.keys = ['your-session-secret', 'another-session-secret'];

//app.use(session());
//
//const RedisStore = require('koa-redis');
//const PgStore = require('koa-pg-session');
//const ONE_DAY = 24 * 3600 * 1000;
const ONE_MONTH = 30 * 24 * 3600 * 1000;
app.use(session({
  //key: 'koa:sess',
  key: 'SESSID',
  //store: new RedisStore(),
  cookie: ctx => ({
    maxAge: ctx.session.user ? ONE_MONTH : 0,
    httpOnly: false,
  }),
}));

// Middlewares
//app.use(serverpush());
// OR
// app.use(serverpush({
//   manifestName: 'anothername.json',
//   gaeproxy: true,
//   singleheader: true
// }));
app.use(bodyParser());
app.use(helmet()); // https://blog.risingstack.com/node-js-security-checklist/
app.use(json({ pretty: false, param: 'pretty' }));

// add the CSRF middleware
app.use(new CSRF({
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  //excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
  //disableQuery: false,
}));

// authentication
require('./include/auth'); // include
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
// https://github.com/rkusa/koa-passport/issues/35#issuecomment-256842554
// https://github.com/embbnux/koa-flash-message
// https://github.com/ifraixedes/node-koa-flash-simple
app.use(async (ctx, next) => {
  ctx.flash = (type, msg) => {
    ctx.session.flash = {
      type,
      message: msg,
    };
  };
  await next();
});

// Global data sharing middleware initialization
app.use(async (ctx, next) => {
  // res.locals.global = {}; // Express 4+
  ctx.state.global = {
    sitename: 'Sitename',
    isAuthenticated: ctx.isAuthenticated(), // http://stackoverflow.com/a/20056529/1442219
    flash: ctx.session.flash,
  };
  await next();
});

// your middleware here (e.g. parse a form submit)
app.use(async (ctx, next) => {
  if (!['GET', 'POST'].includes(ctx.method)) {
    await next();
  }
  if (ctx.method === 'GET') {
    //ctx.body = ctx.csrf;
    //return;
    ctx.state.global.csrf = await ctx.csrf;
  }
  //ctx.body = 'OK';
  await next();
});

// Logger middleware
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  //
  const str = new RegExp(/\/css\//, 'g');
  const match = `${ctx.originalUrl}`;
  const found = str.test(match);
  //
  //if ((found === false) && (process.env.NODE_ENV !== 'production')) {
  if (found === false) {
    config.req(`${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms`);
  }
});

// Development
if (config.NODE_ENV !== 'production') {
  app.use(serve(path.join(__dirname, 'public'))); // Static files
  config.log('serveStatic is ON!');
}

// Templating setup - Must be used before any router
// Thanks to template literals, this part not needed

// PostgreSQL
const db = require('./db/index');

app.use(async (ctx, next) => {
  try {
    ctx.db = db;
  } catch (err) {
    config.err(`PGP ERROR: ${err.message || err}`); // print error;
  }
  await next();
});

// Routes
app.use(index.routes(), index.allowedMethods());
app.use(query.routes(), query.allowedMethods());

// Routes (authorized)
// https://github.com/rkusa/koa-passport-example/blob/master/server.js
app.use(login.routes(), login.allowedMethods());

/*app.use((ctx) => {
  //if (ctx.path === '/test') {
  if (ctx.url.match(/^\/test/)) {
    ctx.type = 'html';
    ctx.body = '<h1>route test</h1>';
  }
});*/

// Error handling
app.on('error', (err, ctx) => {
  config.err('server error', err, ctx);
});

module.exports = app;
