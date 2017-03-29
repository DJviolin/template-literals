# PostgreSQL Documentation

Link: https://www.postgresql.org/docs/current/static/index.html

Current: https://www.postgresql.org/docs/current/static/tutorial-createdb.html

#### 1.3. Creating a Database

```bash
$ createdb mydb  # Creating mydb
$ createdb       # Create database with the same name as your current user name
$ dropdb mydb    # Destroy mydb
```

More about [createdb], [dropdb] here.

[createdb]: https://www.postgresql.org/docs/current/static/app-createdb.html
[dropdb]: https://www.postgresql.org/docs/current/static/app-dropdb.html

#### 1.4. Accessing a Database

```bash
# allows you to interactively enter, edit, execute SQL commands
# If you not supply database name, it will default to your user account name
# `#` Indicating last line of the command
$ psql mydb
```
