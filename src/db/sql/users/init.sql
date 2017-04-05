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
  ('test1@domain.com', 'User1', '$2a$10$p1Mxqersz9rLspMtZoVtcegKZ9f7A8ZVpX/H9dM/qOYfdstfgCcjG'), -- password1
  ('test2@domain.com', 'User2', '$2a$10$ZKoaHub5foJTU3nA9IXX2ud0Q.RwNdZ20t2bGLLUiOcl1w7TCC3BS'), -- password2
  ('test3@domain.com', 'User3', '$2a$10$CJUccMt2oXUhMri7e2WoROFCfgCx2arUvGO0mw/NLp1aYXK9otxpm'), -- password3
  ('test4@domain.com', 'User4', '$2a$10$Tarlc3QGibl/2IutQDCmZetdi4dqAaUWWLe19wqhAhjPC6XBEuIqK'), -- password4
  --('test4@domain.com', 'User5', 'password5'), -- duplicate, throw error
  ('test5@domain.com', 'User5', '$2a$10$EtT2JQ1VTtjtfpZRY8syX.b94X8k3u.CakyIcnpYyOhE.1QDlKaMu') -- password5

RETURNING id;
