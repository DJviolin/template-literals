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

CREATE TABLE ${schema~}.Users (
  id serial PRIMARY KEY NOT NULL,
  email varchar(80) UNIQUE NOT NULL,
  username varchar(80) UNIQUE NOT NULL,
  --password bytea NOT NULL, -- sha256 hash of the plain-text password
  password varchar(160) NOT NULL, -- sha256 hash of the plain-text password
  --salt smallint NOT NULL, -- salt that is appended to the password before hash (bcrypt storing in the hash)
  registration_date date NOT NULL DEFAULT CURRENT_DATE,
  registration_time time NOT NULL DEFAULT CURRENT_TIME
);
