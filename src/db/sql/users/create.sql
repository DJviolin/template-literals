/*
Creates table Users.

NOTE: We only add schema here to demonstrate the ability of class QueryFile
to pre-format SQL with static formatting parameters when needs to be.
*/

CREATE TABLE ${schema~}.Users (
    -- https://www.postgresql.org/docs/current/static/datatype-numeric.html#DATATYPE-SERIAL
    -- https://www.postgresql.org/docs/current/static/sql-createtable.html
    id serial PRIMARY KEY NOT NULL,
    --name text NOT NULL
    --name VARCHAR(90) NOT NULL
    email varchar(80) NOT NULL,
    username varchar(80) NOT NULL,
    password text NOT NULL, -- sha256 hash of the plain-text password
    salt smallint NOT NULL -- salt that is appended to the password before it is hashed
    --
    registration_date date NOT NULL DEFAULT CURRENT_DATE
    registration_time date NOT NULL DEFAULT CURRENT_TIME
);
