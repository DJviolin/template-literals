# PostgreSQL Documentation

Link: https://www.postgresql.org/docs/current/static/index.html

Current: https://www.postgresql.org/docs/current/static/tutorial-transactions.html

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


-- Exercise: Attempt to determine the semantics of this query when the WHERE clause is omitted.
SELECT * FROM weather, cities;
/*
     city      | temp_lo | temp_hi | prcp |    date    |     name      | location
---------------+---------+---------+------+------------+---------------+-----------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | San Francisco | (-194,53)
 San Francisco |      43 |      57 |    0 | 1994-11-29 | San Francisco | (-194,53)
 Hayward       |      37 |      54 |      | 1994-11-29 | San Francisco | (-194,53)
(3 rows)
*/
```

Since the columns all had different names, the parser automatically found which table they belong to. If there were duplicate column names in the two tables you'd need to qualify the column names to show which one you meant, as in.

It is widely considered good style to qualify all column names in a join query, so that the query won't fail if a duplicate column name is later added to one of the tables.

```sql
SELECT weather.city, weather.temp_lo, weather.temp_hi,
       weather.prcp, weather.date, cities.location
    FROM weather, cities
    WHERE cities.name = weather.city;
-- Join queries of the kind seen thus far can also be written in this alternative form:
SELECT *
    FROM weather INNER JOIN cities ON (weather.city = cities.name);
/*
     city      | temp_lo | temp_hi | prcp |    date    | location
---------------+---------+---------+------+------------+-----------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | (-194,53)
 San Francisco |      43 |      57 |    0 | 1994-11-29 | (-194,53)
(2 rows)
*/
```

Now we will figure out how we can get the Hayward records back in. What we want the query to do is to scan the weather table and for each row to find the matching cities row(s). If no matching row is found we want some "empty values" to be substituted for the cities table's columns. This kind of query is called an outer join. (The joins we have seen so far are inner joins.).

This query is called a left outer join because the table mentioned on the left of the join operator will have each of its rows in the output at least once, whereas the table on the right will only have those rows output that match some row of the left table.

When outputting a left-table row for which there is no right-table match, empty (null) values are substituted for the right-table columns.

```sql
SELECT *
    FROM weather LEFT OUTER JOIN cities ON (weather.city = cities.name);
/*
     city      | temp_lo | temp_hi | prcp |    date    |     name      | location
---------------+---------+---------+------+------------+---------------+-----------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | San Francisco | (-194,53)
 San Francisco |      43 |      57 |    0 | 1994-11-29 | San Francisco | (-194,53)
 Hayward       |      37 |      54 |      | 1994-11-29 |               |
(3 rows)
*/
```

Exercise: There are also right outer joins and full outer joins. Try to find out what those do.

```sql
SELECT *
    FROM weather RIGHT OUTER JOIN cities ON (weather.city = cities.name);
/*
     city      | temp_lo | temp_hi | prcp |    date    |     name      | location
---------------+---------+---------+------+------------+---------------+-----------
 San Francisco |      43 |      57 |    0 | 1994-11-29 | San Francisco | (-194,53)
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | San Francisco | (-194,53)
(2 rows)
*/


SELECT *
    FROM weather FULL OUTER JOIN cities ON (weather.city = cities.name);
/*
     city      | temp_lo | temp_hi | prcp |    date    |     name      | location
---------------+---------+---------+------+------------+---------------+-----------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | San Francisco | (-194,53)
 San Francisco |      43 |      57 |    0 | 1994-11-29 | San Francisco | (-194,53)
 Hayward       |      37 |      54 |      | 1994-11-29 |               |
(3 rows)
*/
```

We can also join a table against itself. This is called a self join.

As an example, suppose we wish to find all the weather records that are in the temperature range of other weather records. So we need to compare the temp_lo and temp_hi columns of each weather row to the temp_lo and temp_hi columns of all other weather rows.

```sql
SELECT W1.city, W1.temp_lo AS low, W1.temp_hi as high,
       W2.city, w2.temp_lo AS low, w2.temp_hi as high
    FROM weather W1, weather W2
    WHERE W1.temp_lo < W2.temp_lo
    AND W1.temp_hi > W2.temp_hi;
/*
     city      | low | high |     city      | low | high
---------------+-----+------+---------------+-----+------
 San Francisco |  43 |   57 | San Francisco |  46 |   50
 Hayward       |  37 |   54 | San Francisco |  46 |   50
(2 rows)
*/
```

Here we have relabeled the weather table as W1 and W2 to be able to distinguish the left and right side of the join. You can also use these kinds of aliases in other queries to save some typing, e.g.:

```sql
SELECT *
    FROM weather w, cities c
    WHERE w.city = c.name;
/*
     city      | temp_lo | temp_hi | prcp |    date    |     name      | location
---------------+---------+---------+------+------------+---------------+-----------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | San Francisco | (-194,53)
 San Francisco |      43 |      57 |    0 | 1994-11-29 | San Francisco | (-194,53)
(2 rows)
*/
```

## 2.7. Aggregate Functions

An aggregate function computes a single result from multiple input rows, for example:

* count
* sum
* avg (average)
* max (maximum)
* min (minimum)

over a set of rows.

```sql
SELECT max(temp_lo) FROM weather;
/*
 max
-----
  46
(1 row)
*/
```

As is often the case the query can be restated to accomplish the desired result, here by using a subquery:

```sql
SELECT city FROM weather WHERE temp_lo = max(temp_lo);    -- WRONG

