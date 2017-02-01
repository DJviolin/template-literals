const bodyParser = require('koa-bodyparser');
const debug = require('debug');
const json = require('koa-json');
const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');

// Routes
const main = require('./views/layouts/main');

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
  debugReq(`${ctx.method} ${ctx.originalUrl} ${ctx.status} - ${ms}ms`);
});

// Development
if (process.env.NODE_ENV !== 'production') {
  app.use(serve(path.join(__dirname, 'public'))); // Static files
  debugLog('serveStatic is ON!');
}
debugLog('process.env.NODE_ENV = %s', process.env.NODE_ENV);

// Routes
app.use(ctx => {
	//ctx.body = 'Hello Koa';

	/*ctx.state = {
    title: 'app',
  };*/
	/*ctx.body = main({
		title: 'Template Literals',
	});*/

	ctx.body = `
		<header>Header</header>
		<div class="content">Content</div>
		<footer>Footer</footer>
	`;
});

// Error handling
app.on('error', (err, ctx) => {
  debugErr('server error', err, ctx);
});

app.listen(3000);
