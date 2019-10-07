/**
 * Returns the appropriate response from the client
 * message.
 *
 * @param {object} clients an object containing the
 * currently connected clients
 * @param {string} sessionId the session id of the client
 * @param {string} text the text message from the client
 * @returns {string} the message to send back to the client
 */
const getResponse = (clients, sessionId, text) => {
  const data = JSON.parse(text);
  if (!clients[sessionId].username) {
    clients[sessionId].username = data;
    console.log(`Connected "${data}" with ID: ${sessionId}`);
    return JSON.stringify(sessionId);
  } else {
    return text;
  }
};

module.exports = getResponse;
