// https://github.com/vitaly-t/pg-promise-demo

import promise from 'bluebird';
//const diag = require('./diagnostics');
import init, { done } from './diagnostics';

// pg-promise initialization options:
const options = {
	// Use a custom promise library, instead of the default ES6 Promise:
	promiseLib: promise,
};

// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
// Database connection parameters:
const cn = {
	host: 'localhost',
	port: process.env.PGPORT || 5432,
	database: process.env.PGDATABASE || 'postgres',
	user: process.env.PGUSER || 'postgres',
	password: process.env.PGPASSWORD || 'password',
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(options);

// Create the database instance:
const db = pgp(cn);

// Load and initialize all the diagnostics:
//diag.init(options);
init(options);

// If you ever need to change the default pool size, here's an example:
// pgp.pg.defaults.poolSize = 20;

// pgp => Library instance is often necessary to access all the useful
// types and namespaces available within the library's root.
// db => Database instance. Only one instance per database is needed
// within any application.
export { pgp, db as default };
