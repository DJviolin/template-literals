# PostgreSQL Documentation
======

Link: https://www.postgresql.org/docs/current/static/index.html

Current: https://www.postgresql.org/docs/current/static/tutorial-sql-intro.html

# Chapter 1. Getting Started
======

## 1.3. Creating a Database
------

```bash
$ createdb mydb  # Creating mydb
$ createdb       # Create database with the same name as your current user name
$ dropdb mydb    # Destroy mydb
```

More about [createdb], [dropdb] here.

[createdb]: https://www.postgresql.org/docs/current/static/app-createdb.html
[dropdb]: https://www.postgresql.org/docs/current/static/app-dropdb.html

## 1.4. Accessing a Database
------

```bash
# allows you to interactively enter, edit, execute SQL commands
# If you not supply database name, it will default to your user account name
# `#` Indicating last line of the command
$ psql mydb
```

Inside `psql` cli:

```bash

mydb=# SELECT version(); -- Prints out PostgreSQL version
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


mydb=# \h -- Prints out the syntax of various PostgreSQL SQL commands

mydb=# \q -- Exit


```

# Chapter 2. The SQL Language
======

## 2.1. Introduction

```bash

mydb=# 
```
