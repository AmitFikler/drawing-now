const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3003;
const httpServer = createServer(app);
const io = new Server(httpServer);
let ChosenWord = ''; //
const players = [];

io.on('connection', (socket) => {
  socket.on('playerJoin', (name) => {
    if (players.includes(name)) {
      socket.emit('invalidName');
    } else {
      players.push(name);
    }
    if (players.length === 1) {
      socket.emit('wait');
    }

    if (players.length === 2) {
      socket.emit('startGame');
    }
  });

  socket.on('chooseAWord', (word) => {
    ChosenWord = word;
  });
});

httpServer.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
