const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;
const httpServer = createServer(app);
app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
let chosenWord = {};
let drawingUri = '';
let players = [];
let nowPlaying = 0;
let score = 0;

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
    if (players[nowPlaying]) {
      io.to(players[nowPlaying].id).emit('getDrawFromServer', {
        drawingUri,
        chosenWord,
      });
    }
  });
  socket.on('guessCorrect', () => {
    score += chosenWord.score;
    io.to(players[nowPlaying ? 0 : 1].id).emit('correctAnswer', {
      score,
    });
  });
  socket.on('disconnect', () => {
    players = [];
    score = 0;
    socket.broadcast.emit('userDisconnect');
  });
});

app.use(express.static(path.resolve(__dirname, './client/build')));
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
//deploy

httpServer.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
