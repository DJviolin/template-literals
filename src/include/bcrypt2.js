'use strict';

const bcrypt = require('bcrypt');

/*
Usage:
bcrypt.hash('test', (val) => {
  console.log(`bcrypt.hash() == ${val}`);
});
*/
const hash = (password, fn) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      fn(hash); // Store hash in your password DB.
    });
  });
};

/*
Usage:
bcrypt.compare('test', '$2a$10$PEh10qyPjkja.mg4Z.JVTelVbxVACIXdrFyeouET30YkSkn30R/LS', (val) => {
  console.log(`bcrypt.compare() == ${val}`);
});
*/
const compare = (password, hash, fn) => {
  bcrypt.compare(password, hash, (err, res) => {
    if (err) throw err;
    fn(res); // res == true
  });
};

module.exports = {
  hash,
  compare,
};
