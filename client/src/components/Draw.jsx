import CanvasComp from './CanvasComp';
import '../style/draw.css';

function Draw({ word, socket }) {
  return (
    <div className='draw-page'>
      <h2 className='draw-it'>Draw it: {word.word}</h2>
      <CanvasComp socket={socket} />
    </div>
  );
}

export default Draw;
