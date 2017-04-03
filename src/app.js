'use strict';

//'use stricter';
// https://github.com/sirisian/ecmascript-use-stricter
// https://github.com/sirisian/ecmascript-types
// https://github.com/dslomov/typed-objects-es7

const bodyParser = require('koa-bodyparser');
const CSRF = require('koa-csrf').default; // https://github.com/koajs/csrf
const debug = require('debug');
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

// Websockets
// https://github.com/koajs/koa.io
// https://github.com/mattstyles/koa-socket
//
// https://github.com/uWebSockets/uWebSockets
// https://github.com/uWebSockets/bindings/tree/master/nodejs
// https://github.com/websockets/ws
// https://socket.io/

// Routes
const index = require('./routes/index');
const query = require('./routes/query');
const login = require('./routes/login');

const app = new Koa();

// Sessions
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

// Debug
const debugErr = debug('app:err');
const debugLog = debug('app:log');
const debugReq = debug('app:req');

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
    debugReq(`${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms`);
  }
});

// Development
if (process.env.NODE_ENV !== 'production') {
  app.use(serve(path.join(__dirname, 'public'))); // Static files
  debugLog('serveStatic is ON!');
}
debugLog('process.env.NODE_ENV = %s', process.env.NODE_ENV);

// Templating setup - Must be used before any router
// Thanks to template literals, this part not needed

// Session
// https://github.com/rkusa/koa-passport/issues/54
// https://github.com/Secbone/koa-session2
// https://github.com/koajs/session
// https://github.com/koajs/generic-session
// https://github.com/TMiguelT/koa-pg-session

// in-memory or server store is good practice:
// http://wonko.com/post/why-you-probably-shouldnt-use-cookies-to-store-session-data
// https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/
// https://github.com/RisingStack/nodehero-authentication

// Koa v2 tutorials:
// https://blog.risingstack.com/web-authentication-methods-explained/
// https://blog.risingstack.com/node-js-security-checklist/
// https://github.com/mapmeld/koa-passport-example
// http://www.zev23.com/2014/03/koajs-tutorial-authenticate-with_7.html
// http://ghost-dozoisch.rhcloud.com/integrating-passportjs-with-koa/

// Redis session store:
// http://stackoverflow.com/questions/10278683/how-safe-it-is-to-store-session-with-redis
// https://www.digitalocean.com/community/tutorials/how-to-set-up-a-redis-server-as-a-session-handler-for-php-on-ubuntu-14-04

// sessions vs. JWT and cookies vs. Local Storage:
// http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/
// http://cryto.net/%7Ejoepie91/blog/2016/06/19/stop-using-jwt-for-sessions-part-2-why-your-solution-doesnt-work/
// https://www.slideshare.net/derekperkins/authentication-cookies-vs-jwts-and-why-youre-doing-it-wrong
// https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
// https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies
// https://auth0.com/learn/json-web-tokens/
// https://jwt.io/
// https://jwt.io/introduction/
// https://www.npmjs.com/package/jws
// https://www.npmjs.com/package/jsonwebtoken
// https://github.com/koajs/jwt/tree/koa-v2

// https://matoski.com/article/jwt-express-node-mongoose/
// https://github.com/auth0-blog/angular-token-auth

// https://github.com/koajs/jwt/blob/koa-v2/test/test.js
// https://github.com/koajs/jwt/blob/koa-v2/test/test-server.js

// PostgreSQL
// https://github.com/vitaly-t/pg-promise-demo/blob/master/JavaScript/db/index.js
const db = require('./db/index');

app.use(async (ctx, next) => {
  try {
    ctx.db = db;
  } catch (err) {
    debugErr(`PGP ERROR: ${err.message || err}`); // print error;
  }
  await next();
});
/*app.use(async (ctx, next) => {
  const result = await ctx.db.one('SELECT version() as VALUE;', {}, v => v.value);
  debugLog(result);
  await next();
});*/

// One-Time middleware
// https://github.com/expressjs/express/issues/2457
/*let oneTime = null;
const oneTimeQuery = async (ctx, next) => {
  if (oneTime === null) {
    oneTime = await ctx.db.one('SELECT version() as VALUE;', {}, v => v.value);
    debugLog(oneTime);
  }
  await next();
};*/
/*const oneTime = (fn) => {
  try {
    let done = false;
    const res = (ctx, next) => {
      if (done === false) {
        fn(ctx, next);
        done = true;
      }
      next();
    };
    return res;
  } catch (err) {
    debugErr(`oneTime ERROR: ${err.message}` || err);
  }
};
const oneTimeQuery = async (ctx) => {
  //const result = await ctx.db.one('SELECT version() as VALUE;', {}, v => v.value);
  const result = await ctx.db.proc('version', [], a => a.version);
  debugLog(result);
};
app.use(oneTime(oneTimeQuery));*/

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

// Custom 401 handling
/*app.use(async (ctx, next) => {
  await next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = '401 Unauthorized - Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});*/

// Error handling
app.on('error', (err, ctx) => {
  debugErr('server error', err, ctx);
});

module.exports = app;
