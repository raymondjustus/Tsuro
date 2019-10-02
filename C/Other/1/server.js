const { createServer } = require('net');
const Ref = require('../../../B/Other/Ref');
const getSortedItems = require('../../../B/Other/getSortedItems');
const { FLAG_TYPES } = require('../../../B/Other/constants');

/**
 * Parses items from the given input and sorts them
 * in ascending order. Then prints the items.
 *
 * @param {Ref} inputRef the input ref to fetch
 * the current value
 * @param {net.Socket} socket the socket for
 * the server that was opened
 */
const printSortedItems = (inputRef, socket) => {
  const items = getSortedItems(inputRef.get(), FLAG_TYPES.UP);
  const lastIdx = items.length - 1;
  items.forEach((item, i) => {
    const lineEnding = lastIdx !== i ? '\n\n' : '\n';
    socket.write(`${JSON.stringify(item)}${lineEnding}`);
  });
};

/**
 * A factory that creates an event handler for
 * receiving data from the socket. Appends the
 * data to the `inputRef`.
 *
 * @param {Ref} inputRef the input ref to update
 * as new input data streams in
 * @param {net.Socket} socket the socket for
 * the server that was opened
 * @returns {function} the event handler for
 * receiving data from the socket
 */
const onData = (inputRef, socket) => chunk => {
  const text = chunk.toString().trim();
  if (text === 'EOF') {
    printSortedItems(inputRef, socket);
  } else {
    inputRef.set(input => `${input}${text} `);
  }
};

/**
 * A factory that creates an event handler for
 * closing the socket. Prints the parsed input
 * from the socket.
 *
 * @param {Ref} inputRef the input ref to fetch
 * the current value
 * @param {net.Socket} socket the socket for
 * the server that was opened
 * @returns {function} the event handler for
 * closing the socket
 */
const onClose = (inputRef, socket) => () => {
  printSortedItems(inputRef, socket);
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

  socket.on('data', onData(inputRef, socket));
  socket.on('close', onClose(inputRef, socket));

  // Empty case for ECONNRESET error
  // https://stackoverflow.com/a/17637900
  socket.on('error', () => {});
};

const server = createServer(onConnection);

module.exports = server;
