'use strict';

// Module dependencies
const db = require('../db/index');
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
// https://github.com/vitaly-t/pg-promise/blob/master/examples/select-insert.md
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw#Throw_an_object
/*function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}
const query = async (tablename) => {
  await db.task(async (t) => {
    let exist = null;
    try {
      exist = await t.one('SELECT to_regclass($1) AS exist;', tablename, a => !!a.exist);
      if (!exist) {
        debugErr('Database missing');
        throw new UserException(`Table NOT exist: ${exist}`);
      }
      debugLog(`Database exists: ${exist}`);
    } catch (error) {
      debugErr(`PGP ERROR: ${error.message || error}`); // print error;
      process.on('exit', (code) => {
        debugErr(`About to exit with code: ${code}`);
      });
      process.exitCode = 9;
      process.exit();
    }
    return exist;
  });
};
query('foo');
//query('foo2');*/

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
