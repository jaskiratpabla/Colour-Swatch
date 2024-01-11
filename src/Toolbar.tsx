// app state
import { count, increment, decrement } from "./AppState";

// component styles
import style from "./Toolbar.module.css";

export default function ToolbarView() {
  return (
    <div class={style.root}>
      <button
        onClick={() => {
          if (count.value < 16) {
            increment();
          }
        }}
        disabled={count.value === 16}
      >
        Add
      </button>
      <button
        onClick={() => {
          if (count.value > 1) {
            decrement();
          }
        }}
        disabled={count.value === 1}
      >
        Delete
      </button>
    </div>
  );
}
