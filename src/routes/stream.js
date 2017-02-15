'use strict';

const Router = require('koa-router');

//const router = new Router();
const router = new Router({ prefix: '/stream' });

// Viewing
const index = require('../views/index');

const meta = {
  title: 'Template Literals',
  description: 'Vanilla JS rendering',
};

// http://127.0.0.1:3000/stream
router.get('/', async (ctx) => {
  ctx.body = await index({
    welcome: 'User',
    num: 2,
    array: [1, 2, 4, 6, 8],
  }, {
    obj: meta,
  });
});

module.exports = router;
