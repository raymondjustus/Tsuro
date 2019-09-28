const { createServer } = require('net');

const server = createServer(socket => {
  socket.write('echo server\n');
  socket.on('data', chunk => {
    socket.write(`USER: ${chunk}`);
  });
  socket.on('end', () => {
    console.log('Goodbye!');
  });
});

module.exports = server;
