const { COMMAND_INDEX, COMMANDS } = require('../constants');

/**
 * Returns the appropriate response from the client
 * message.
 *
 * @param {object} clients an object containing the
 * currently connected clients
 * @param {string} sessionId the session id of the client
 * @param {string} text the text message from the client
 * @returns {any} the message to send back to the client
 */
const getResponse = (clients, sessionId, text) => {
  const data = JSON.parse(text);
  if (!clients[sessionId].username) {
    // Initial username
    clients[sessionId].username = data;
    return sessionId;
  } else if (data[COMMAND_INDEX] === COMMANDS.LAB) {
    // Creating a lab
    if (clients[sessionId].lab) {
      return data;
    }
    clients[sessionId].lab = {
      nodes: new Set(data[1]),
      edges: data[2],
      tokens: {},
    };
  } else {
    // Handling add/remove commands
    const response = [];
    data.forEach(command => {
      const [type, color, node] = command;
      if (type === COMMANDS.ADD) {
        if (clients[sessionId].lab.tokens[color] || !clients[sessionId].lab.nodes.has(node)) {
          response.push(command);
        } else {
          clients[sessionId].lab.tokens[color] = node;
        }
      } else if (type === COMMANDS.MOVE) {
        // NOTE: not reimplementing djikstra's, just a test
        response.push(clients[sessionId].lab.tokens[color] === node);
      }
    });
    return response;
  }
};

module.exports = getResponse;
