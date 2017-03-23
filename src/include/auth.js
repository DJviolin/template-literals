'use strict';

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

// https://www.npmjs.com/package/bcrypt
/*const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';*/

const bcrypt = require('bcrypt');

const pwdHash = (password) => {
  let val;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    if (err) {
      console.log(`bcrypt.hash error: ${err}`);
    }
    console.log(`2 == ${hash}`);
    val = hash;
    //return val;
  });
  console.log(`3 == ${val}`);
  return val;
};

console.log(`1 == ${pwdHash('test')}`);

function pwdCheck(password, hash) {
  let val;
  bcrypt.compare(password, hash, (err, res) => {
    // res == true
    val = res;
  });
  return val;
}

//const bcrypt = require('./bcrypt');
//const salt = bcrypt.genSalt(10);
//const hash = bcrypt.hash('test', salt);
//console.log(bcrypt.hash('test', bcrypt.genSalt(10)));
/*if (bcrypt.compare('B4c0/\/', hash)) {
  ...
}*/

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
  const user = { id: 1, username: 'test', password: '$2y$10$xtzDnpVSoyv4wn1GeI5dXePFa9fPMM6nWjjcNushC6epGL1BIdnzG' };
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
