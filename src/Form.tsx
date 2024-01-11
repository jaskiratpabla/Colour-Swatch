// preact imports
import { useState } from "preact/hooks";

// local imports
import { hslDisplay } from "./FormHsl";
import { rgbDisplay } from "./FormRgb";
import { hexDisplay } from "./FormHex";

// component styles
import style from "./Form.module.css";

export default function FormView() {
  const [formMode, setFormMode] = useState(0);
  // formMode = 0 is HSL; formMode = 1 is RGB; formMode = 2 is Hex
  let display = hslDisplay();
  if (formMode === 0) {
    display = hslDisplay();
  } else if (formMode === 1) {
    display = rgbDisplay();
  } else if (formMode === 2) {
    display = hexDisplay();
  }

  return (
    <div class={style.root}>
      <div class={style.form_modes}>
        <div>
          <input
            type="radio"
            id="HSL"
            name="form input mode"
            value="HSL"
            checked={formMode === 0}
            onClick={() => setFormMode(0)}
          ></input>
          <label for="HSL">HSL</label>
        </div>
        <div>
          <input
            type="radio"
            id="RGB"
            name="form input mode"
            value="RGB"
            onClick={() => setFormMode(1)}
          ></input>
          <label for="RGB">RGB</label>
        </div>
        <div>
          <input
            type="radio"
            id="HEX"
            name="form input mode"
            value="Hex"
            onClick={() => setFormMode(2)}
          ></input>
          <label for="HEX">Hex</label>
        </div>
      </div>
      <div>{display}</div>
    </div>
  );
}
