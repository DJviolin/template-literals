'use strict';

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

// https://www.npmjs.com/package/bcrypt
// https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016#nodejs
const bcrypt = require('./bcrypt');

const pwd = 'test';
bcrypt.hash(pwd, (val) => {
  console.log(`bcrypt.hash() === ${val}`);
});
bcrypt.compare(pwd, '$2a$10$PEh10qyPjkja.mg4Z.JVTelVbxVACIXdrFyeouET30YkSkn30R/LS', (val) => {
  console.log(`bcrypt.compare() === ${val}`);
});

/*const fetchUser = (() => {
  // This is an example! Use password hashing in yours
  const user = { id: 1, username: 'test', password: 'test' };
  return async () => {
    return user;
  };
})();*/

/*const fetchUser = (() => {
  // This is an example! Use password hashing in yours
  const user = { id: 1, username: 'test', password: 'test' };
  return async () => user;
})();*/

const fetchUser = (() => {
  // This is an example! Use password hashing in yours
  const user = { id: 1, username: 'test', password: '2a$10$PEh10qyPjkja.mg4Z.JVTelVbxVACIXdrFyeouET30YkSkn30R/LS' };
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

/*passport.use(new LocalStrategy((username, password, done) => {
  fetchUser()
    .then((user) => {
      if (username === user.username && password === user.password) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => done(err));
}));*/

passport.use(new LocalStrategy((username, password, done) => {
  fetchUser()
    .then((user) => {
      bcrypt.compare(password, user.password, (val) => {
        console.log(`fetchUser() bcrypt.compare() === ${val}`);
        if (val === false) {
          done(null, false);
        }
      });
      if (username === user.username && password === user.password) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => done(err));
}));

/*const FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback',
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    fetchUser().then(user => done(null, user));
  },
));

const TwitterStrategy = require('passport-twitter').Strategy
passport.use(new TwitterStrategy({
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback',
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    fetchUser().then(user => done(null, user));
  },
));

const GoogleStrategy = require('passport-google-auth').Strategy
passport.use(new GoogleStrategy({
    clientId: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback',
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    fetchUser().then(user => done(null, user));
  },
));*/
