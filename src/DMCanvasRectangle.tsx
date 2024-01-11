// preact imports
import { useRef, useState, useLayoutEffect } from "preact/hooks";

type CanvasProps = {
  y: number;
  width?: number;
  height?: number;
  callback?: (y: number) => void;
};

export function RectangleGradient({
  y,
  width = 20,
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
    if (callback) callback(e.offsetY);
  };
  */

  const mouseDownHandler = (e: MouseEvent) => {
    if (callback) {
      // send click point to parent
      callback(e.offsetY);
      // set dragging hook to true on mouse down
      setIsDragging(true);
    }
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    // send drag point to parent
    if (isDragging && callback) callback(e.offsetY);
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
    const hueStepDistance = height / 360;
    for (let hueStep = 0; hueStep < 360; ++hueStep) {
      for (let layer = 0; layer < 5; ++layer) {
        // Fill for 5 layers so colours look more defined on hue gradient
        gc.fillStyle = `hsl(${hueStep}, 100%, 50%)`;
        gc.fillRect(0, hueStep * hueStepDistance, width, hueStepDistance);
      }
    }

    // property point
    gc.lineWidth = 1;
    gc.strokeStyle = "black";
    gc.strokeRect(1.5, y - 2.5, width - 3, 5);
    gc.strokeStyle = "white";
    gc.strokeRect(0.5, y - 3.5, width - 1, 7);
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
