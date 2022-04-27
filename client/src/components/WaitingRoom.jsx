function WaitingRoom({ score }) {
  return (
    <>
      <div className='waiting-room'>
        <h1>Waiting for the other player to finish drawing</h1>
        <h2>Your score is: {score}</h2>
      </div>
    </>
  );
}

export default WaitingRoom;
