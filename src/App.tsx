// preact imports
import { render } from "preact";

// local imports
import ToolbarView from "./Toolbar";
import DMView from "./DM";
import FormView from "./Form";
import SwatchListView from "./SwatchList";
import StatusbarView from "./StatusbarView";

// global styles (e.g. reset)
import "./style.css";

// component styles
import style from "./App.module.css";

// get ref for node to insert the app
const app = document.querySelector("div#app");
if (!app) throw new Error("no app div");

export default function App() {
  return (
    // app "root"
    <div class={style.root}>
      {/* container */}
      <div class={style.container}>
        {/* views */}
        <ToolbarView />
        <div class={style.panel}>
          {/* editor panel */}
          <DMView />
          <FormView />
        </div>
        <SwatchListView />
        <StatusbarView />
      </div>
    </div>
  );
}

render(<App />, app);
