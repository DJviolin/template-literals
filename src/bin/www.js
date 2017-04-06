'use strict';

// 3rd party
const http = require('http');
// 1st party
const app = require('../app');
const config = require('../config');

// Optimizations
http.globalAgent.maxSockets = Infinity;

// Security
app.proxy = true;

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
      config.err('%s requires elevated privileges', bind);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      config.err('%s is already in use', bind);
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
  config.log('Listening on %s', bind);
}

// Listen on provided port, on all network interfaces
server.listen(port, process.env.PRIVATE_IP_DOCKER || '0.0.0.0');
server.on('error', onError);
server.on('listening', onListening);
