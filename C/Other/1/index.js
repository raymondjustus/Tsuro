const server = require('./server');

/**
 * Starts server on given port
 *
 * @param {number} port the port that the server will
 * listen to
 */
const main = port => {
  server.listen(port, '127.0.0.1');
};

module.exports = main;
