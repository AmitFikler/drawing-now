import { useEffect, useState } from 'react';
import { wordList } from '../helpers/wordList';

function ChooseWord() {
  const [word, setWord] = useState('');
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

  const handleStartDrawing = (e) => {
    if (word === '') {
      alert('Please choose a word');
    }
  };

  return (
    <>
      <div className='choose-word'>
        <h3>Choose a word:</h3>
        <ul>
          <li>
            Easy: <button onClick={(e) => setWord(easy)}> {easy}</button>
          </li>
          <li>
            Medium: <button onClick={(e) => setWord(medium)}>{medium}</button>
          </li>
          <li>
            Hard: <button onClick={(e) => setWord(hard)}>{hard}</button>
          </li>
        </ul>

        <h2>{word}</h2>

        <button onClick={handleStartDrawing}>Start Drawing :)</button>
      </div>
    </>
  );
}

export default ChooseWord;
