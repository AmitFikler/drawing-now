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
let chosenWord = {};
let drawingUri = '';
const players = [];
let nowPlaying = 0;

io.on('connection', (socket) => {
  socket.on('playerJoin', ({ name }) => {
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

  socket.on('chooseAWord', ({ word, score }) => {
    chosenWord = { word, score };
  });

  socket.on('sendDraw', ({ uri }) => {
    drawingUri = uri;

    if (nowPlaying === 0) {
      io.to(players[1].id).emit('startGuess');
      io.to(players[0].id).emit('waitingRoom');
      nowPlaying = 1;
    } else {
      io.to(players[0].id).emit('startGuess');
      io.to(players[1].id).emit('waitingRoom');
      nowPlaying = 0;
    }
  });

  socket.on('getDraw', () => {
    io.to(players[nowPlaying].id).emit('getDrawFromServer', {
      drawingUri,
      chosenWord,
    });
  });
  // socket.on('guessCorrect', () => {
  //   score += chosenWord.score;
  //   socket.to(players[playingPlayer ? 0 : 1].id).emit('correctAnswer', {
  //     score,
  //   });
  // });
});

httpServer.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
