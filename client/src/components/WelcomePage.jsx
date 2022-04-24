import { useState } from 'react';

function WelcomePage({ socket }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    setName('');
    socket.emit('playerJoin', name);
  };

  socket.on('invalidName', () => {
    // if the name is invalid
    console.log('Invalid name');
  });

  socket.on('wait', () => {
    console.log('Waiting for other player');
  });

  socket.on('startGame', () => {
    console.log('Game started');
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
    </>
  );
}

export default WelcomePage;
