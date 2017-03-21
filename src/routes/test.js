'use strict';

const Router = require('koa');

const router = new Router();
//const router = new Router({ prefix: '/hello' });

const index = require('../views/index');

const meta = {
  title: 'Template Literals',
  description: 'Vanilla JS rendering',
};
const metaHu = {
  title: 'Template Literals (magyar)',
  description: 'Vanilla JS rendering (magyar)',
  lang: 'hu-HU',
};

router.use(async (ctx/*, next*/) => {
  //if (ctx.url.match(/^\/test/)) {
    ctx.body = await index({
      welcome: ctx.query.lang === 'hu' ? 'Felhasználó' : 'User',
      num: 2,
      array: [1, 2, 4, 6, 8],
    }, {
      obj: ctx.query.lang === 'hu' ? metaHu : meta,
    });
  //} else {
  //  await next();
  //}
});

module.exports = router;
