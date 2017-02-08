'use strict';

// https://github.com/vitaly-t/pg-promise-demo/blob/master/JavaScript/index.js
// https://github.com/koajs/koa/blob/v2.x/docs/api/context.md
// 2017-02-08

const Koa = require('koa');

const app = new Koa();

// Generic GET handler
/*function GET(url, handler) {
	app.get(url, (req, res) => {
		handler(req)
			.then((data) => {
				res.json({
					success: true,
					data,
				});
			})
			.catch((error) => {
				res.json({
					success: false,
					error: error.message || error,
				});
			});
	});
};*/

// Generic GET handler
const GET = (url, handler) => {
	app.get(url, (ctx) => {
		handler(ctx.request)
			.then((data) => {
				ctx.body = {
					success: true,
					data,
				};
			})
			.catch((err) => {
				ctx.body = {
					success: false,
					error: err,
				};
			});
	});
};

module.exports = GET;
