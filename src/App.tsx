import React, { useState } from "react";
import "./App.css";

type TPoint = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [popped, setPopped] = useState<TPoint[]>([]);
  const clickCircleHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    console.log(e);
    setPoints([
      ...points,
      {
        x: clientX,
        y: clientY,
      },
    ]);
  };
  const handleUndo = () => {
    const newPoints = [...points];
    const poppedPoints = newPoints.pop();
    if (!poppedPoints) return;
    setPopped([...popped, poppedPoints]);
    setPoints(newPoints);
  };
  const handleRedo = () => {
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();
    if (!poppedPoint) return;
    setPoints([...points, poppedPoint]);
    setPopped(newPopped);
  };

  return (
    <>
      <h1 style={{ margin: 0 }}>Make Circles</h1>
      <button
        disabled={points.length === 0}
        onClick={handleUndo}
        style={{ padding: 10, margin: 10 }}
      >
        Undo{" "}
      </button>
      <button
        disabled={popped.length === 0}
        onClick={handleRedo}
        style={{ padding: 10, margin: 10 }}
      >
        Redo
      </button>
      <hr />
      <div className="App" onClick={clickCircleHandler}>
        {points.map((point, idx) => (
          <div
            key={idx}
            className="point"
            style={{
              left: point.x - 5 + "px",
              top: point.y - 5 + "px",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
