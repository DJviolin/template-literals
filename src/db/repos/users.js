'use strict';

// https://github.com/vitaly-t/pg-promise-demo/blob/master/JavaScript/db/repos/users.js
// 2017-04-03

const sql = require('../sql/index').users;

module.exports = (rep, pgp) => {
  //This repository mixes hard-coded and dynamic SQL,
  //primarily to show a diverse example of using both.
  return {
    // Creates the table;
    create: () =>
      rep.none(sql.create),
    // Initializes the table with some user records, and return their id-s;
    init: () =>
      rep.map(sql.init, [], row => row.id),
    // Drops the table;
    drop: () =>
      rep.none(sql.drop),
    // Removes all records from the table;
    empty: () =>
      rep.none(sql.empty),
    // Adds a new user, and returns the new id;
    //add: name =>
    //  rep.one(sql.add, name, user => user.id),
    add: (email, username, password) =>
      rep.one(sql.add, email, username, password, user => user.id),
    // Tries to delete a user by id, and returns the number of records deleted;
    remove: id =>
      rep.result('DELETE FROM users WHERE id = $1', id, r => r.rowCount),
    // Tries to find a user from id;
    find: id =>
      rep.oneOrNone('SELECT * FROM users WHERE id = $1', id),
    // Returns all user records;
    all: () =>
      rep.any('SELECT * FROM users'),
    // Returns the total number of users;
    total: () =>
      rep.one('SELECT count(*) FROM users', [], a => +a.count),
  };
};