-- This next example is OK because the subquery is an independent computation that computes its own aggregate separately from what is happening in the outer query.
SELECT city FROM weather
    WHERE temp_lo = (SELECT max(temp_lo) FROM weather);
/*
     city
---------------
 San Francisco
(1 row)
*/
```

Aggregates are also very useful in combination with GROUP BY clauses. For example, we can get the maximum low temperature observed in each city with:

```sql
SELECT city, max(temp_lo)
    FROM weather
    GROUP BY city;
/*
     city      | max
---------------+-----
 Hayward       |  37
 San Francisco |  46
(2 rows)
*/
```

We can filter these grouped rows using HAVING:

```sql
SELECT city, max(temp_lo)
    FROM weather
    GROUP BY city
    HAVING max(temp_lo) < 40;
/*
  city   | max
---------+-----
 Hayward |  37
(1 row)
*/
```

Finally, if we only care about cities whose names begin with "S", we might do:

```sql
SELECT city, max(temp_lo)
    FROM weather
    WHERE city LIKE 'S%'         -- The LIKE operator does pattern matching
    GROUP BY city
    HAVING max(temp_lo) > 40;
/*
     city      | max
---------------+-----
 San Francisco |  46
(1 row)
*/
```

## 2.8. Updates

You can update existing rows using the UPDATE command. Suppose you discover the temperature readings are all off by 2 degrees after November 28. You can correct the data as follows:

```sql
UPDATE weather
    SET temp_hi = temp_hi - 2, temp_lo = temp_lo - 2
    WHERE date > '1994-11-28';
-- UPDATE 2

SELECT * FROM weather;
/*
     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
 San Francisco |      41 |      55 |    0 | 1994-11-29
 Hayward       |      35 |      52 |      | 1994-11-29
(3 rows)
*/
```

## 2.9. Deletions

Rows can be removed from a table using the DELETE command. Suppose you are no longer interested in the weather of Hayward:

```sql
DELETE FROM weather WHERE city = 'Hayward';
-- DELETE 1


SELECT * FROM weather;
/*
     city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
 San Francisco |      41 |      55 |    0 | 1994-11-29
(2 rows)
*/
```

# Chapter 3. Advanced Features

## 3.2. Views

Suppose the combined listing of weather records and city location is of particular interest to your application, but you do not want to type the query each time you need it. You can create a view over the query, which gives a name to the query that you can refer to like an ordinary table.

Making liberal use of views is a key aspect of good SQL database design. Views allow you to encapsulate the details of the structure of your tables, which might change as your application evolves, behind consistent interfaces.

Views can be used in almost any place a real table can be used. Building views upon other views is not uncommon.

```sql
CREATE VIEW myview AS
    SELECT city, temp_lo, temp_hi, prcp, date, location
    FROM weather, cities
    WHERE city = name;
-- CREATE VIEW
SELECT * FROM myview;
/*
     city      | temp_lo | temp_hi | prcp |    date    | location
---------------+---------+---------+------+------------+-----------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27 | (-194,53)
 San Francisco |      41 |      55 |    0 | 1994-11-29 | (-194,53)
(2 rows)
*/
```

## 3.3. Foreign Keys

Consider the following problem: You want to make sure that no one can insert rows in the weather table that do not have a matching entry in the cities table. This is called maintaining the referential integrity of your data.

In simplistic database systems this would be implemented (if at all) by first looking at the cities table to check if a matching record exists, and then inserting or rejecting the new weather records. This approach has a number of problems and is very inconvenient, so PostgreSQL can do this for you.

```sql
CREATE TABLE cities2 (
    city        varchar(80) primary key,
    location    point
);
-- CREATE TABLE
CREATE TABLE weather2 (
    city       varchar(80) references cities2(city),
    temp_lo    int,
    temp_hi    int,
    prcp       real,
    date       date
);
-- CREATE TABLE
INSERT INTO weather2 VALUES ('Berkeley', 45, 53, 0.0, '1994-11-28');
-- ERROR:  insert or update on table "weather2" violates foreign key constraint "weather2_city_fkey"
-- DETAIL:  Key (city)=(Berkeley) is not present in table "cities2".
```

## 3.4. Transactions

Transactions are a fundamental concept of all database systems. The essential point of a transaction is that it **bundles multiple steps into a single, all-or-nothing operation**. The intermediate states between the steps are not visible to other concurrent transactions, and if some failure occurs that prevents the transaction from completing, then none of the steps affect the database at all.

For example, consider a bank database that contains balances for various customer accounts, as well as total deposit balances for branches. Suppose that we want to record a payment of $100.00 from Alice's account to Bob's account. Simplifying outrageously, the SQL commands for this might look like:

```sql
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
UPDATE branches SET balance = balance - 100.00
    WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Alice');
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
UPDATE branches SET balance = balance + 100.00
    WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Bob');
