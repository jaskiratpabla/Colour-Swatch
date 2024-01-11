// app state
import { selected, hue, sat, lum, setSelected } from "./AppState";

// preact imports
import { useEffect, useState } from "preact/hooks";

// local imports
import { hslToRgb, rgbToHsl } from "./colourConversion";

// component styles
import style from "./Form.module.css";

// convert app state Hsl values to Rgb and then to Hex
function getCurrentHex() {
  let rgb = hslToRgb(hue.value, sat.value, lum.value);
  rgb[0] = Math.round(rgb[0]);
  rgb[1] = Math.round(rgb[1]);
  rgb[2] = Math.round(rgb[2]);
  let hexString = "#";
  hexString += rgb[0].toString(16).padStart(2, "0");
  hexString += rgb[1].toString(16).padStart(2, "0");
  hexString += rgb[2].toString(16).padStart(2, "0");
  return hexString;
}

// convert Hex to Rgb and then to Hsl and update app state
function hexToHsl(hexString: string) {
  const r = parseInt(hexString.substring(1, 3), 16);
  const g = parseInt(hexString.substring(3, 5), 16);
  const b = parseInt(hexString.substring(5, 7), 16);
  return rgbToHsl(r, g, b);
}

export function hexDisplay() {
  // local state for the input value
  const [inputValue, setInputValue] = useState(getCurrentHex());

  // update local state when app state changes
  useEffect(() => {
    setInputValue(getCurrentHex());
  }, [getCurrentHex()]);

  // regex validation
  const isValid = (text: string) => /^#[a-fA-F0-9]{6}$/.test(text);

  // handler for input changes
  const handleInput = (e: Event) => {
    const newValue = (e.target as HTMLInputElement).value;
    // Update local state immediately
    setInputValue(newValue);

    // only if valid, update the app state
    if (isValid(newValue)) {
      const hsl = hexToHsl(newValue);
      setSelected(selected.value, hsl[0], hsl[1], hsl[2]);
    }
  };

  return (
    <div key="Hex form" class={style.hex}>
      <input
        type="text"
        id="Hex"
        value={inputValue}
        onInput={handleInput}
        // always leave input field with valid value
        onChange={() => setInputValue(getCurrentHex())}
      />
      {!isValid(inputValue) && <p>Invalid: must be valid hex colour</p>}
    </div>
  );
}
