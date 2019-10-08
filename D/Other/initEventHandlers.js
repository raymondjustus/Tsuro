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
 * @param {net.Socket} serverClient the client object that
 * connects to the server
 * @returns {function} server `data` event handler
 */
const onServerData = () => {
  let sessionId = null;
  return data => {
    const text = data.toString().trim();
    const json = JSON.parse(text);
    if (!sessionId) {
      sessionId = json;
      return printResponse('this server will call me', sessionId);
    }
    console.log(`SERVER: ${text}`);
  };
};

/**
 * Intializes the `data` and `end` event handlers for the server.
 *
 * @param {net.Socket} serverClient the client object that
 * connects to the server
 */
const initServerEventHandlers = serverClient => {
  serverClient.on('data', onServerData());
  serverClient.on('end', onEnd(serverClient));
};

/**
 * Factory for the stdin `data` event handler. The event handler
 * deals with parsing JSON user input and sending it along to the
 * server.
 *
 * @param {net.Socket} serverClient the client object that
 * connects to the server
 * @returns {function} stdin `data` event handler
 */
const onStdinData = serverClient => data => {
  const text = data.toString().trim();
  try {
    const json = JSON.parse(text);
    console.log(json);
    serverClient.write(text);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return printResponse('not a request', text);
    }
    throw err;
  }
};

/**
 * Intializes the `data` and `end` event handlers for stdin.
 *
 * @param {net.Socket} serverClient the client object that
 * connects to the server
 */
const initStdinEventHandlers = serverClient => {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onStdinData(serverClient));
  process.stdin.on('end', onEnd(serverClient));
};

/**
 * Intializes all event handlers for the server and stdin.
 *
 * @param {net.Socket} serverClient the client object that
 * connects to the server
 */
const initEventHandlers = serverClient => {
  initStdinEventHandlers(serverClient);
  initServerEventHandlers(serverClient);
};

module.exports = initEventHandlers;
