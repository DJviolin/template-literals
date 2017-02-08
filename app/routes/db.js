'use strict';

const Router = require('koa-router');
//import db, { pgp } from '../db/pgp';
const db = require('../db/pgp').db;
const pgp = require('../db/pgp').pgp;

//const router = new Router();
const router = new Router({ prefix: '/db' });

// Viewing
const index = require('../views/index');

const meta = {
	title: 'Template Literals',
	description: 'Vanilla JS rendering',
};

// http://stackoverflow.com/a/40949781/1442219
// https://github.com/vitaly-t/pg-promise#sql-names
// http://vitaly-t.github.io/pg-promise/formatting.html#.name

/*// http://127.0.0.1:3000/sql/2
router.get('/sql/:id', async (ctx) => {
	const obj = {
		id: parseInt(ctx.params.id, 10),
	};
	//await db.query('SELECT ${id} + ${id}', obj)
	await db.result('SELECT ${id} + ${id}', obj)
		.then((data) => {
			//console.log('DATA:', data); // print data
			console.log('DATA:', data.rows[0]['?column?']); // print data
			ctx.state = { title: data.rows[0]['?column?'] }; // => 4
		})
		.catch((error) => {
			console.log('ERROR:', error); // print the error
			ctx.body = '::DATABASE CONNECTION ERROR::';
		})
		.finally(pgp.end); // for immediate app exit, closing the connection pool

	await ctx.render('index');
});*/

/*// http://127.0.0.1:3000/sql/2
router.get('/sql/:id', async (ctx) => {
	await db.one({
		name: 'addition',
		text: 'SELECT 2 + 2 as value',
	}, [], v => +v.value)
		.then((value) => {
			console.log('VALUE:', value); //=> value: 4
			ctx.state = { title: value }; // => 4
		})
		.catch((error) => {
			console.log('ERROR:', error); // print the error
			ctx.body = '::DATABASE CONNECTION ERROR::';
		})
		.finally(pgp.end); // for immediate app exit, closing the connection pool

	await ctx.render('index');
});*/

const util = require('util');

// http://127.0.0.1:3000/db/2
router.get('/:id', async (ctx) => {
	/*await db.one('SELECT ${id} + ${id} as VALUE;', {
		id: parseInt(ctx.params.id, 10),
	}, v => v.value)*/
	await db.one('SELECT version() as VALUE;', {}, v => v.value)
		.then((value) => {
			//console.log('VALUE:', value); //=> value: 4
			//ctx.state = { title: value };
			ctx.state.title = value;
			console.log(`ctx.state: ${util.inspect(ctx.state, false, null)}`);
		})
		.catch((error) => {
			console.log('ERROR:', error); // print the error
			ctx.body = '::DATABASE CONNECTION ERROR::';
		})
		.finally(pgp.end); // for immediate app exit, closing the connection pool

	//await ctx.render('index');
	ctx.body = await index({
		welcome: ctx.state.title,
	}, {
	obj: meta });
});

module.exports = router;
