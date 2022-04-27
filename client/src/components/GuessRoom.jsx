import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function GuessRoom({ socket, hiddenWord, img }) {
  const [guess, setGuess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('getDraw');
  }, []);

  const handleGuess = () => {
    if (guess.toLowerCase() === hiddenWord.word.toLowerCase()) {
      socket.emit('guessCorrect');
      navigate('/choose');
    } else {
      toast.error('Wrong guess!');
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
