import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import './App.css';
import ChooseWord from './components/ChooseWord';
import Draw from './components/Draw';
import { io } from 'socket.io-client';

import { useEffect, useRef, useState } from 'react';
import WaitingRoom from './components/WaitingRoom';
import GuessRoom from './components/GuessRoom';
function App() {
  const [word, setWord] = useState({ word: '', score: 1 });
  const [waiting, setWaiting] = useState(false);
  const [hiddenWord, setHiddenWord] = useState('');
  const [img, setImg] = useState('');
  const socket = io('http://localhost:3003');

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <WelcomePage
              socket={socket}
              waiting={waiting}
              setImg={setImg}
              setHiddenWord={setHiddenWord}
              setWaiting={setWaiting}
            />
          }
        />
        <Route
          path='/choose'
          element={<ChooseWord word={word} setWord={setWord} socket={socket} />}
        />
        <Route path='/draw' element={<Draw word={word} socket={socket} />} />
        <Route
          path='/guess'
          element={
            <GuessRoom socket={socket} hiddenWord={hiddenWord} img={img} />
          }
        />
        <Route path='/waitingRoom' element={<WaitingRoom socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
