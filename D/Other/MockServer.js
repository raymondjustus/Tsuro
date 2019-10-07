#!/usr/bin/env node

const { createServer } = require('net');

const server = createServer(client => {
  client.write('hello!');
  client.pipe(client);
});

server.listen(8000, '127.0.0.1');
