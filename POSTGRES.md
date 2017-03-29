# PostgreSQL Documentation

Link: https://www.postgresql.org/docs/current/static/index.html

Current: https://www.postgresql.org/docs/current/static/tutorial-join.html

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

## 2.4. Populating a Table With Rows

The INSERT statement is used to populate a table with rows:

```sql
INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');
-- INSERT 0 1
```

The point type requires a coordinate pair as input, as shown here:

```sql
INSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');
-- INSERT 0 1
```

The syntax used so far requires you to remember the order of the columns. An alternative syntax allows you to list the columns explicitly:

```sql
INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
       VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');
-- INSERT 0 1
```

You can list the columns in a different order if you wish or even omit some columns, e.g., if the precipitation is unknown:

```sql
INSERT INTO weather (date, city, temp_hi, temp_lo)
       VALUES ('1994-11-29', 'Hayward', 54, 37);
-- INSERT 0 1
```

You could also have used COPY to load large amounts of data from flat-text file. This is usually faster because the COPY command is optimized for this application while allowing less flexibility than INSERT:

```sql
COPY weather FROM '/home/user/weather.txt';
```

You can read more about the [COPY] command here.

[COPY]: https://www.postgresql.org/docs/current/static/sql-copy.html

## 2.5. Querying a Table

To retrieve data from a table, the statement is divided into:

* a select list (the part that lists the columns to be returned)
* a table list (the part that lists the tables from which to retrieve the data)
* and an optional qualification (the part that specifies any restrictions).

```sql
SELECT * FROM weather;
SELECT city, temp_lo, temp_hi, prcp, date FROM weather;
/*
     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
 San Francisco |      43 |      57 |    0 | 1994-11-29
 Hayward       |      37 |      54 |      | 1994-11-29
(3 rows)
*/
```

You can write expressions, not just simple column references, in the select list:

```sql
SELECT city, (temp_hi+temp_lo)/2 AS temp_avg, date FROM weather;
/*
     city      | temp_avg |    date
---------------+----------+------------
 San Francisco |       48 | 1994-11-27
 San Francisco |       50 | 1994-11-29
 Hayward       |       45 | 1994-11-29
(3 rows)
*/

SELECT city, (temp_hi+temp_lo)/2, date FROM weather;
/*
     city      | ?column? |    date
---------------+----------+------------
 San Francisco |       48 | 1994-11-27
 San Francisco |       50 | 1994-11-29
 Hayward       |       45 | 1994-11-29
(3 rows)
*/
```

A query can be "qualified" by adding a WHERE clause that specifies which rows are wanted. The WHERE clause contains a Boolean (truth value) expression, and only rows for which the Boolean expression is true are returned. The usual Boolean operators (AND, OR, and NOT) are allowed in the qualification. For example, the following retrieves the weather of San Francisco on rainy days:

```sql
SELECT * FROM weather
         WHERE city = 'San Francisco' AND prcp > 0.0;
/*
     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
(1 row)
*/
```

You can request that the results of a query be returned in sorted order:

```sql
SELECT * FROM weather
         ORDER BY city;
/*
     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 Hayward       |      37 |      54 |      | 1994-11-29
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
 San Francisco |      43 |      57 |    0 | 1994-11-29
(3 rows)
*/
```

In this example, the sort order isn't fully specified, and so you might get the San Francisco rows in either order. But you'd always get the results shown above if you do:

```sql
SELECT * FROM weather
         ORDER BY city, temp_lo;
/*
     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 Hayward       |      37 |      54 |      | 1994-11-29
 San Francisco |      43 |      57 |    0 | 1994-11-29
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
(3 rows)
*/
```

You can request that duplicate rows be removed from the result of a query:

```sql
SELECT DISTINCT city
       FROM weather;
/*
     city
---------------
 Hayward
 San Francisco
(2 rows)
*/
```

Here again, the result row ordering might vary. You can ensure consistent results by using DISTINCT and ORDER BY together:

```sql
SELECT DISTINCT city
       FROM weather
       ORDER BY city;
/*
     city
---------------
 Hayward
 San Francisco
(2 rows)
*/
```

* While `SELECT *` is useful for off-the-cuff queries, it is widely considered bad style in production code, since adding a column to the table would change the results.
* In some database systems, including older versions of PostgreSQL, the implementation of DISTINCT automatically orders the rows and so ORDER BY is unnecessary. But this is not required by the SQL standard, and current PostgreSQL does not guarantee that DISTINCT causes the rows to be ordered.

## 2.6. Joins Between Tables

Queries can access multiple tables at once, or access the same table in such a way that multiple rows of the table are being processed at the same time. A query that accesses multiple rows of the same or different tables at one time is called a join query.

As an example, say you wish to list all the weather records together with the location of the associated city. To do that, we need to compare the city column of each row of the weather table with the name column of all rows in the cities table, and select the pairs of rows where these values match.

```sql
SELECT *
    FROM weather, cities
    WHERE city = name;
/*
     city      | temp_lo | temp_hi | prcp |    date    |     name      | location
---------------+---------+---------+------+------------+---------------+-----------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | San Francisco | (-194,53)
 San Francisco |      43 |      57 |    0 | 1994-11-29 | San Francisco | (-194,53)
(2 rows)
*/


-- There are two columns containing the city name
-- this is undesirable, list the output columns explicitly rather than using *
SELECT city, temp_lo, temp_hi, prcp, date, location
    FROM weather, cities
    WHERE city = name;
/*
     city      | temp_lo | temp_hi | prcp |    date    | location
---------------+---------+---------+------+------------+-----------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | (-194,53)
 San Francisco |      43 |      57 |    0 | 1994-11-29 | (-194,53)
(2 rows)
*/
```
