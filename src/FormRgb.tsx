// app state
import { selected, hue, sat, lum, setSelected } from "./AppState";

// local imports
import { hslToRgb, rgbToHsl } from "./colourConversion";

// component styles
import style from "./Form.module.css";

// filter Rgb textfields and update app state
function filterRgb(e: Event, component: number) {
  const tf = e.target as HTMLInputElement;
  tf.value = tf.value.replace(/[^0-9]/g, "");

  if (tf.value === "") {
    tf.value = "0";
  } else if (parseFloat(tf.value) > 255) {
    tf.value = "255";
  }
  const rgb = hslToRgb(hue.value, sat.value, lum.value);
  const newComponent = parseInt(tf.value);

  let hsl: number[] = [];
  if (component === 0) {
    hsl = rgbToHsl(newComponent, rgb[1], rgb[2]);
  } else if (component === 1) {
    hsl = rgbToHsl(rgb[0], newComponent, rgb[2]);
  } else {
    hsl = rgbToHsl(rgb[0], rgb[1], newComponent);
  }
  return setSelected(selected.value, hsl[0], hsl[1], hsl[2]);
}

// retrieve Rgb slider values and update app state
function sliderRgb(e: Event, component: number) {
  const slider = e.target as HTMLInputElement;
  const rgb = hslToRgb(hue.value, sat.value, lum.value);
  const newComponent = parseFloat(slider.value);

  let hsl: number[] = [];
  if (component === 0) {
    hsl = rgbToHsl(newComponent, rgb[1], rgb[2]);
  } else if (component === 1) {
    hsl = rgbToHsl(rgb[0], newComponent, rgb[2]);
  } else {
    hsl = rgbToHsl(rgb[0], rgb[1], newComponent);
  }
  return setSelected(selected.value, hsl[0], hsl[1], hsl[2]);
}

export function rgbDisplay() {
  const rgb = hslToRgb(hue.value, sat.value, lum.value);
  return (
    <div key="RGB form" class={style.container}>
      <div class={style.hsl_rgb}>
        <label for="R">R</label>
        <input
          type="number"
          id="R"
          value={Math.round(rgb[0])}
          min="0"
          max="255"
          onInput={(e: Event) => filterRgb(e, 0)}
        />
        <input
          type="range"
          value={Math.round(rgb[0])}
          min="0"
          max="255"
          onInput={(e: Event) => sliderRgb(e, 0)}
        />
      </div>
      <div class={style.hsl_rgb}>
        <label for="G">G</label>
        <input
          type="number"
          id="G"
          value={Math.round(rgb[1])}
          min="0"
          max="255"
          onInput={(e: Event) => filterRgb(e, 1)}
        />
        <input
          type="range"
          value={Math.round(rgb[1])}
          min="0"
          max="255"
          onInput={(e: Event) => sliderRgb(e, 1)}
        />
      </div>
      <div class={style.hsl_rgb}>
        <label for="B">B</label>
        <input
          type="number"
          id="B"
          value={Math.round(rgb[2])}
          min="0"
          max="255"
          onInput={(e: Event) => filterRgb(e, 2)}
        />
        <input
          type="range"
          value={Math.round(rgb[2])}
          min="0"
          max="255"
          onInput={(e: Event) => sliderRgb(e, 2)}
        />
      </div>
    </div>
  );
}
