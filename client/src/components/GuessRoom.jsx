import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GuessRoom({ socket, hiddenWord, img }) {
  const [guess, setGuess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('getDraw');
  }, []);

  const handleGuess = () => {
    console.log(hiddenWord.word);
    if (guess.toLowerCase() === hiddenWord.word.toLowerCase()) {
      console.log('trueeee');
      socket.emit('guessCorrect');
      navigate('/choose');
    }
    setGuess('');
  };

  return (
    <>
      <img src={img} alt='guess' />
      <input
        type={'text'}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={handleGuess}>Send</button>
    </>
  );
}

export default GuessRoom;
