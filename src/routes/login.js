'use strict';

const passport = require('koa-passport');

const Router = require('koa-router');

const router = new Router({ prefix: '/login' });

// Viewing
const login = require('../views/login');

const meta = {
  title: 'Admin',
  description: 'admin page',
  lang: 'en-US',
};

router.get('/', async (ctx) => {
  ctx.body = await login({
    welcome: ctx.query.lang === 'hu' ? 'Felhasználó' : 'User',
  }, {
    obj: meta,
  });
});

router.get('/app', async (ctx) => {
  ctx.body = { success: 'Authentication success' };
});

// POST /login
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/',
  }),
);

module.exports = router;
