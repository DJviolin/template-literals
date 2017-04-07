'use strict';

// Node
const http = require('http');
// 1st
const app = require('../app');
const config = require('../config');
const { LOG, ERR } = require('../include/debug.js');

// Optimizations
http.globalAgent.maxSockets = Infinity;

// Security
app.poweredBy = false;
app.proxy = config.TRUST_PROXY;

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
//const port = normalizePort(process.env.PORT || '3000');
const port = normalizePort(config.PORT);

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
      ERR('%s requires elevated privileges', bind);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      ERR('%s is already in use', bind);
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
  LOG('Listening on %s', bind);
}

// Listen on provided port, on all network interfaces
//server.listen(port, config.PRIVATE_IP_DOCKER);
//server.on('error', onError);
//server.on('listening', onListening);

server.start = function () {
  server.listen(port, config.PRIVATE_IP_DOCKER);
  server.on('error', onError);
  server.on('listening', onListening);
};
module.exports = server;
