import { useState } from 'react';
import CanvasComp from './CanvasComp';
import '../style/draw.css';

function Draw({ word, socket }) {
  const [color, setColor] = useState('black');
  return (
    <>
      <h2 className='draw-it'>Draw it: {word.word}</h2>
      <input type={'color'} onChange={(e) => setColor(e.target.value)} />
      <CanvasComp color={color} socket={socket} />
    </>
  );
}

export default Draw;
