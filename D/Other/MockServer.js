#!/usr/bin/env node

const { createServer } = require('net');

/**
 * Creates a random, unique session ID.
 *
 * @returns {string} a random session ID
 */
const createSessionId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

/**
 * Object containing all active clients on server.
 */
const clients = {};

const server = createServer(client => {
  const sessionId = createSessionId();
  clients[sessionId] = {
    client,
    username: null,
  };

  client.on('data', data => {
    const text = data.toString().trim();
    if (!clients[sessionId].username) {
      const username = JSON.parse(text);
      clients[sessionId].username = username;
      client.write(JSON.stringify(sessionId));
    } else {
      client.write(text);
    }
  });

  client.on('end', () => {
    delete clients[sessionId];
  });
});

server.listen(8000, '127.0.0.1');

module.exports = server;
