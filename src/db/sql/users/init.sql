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
  ('test1@domain.com', 'User1', 'password1'),
  ('test2@domain.com', 'User2', 'password2'),
  ('test3@domain.com', 'User3', 'password3'),
  ('test4@domain.com', 'User4', 'password4'),
  --('test4@domain.com', 'User5', 'password5'), -- duplicate, throw error
  ('test5@domain.com', 'User5', 'password5')

RETURNING id;
