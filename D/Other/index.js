require('./polyfills');
const getServerClient = require('./getServerClient');
const initEventHandlers = require('./initEventHandlers');
const parseArguments = require('./parseArguments');

/**
 * Parses the arguments from the initial command
 * call, then parses user requests into commands
 * to send to the TCP server.
 */
const main = () => {
  const { ipAddress, port, username } = parseArguments(process.argv);
  getServerClient(ipAddress, port)
    .then(serverClient => {
      initEventHandlers(serverClient);
      serverClient.write(JSON.stringify(username));
    })
    .catch(() => {
      process.exit(1);
    });
};

module.exports = main;
