const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3003;
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  // ...
});

httpServer.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
