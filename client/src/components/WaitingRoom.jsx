import '../style/waitingRoom.css';
import loader from '../style/loader.svg';

function WaitingRoom({ score }) {
  return (
    <div className='waiting-room'>
      <h1>Waiting for the other player to finish drawing</h1>
      <img src={loader} alt='loader' />
      <h2>Your score is: {score}</h2>
    </div>
  );
}

export default WaitingRoom;
