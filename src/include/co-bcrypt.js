'use strict';

const bcrypt = require('bcrypt');

exports.genSalt = (rounds, seedLength) => done => bcrypt.genSalt(rounds, seedLength, done);

exports.hash = (s, salt) => done => bcrypt.hash(s, salt, done);

exports.compare = (s, hash) => done => bcrypt.compare(s, hash, done);
