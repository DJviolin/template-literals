'use strict';

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

// https://www.npmjs.com/package/bcrypt
/*const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';*/

const bcrypt = require('bcrypt');

/*const pwdHash = (password) => {
  let result;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return; //handle error
    // Store hash in your password DB.
    result = hash;
    console.log(`2 == ${result}`);
  });
  console.log(`3 == ${result}`);
  return result;
};
//pwdHash('test');
console.log(`1 == ${pwdHash('test')}`);

const pwdHash2 = function (password) {
  let result;
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return; //handle error
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return; //handle error
      // Store hash in your password DB.
      result = hash;
    });
  });
  return result;
};
console.log(`4 == ${JSON.stringify(pwdHash2('test'), null, 4)}`);*/

// Async function:
// https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016#nodejs

const pwdHash = (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
pwdHash('test').then((val) => {
  console.log(`pwdHash == ${val}`);
});

/*function pwdCheck(password, hash) {
  let val;
  bcrypt.compare(password, hash, (err, res) => {
    // res == true
    val = res;
  });
  return val;
}*/

//const value = `${pwdHash('test').then(val => val)}`;
/*const pwdCheck = (password, hash) => bcrypt.compare(password, hash);
pwdCheck('test', '$2y$10$Enaa.wejFW69685ddCYD2.4FpKnP2otGNjze2ItDH/EzO7V4PEISq').then((val) => {
  console.log(`pwdCheck == ${val}`);
}, (err) => {
  console.log(`pwdCheck.err == ${err}`);
});*/

const pwdCheck = (password, hash, fn) => {
  bcrypt.compare(password, hash, (err, res) => {
    if (err) throw err;
    fn(res); // res == true
    //console.log(`bcrypt.compare == ${res}`);
  });
};
pwdCheck('test', '$2a$10$PEh10qyPjkja.mg4Z.JVTelVbxVACIXdrFyeouET30YkSkn30R/LS', (val) => {
  console.log(`pwdCheck == ${val}`);
});

const compare = (s, hash) => done => bcrypt.compare(s, hash, done);
/*compare('test', '$2a$10$PEh10qyPjkja.mg4Z.JVTelVbxVACIXdrFyeouET30YkSkn30R/LS', (val) => {
  console.log(`compare == ${val}`);
});*/
if (compare('test', '$2a$10$PEh10qyPjkja.mg4Z.JVTelVbxVACIXdrFyeouET30YkSkn30R/LS')) {
  console.log('compare == true');
} else {
  console.log('compare == false');
}

/*bcrypt.compare('test', '$2y$10$m2GHBCMjnXeAOqlq37piL.3Q9a8SNYD/Ki4cv0A/R04jcyWBLEGMe', (err, res) => {
  // res == true
  console.log(`bcrypt.compare == ${res}`);
});*/

//const pwdCheck = bcrypt.compare('test', '$2a$10$PEh10qyPjkja.mg4Z.JVTelVbxVACIXdrFyeouET30YkSkn30R/LS');
//pwdCheck.then(val => console.log(`bcrypt.compare == ${val}`));

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
