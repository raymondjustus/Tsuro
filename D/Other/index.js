const getServerClient = require('./getServerClient');
const parseArguments = require('./parseArguments');
const printResponse = require('./printResponse');

const main = () => {
  const { ipAddress, port, username } = parseArguments(process.argv);
  getServerClient(ipAddress, port)
    .then(serverClient => {
      let sessionId = null;

      // Initialize STDIN
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', data => {
        const text = data.toString().trim();
        serverClient.write(text);
      });
      process.stdin.on('end', () => {
        console.log('END OF INPUT');
        serverClient.destroy();
        process.exit(0);
      });

      // Initialize data listener for server
      serverClient.on('data', data => {
        const text = data.toString().trim();
        if (!sessionId) {
          sessionId = JSON.parse(text);
          printResponse('this server will call me', sessionId);
        } else {
          console.log(`SERVER: ${text}`);
        }
      });

      // Register username
      serverClient.write(JSON.stringify(username));
    })
    .catch(() => {
      process.exit(1);
    });
};

module.exports = main;
