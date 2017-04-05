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
  id                serial PRIMARY KEY,
  email             varchar(80) UNIQUE NOT NULL,
  username          varchar(80) UNIQUE NOT NULL,
  password          varchar(160) NOT NULL, -- sha256 hash
  role              user_role NOT NULL DEFAULT 'MEMBER',
  registration_date date NOT NULL DEFAULT CURRENT_DATE,
  registration_time time NOT NULL DEFAULT CURRENT_TIME
);
