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

// http://127.0.0.1:3000/login
router.get('/login', async (ctx) => {
  ctx.state.meta = meta;
  ctx.type = 'html';
  ctx.body = await login(ctx.state);
});

// http://127.0.0.1:3000/401
/*router.get('/401', async (ctx) => {
  ctx.body = { error: 'Authentication failed' };
});*/

// http://127.0.0.1:3000/admin
router.get('/admin', async (ctx, next) => {
  ctx.isAuthenticated() ? await next() : ctx.redirect('/login');
  ctx.state.meta = meta;
  ctx.state.welcome = 'Authentication success';
  ctx.type = 'html';
  ctx.body = await admin(ctx.state);
});

// curl -X POST -F 'username=test' -F 'password=test' http://127.0.0.1:3000/auth
router.post('/auth',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login', // authentication failed
    successFlash: 'Welcome!',
    failureFlash: 'Invalid username or password.',
  }),
);

// Clear session
// http://127.0.0.1:3000/logout
router.get('/logout', (ctx) => {
  ctx.session = {}; // or = null
  ctx.logout();
  ctx.redirect('/login');
});

module.exports = router;
