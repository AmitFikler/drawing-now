import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/welcome.css';

function WelcomePage({
  socket,
  waiting,
  setImg,
  setHiddenWord,
  setWaiting,
  setScore,
}) {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = () => {
    setName('');
    socket?.emit('playerJoin', { name });
  };
  useEffect(() => {
    if (socket) {
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
        navigate('/waitingRoom');
      });
      socket.on('startGuess', (param) => {
        console.log(param);
        navigate('/guess');
      });
      socket.on('getDrawFromServer', ({ drawingUri, chosenWord }) => {
        setImg(drawingUri);
        setHiddenWord(chosenWord);
      });
      socket.on('correctAnswer', ({ score }) => {
        setScore(score);
      });
    }
  }, [socket]);

  return (
    <div className='welcome'>
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
    </div>
  );
}

export default WelcomePage;
