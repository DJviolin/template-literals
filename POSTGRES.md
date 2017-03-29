# PostgreSQL Documentation

Link: https://www.postgresql.org/docs/current/static/index.html

Current: https://www.postgresql.org/docs/current/static/tutorial-table.html

# Chapter 1. Getting Started

## 1.3. Creating a Database

```bash
$ createdb mydb  # Creating mydb
$ createdb       # Create database with the same name as your current user name
$ dropdb mydb    # Destroy mydb
```

More about [createdb], [dropdb] here.

[createdb]: https://www.postgresql.org/docs/current/static/app-createdb.html
[dropdb]: https://www.postgresql.org/docs/current/static/app-dropdb.html

## 1.4. Accessing a Database

```bash
# allows you to interactively enter, edit, execute SQL commands
# If you not supply database name, it will default to your user account name
# `#` Indicating last line of the command
$ psql mydb
```

Inside `psql` cli:

```bash
# Prints out PostgreSQL version
mydb=# SELECT version();
                           version
-------------------------------------------------------------
 PostgreSQL 9.6.2, compiled by Visual C++ build 1800, 64-bit
(1 row)


mydb=# SELECT current_date;
    date
------------
 2017-03-29
(1 row)


mydb=# SELECT 2 + 2;
 ?column?
----------
        4
(1 row)


# Prints out the syntax of various PostgreSQL SQL commands
mydb=# \h
# Exit
mydb=# \q
```

# Chapter 2. The SQL Language

## 2.1. Introduction

Books to read:

* [Understanding the New SQL]
* [A Guide to the SQL Standard]
* [PosgreSQL tutorial repository]

[Understanding the New SQL]: https://www.postgresql.org/docs/current/static/biblio.html#MELT93
[A Guide to the SQL Standard]: https://www.postgresql.org/docs/current/static/biblio.html#DATE97
[PosgreSQL tutorial repository]: https://github.com/postgres/postgres/tree/master/src/tutorial

```bash
# psql's -s option puts you in single step mode which pauses before sending each statement to the server
$ psql -s mydb
...
# The \i command reads in commands from the specified file
mydb=> \i basics.sql 
```

## 2.3. Creating a New Table

```sql
CREATE TABLE weather (
  city       varchar(80),
  temp_lo    int,            -- low temperature
  temp_hi    int,            -- high temperature
  prcp       real,           -- precipitation
  date       date
);
-- varchar() => arbitrary character strings up to 80 characters
-- int => is the normal integer type
-- real => is a type for storing single precision floating-point numbers
-- date => date
```

PostgreSQL supports the standard SQL types:

* int
* smallint
* real
* double precision
* char(N)
* varchar(N)
* date
* time
* timestamp
* interval

As well as other types of general utility and a rich set of geometric types. PostgreSQL can be customized with an arbitrary number of user-defined data types.

The second example will store cities and their associated geographical location:

```sql
CREATE TABLE cities (
  name        varchar(80),
  location    point
);
-- point => this type is an example of a PostgreSQL-specific data type
```

Removing a table:

```sql
DROP TABLE tablename;
```
