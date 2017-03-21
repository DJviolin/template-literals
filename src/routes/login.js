'use strict';

const passport = require('koa-passport');

const Router = require('koa-router');

const router = new Router();
//const router = new Router({ prefix: '/login' });

// Viewing
const login = require('../views/login');

const meta = {
  title: 'Admin',
  description: 'admin page',
  lang: 'en-US',
};

router.get('/login', async (ctx) => {
  ctx.body = await login({}, {
    obj: meta,
  });
});

router.get('/admin', async (ctx) => {
  ctx.body = { success: 'Authentication success' };
});

router.get('/fail', async (ctx) => {
  ctx.body = { error: 'Authentication failed' };
});

// POST /post
router.post('/post',
  passport.authenticate('local', {
    successRedirect: '/admin',
    //failureRedirect: '/',
  }),
);

router.get('/logout', (ctx) => {
  ctx.logout();
  ctx.redirect('/');
});

module.exports = router;
