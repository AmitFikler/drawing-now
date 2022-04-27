import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wordList } from '../helpers/wordList';

function ChooseWord({ word, setWord, socket }) {
  const navigate = useNavigate(); // hook for navigating to a new page
  const [easy, setEasy] = useState('');
  const [medium, setMedium] = useState('');
  const [hard, setHard] = useState('');

  useEffect(() => {
    setEasy(getRandomWord(wordList.easy));
    setMedium(getRandomWord(wordList.medium));
    setHard(getRandomWord(wordList.hard));
  }, []);

  const getRandomWord = (wordlist) => {
    const randomIndex = Math.floor(Math.random() * wordlist.length);
    return wordlist[randomIndex];
  };

  const handleChooseWord = (e) => {
    if (word === '') {
      alert('Please choose a word');
    } else {
      socket.emit('chooseAWord', word);
      navigate('/draw');
    }
  };

  return (
    <>
      <div className='choose-word'>
        <h3>Choose a word:</h3>
        <ul>
          <li>
            Easy:{' '}
            <button onClick={(e) => setWord({ word: easy, score: 1 })}>
              {' '}
              {easy}
            </button>
          </li>
          <li>
            Medium:{' '}
            <button onClick={(e) => setWord({ word: medium, score: 3 })}>
              {medium}
            </button>
          </li>
          <li>
            Hard:{' '}
            <button onClick={(e) => setWord({ word: hard, score: 5 })}>
              {hard}
            </button>
          </li>
        </ul>

        <h2>{word.word}</h2>

        <button onClick={handleChooseWord}>Start Drawing :)</button>
      </div>
    </>
  );
}

export default ChooseWord;
