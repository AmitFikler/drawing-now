import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/guess.css';

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
    <div className='guess-page'>
      <img className='get-draw' src={img} alt='guess' />
      <div className='guessing'>
        <input
          type={'text'}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button className='btn-guess' onClick={handleGuess}>
          Send
        </button>
      </div>
    </div>
  );
}

export default GuessRoom;
