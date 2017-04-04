/*
Inserting a few demo users into the database, and returning their id-s;

NOTES:

- You can do multiple separate inserts, if you want, but using
  a single concatenated insert is significantly faster.

- We only add schema here to demonstrate the ability of class QueryFile
  to pre-format SQL with static formatting parameters when needs to be.

See also:
https://github.com/vitaly-t/pg-promise/wiki/Performance-Boost
*/

INSERT INTO ${schema~}.Users(
  email, username, password
)
VALUES
  /*('Demo User 1'),    -- user 1;
  ('Demo User 2'),    -- user 2;
  ('Demo User 3'),    -- user 3;
  ('Demo User 4'),    -- user 4;
  ('Demo User 5')     -- user 5;*/
  ('test1@domain.com', 'User1', 'password'),
  ('test2@domain.com', 'User2', 'password'),
  ('test3@domain.com', 'User3', 'password'),
  ('test4@domain.com', 'User4', 'password'),
  ('test4@domain.com', 'User5', 'password'),

RETURNING id;
