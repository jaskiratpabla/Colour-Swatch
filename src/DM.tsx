// app state
import { selected, hue, sat, lum, setSelected } from "./AppState";

// local imports
import { SquareGradient } from "./DMCanvasSquare";
import { RectangleGradient } from "./DMCanvasRectangle";

// component styles
import style from "./DM.module.css";

export default function DMView() {
  const squareGradientHandler = (x: number, y: number) => {
    setSelected(selected.value, hue.value, x / 2, 100 - y / 2);
  };

  const rectangleGradientHandler = (y: number) => {
    setSelected(selected.value, (y / 200) * 360, sat.value, lum.value);
  };

  return (
    <div class={style.root}>
      <div class={style.square}>
        <SquareGradient
          point={{
            x: sat.value * 2,
            y: 200 - lum.value * 2,
          }}
          width={200}
          height={200}
          callback={squareGradientHandler}
        />
      </div>
      <div class={style.rectangle}>
        <RectangleGradient
          y={(hue.value / 360) * 200}
          width={20}
          height={200}
          callback={rectangleGradientHandler}
        />
      </div>
    </div>
  );
}
