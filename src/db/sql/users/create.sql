/*
Creates table Users.

NOTE: We only add schema here to demonstrate the ability of class QueryFile
to pre-format SQL with static formatting parameters when needs to be.
*/

CREATE TABLE ${schema~}.Users (
    -- https://www.postgresql.org/docs/current/static/datatype-numeric.html#DATATYPE-SERIAL
    id serial PRIMARY KEY,
    --name text NOT NULL
    --name VARCHAR(90) NOT NULL
    'username' VARCHAR(90) NOT NULL,
    'password' VARCHAR(90) NOT NULL, -- sha256 hash of the plain-text password
    'salt' TEXT -- salt that is appended to the password before it is hashed
);
