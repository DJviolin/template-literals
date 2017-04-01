'use strict';

// Module dependencies
const debug = require('debug');
const http = require('http');
const app = require('../app');

// Debugging
const debugErr = debug('app:err');
const debugLog = debug('app:log');

// Optimizations
http.globalAgent.maxSockets = Infinity;

// Security
app.proxy = true;

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
    const exist = await db.one(`SELECT to_regclass('${tablename}') AS exist;`, [], a => a.exist);
    if (exist === tablename) {
      debugLog(`Database exists: ${exist}`);
    } else {
      debugErr(`Database missing: ${tablename} !== ${exist}`);
      throw new UserException(`${tablename} table NOT exist`);
    }
  } catch (err) {
    debugErr(`PGP ERROR: ${err.message || err}`); // print error;
    process.on('exit', (code) => {
      debugErr(`About to exit with code: ${code}`);
    });
    process.exitCode = 9;
    process.exit();
  }
};
/*try {
  query('foo2');
} catch (e) {
  debugErr(e.message, e.name); // pass exception object to err handler
}*/
query('foo');
//query('foo2');

// Create HTTP server
const server = http.createServer(app.callback());

// Normalize a port into a number, string, or false
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val; // named pipe
  }
  if (port >= 0) {
    return port; // port number
  }
  return false;
}

// Get port from environment and store in Koa
const port = normalizePort(process.env.PORT || '3000');

// Event listener for HTTP server "error" event
function onError(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // Handle specific listen errors with friendly messages
  switch (err.code) {
    case 'EACCES':
      debugErr('%s requires elevated privileges', bind);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debugErr('%s is already in use', bind);
      process.exit(1);
      break;
    default:
      throw err;
  }
}

// Event listener for HTTP server "listening" event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debugLog('Listening on %s', bind);
}

// Listen on provided port, on all network interfaces
server.listen(port, process.env.PRIVATE_IP_DOCKER || '0.0.0.0');
server.on('error', onError);
server.on('listening', onListening);
