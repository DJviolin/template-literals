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

// Routes
app.use(index.routes(), index.allowedMethods());
app.use(db.routes(), db.allowedMethods());

// Error handling
app.on('error', (err, ctx) => {
  debugErr('server error', err, ctx);
});

module.exports = app;
