'use strict';

const Router = require('koa-router');

const router = new Router();
//const router = new Router({ prefix: '/hello' })

// Viewing
const index = require('../views/index');

const meta = {
	title: 'Template Literals',
	description: 'Vanilla JS rendering',
};

// http://127.0.0.1:3000/
router.get('/', async (ctx) => {
	ctx.body = await index({
		welcome: 'User',
		num: 2,
	}, {
	obj: meta });
});

// http://127.0.0.1:3000/hello/steve?num=27
router.get('/hello/:id', async (ctx) => {
	ctx.state = {
		id: ctx.params.id,
		num: parseInt(ctx.query.num, 10),
	};
	ctx.body = await index({
		welcome: ctx.state.id,
		num: ctx.state.num,
	}, {
	obj: meta });
});

// http://127.0.0.1:3000/awesome
router.get('/awesome', async (ctx) => {
	const json = {
		name: 'Mr. Awesome',
	};

	ctx.body = await index({
		welcome: `
			<span style="color: #f00;">${json.name}</span>!
		`,
		num: 2,
	}, {
	obj: meta });
});

// http://127.0.0.1:3000/helpers
router.get('/helpers', async (ctx) => {
	const names = ['Steve', 'John', 'Peter', 'Jack', 'István'];
	const randomName = names[Math.floor(Math.random() * names.length)];

	ctx.body = await index({
		welcome: `${randomName}!!!`, // Use TL in a router like if it was a helper
		num: 2,
	}, {
	obj: meta });
});

module.exports = router;
