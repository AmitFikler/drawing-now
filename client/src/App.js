import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import './App.css';
import ChooseWord from './components/ChooseWord';
import Draw from './components/Draw';
import { io } from 'socket.io-client';

import { useState } from 'react';
import WaitingRoom from './components/WaitingRoom';
function App() {
  const [word, setWord] = useState('');
  const socket = io('http://localhost:3003');
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomePage socket={socket} />} />
          <Route
            path='/choose'
            element={
              <ChooseWord word={word} setWord={setWord} socket={socket} />
            }
          />
          <Route path='/draw' element={<Draw word={word} socket={socket} />} />
          {/* <Route path='/guess' element={} /> */}
          <Route
            path='/waitingRoom'
            element={<WaitingRoom socket={socket} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
