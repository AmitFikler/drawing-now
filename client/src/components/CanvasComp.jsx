import { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

function CanvasComp({ socket }) {
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState('black');

  const isDrawing = useRef(false);
  const stageRef = useRef(null);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], color }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleSend = () => {
    const uri = stageRef.current.toDataURL();
    socket.emit('sendDraw', { uri });
  };

  return (
    <div className='canvas-div'>
      <span className='input-span'>
        Change your color:{' '}
        <input
          className='inputColor'
          type={'color'}
          onChange={(e) => setColor(e.target.value)}
        />
      </span>
      <Stage
        ref={stageRef}
        className='canvas-stage'
        width={window.innerWidth / 2}
        height={window.innerHeight / 2}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}>
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={5}
              tension={0.5}
              lineCap='round'
            />
          ))}
        </Layer>
      </Stage>
      <div className='btns'>
        <button onClick={() => setLines([])}>Clear</button>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default CanvasComp;
