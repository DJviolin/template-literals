'use strict';

//const util = require('util');
const Router = require('koa-router');
//import db, { pgp } from '../db/pgp';
//const db = require('../db/pgp').db;
//const pgp = require('../db/pgp').pgp;

const router = new Router({ prefix: '/query' });

// Viewing
const index = require('../views/index');

const meta = {
  title: 'Template Literals',
  description: 'Vanilla JS rendering',
};

// http://stackoverflow.com/a/40949781/1442219
// https://github.com/vitaly-t/pg-promise#sql-names
// http://vitaly-t.github.io/pg-promise/formatting.html#.name

/*// http://127.0.0.1:3000/sql/2
router.get('/sql/:id', async (ctx) => {
  const obj = {
    id: parseInt(ctx.params.id, 10),
  };
  //await db.query('SELECT ${id} + ${id}', obj)
  await db.result('SELECT ${id} + ${id}', obj)
    .then((data) => {
      //console.log('DATA:', data); // print data
      console.log('DATA:', data.rows[0]['?column?']); // print data
      ctx.state = { title: data.rows[0]['?column?'] }; // => 4
    })
    .catch((error) => {
      console.log('ERROR:', error); // print the error
      ctx.body = '::DATABASE CONNECTION ERROR::';
    })
    .finally(pgp.end); // for immediate app exit, closing the connection pool

  await ctx.render('index');
});*/

/*// http://127.0.0.1:3000/sql/2
router.get('/sql/:id', async (ctx) => {
  await db.one({
    name: 'addition',
    text: 'SELECT 2 + 2 as value',
  }, [], v => +v.value)
    .then((value) => {
      console.log('VALUE:', value); //=> value: 4
      ctx.state = { title: value }; // => 4
    })
    .catch((error) => {
      console.log('ERROR:', error); // print the error
      ctx.body = '::DATABASE CONNECTION ERROR::';
    })
    .finally(pgp.end); // for immediate app exit, closing the connection pool

  await ctx.render('index');
});*/

// http://127.0.0.1:3000/query/2
/*router.get('/:id', async (ctx) => {
  //await db.one('SELECT ${id} + ${id} as VALUE;', {
  //  id: parseInt(ctx.params.id, 10),
  //}, v => v.value)
  await db.one('SELECT version() as VALUE;', {}, v => v.value)
    .then((value) => {
      ctx.state.welcome = value;
      //console.log('VALUE:', value); // => value: 4
    })
    .catch((error) => {
      ctx.body = `::DATABASE CONNECTION ERROR::<br>ERROR: ${error}`;
    })
    .finally(pgp.end); // for immediate app exit, closing the connection pool
    // for testing purposes only!

  ctx.state.meta = meta;
  ctx.type = 'html';
  ctx.body = await index(ctx.state);
});*/

router.use(async (ctx, next) => {
  ctx.state.meta = meta;
  await next();
});

// http://127.0.0.1:3000/query/2
// $ ab -k -n 1000 -c 10 http://127.0.0.1:3000/query/2
// $ wrk -c 64 -d 30s http://127.0.0.1:3000/query/2
// http://vitaly-t.github.io/pg-promise/Database.html#.one
/*router.get('/:id', async (ctx) => {
  try {
    //const query = await db.one('SELECT version() as VALUE;', {}, v => v.value);
    //const query = await db.one('SELECT ${id} + ${id} as VALUE;', {
    //  id: parseInt(ctx.params.id, 10),
    //}, v => v.value);
    const id = parseInt(ctx.params.id, 10);
    const query = await ctx.db.one(`SELECT ${id} + ${id} as VALUE;`, {}, v => +v.value);
    ctx.state.welcome = query;
  } catch (err) {
    console.log(`PGP ERROR: ${err.message}` || err);
  }
  //ctx.state.meta = meta;
  ctx.type = 'html';
  ctx.body = await index(ctx.state);
});*/

