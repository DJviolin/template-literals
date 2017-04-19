'use strict';

// Auth test

//const passport = require('koa-passport');

// 3rd
const Router = require('koa-router');
//const bcrypt = require('../include/bcrypt');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
// 1st
const belt = require('../belt');
const { LOG, REQ, ERR, WARN } = require('../include/debug.js');

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
/*router.post('/auth', async (ctx, next) => {
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
/*router.post('/auth', async (ctx, next) => {
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
          return ctx.redirect('/admin');
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
/*router.post('/auth', async (ctx) => {
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
            expires: new Date(Date.now() + belt.periodOfTime({ days: 30 })),
            httpOnly: true,
          });
          console.log(`session === ${JSON.stringify(session, null, 4)}`);
          //return ctx.redirect('/admin');
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
router.post('/auth', async (ctx) => {
    // Validate
  ctx.validateBody('username')
    .required('Invalid creds')
    .isString()
    .trim();
  ctx.validateBody('password')
    .required('Invalid creds')
    .isString();
  ctx.validateBody('remember-me')
    .toBoolean();

  //const user = await ctx.db.getUserByUname(ctx.vals.uname);
  const user = await ctx.db.oneOrNone(`
    SELECT *
    FROM "public".users
    WHERE lower(uname) = lower($1);
  `, [
    ctx.vals.username,
  ], v => v);
  console.log(`user == ${JSON.stringify(user, null, 4)}`);
  ctx.check(user, 'Invalid creds');  // ctx.check is from koa-bouncer
  ctx.check(await belt.checkPassword(ctx.vals.password, user.digest), 'Invalid creds');

  // User authenticated

  //const session = await ctx.db.insertSession(user.id, ctx.ip, ctx.headers['user-agent'], ctx.vals['remember-me'] ? '1 year' : '2 weeks');
  const session = await ctx.db.one(`
    INSERT INTO "public".sessions (id, user_id, ip_address, user_agent, expired_at)
    VALUES (
      '${uuid.v4()}',
      '${user.id}',
      '${ctx.ip}'::inet,
      '${ctx.headers['user-agent']}',
      NOW() + '${ctx.vals['remember-me'] ? '1 year' : '2 weeks'}'::interval
    )
    RETURNING *;
  `, [], v => v);

  ctx.cookies.set('session_id', session.id, {
    //expires: ctx.vals['remember-me'] ? belt.futureDate({ years: 1 }) : undefined,
    expires: ctx.vals['remember-me'] ?
      new Date(Date.now() + belt.periodOfTime({ years: 1 })) :
      new Date(Date.now() + belt.periodOfTime({ days: 14 })),
  });
  ctx.flash = {
    type: 'success',
    message: 'Logged in successfully!',
  };
  ctx.redirect('/admin');
});

// Logout
// http://127.0.0.1:3000/sessions/2/81242878-b37c-4e43-ad3c-9a024897dbff
/*router.get('/sessions/:user_id/:id', async (ctx) => {
  try {
    await ctx.db.oneOrNone(`
      UPDATE sessions
        SET logged_out_at = NOW()
      WHERE user_id = '${ctx.params.user_id}'
        AND id = '${ctx.params.id}';
    `);
    ctx.cookies.set('session_id', null);
    ctx.redirect('/login');
  } catch (err) {
    return err;
  }
});*/

// Logout
// http://127.0.0.1:3000/sessions/31293c28-e8f4-4ef8-86b4-ae6e518acf92
//router.del('/sessions/:id', async (ctx) => {
/*router.get('/sessions/:id', async (ctx) => {
  try {
    // If user isn't logged in, give them the success case anyways
    if (!ctx.currUser) {
      ctx.flash = {
        type: 'success',
        message: 'You successfully logged out!',
      };
      return await ctx.redirect('/login');
    }
    //ctx.validateParam('id');
    ////await ctx.db.logoutSession(ctx.currUser.id, ctx.vals.id);
    await ctx.db.oneOrNone(`
      UPDATE sessions
        SET logged_out_at = NOW()
      WHERE user_id = '${ctx.currUser.id}'
        AND id = '${ctx.params.id}';
    `);
    ctx.cookies.set('session_id', null);

    ctx.flash = {
      type: 'success',
      message: 'You successfully logged out!',
    };
    return await ctx.redirect('/login');
  } catch (err) {
    ERR(`PGP ERROR: ${err.message}` || err);
  }
});*/

// Logout
// http://127.0.0.1:3000/logout
router.get('/logout', async (ctx) => {
  try {
    // If user isn't logged in, give them the success case anyways
    if (!ctx.currUser) {
      ctx.flash = {
        type: 'success',
        message: 'You successfully logged out!',
      };
      return await ctx.redirect('/login');
    }
    //ctx.validateParam('id');
    ////await ctx.db.logoutSession(ctx.currUser.id, ctx.vals.id);
    await ctx.db.oneOrNone(`
      UPDATE sessions
        SET logged_out_at = NOW()
      WHERE user_id = '${ctx.currUser.id}'
        AND id = '${ctx.currSessionId}';
    `);
    ctx.cookies.set('session_id', null);

    ctx.flash = {
      type: 'success',
      message: 'You successfully logged out!',
    };
    return await ctx.redirect('/login');
  } catch (err) {
    ERR(`PGP ERROR: ${err.message}` || err);
  }
});

// http://127.0.0.1:3000/admin
router.get('/admin', async (ctx, next) => {
  //ctx.isAuthenticated() ? await next() : ctx.redirect('/login2');
  ctx.state.welcome = 'Authentication success';
  ctx.type = 'html';
  ctx.body = await admin(ctx.state);
});

// Clear session
// http://127.0.0.1:3000/logout
/*router.get('/logout', (ctx) => {
  ctx.session = {}; // or = null
  ctx.logout();
  ctx.redirect('/login');
});*/

module.exports = router;
