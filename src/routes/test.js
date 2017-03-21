'use strict';

const Router = require('koa');

const router = new Router();
//const router = new Router({ prefix: '/hello' });

// koa-jwt + jsonwebtoken

// Unprotected middleware
router.get('/public', (ctx) => {
  ctx.body = 'unprotected\n';
});

// Middleware below this line is only reached if JWT token is valid
//router.use(koajwt({ secret: 'secret' }));

router.get('/api', (ctx) => {
  ctx.body = 'protected\n';
});

module.exports = router;
