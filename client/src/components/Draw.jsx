function Draw({ word }) {
  return (
    <>
      <h2>Draw It: {word}</h2>
      <canvas style={{ backgroundColor: 'blue' }}></canvas>
    </>
  );
}

export default Draw;
