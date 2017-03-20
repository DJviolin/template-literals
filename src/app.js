'use strict';

const bodyParser = require('koa-bodyparser');
const debug = require('debug');
const json = require('koa-json');
const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');

// Routes
const index = require('./routes/index');
const db = require('./routes/db');

const app = new Koa();

// Middlewares
app.use(bodyParser());
app.use(json({ pretty: false, param: 'pretty' }));

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
// https://github.com/mapmeld/koa-passport-example
// http://www.zev23.com/2014/03/koajs-tutorial-authenticate-with_7.html
// http://ghost-dozoisch.rhcloud.com/integrating-passportjs-with-koa/
// Redis session store:
// http://stackoverflow.com/questions/10278683/how-safe-it-is-to-store-session-with-redis
// https://www.digitalocean.com/community/tutorials/how-to-set-up-a-redis-server-as-a-session-handler-for-php-on-ubuntu-14-04

// Routes
app.use(index.routes(), index.allowedMethods());
app.use(db.routes(), db.allowedMethods());

// Error handling
app.on('error', (err, ctx) => {
  debugErr('server error', err, ctx);
});

module.exports = app;
