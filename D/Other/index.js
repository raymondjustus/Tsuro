require('./polyfills');
const getServerClient = require('./getServerClient');
const initEventHandlers = require('./initEventHandlers');
const parseArguments = require('./parseArguments');

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
