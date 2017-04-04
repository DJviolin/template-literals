/*
Creates table Users.

NOTE: We only add schema here to demonstrate the ability of class QueryFile
to pre-format SQL with static formatting parameters when needs to be.
*/

-- SELECT * FROM users;
-- \d+ users;

CREATE TABLE ${schema~}.Users (
  -- https://www.postgresql.org/docs/current/static/datatype-numeric.html#DATATYPE-SERIAL
  -- https://www.postgresql.org/docs/current/static/sql-createtable.html
  id serial PRIMARY KEY NOT NULL,
  --name text NOT NULL
  --name VARCHAR(90) NOT NULL
  email varchar(80) NOT NULL,
  username varchar(80) NOT NULL,
  -- http://dustwell.com/how-to-handle-passwords-bcrypt.html
  password bytea NOT NULL, -- sha256 hash of the plain-text password
  --salt smallint NOT NULL, -- salt that is appended to the password before it is hashed (bcrypt storing in in the hash)
  -- https://www.postgresql.org/docs/current/static/functions-datetime.html
  -- https://www.postgresql.org/docs/current/static/datatype-datetime.html
  registration_date date NOT NULL DEFAULT CURRENT_DATE,
  registration_time time NOT NULL DEFAULT CURRENT_TIME
);
