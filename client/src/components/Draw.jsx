import { useState } from 'react';
import CanvasComp from './CanvasComp';

function Draw({ word, socket }) {
  const [color, setColor] = useState('black');
  return (
    <>
      <h2>Draw it: {word}</h2>
      <input type={'color'} onChange={(e) => setColor(e.target.value)} />
      <CanvasComp color={color} socket={socket} />
    </>
  );
}

export default Draw;
