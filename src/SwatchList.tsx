// app state
import { count, selected, hue, sat, lum, setSelected } from "./AppState";

// local imports
import { Swatch } from "./swatch";

// component styles
import style from "./SwatchList.module.css";

let swatchList: Swatch[] = [];
let swatchCount = 10;

// create initial 10 swatches and select the first swatch when app starts
for (let i = 0; i < 10; i++) {
  swatchList.push(new Swatch());
}
setSelected(0, swatchList[0].sHue, swatchList[0].sSat, swatchList[0].sLum);

// add a swatch to the end of the swatch list
function addSwatch() {
  swatchList.push(new Swatch());
  swatchCount++;
  const addPos = swatchCount - 1;
  setSelected(
    addPos,
    swatchList[addPos].sHue,
    swatchList[addPos].sSat,
    swatchList[addPos].sLum
  );
}

// delete the selected swatch from the swatch list
function deleteSwatch(delPos: number) {
  swatchList.splice(delPos, 1);
  swatchCount--;
  let pos = delPos;
  if (pos >= swatchCount) {
    pos = swatchCount - 1;
  }
  setSelected(
    pos,
    swatchList[pos].sHue,
    swatchList[pos].sSat,
    swatchList[pos].sLum
  );
}

let listNum = 0;
export default function SwatchListView() {
  return <div key={`Swatch List ${listNum++}`} class={style.root}>{updateSwatches()}</div>;
}

// call add or delete swatch functions and create swatch squares
function updateSwatches() {
  if (swatchCount < count.value) {
    addSwatch();
  } else if (swatchCount > count.value) {
    deleteSwatch(selected.value);
  }
  return [...swatchList].map((_, i) => <SwatchSquare s={i} />);
}

type sNum = { s: number };

// create swatch squares
function SwatchSquare({ s }: sNum) {
  if (s === selected.value) {
    swatchList[s].sHue = hue.value;
    swatchList[s].sSat = sat.value;
    swatchList[s].sLum = lum.value;
    return (
      <div
        style={{
          background: `hsl(${swatchList[s].sHue},${swatchList[s].sSat}%,${swatchList[s].sLum}%)`,
          border: "2px solid black",
        }}
        onClick={() =>
          setSelected(
            s,
            swatchList[s].sHue,
            swatchList[s].sSat,
            swatchList[s].sLum
          )
        }
      ></div>
    );
  }
  return (
    <div
      style={{
        background: `hsl(${swatchList[s].sHue},${swatchList[s].sSat}%,${swatchList[s].sLum}%)`,
        border: "1px solid lightgrey",
      }}
      onClick={() =>
        setSelected(
          s,
          swatchList[s].sHue,
          swatchList[s].sSat,
          swatchList[s].sLum
        )
      }
    ></div>
  );
}
