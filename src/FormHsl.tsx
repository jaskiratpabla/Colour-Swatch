// app state
import { selected, hue, sat, lum, setSelected } from "./AppState";

// component styles
import style from "./Form.module.css";

// filter Hsl textfields and update app state
function filterHsl(e: Event, component: number, maxValue: number) {
  const tf = e.target as HTMLInputElement;
  tf.value = tf.value.replace(/[^0-9]/g, "");

  if (tf.value === "") {
    tf.value = "0";
  } else if (parseFloat(tf.value) > maxValue) {
    tf.value = maxValue.toString();
  }

  if (component === 0) {
    return setSelected(selected.value, parseFloat(tf.value), sat.value, lum.value);
  }
  if (component === 1) {
    return setSelected(selected.value, hue.value, parseFloat(tf.value), lum.value);
  }
  return setSelected(selected.value, hue.value, sat.value, parseFloat(tf.value));
}

// retrieve Hsl slider values and update app state
function sliderHsl(e: Event, component: number) {
  const slider = e.target as HTMLInputElement;
  if (component === 0) {
    return setSelected(selected.value, parseFloat(slider.value), sat.value, lum.value);
  }
  if (component === 1) {
    return setSelected(selected.value, hue.value, parseFloat(slider.value), lum.value);
  }
  return setSelected(selected.value, hue.value, sat.value, parseFloat(slider.value));
}

export function hslDisplay() {
  return (
    <div key="HSL form" class={style.container}>
      <div class={style.hsl_rgb}>
        <label for="Hue">Hue</label>
        <input
          type="number"
          id="Hue"
          value={Math.round(hue.value)}
          min="0"
          max="360"
          onInput={(e: Event) => filterHsl(e, 0, 360)}
        />
        <input
          type="range"
          value={Math.round(hue.value)}
          min="0"
          max="360"
          onInput={(e: Event) => sliderHsl(e, 0)}
        />
      </div>
      <div class={style.hsl_rgb}>
        <label for="Sat">Sat</label>
        <input
          type="number"
          id="Sat"
          value={Math.round(sat.value)}
          min="0"
          max="100"
          onInput={(e: Event) => filterHsl(e, 1, 100)}
        />
        <input
          type="range"
          value={Math.round(sat.value)}
          min="0"
          max="100"
          onInput={(e: Event) => sliderHsl(e, 1)}
        />
      </div>
      <div class={style.hsl_rgb}>
        <label for="Lum">Lum</label>
        <input
          type="number"
          id="Lum"
          value={Math.round(lum.value)}
          min="0"
          max="100"
          onInput={(e: Event) => filterHsl(e, 2, 100)}
        />
        <input
          type="range"
          value={Math.round(lum.value)}
          min="0"
          max="100"
          onInput={(e: Event) => sliderHsl(e, 2)}
        />
      </div>
    </div>
  );
}
