const { createServer } = require('net');
const Ref = require('../../../B/Other/Ref');
const onInput = require('../../../B/Other/onInput');
const { FLAG_TYPES } = require('../../../B/Other/constants');

/**
 * A factory that creates an event handler for
 * receiving data from the socket. Appends the
 * data to the `inputRef`.
 *
 * @param {Ref} inputRef the input ref to update
 * as new input data streams in
 * @returns {function} the event handler for
 * receiving data from the socket
 */
const onData = inputRef => chunk => {
  const text = chunk.toString().trim();
  inputRef.set(input => `${input}${text} `);
};

/**
 * A factory that creates an event handler for
 * closing the socket. Passes the socket data
 * to `onInput`.
 *
 * @param {Ref} inputRef the input ref to fetch
 * the current value
 * @returns {function} the event handler for
 * closing the socket
 */
const onClose = inputRef => () => {
  onInput(inputRef.get(), FLAG_TYPES.UP);
};

/**
 * The event handler for the connection of new
 * sockets.
 *
 * @param {net.Socket} socket the socket for
 * the server that was opened
 */
const onConnection = socket => {
  const inputRef = new Ref();

  socket.on('data', onData(inputRef));
  socket.on('close', onClose(inputRef));

  // Empty case for ECONNRESET error
  // https://stackoverflow.com/a/17637900
  socket.on('error', () => {});
};

const server = createServer(onConnection);

module.exports = server;
