'use strict';

const bcrypt = require('bcrypt');

//exports.genSalt = (rounds, seedLength) => done => bcrypt.genSalt(rounds, seedLength, done);

//exports.hash = (s, salt) => done => bcrypt.hash(s, salt, done);

//exports.compare = (s, hash) => done => bcrypt.compare(s, hash, done);


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
    //console.log(`bcrypt.compare == ${res}`);
  });
};

module.exports = {
  compare,
};