// http://127.0.0.1:3000/query/create
// $ ab -k -n 1000 -c 10 http://127.0.0.1:3000/query/create
// $ wrk -c 64 -d 60s http://127.0.0.1:3000/query/create
router.get('/create', async (ctx) => {
  try {
    const db = await ctx.db.users.create(); // create table: Users
    ctx.body = await {
      success: true,
      data: db,
    };
  } catch (error) {
    ctx.body = await {
      success: false,
      error: error.message || error,
    };
  }
});

// http://127.0.0.1:3000/query/init
router.get('/init', async (ctx) => {
  try {
    const db = await ctx.db.users.init(); // add some initial records
    ctx.body = await {
      success: true,
      data: db,
    };
  } catch (error) {
    ctx.body = await {
      success: false,
      error: error.message || error,
    };
  }
});

// http://127.0.0.1:3000/query/empty
router.get('/empty', async (ctx) => {
  try {
    const db = await ctx.db.users.empty(); // remove all records from the table
    ctx.body = await {
      success: true,
      data: db,
    };
  } catch (error) {
    ctx.body = await {
      success: false,
      error: error.message || error,
    };
  }
});

// http://127.0.0.1:3000/query/drop
router.get('/drop', async (ctx) => {
  try {
    const db = await ctx.db.users.drop(); // drop table: Users
    ctx.body = await {
      success: true,
      data: db,
    };
  } catch (error) {
    ctx.body = await {
      success: false,
      error: error.message || error,
    };
  }
});

// http://127.0.0.1:3000/query/add/Lanti
router.get('/add/:name', async (ctx) => {
  try {
    const db = await ctx.db.users.add(ctx.params.name); // add a new user with name
    ctx.body = await {
      success: true,
      data: db,
    };
  } catch (error) {
    ctx.body = await {
      success: false,
      error: error.message || error,
    };
  }
});

// http://127.0.0.1:3000/query/find/6
router.get('/find/:id', async (ctx) => {
  try {
    const db = await ctx.db.users.find(+ctx.params.id); // find a user by id
    ctx.body = await {
      success: true,
      data: db,
    };
  } catch (error) {
    ctx.body = await {
      success: false,
      error: error.message || error,
    };
  }
});

// http://127.0.0.1:3000/query/remove/6
router.get('/remove/:id', async (ctx) => {
  try {
    const db = await ctx.db.users.remove(+ctx.params.id); // remove a user by id
    ctx.body = await {
      success: true,
      data: db,
    };
  } catch (error) {
    ctx.body = await {
      success: false,
      error: error.message || error,
    };
  }
});

// http://127.0.0.1:3000/query/all
router.get('/all', async (ctx) => {
  try {
    const db = await ctx.db.users.all(); // get all users
    ctx.body = await {
      success: true,
      data: db,
    };
  } catch (error) {
    ctx.body = await {
      success: false,
      error: error.message || error,
    };
  }
});

// http://127.0.0.1:3000/query/total
router.get('/total', async (ctx) => {
  try {
    const db = await ctx.db.users.total(); // count all users
    ctx.body = await {
      success: true,
      data: db,
    };
  } catch (error) {
    ctx.body = await {
      success: false,
      error: error.message || error,
    };
  }
});

// http://127.0.0.1:3000/query/2
// $ ab -k -n 1000 -c 10 http://127.0.0.1:3000/query/2
// $ wrk -c 64 -d 30s http://127.0.0.1:3000/query/2
// http://vitaly-t.github.io/pg-promise/Database.html#.one
router.get('/:id', async (ctx) => {
  const id = parseInt(ctx.params.id, 10);
  const query = await ctx.db.one(`SELECT ${id} + ${id} as VALUE;`, {}, v => +v.value);
  ctx.state.welcome = query;
  ctx.state.meta.title = 'Template Literals (edited)';
  ctx.type = 'html';
  ctx.body = await index(ctx.state);
});

module.exports = router;
