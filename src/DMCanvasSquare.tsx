// app state
import { hue } from "./AppState";

// preact imports
import { useRef, useState, useLayoutEffect } from "preact/hooks";

type CanvasProps = {
  point: { x: number; y: number };
  width?: number;
  height?: number;
  callback?: (x: number, y: number) => void;
};

export function SquareGradient({
  point,
  width = 200,
  height = 200,
  callback,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // clickHandler no longer needed as mouse down event handler
  // used for dragging takes care of updating on mouse down event
  /* 
  const clickHandler = (e: MouseEvent) => {
    // send click point to parent
    if (callback) callback(e.offsetX, e.offsetY);
  };
  */

  const mouseDownHandler = (e: MouseEvent) => {
    if (callback) {
      // send click point to parent
      callback(e.offsetX, e.offsetY);
      // set dragging hook to true on mouse down
      setIsDragging(true);
    }
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    // send drag point to parent
    if (isDragging && callback) callback(e.offsetX, e.offsetY);
  };

  const mouseUpHandler = () => {
    // set dragging hook to false on mouse up
    setIsDragging(false);
  };

  const mouseLeaveHandler = () => {
    // set dragging hook to false on mouse leave
    setIsDragging(false);
  };

  // drawing
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) draw(gc);
  });

  function draw(gc: CanvasRenderingContext2D) {
    gc.clearRect(0, 0, width, height);
    const satStepDistance = width / 100;
    const lumStepDistance = height / 100;

    for (let satStep = 0; satStep < 100; ++satStep) {
      for (let lumStep = 0; lumStep < 100; ++lumStep) {
        gc.fillStyle = `hsl(${hue.value}, ${satStep}%, ${100 - lumStep}%)`;
        gc.fillRect(
          satStep * satStepDistance,
          lumStep * lumStepDistance,
          satStepDistance,
          lumStepDistance
        );
      }
    }

    // property point
    gc.lineWidth = 1;
    gc.strokeStyle = "black";
    gc.beginPath();
    gc.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    gc.stroke();
    gc.strokeStyle = "white";
    gc.beginPath();
    gc.arc(point.x, point.y, 6, 0, 2 * Math.PI);
    gc.stroke();
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseLeaveHandler}
    />
  );
}
