'use strict';

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

// https://www.npmjs.com/package/bcrypt
// https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016#nodejs
const bcrypt = require('./bcrypt');

/*const fetchUser = (() => {
  // This is an example! Use password hashing in yours
  const user = { id: 1, username: 'test', password: 'test' };
  return async () => {
    return user;
  };
})();*/

const fetchUser = (() => {
  // This is an example! Use password hashing in yours
  const user = { id: 1, username: 'test', password: '$2a$10$uciNKIZu14HmDx2wMy0qju5Unu3KhSRs/syq1rBT4fb1pqK8hNQ2q' };
  return async () => user;
})();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await fetchUser();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy((username, password, done) => {
  fetchUser()
    .then((user) => {
      /*if (username === user.username && password === user.password) {
        done(null, user);
      } else {
        done(null, false);
      }*/
      bcrypt.compare(password, user.password, (val) => {
        console.log(`fetchUser() password === ${password}\nfetchUser() user.password === ${user.password}`);
        console.log(`fetchUser() bcrypt.compare() === ${val}`);
        if (username === user.username && val === true) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
    .catch(err => done(err));
}));
