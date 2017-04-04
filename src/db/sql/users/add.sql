/*
Inserts a new user record.

NOTE: We only add schema here to demonstrate the ability of class QueryFile
to pre-format SQL with static formatting parameters when needs to be.
*/

/*INSERT INTO ${schema~}.Users(name)
VALUES($1)
RETURNING id*/
INSERT INTO ${schema~}.Users(email, username, password)
VALUES($1, $2, $3)
RETURNING id
