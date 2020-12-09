import { Store } from '@ngrx/store';
import { EnumSide } from '../enums/enum-side.enum';
import { AppState } from '../reducers/animation.reducers';
import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Util } from '../util.animation';
import { Rectangle } from './../base/rectangle.animation';
import { tanque_lleno } from '../actions/tanque.actions';
import { calentar_set, calentarTypes } from '../actions/calentar.actions';
import { pausarTypes } from '../actions/pausado.actions';
export class Calentador {

  private _colorCalentador: string;
  private _colorCoverBase: string;
  private _colorCover: string;
  private _sideLeft: Rectangle;
  private _sideRight: Rectangle;

  private interval: any;

  private _time_remainig: number;

  private _pausado: boolean = true;
  private _onWorking: boolean = false;


  constructor(private store: Store<AppState>, private ctx: CanvasRenderingContext2D, private dimension: Dimension, color: string = "rgba(100,80,60,1)") {
    this.colorCover = color;
    this._colorCoverBase = color;
    this._sideLeft = new Rectangle(this.ctx)
    this._sideRight = new Rectangle(this.ctx)
    this._time_remainig = -1;
    this.interval = -1;

    this.store.select('pausado').subscribe(pausado => {
      switch (pausado) {
        case pausarTypes.pausar:
          console.log(`%c Llega pausar calentar: ${pausado}`, `color:#5cdbff;font-size:14px;`)
          this.pausar();
          break;
        case pausarTypes.continuar:
          console.log(`%c Llega continuar calentar: ${pausado}`, `color:#5cdbff;font-size:14px;`)
          this.continuar();
          break;
      }
    })


  }

  public get onWorking(): boolean {
    return this._onWorking;
  }


  public set onWorking(working: boolean) {
    this._onWorking = working;
    this._pausado = !working;

  }

  set colorFluid(color: string) {
    if (color != '') {
      this._colorCalentador = color;
    }
  }

  get sideLeft() {
    return this._sideLeft;
  }

  get sideRight() {
    return this._sideRight;
  }



  public set colorCover(color: string) {
    if (color != '') {
      this._colorCover = color;
    }
  }


  public get colorCover(): string {
    return this._colorCover;
  }

  draw(dimension: Dimension = null) {
    if (dimension) {
      this.dimension = dimension;
    }
    this.sideLeft.color = this.colorCover
    this.sideLeft.draw(this.getDimensionLeft(this.dimension))
    this.sideRight.color = this.colorCover
    this.sideRight.draw(this.getDimensionRight(this.dimension))
  }

  private pausar() {
    this._pausado = true;
  }

  private continuar() {
    console.log(`Calentador this.onWorking: ${this.onWorking}`)
    if (!this.onWorking) return;
    this._pausado = false;
    this._calentar();
  }

  calentar(seconds: number = 5): Promise<boolean> {
    this.onWorking = true;
    return this._calentar(seconds)
  }

  private _calentar(seconds: number = -1): Promise<boolean> {
    if (!this.onWorking) return;
    console.log("Entro a calentar")
    return new Promise((resolve, reject) => {
      if (seconds != -1) {
        this._time_remainig = seconds * 1000;
        this.onWorking = true;
      }
      let { red, green, blue } = { red: 255, green: 0, blue: 0 }
      const time = 100;
      const green_max = 210;
      let green_incrementor = 10;
      this.interval = setInterval(() => {

        green += green_incrementor
        this.colorCover = `rgba(${red},${green},${blue},1)`
        // console.log(`color: ${this.colorCover}`)
        this.draw(this.dimension)
        if (green >= green_max || green <= 0) {
          green_incrementor *= -1;
        }
        this._time_remainig -= time;
        console.log(`Pausado: ${this._pausado} time remaining: ${this._time_remainig / 1000} sec`)
        if (this._time_remainig <= 0 || this._pausado) {
          console.log(`Se llama a detener Calentar ${this._pausado}`)
          this.detenerCalentar();
          if (!this._pausado) {
            this.onWorking = false;
            console.log(`%c Termino calentar`, "color:rgba(100,50,0,1); font-size:14px")
            this.terminoCalentar()
            resolve(true);
          }
        }
      }, time);
      console.log(`%cCalentar interval:  ${this.interval}`, `color:pink;font-size:24px`)
    });
  }

  private terminoCalentar() {
    this.store.dispatch(calentar_set({ estado: calentarTypes.calentar_fin }));
  }

  detenerCalentar() {
    if (this.interval != -1) {
      console.log(`%cDetener Calentar interval:  ${this.interval}`, `color:pink;font-size:24px`)
      // console.log("Detener Calentar interval: ", this.interval)
      clearInterval(this.interval);
      this.colorCover = this._colorCoverBase;
      this.interval = -1;
      this.draw(this.dimension);
    }
  }

  private getDimensionLeft(dimension: Dimension): Dimension {
    const { width, posX, posY, height } = dimension;
    const width_side = width * 0.1
    const posX_side = posX - width_side;
    const { size: height_fluid } = Util.calculateSizePos(height, posY, 80)
    const posY_side = posY + (height - height_fluid)
    let dimensionLeft: Dimension = { posX: posX_side, width: width_side, posY: posY_side, height: height_fluid }
    return dimensionLeft;
  }
  private getDimensionRight(dimension: Dimension): Dimension {
    const { width, posX, posY, height } = dimension;
    const width_side = width * 0.1
    const posX_side = posX + width;
    const { size: height_fluid } = Util.calculateSizePos(height, posY, 80)
    const posY_side = posY + (height - height_fluid)
    let dimensionLeft: Dimension = { posX: posX_side, width: width_side, posY: posY_side, height: height_fluid }
    return dimensionLeft;
  }




}