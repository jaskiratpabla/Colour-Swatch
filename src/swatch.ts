export class Swatch {
  sHue: number;
  sSat: number;
  sLum: number;

  constructor() {
    this.sHue = Math.random() * 360;
    this.sSat = Math.random() * 100;
    this.sLum = Math.random() * 100;
  }
}
