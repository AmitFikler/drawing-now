import { useEffect, useState } from 'react';

function GuessRoom({ socket }) {
  const [guess, setGuess] = useState('');
  const [img, setImg] = useState('');
  useEffect(() => {
    socket.emit('getDraw');
  }, []);

  socket.on('getDrawFromServer', ({ drawingUri }) => {
    setImg(drawingUri);
  });

  return (
    <>
      <img src={img} alt='guess' />
    </>
  );
}

export default GuessRoom;
