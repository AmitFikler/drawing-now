import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage({ socket }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [waiting, setWaiting] = useState(false);

  const handleSubmit = () => {
    setName('');
    socket.emit('playerJoin', name);
  };

  socket.on('invalidName', () => {
    // if the name is invalid
    console.log('Invalid name');
  });

  socket.on('waitForAPlayer', () => {
    setWaiting(true);
  });

  socket.on('startDraw', () => {
    navigate('/choose');
  });
  socket.on('waitingRoom', () => {
    console.log('wait');
    navigate('/waitingRoom');
  });

  return (
    <>
      <h1>Welcome to DRAWING_NOW</h1>
      <h4>Please Enter a username:</h4>
      <input
        type={'text'}
        placeholder='username..'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button onClick={handleSubmit}>Enter</button>
      {waiting && <h2>Waiting for other player..</h2>}
    </>
  );
}

export default WelcomePage;
