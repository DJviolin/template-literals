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

INSERT INTO ${schema~}.users(email, uname, role, digest) VALUES
  ('admin@domain.com', 'admin', 'ADMIN', 'password1'), -- password1
  ('test2@domain.com', 'User2', 'MEMBER', 'password2'), -- password2
  ('test3@domain.com', 'User3', 'MEMBER', 'password3'), -- password3
  ('test4@domain.com', 'User4', 'MEMBER', 'password4'), -- password4
  --('test4@domain.com', 'User5', 'MEMBER', 'password5'), -- duplicate, throw error
  ('test5@domain.com', 'User5', 'MEMBER', 'password5') -- password5
RETURNING id;
