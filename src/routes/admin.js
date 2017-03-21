'use strict';

const Router = require('koa-router');

const router = new Router({ prefix: '/admin' });

// Viewing
const index = require('../views/admin');

const meta = {
  title: 'Admin',
  description: 'admin page',
  lang: 'en-US',
};

router.get('/', async (ctx) => {
  ctx.body = await index({
    welcome: ctx.query.lang === 'hu' ? 'Felhasználó' : 'User',
    num: 2,
    array: [1, 2, 4, 6, 8],
  }, {
    obj: meta,
  });
});

module.exports = router;
