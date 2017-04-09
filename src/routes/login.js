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

// curl -X POST -F 'username=User2' -F 'password=password2' http://127.0.0.1:3000/auth
// curl -X POST -u User2:password2 http://127.0.0.1:3000/auth
// curl -X POST -u User2:password2 http://127.0.0.1:3000/auth
//
// https://superuser.com/a/149335/372310
// curl -X POST --data "username=User2&password=password2" http://127.0.0.1:3000/auth
// curl -L --data "username=User2&password=password2" http://127.0.0.1:3000/auth
// curl --data "username=User2&password=password2" -w %{redirect_url} http://127.0.0.1:3000/auth
// curl -X POST -s --data "username=User2&password=password2" -w "\nHTTP_CODE: %{http_code}\nEFFECTIVE_URL: %{url_effective}\nREDIRECT_URL: %{redirect_url}\n" http://127.0.0.1:3000/auth
// curl -X POST --data "username=User2&password=password2" -w "\nHTTP_CODE: %{http_code}\nEFFECTIVE_URL: %{url_effective}\nREDIRECT_URL: %{redirect_url}\n" http://127.0.0.1:3000/auth
// curl http://127.0.0.1:3000/admin
// curl http://127.0.0.1:3000/logout

// http://127.0.0.1:3000/login
router.get('/login', async (ctx) => {
  ctx.type = 'html';
  ctx.body = await login(ctx.state);
});

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
    try {
      //console.log(`${err}\n${JSON.stringify(user, null, 4)}\n${info}`);
      if (!user) {
        ctx.flash = {
          type: 'error',
          message: 'Login error!',
        };
        return ctx.redirect('/login');
      }
      ctx.login(user, () => {
        ctx.flash = {
          type: 'success',
          message: 'Login was succesful!',
        };
        return ctx.redirect('/admin');
      });
    } catch (error) {
      return next(error);
    }
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
