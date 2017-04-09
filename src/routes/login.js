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

router.use(async (ctx, next) => {
  ctx.state.meta = meta;
  await next();
});

// http://127.0.0.1:3000/login
router.get('/login', async (ctx) => {
  //ctx.isAuthenticated() ? ctx.flash = 'Login was succesful!' : ctx.flash = 'Login error!';
  console.log(`ctx.flash === ${JSON.stringify(ctx.flash, null, 4)}`);
  console.log(`ctx.cookies.get('flash') === ${ctx.cookies.get('flash')}`);
  ctx.type = 'html';
  ctx.body = await login(ctx.state);
});

// curl -X POST -F 'username=test' -F 'password=test' http://127.0.0.1:3000/auth
/*router.post('/auth',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login', // authentication failed
    //successFlash: 'Welcome!',
    //failureFlash: 'Invalid username or password.',
  }),
);*/
router.post('/auth', async (ctx, next) => {
  await passport.authenticate('local', (err, user, info) => {
    //console.log(`${err}\n${user}\n${info}`);
    if (err) { return next(err); }
    if (!user) {
      ctx.flash = 'Login error!';
      return ctx.redirect('/login');
    }
    ctx.login(user, (err) => {
      if (err) { return next(err); }
      ctx.flash = 'Login was succesful!';
      return ctx.redirect('/admin');
    });
  })(ctx, next);
});

// http://127.0.0.1:3000/admin
router.get('/admin', async (ctx, next) => {
  ctx.isAuthenticated() ? await next() : ctx.redirect('/login');
  ctx.state.welcome = 'Authentication success';
  ctx.type = 'html';
  ctx.body = await admin(ctx.state);
});

// Clear session
// http://127.0.0.1:3000/logout
router.get('/logout', (ctx) => {
  ctx.session = {}; // or = null
  ctx.logout();
  ctx.redirect('/login');
});

module.exports = router;
