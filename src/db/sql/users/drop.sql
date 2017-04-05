/*
Drops the entire table Users.

NOTE: We only add schema here to demonstrate the ability of class QueryFile
to pre-format SQL with static formatting parameters when needs to be.
*/

DROP TYPE  IF EXISTS ${schema~}.user_role;
DROP TABLE IF EXISTS ${schema~}.users;
DROP TABLE IF EXISTS ${schema~}.sessions;
DROP VIEW  IF EXISTS ${schema~}.active_sessions;
