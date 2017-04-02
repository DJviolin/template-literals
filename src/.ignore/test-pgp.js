'use strict';

// pg-promise
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw#Throw_an_object
// https://nodejs.org/api/process.html#process_process_exit_code
// https://nodejs.org/api/errors.html#errors_error_propagation_and_interception
const db = require('../db/pgp').db;
const pgp = require('../db/pgp').pgp;

function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}
const query = async (tablename) => {
  try {
    // Check if table exists
    // http://dba.stackexchange.com/a/86098/106579
    // http://stackoverflow.com/a/24089729/1442219
    //const exist = await db.one(`SELECT to_regclass('${tablename}') AS exist;`, [], a => a.exist);
    //const exist = await db.one(`
    //  SELECT EXISTS (
    //    SELECT 1
    //    FROM   information_schema.tables
    //    WHERE  table_name = '${tablename}'
    //  ) AS exist;
    //`, [], a => a.exist);
    const exist = await db.one(`
      SELECT EXISTS (
          SELECT    1
          FROM      information_schema.columns
          WHERE     table_name  = '${tablename}'
          AND       column_name = 'name'
      )
      AS bool;
    `, [], a => a.bool);
    //if (exist === tablename) {
    if (exist === true) {
      console.log(`Database exists: ${exist}`);
    } else {
      console.log(`Database missing: ${tablename} !== ${exist}`);
      throw new UserException(`${tablename} table NOT exist`);
    }
  } catch (err) {
    console.log(`PGP ERROR: ${err.message || err}`); // print error;
    //pgp.end();
    /*process.on('exit', (code) => {
      console.log(`About to exit with code: ${code}`);
    });
    process.exitCode = 9;
    process.exit();*/
  }
};
//try {
//  query('foo2');
//} catch (e) {
//  console.log(e.message, e.name); // pass exception object to err handler
//}
//query('foo');
//query('foo2');

for (let i = 0; i < 1000; i += 1) {
  query('foo');
  //query('foo2');
}

// TODO: re-write
// https://github.com/vitaly-t/pg-promise/blob/master/examples/select-insert.md
/*async function query2(tablename) {
  return await db.task(async (t) => {
    let exist = await t.one('SELECT to_regclass($1) AS exist;', tablename, a => a && a.exist);
    //return userId || await t.one('INSERT INTO Users(tablename) VALUES($1) RETURNING id', tablename, u => u.id);
    return exist;
  });
}
query2('foo2')
  .then((exist) => {
    // use the id;
    //console.log(`exist: ${exist}`);
    if (exist !== null) {
      console.log(`Database exists: ${exist}`);
    } else {
      console.log('Database missing');
      throw new UserException(`Table NOT exist: ${exist}`);
    }
  })
  .catch((error) => {
    // something went wrong;
    console.log(`PGP ERROR: ${error.message || error}`); // print error;
    pgp.end();
    process.on('exit', (code) => {
      console.log(`About to exit with code: ${code}`);
    });
    process.exitCode = 9;
    process.exit();
  });*/
