// app state
import { count, selected } from "./AppState";

// component styles
import style from "./StatusbarView.module.css";

export default function StatusbarView() {
  return (
    <div class={style.root}>{`${count} swatches (selected #${
      selected.value + 1
    })`}</div>
  );
}
