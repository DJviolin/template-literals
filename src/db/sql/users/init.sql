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

-- Decoding
--SELECT CONVERT_FROM(DECODE(field, 'BASE64'), 'UTF-8') FROM table;
-- Encoding
--SELECT ENCODE(CONVERT_TO(field, 'UTF-8'), 'base64') FROM table;

INSERT INTO ${schema~}.Users(
  email, username, password
)
VALUES
  /*('Demo User 1'),    -- user 1;
  ('Demo User 2'),    -- user 2;
  ('Demo User 3'),    -- user 3;
  ('Demo User 4'),    -- user 4;
  ('Demo User 5')     -- user 5;*/
  (
    'kerozin.joe@gmail.com',
    'Lanti',
    '$2a$10$uciNKIZu14HmDx2wMy0qju5Unu3KhSRs/syq1rBT4fb1pqK8hNQ2q'
  )    -- Lanti

RETURNING id;
