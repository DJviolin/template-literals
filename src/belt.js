'use strict';

// 3rd
const bcrypt = require('bcrypt');

/*
Returns a period of time in milliseconds
Usage:
const belt = require('./belt');
belt.periodOfTime({ days: 1, hours: 6 })
*/
exports.periodOfTime = function (opts) {
  return (opts.years || 0) * 1000 * 60 * 60 * 24 * 365 +
         (opts.days || 0) * 1000 * 60 * 60 * 24 +
         (opts.hours || 0) * 1000 * 60 * 60 +
         (opts.minutes || 0) * 1000 * 60 +
         (opts.seconds || 0) * 1000 +
         (opts.milliseconds || 0);
};

/*// Returns hashed password value to be used in `users.digest` column
// String -> String
exports.hashPassword = function (password) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, 4, function (err, hash) {
      if (err) return reject(err);
      resolve(hash);
    });
  });
};
// Compares password plaintext against bcrypted digest
// String, String -> Bool
exports.checkPassword = function (password, digest) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, digest, function (err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });
};*/

exports.hashPassword = function (password) {
  return new Promise(function (resolve, reject) {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return reject(err);
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) return reject(err);
        resolve(hash); // Store hash in your password DB.
      });
    });
  });
};
exports.checkPassword = function (password, digest) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, digest, function (err, result) {
      if (err) return reject(err);
      resolve(result); // res == true
    });
  });
};
