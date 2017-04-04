'use strict';

const db = require('../db/index');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

// TODO: Stay logged in on server restart
// http://stackoverflow.com/questions/10164312/node-js-express-js-passport-js-stay-authenticated-between-server-restart
// http://stackoverflow.com/questions/23481817/node-js-passport-autentification-with-sqlite
// Redis:

// https://www.npmjs.com/package/bcrypt
// https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016#nodejs
const bcrypt = require('./bcrypt');
//const bcrypt = require('bcrypt');

/*const fetchUser = (() => {
  // This is an example! Use password hashing in yours
  const user = { id: 1, username: 'test', password: '$2a$10$uciNKIZu14HmDx2wMy0qju5Unu3KhSRs/syq1rBT4fb1pqK8hNQ2q' };
  //return async () => {
  //  return user;
  //};
  return async () => user;
})();*/

passport.serializeUser((user, done) => {
  done(null, user.id);
});

/*passport.deserializeUser(async (id, done) => {
  try {
    const user = await fetchUser();
    done(null, user);
  } catch (err) {
    done(err);
  }
});*/

passport.deserializeUser(async (id, done) => {
  /*db.get('SELECT id, username FROM users WHERE id = ?', id, (err, row) => {
    if (!row) return done(null, false);
    return done(null, row);
  });*/
  try {
    const user = await db.oneOrNone('SELECT id, username FROM Users WHERE id = $1', id);
    console.log(`passport.deserializeUser() user == ${JSON.stringify(user, null, 4)}`);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

/*passport.use(new LocalStrategy((username, password, done) => {
  fetchUser()
    .then(async (user) => {
      //if (username === user.username && password === user.password) {
      //  done(null, user);
      //} else {
      //  done(null, false);
      //}
      console.log(`fetchUser() password === ${password}\nfetchUser() user.password === ${user.password}`);
      bcrypt.compare(password, user.password, (val) => {
        console.log(`fetchUser() bcrypt.compare() === ${val}`);
        if (username === user.username && val === true) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
    .catch(err => done(err));
}));*/

/*passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await fetchUser();
    console.log(`fetchUser() password === ${password}\nfetchUser() user.password === ${user.password}`);
    bcrypt.compare(password, user.password, (val) => {
      console.log(`fetchUser() bcrypt.compare() === ${val}`);
      if (username === user.username && val === true) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  } catch (err) {
    done(err);
  }
}));*/

/*passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await fetchUser();
    console.log(`fetchUser() password === ${password}\nfetchUser() user.password === ${user.password}`);
    bcrypt.compare(password, user.password, (val) => {
      console.log(`fetchUser() bcrypt.compare() === ${val}`);
      if (username === user.username && val === true) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  } catch (err) {
    done(err);
  }
}));*/

////////////////////////////////////////////////////////////////////////////////

/*function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}

passport.use(new LocalStrategy((username, password, done) => {
  db.get('SELECT salt FROM users WHERE username = ?', username, (err, row) => {
    if (!row) return done(null, false);
    var hash = hashPassword(password, row.salt);
    db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, (err, row) => {
      if (!row) return done(null, false);
      return done(null, row);
    });
  });
}));*/

/*passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    //const user2 = await fetchUser();
    //console.log(`fetchUser() == ${JSON.stringify(user2, null, 4)}`);
    //
    //const user = await db.oneOrNone('SELECT id, username, password FROM Users WHERE username = $1 AND password = $2;', [username, password]);
    const user = await db.oneOrNone('SELECT id, username, password FROM Users WHERE username = $1;', username);
    console.log(`user == ${JSON.stringify(user, null, 4)}\nLocalStrategy() password === ${password}\nuser.username == ${user.username}\nuser.password == ${user.password}`);
    // $2a$10$uciNKIZu14HmDx2wMy0qju5Unu3KhSRs/syq1rBT4fb1pqK8hNQ2q
    bcrypt.compare(password, user.password, (val) => {
      console.log(`bcrypt.compare() username: ${username} === ${user.username}\nbcrypt.compare() password: ${password}, ${user.password} === ${val}`);
      if (username === user.username && val === true) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  } catch (err) {
    done(err);
  }
}));*/

/*passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    //const user = await db.oneOrNone('SELECT id, username, password FROM Users WHERE username = $1 AND password = $2;', [username, password]);
    //const user = await db.oneOrNone('SELECT id, username, password FROM Users WHERE username = $1;', username);
    //const user = await db.one('SELECT id, username, password FROM Users WHERE username = $1;', username, callback => ({
    //  id: callback.id,
    //  username: callback.username,
    //  password: callback.password,
    //  bool: !!callback, // if object not empty === true
    //}));
    const user = await db.oneOrNone(`
      SELECT id, username, password FROM Users WHERE username = $1
      UNION ALL
      SELECT NULL, NULL, NULL
      LIMIT 1;
    `, username);
    console.log(`user == ${JSON.stringify(user, null, 4)}\nLocalStrategy() password === ${password}\nuser.username == ${user.username}\nuser.password == ${user.password}`);
    // $2a$10$uciNKIZu14HmDx2wMy0qju5Unu3KhSRs/syq1rBT4fb1pqK8hNQ2q
    bcrypt.compare(password, user.password, (val) => {
      console.log(`bcrypt.compare() username: ${username} === ${user.username}\nbcrypt.compare() password: ${password}, ${user.password} === ${val}`);
      if (username === user.username && val === true) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  } catch (err) {
    done(err);
  }
}));*/

passport.use(new LocalStrategy(async (username, password, done) => {
  let user;

  try {
    user = await db.oneOrNone('SELECT id, username, password FROM Users WHERE username = $1;', username);
    console.log(`user == ${JSON.stringify(user, null, 4)}\nLocalStrategy() password === ${password}\nuser.username == ${user.username}\nuser.password == ${user.password}`);
  } catch (err) {
    user = {
      id: null,
      username: null,
      password: null,
    };
  }

  console.log(`Between pgp & bcrypt === ${JSON.stringify(user, null, 4)}`);

  try {
    bcrypt.compare(password, user.password, (val) => {
      console.log(`IN bcrypt === ${JSON.stringify(user, null, 4)}`);
      console.log(`bcrypt.compare() username: ${username} === ${user.username}\nbcrypt.compare() password: ${password}, ${user.password} === ${val}`);
      if (username === user.username && val === true) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  } catch (err) {
    done(err);
  }
}));
