const { createServer } = require('net');
const getResponse = require('./getResponse');

/**
 * Creates a random, unique session ID.
 *
 * @returns {string} a random session ID
 */
const createSessionId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

const startServer = (ipAddress, port) => {
  /**
   * Object containing all active clients on server.
   */
  const clients = {};

  /**
   * Factory for creating a `data` event handler for a client
   * with the given session ID.
   *
   * @param {string} sessionId the session ID of the client to
   * handle receiving data from
   * @returns {function} the `data` event handler
   */
  const onData = sessionId => {
    const { client } = clients[sessionId];

    return data => {
      const text = data.toString().trim();
      const response = getResponse(clients, sessionId, text);
      if (response) {
        client.write(JSON.stringify(response));
      }
    };
  };

  /**
   * Factory for creating an `end` event handler for a client
   * with the given session ID.
   *
   * @param {string} sessionId the session ID of the client to
   * handle receiving data from
   * @returns {function} the `end` event handler
   */
  const onEnd = sessionId => () => {
    delete clients[sessionId];
  };

  const server = createServer(client => {
    const sessionId = createSessionId();
    clients[sessionId] = {
      client,
      username: null,
      lab: null,
    };

    client.on('data', onData(sessionId));

    client.on('end', onEnd(sessionId));
  });

  server.listen(port, ipAddress);
};

module.exports = startServer;
