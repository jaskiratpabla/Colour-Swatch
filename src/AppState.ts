// preact imports
import { signal } from "@preact/signals";

// state variables
export const count = signal(10);
export const selected = signal(0);
export const hue = signal(0);
export const sat = signal(0);
export const lum = signal(0);

// mutation (increment count of swatches)
export const increment = () => {
  count.value++;
};

// mutation (decrement count of swatches)
export const decrement = () => {
  count.value--;
};

// mutation (update the currently selected 
// swatch and its hue, sat and lum)
export const setSelected = (
  swatchNum: number,
  swatchHue: number,
  swatchSat: number,
  swatchLum: number
) => {
  selected.value = swatchNum;
  hue.value = swatchHue;
  sat.value = swatchSat;
  lum.value = swatchLum;
};
