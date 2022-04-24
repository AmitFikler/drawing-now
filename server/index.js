const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const PORT = 3003;
const httpServer = createServer(app);
app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
let ChosenWord = '';
let drawing = '';
const players = [];

io.on('connection', (socket) => {
  socket.on('playerJoin', (name) => {
    if (players.includes(name) || !name) {
      socket.emit('invalidName');
    } else {
      players.push({ name, id: socket.id });
    }
    if (players.length === 1) {
      socket.emit('waitForAPlayer');
    }

    if (players.length === 2) {
      io.to(players[0].id).emit('startDraw');
      io.to(players[1].id).emit('waitingRoom');
    }
  });

  socket.on('chooseAWord', (word) => {
    ChosenWord = word;
  });

  socket.on('sendDraw', (uri) => {
    drawing = uri;
  });
});

httpServer.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
