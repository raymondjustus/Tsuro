const { COMMAND_INDEX, COMMANDS } = require('./constants');

/**
 * Parses the given edges from the user's lab request
 * into the lab command for the server.
 *
 * @param {object[]} edges the edges from the user's
 * lab request
 * @returns {[string, string[], string[][]]} the lab command
 * to send to the server
 */
const parseLabRequest = edges => {
  const nodes = new Set();

  const listOfEdges = [];
  edges.forEach(({ from, to }) => {
    nodes.add(from);
    nodes.add(to);
    listOfEdges.push([from, to]);
  });

  const listOfNodes = Array.from(nodes);

  return [COMMANDS.LAB, listOfNodes, listOfEdges];
};

/**
 * Parses the given user JSON request to the JSON
 * message to send to the server.
 *
 * @param {any} json the user's JSON request
 * @returns {any} the JSON message to send to the
 * server
 */
const parseUserRequest = json => {
  const command = json[COMMAND_INDEX];
  if (command === COMMANDS.LAB) {
    return parseLabRequest(json.slice(1));
  } else if (command === COMMANDS.ADD || command === COMMANDS.MOVE) {
    return json;
  }
  throw new SyntaxError('Not a valid command.');
};

module.exports = parseUserRequest;
