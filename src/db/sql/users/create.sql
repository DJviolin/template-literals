/*
Creates table Users.

NOTE: We only add schema here to demonstrate the ability of class QueryFile
to pre-format SQL with static formatting parameters when needs to be.
*/

/*
https://www.postgresql.org/docs/current/static/datatype-numeric.html#DATATYPE-SERIAL
https://www.postgresql.org/docs/current/static/sql-createtable.html
http://dustwell.com/how-to-handle-passwords-bcrypt.html
https://www.postgresql.org/docs/current/static/functions-datetime.html
https://www.postgresql.org/docs/current/static/datatype-datetime.html
*/

-- SELECT * FROM users;
-- \d+ users;

-- https://github.com/danneu/koa-skeleton/blob/master/sql/schema.sql
-- https://github.com/danneu/koa-skeleton/blob/master/sql/seeds.sql

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------

CREATE TYPE user_role AS ENUM ('ADMIN', 'MOD', 'MEMBER', 'BANNED');

CREATE TABLE ${schema~}.Users (
  id               serial      PRIMARY KEY,
  email            varchar(80) NOT NULL,
  uname            varchar(80) NOT NULL,
  digest           text        NOT NULL, -- sha256 password hash
  role             user_role   NOT NULL DEFAULT 'MEMBER',
  creation_date    date        NOT NULL DEFAULT CURRENT_DATE,
  creation_time    time        NOT NULL DEFAULT CURRENT_TIME,
  last_online_date date        NOT NULL DEFAULT CURRENT_DATE,
  last_online_time time        NOT NULL DEFAULT CURRENT_TIME,
);

-- Ensure unames are unique and speed up lower(uname) lookup
CREATE UNIQUE INDEX unique_uname ON users (lower(uname));
-- Speed up lower(email) lookup
CREATE UNIQUE INDEX lower_email ON users (lower(email));

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
