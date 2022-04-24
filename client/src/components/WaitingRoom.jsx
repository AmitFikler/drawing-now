import { useNavigate } from 'react-router-dom';

function WaitingRoom({ socket }) {
  const navigate = useNavigate();
  socket.on('guess', () => {
    navigate('/choose');
  });
  return (
    <>
      <div className='waiting-room'>
        <h1>Waiting for the other player to finish drawing</h1>
      </div>
    </>
  );
}

export default WaitingRoom;
