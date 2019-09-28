const { createServer } = require('net');
const Ref = require('../../../B/Other/Ref');

const onConnection = socket => {
  const input = new Ref();
  socket.on('data', chunk => {
    const text = chunk.toString().trim();
    input.set(input => `${input}${text} `);
  });
  socket.on('end', () => {
    console.log(input.get());
  });
};

const server = createServer(onConnection);

module.exports = server;
