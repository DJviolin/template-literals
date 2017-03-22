'use strict';

const passport = require('koa-passport');

const Router = require('koa-router');

const router = new Router();
//const router = new Router({ prefix: '/login' });

// Viewing
const login = require('../views/login');
const admin = require('../views/admin');

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

router.get('/401', async (ctx) => {
  ctx.body = { error: 'Authentication failed' };
});

/*router.get('/admin', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.redirect('/');
    ctx.body = { error: 'Authentication failed' };
  }
  ctx.isAuthenticated() ? await next() : ctx.redirect('/401');

  ctx.body = { success: 'Authentication success' };
});*/

router.get('/admin', async (ctx, next) => {
  ctx.isAuthenticated() ? await next() : ctx.redirect('/401');
  ctx.type = 'html';
  ctx.body = await admin({
    welcome: 'Authentication success',
  }, {
    obj: meta,
  });
});

router.post('/auth',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/401',
  }),
);

// Clear session
router.get('/logout', (ctx) => {
  ctx.session = {}; // or = null
  ctx.logout();
  ctx.redirect('/');
});

module.exports = router;
