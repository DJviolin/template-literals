'use strict';

// Auth test

//const passport = require('koa-passport');

const Router = require('koa-router');
//const bcrypt = require('../include/bcrypt');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const router = new Router();
//const router = new Router({ prefix: '/login' });

// Viewing
const login = require('../views/test');
const admin = require('../views/test-admin');

const meta = {
  title: 'Admin',
  description: 'admin page',
  lang: 'en-US',
};

router.use(async (ctx, next) => {
  ctx.state.meta = meta;
  await next();
});

// http://127.0.0.1:3000/login2
router.get('/login2', async (ctx) => {
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
/*router.post('/auth', async (ctx, next) => {
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
});*/
// Passport.js custom callback
// Official implementation is here:
// http://passportjs.org/docs#custom-callback
/*router.post('/auth2', async (ctx, next) => {
  await passport.authenticate('local', (err, user, info) => {
    //console.log(`${err}\n${JSON.stringify(user, null, 4)}\n${info}`);
    if (err) { return next(err); }
    if (!user) {
      ctx.flash = {
        type: 'error',
        message: 'Login error!',
      };
      return ctx.redirect('/login');
    }
    ctx.login(user, () => {
      if (err) { return next(err); }
      ctx.flash = {
        type: 'success',
        message: 'Login was succesful!',
      };
      return ctx.redirect('/admin');
    });
  })(ctx, next);
});*/
/*router.post('/auth2', async (ctx, next) => {
  try {
    const user = await ctx.db.oneOrNone(`
      -- http://stackoverflow.com/questions/8098795/return-a-value-if-no-record-is-found
      SELECT id, uname, digest FROM users WHERE uname = $1
      UNION ALL
      SELECT -1, '???', '???'
      LIMIT 1;
    `, ctx.request.body.user.name);
    //console.log(`user == ${JSON.stringify(user, null, 4)}`);
    await bcrypt.compare(ctx.request.body.user.pass, user.digest)
      .then((res) => {
        if (ctx.request.body.user.name === user.uname && res === true) {
          console.log(`
            ////////////////////////////////////////////////////////////
            MATCH:
            ----
            ctx.request.body.user.name === ${ctx.request.body.user.name}
            user.uname === ${user.uname}
            ----
            ctx.request.body.user.pass === ${ctx.request.body.user.pass}
            user.digest === ${user.digest}
            ----
            bcrypt.compare() === ${res}
            ////////////////////////////////////////////////////////////

          `);
          ctx.flash = {
            type: 'success',
            message: 'Login was succesful!',
          };
          return true;
        } else {
          console.log(`
            ////////////////////////////////////////////////////////////
            NO MATCH:
            ----
            ctx.request.body.user.name === ${ctx.request.body.user.name}
            user.uname === ${user.uname}
            ----
            ctx.request.body.user.pass === ${ctx.request.body.user.pass}
            user.digest === ${user.digest}
            ----
            bcrypt.compare() === ${res}
            ////////////////////////////////////////////////////////////
          `);
          ctx.flash = {
            type: 'error',
            message: 'Login error!',
          };
          return false;
        }
      })
      .then((res) => {
        console.log(`res === ${res}`);
        if (res === true) {
          return ctx.redirect('/admin2');
        } else {
          return ctx.redirect('back');
        }
      })
      .catch(err => console.log(`bcrypt.compare() promise error: ${err}`));
    //console.log(`ctx.state.isAuthenticated === ${ctx.state.isAuthenticated}`);
  } catch (err) {
    return err;
  }
});*/
router.post('/auth2', async (ctx) => {
  try {
    const user = await ctx.db.oneOrNone(`
      -- http://stackoverflow.com/questions/8098795/return-a-value-if-no-record-is-found
      SELECT id, uname, digest FROM users WHERE uname = $1
      UNION ALL
      SELECT -1, '???', '???'
      LIMIT 1;
    `, ctx.request.body.user.name);
    //console.log(`user == ${JSON.stringify(user, null, 4)}`);
    await bcrypt.compare(ctx.request.body.user.pass, user.digest)
      .then((res) => {
        if (ctx.request.body.user.name === user.uname && res === true) {
          ctx.flash = {
            type: 'success',
            message: 'Login was succesful!',
          };
          return true;
        } else {
          ctx.flash = {
            type: 'error',
            message: 'Login error!',
          };
          return false;
        }
      })
      .then(async (res) => {
        console.log(`res === ${res}`);
        if (res === true) {
          //const session = await ctx.db.one(user.id, ctx.ip, ctx.headers['user-agent'], ctx.vals['remember-me'] ? '1 year' : '2 weeks');
          const session = await ctx.db.one(`
            INSERT INTO "public".sessions (id, user_id, ip_address, user_agent, expired_at)
            VALUES (
              '${uuid.v4()}',
              '${user.id}',
              '${ctx.ip}'::inet,
              '${ctx.headers['user-agent']}',
              NOW() + '1 year'::interval
            )
            RETURNING *;
          `, [], v => v);
          ctx.cookies.set('session_id', session.id, {
            expires: 1 * 1000 * 60 * 60 * 24 * 365, // 1 year
          });
          console.log(`session === ${JSON.stringify(session, null, 4)}`);
          //return ctx.redirect('/admin2');
        } else {
          return ctx.redirect('back');
        }
      })
      .catch(err => console.log(`bcrypt.compare() promise error: ${err}`));
    //console.log(`ctx.state.isAuthenticated === ${ctx.state.isAuthenticated}`);
  } catch (err) {
    return err;
  }
});

// Logout
// http://127.0.0.1:3000/sessions/2/e1374126-a828-490c-a437-8d99b131a686
// http://127.0.0.1:3000/sessions/3/96aa7fd0-7387-467f-9d3f-83594f414fc6
// http://127.0.0.1:3000/sessions/2/69d2a736-09b5-499b-b63b-c47c49df9a3c
router.get('/sessions/:user_id/:id', async (ctx) => {
  try {
    await ctx.db.oneOrNone(`
      UPDATE sessions
      SET logged_out_at = NOW()
      WHERE user_id = '${ctx.params.user_id}'
        AND id = '${ctx.params.id}';
    `);
    ctx.cookies.set('session_id', null);
    ctx.redirect('/login2');
  } catch (err) {
    return err;
  }
});

// http://127.0.0.1:3000/admin2
router.get('/admin2', async (ctx, next) => {
  //ctx.isAuthenticated() ? await next() : ctx.redirect('/login2');
  ctx.state.welcome = 'Authentication success';
  ctx.type = 'html';
  ctx.body = await admin(ctx.state);
});

// Clear session
// http://127.0.0.1:3000/logout2
router.get('/logout2', (ctx) => {
  ctx.session = {}; // or = null
  ctx.logout();
  ctx.redirect('/login2');
});

module.exports = router;
