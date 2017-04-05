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

------------------------------------------------------------
------------------------------------------------------------

CREATE TYPE user_role AS ENUM ('ADMIN', 'MOD', 'MEMBER', 'BANNED');

-- ( email, uname, digest )
CREATE TABLE ${schema~}.users (
  id               serial      PRIMARY KEY,
  email            varchar(80) NOT NULL,
  uname            varchar(80) NOT NULL,
  digest           text        NOT NULL, -- sha256 password hash
  role             user_role   NOT NULL DEFAULT 'MEMBER',
  last_online_at   timestamptz NOT NULL DEFAULT NOW(),
  created_at       timestamptz NOT NULL DEFAULT NOW()
);

-- Ensure unames are unique and speed up lower(uname) lookup
CREATE UNIQUE INDEX unique_uname ON users (lower(uname));
-- Speed up lower(email) lookup
CREATE UNIQUE INDEX lower_email ON users (lower(email));

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE ${schema~}.sessions (
  id            uuid        PRIMARY KEY,
  user_id       int         NOT NULL REFERENCES users(id),
  ip_address    inet        NOT NULL,
  user_agent    text        NULL,
  logged_out_at timestamptz NULL,
  expired_at    timestamptz NOT NULL DEFAULT NOW() + INTERVAL '2 weeks',
  created_at    timestamptz NOT NULL DEFAULT NOW()
);

-- Speed up user_id FK joins
CREATE INDEX sessions__user_id ON sessions (user_id);

CREATE VIEW ${schema~}.active_sessions AS
  SELECT *
  FROM sessions
  WHERE expired_at > NOW()
    AND logged_out_at IS NULL
;

------------------------------------------------------------
------------------------------------------------------------

/*CREATE TABLE messages (
  id            serial PRIMARY KEY,
  -- if null, then user is anonymous
  user_id       int  NULL REFERENCES users(id),
  markup        text NOT NULL,
  is_hidden     boolean NOT NULL DEFAULT false,
  ip_address    inet NOT NULL,
  user_agent    text NULL,
  created_at    timestamptz NOT NULL DEFAULT NOW()
);

-- Speed up user_id FK joins
CREATE INDEX messages__user_id ON messages (user_id);*/

------------------------------------------------------------
------------------------------------------------------------

/*CREATE OR REPLACE FUNCTION ip_root(ip_address inet) RETURNS inet AS
$$
  DECLARE
    masklen int;
  BEGIN
    masklen := CASE family(ip_address) WHEN 4 THEN 24 ELSE 48 END;
    RETURN host(network(set_masklen(ip_address, masklen)));
  END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE TABLE ratelimits (
  id             bigserial        PRIMARY KEY,
  ip_address     inet             NOT NULL,
  created_at     timestamptz      NOT NULL DEFAULT NOW()
);

CREATE INDEX ratelimits__ip_root ON ratelimits (ip_root(ip_address));*/
