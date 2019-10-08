const { COMMAND_INDEX, COMMANDS } = require('./constants');
const parseUserRequest = require('./parseUserRequest');
const printResponse = require('./printResponse');

/**
 * Factory for the `end` event handler for both the
 * stdin and server. The event handler destroys the
 * server client instance and exits the client program
 *
 * @param {net.Socket} serverClient the client object that
 * connects to the server
 * @returns {function} stdin `end` event handler
 */
const onEnd = serverClient => () => {
  serverClient.destroy();
  process.exit(0);
};

/**
 * Factory for the server client's `data` event handler. The event
 * handler deals with parsing JSON from the server and printing
 * an appropriate response to the client.
 *
 * @param {object} commands the client commands object
 * @param {any[]} commands.history the history of commands sent to
 * the client
 * @returns {function} server `data` event handler
 */
const onServerData = commands => {
  let sessionId = null;
  return data => {
    const text = data.toString().trim();
    const json = JSON.parse(text);
    if (!sessionId) {
      sessionId = json;
      printResponse('this server will call me', sessionId);
    } else {
      json.slice(0, json.length - 1).forEach(command => {
        printResponse('invalid', command);
      });
      printResponse('the response to', commands.history.last(), 'is', json.last());
    }
  };
};

/**
 * Intializes the `data` and `end` event handlers for the server.
 *
 * @param {net.Socket} serverClient the client object that
 * connects to the server
 * @param {object} commands the client commands object
 * @param {any[]} commands.history the history of commands sent to
 * the client
 */
const initServerEventHandlers = (serverClient, commands) => {
  serverClient.on('data', onServerData(commands));
  serverClient.on('end', onEnd(serverClient));
};

/**
 * Factory for the stdin `data` event handler. The event handler
 * deals with parsing JSON user input and sending it along to the
 * server.
 *
 * @param {net.Socket} serverClient the client object that
 * connects to the server
 * @param {object} commands the client commands object
 * @param {any[]} commands.history the history of commands sent to
 * the client
 * @returns {function} stdin `data` event handler
 */
const onStdinData = (serverClient, commands) => {
  let batchQueue = [];

  /**
   * Helper function to stringify json and send it
   * to the server via the client.
   *
   * @param {any} json the json to stringify
   */
  const sendToServer = json => {
    serverClient.write(JSON.stringify(json));
  };

  return data => {
    const text = data.toString().trim();
    if (text.length > 0) {
      try {
        const json = JSON.parse(text);
        const request = parseUserRequest(json);

        if (request[COMMAND_INDEX] === COMMANDS.ADD) {
          batchQueue.push(request);
          commands.history.push(request);
        } else if (request[COMMAND_INDEX] === COMMANDS.MOVE) {
          batchQueue.push(request);
          commands.history.push(request);
          sendToServer(batchQueue);
          batchQueue = [];
        } else {
          commands.history.push(request);
          sendToServer(request);
        }
      } catch (err) {
        if (err instanceof SyntaxError) {
          return printResponse('not a request', text);
        }
        throw err;
      }
    }
  };
};

/**
 * Intializes the `data` and `end` event handlers for stdin.
 *
 * @param {net.Socket} serverClient the client object that
 * connects to the server
 * @param {object} commands the client commands object
 * @param {any[]} commands.history the history of commands sent to
 * the client
 */
const initStdinEventHandlers = (serverClient, commands) => {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onStdinData(serverClient, commands));
  process.stdin.on('end', onEnd(serverClient));
};

/**
 * Intializes all event handlers for the server and stdin.
 *
 * @param {net.Socket} serverClient the client object that
 * connects to the server
 */
const initEventHandlers = serverClient => {
  const commands = { history: [] };
  initStdinEventHandlers(serverClient, commands);
  initServerEventHandlers(serverClient, commands);
};

module.exports = initEventHandlers;
