'use strict';

//'use stricter';
// https://github.com/sirisian/ecmascript-use-stricter
// https://github.com/sirisian/ecmascript-types
// https://github.com/dslomov/typed-objects-es7

const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
//const csrf = require('koa-csrf');
const debug = require('debug');
const helmet = require('koa-helmet');
const json = require('koa-json');
const Koa = require('koa');
const path = require('path');
const passport = require('koa-passport');
//const ratelimit = require('koa-ratelimit');
const serve = require('koa-static');
const session = require('koa-generic-session');

// Routes
const index = require('./routes/index');
const db = require('./routes/db');
const login = require('./routes/login');

const app = new Koa();

// Sessions
app.keys = ['your-session-secret'];
app.use(convert(session()));

// Middlewares
app.use(bodyParser());
app.use(helmet()); // https://blog.risingstack.com/node-js-security-checklist/
app.use(json({ pretty: false, param: 'pretty' }));

// authentication
require('./include/auth'); // include
//
app.use(passport.initialize());
app.use(passport.session());

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

// Routes
app.use(index.routes(), index.allowedMethods());
app.use(db.routes(), db.allowedMethods());

// Routes (authorized)
app.use(login.routes(), login.allowedMethods());

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
// Middleware below this line is only reached if JWT token is valid
//app.use(koajwt({ secret: 'secret' }));

//app.use(test.routes(), test.allowedMethods());

/*app.use((ctx) => {
  if (ctx.url.match(/^\/test/)) {
    ctx.type = 'html';
    ctx.body = '<h1>route test</h1>';
  }
});*/

// https://github.com/rkusa/koa-passport-example/blob/master/server.js
// Require authentication for now
/*app.use(async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.redirect('/');
    //ctx.body = { error: 'Authentication failed' };
  }
});*/

// Error handling
app.on('error', (err, ctx) => {
  debugErr('server error', err, ctx);
});

module.exports = app;
