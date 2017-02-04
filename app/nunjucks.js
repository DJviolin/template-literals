'use strict';

// https://github.com/koajs/koa/blob/v2.x/docs/guide.md
// https://github.com/ohomer/koa-nunjucks-render/blob/master/index.js
// https://github.com/beliefgp/koa-nunjucks-next/blob/master/index.js

// http://eslint.org/docs/rules/guard-for-in
// http://eslint.org/docs/rules/no-restricted-syntax
// https://github.com/airbnb/javascript/issues/851

// http://stackoverflow.com/a/11509718/1442219
// http://jsben.ch/#/AUPq5
// https://jsfiddle.net/basickarl/e6gzk91h/

import Promise from 'bluebird';
import nunjucks from 'nunjucks';

function njk(path, opts) {
	const env = nunjucks.configure(path, opts);

	const extname = opts.extname || '';

	const filters = opts.filters || {};
	//console.time('benchmark');
	const f = Object.keys(filters).length;
	let i = 0;
	while (i < f) {
		env.addFilter(Object.keys(filters)[i], Object.values(filters)[i]);
		i += 1;
	}
	//console.timeEnd('benchmark');

	/*for (const f in filters) {
		env.addFilter(f, filters[f]);
	}*/
	/*for (const f in filters) {
		if ({}.hasOwnProperty.call(filters, f)) {
			env.addFilter(f, filters[f]);
		}
	}*/
	/*Object.keys(filters).forEach((key, index) => {
		if ({}.hasOwnProperty.call(key, index)) {
			env.addFilter(key, filters[key]);
		}
	});*/
	// https://jsperf.com/fastest-array-loops-in-javascript/32
	//console.log(Object.keys(filters)[0] + ' :: ' + Object.values(filters)[0]);

	const globals = opts.globals || {};
	const g = Object.keys(globals).length;
	let j = 0;
	while (j < g) {
		env.addFilter(Object.keys(globals)[j], Object.values(globals)[j]);
		j += 1;
	}

	/*for (const g in globals) {
		env.addGlobal(g, globals[g]);
	}*/
	/*for (const g in globals) {
		if ({}.hasOwnProperty.call(globals, g)) {
			env.addGlobal(g, globals[g]);
		}
	}*/
	/*Object.keys(globals).forEach((key, index) => {
		if ({}.hasOwnProperty.call(key, index)) {
			env.addFilter(key, globals[key]);
		}
	});*/

	return (ctx, next) => {
		//if (ctx.render) return next();
		ctx.render = (view, context = {}) => {
			context = Object.assign({}, ctx.state, context);
			return new Promise((resolve, reject) => {
				env.render(`${view}${extname}`, context, (err, res) => {
					if (err) {
						return reject(err);
					}
					ctx.body = res;
					return resolve();
				});
			});
		};
		return next();
	};
}

export default njk;
