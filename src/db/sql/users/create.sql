/*
Creates table Users.

NOTE: We only add schema here to demonstrate the ability of class QueryFile
to pre-format SQL with static formatting parameters when needs to be.
*/

CREATE TABLE ${schema~}.Users (
    id serial PRIMARY KEY,    -- https://www.postgresql.org/docs/current/static/datatype-numeric.html#DATATYPE-SERIAL
    name text NOT NULL
);