```

The details of these commands are not important here; **the important point is that there are several separate updates involved to accomplish this rather simple operation. Our bank's officers will want to be assured that either all these updates happen, or none of them happen**. It would certainly not do for a system failure to result in Bob receiving $100.00 that was not debited from Alice. Nor would Alice long remain a happy customer if she was debited without Bob being credited. We need a guarantee that if something goes wrong partway through the operation, none of the steps executed so far will take effect. **Grouping the updates into a transaction gives us this guarantee.**

We also want a guarantee that once a transaction is completed and acknowledged by the database system, it has indeed been permanently recorded and won't be lost even if a crash ensues shortly thereafter. 
For example, if we are recording a cash withdrawal by Bob, we do not want any chance that the debit to his account will disappear in a crash just after he walks out the bank door. **A transactional database guarantees that all the updates made by a transaction are logged in permanent storage (i.e., on disk) before the transaction is reported complete.**

Another important property of transactional databases is closely related to the notion of atomic updates: when multiple transactions are running concurrently, each one should not be able to see the incomplete changes made by others. For example, if one transaction is busy totalling all the branch balances, it would not do for it to include the debit from Alice's branch but not the credit to Bob's branch, nor vice versa. So transactions must be all-or-nothing not only in terms of their permanent effect on the database, but also in terms of their visibility as they happen. The updates made so far by an open transaction are invisible to other transactions until the transaction completes, whereupon all the updates become visible simultaneously.

In PostgreSQL, a transaction is set up by surrounding the SQL commands of the transaction with `BEGIN` and `COMMIT` commands. So our banking transaction would actually look like:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
-- etc etc
COMMIT;
```

If, partway through the transaction, we decide we do not want to commit (perhaps we just noticed that Alice's balance went negative), we can issue the command `ROLLBACK` instead of `COMMIT`, and all our updates so far will be canceled.

PostgreSQL actually treats every SQL statement as being executed within a transaction. If you do not issue a `BEGIN` command, then each individual statement has an implicit `BEGIN` and (if successful) `COMMIT` wrapped around it. A group of statements surrounded by `BEGIN` and `COMMIT` is sometimes called a transaction block.

**Note: Some client libraries issue BEGIN and COMMIT commands automatically, so that you might get the effect of transaction blocks without asking. Check the documentation for the interface you are using.**

It's possible to control the statements in a transaction in a more granular fashion through the use of savepoints. Savepoints allow you to selectively discard parts of the transaction, while committing the rest. After defining a savepoint with `SAVEPOINT`, you can if needed roll back to the savepoint with `ROLLBACK TO`. All the transaction's database changes between defining the savepoint and rolling back to it are discarded, but changes earlier than the savepoint are kept.

After rolling back to a savepoint, it continues to be defined, so you can roll back to it several times. Conversely, if you are sure you won't need to roll back to a particular savepoint again, it can be released, so the system can free some resources. Keep in mind that either releasing or rolling back to a savepoint will automatically release all savepoints that were defined after it.

All this is happening within the transaction block, so none of it is visible to other database sessions. When and if you commit the transaction block, the committed actions become visible as a unit to other sessions, while the rolled-back actions never become visible at all.

Remembering the bank database, suppose we debit $100.00 from Alice's account, and credit Bob's account, only to find later that we should have credited Wally's account. We could do it using savepoints like this:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
SAVEPOINT my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
-- oops ... forget that and use Wally's account
ROLLBACK TO my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Wally';
COMMIT;
```

This example is, of course, oversimplified, but there's a lot of control possible in a transaction block through the use of savepoints. Moreover, `ROLLBACK TO` is the only way to regain control of a transaction block that was put in aborted state by the system due to an error, short of rolling it back completely and starting again.

## 3.5. Window Functions

A window function performs a calculation across a set of table rows that are somehow related to the current row. This is comparable to the type of calculation that can be done with an aggregate function. But unlike regular aggregate functions, use of a window function does not cause rows to become grouped into a single output row — the rows retain their separate identities. Behind the scenes, the window function is able to access more than just the current row of the query result.

Here is an example that shows how to compare each employee's salary with the average salary in his or her department:

```sql
SELECT depname, empno, salary, avg(salary) OVER (PARTITION by depname) FROM empsalary;
/*
  depname  | empno | salary |          avg          
-----------+-------+--------+-----------------------
 develop   |    11 |   5200 | 5020.0000000000000000
 develop   |     7 |   4200 | 5020.0000000000000000
 develop   |     9 |   4500 | 5020.0000000000000000
 develop   |     8 |   6000 | 5020.0000000000000000
 develop   |    10 |   5200 | 5020.0000000000000000
 personnel |     5 |   3500 | 3700.0000000000000000
 personnel |     2 |   3900 | 3700.0000000000000000
 sales     |     3 |   4800 | 4866.6666666666666667
 sales     |     1 |   5000 | 4866.6666666666666667
 sales     |     4 |   4800 | 4866.6666666666666667
(10 rows)
*/
```
