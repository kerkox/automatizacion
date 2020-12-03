import { EnumSide } from '../enums/enum-side.enum';
import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Util } from '../util.animation';
import { Rectangle } from './../base/rectangle.animation';
export class Calentador {

  private _colorCalentador: string;
  private _colorCover: string;
  private _sideLeft: Rectangle;
  private _sideRight: Rectangle;

  private interval: any;



  constructor(private ctx: CanvasRenderingContext2D, private dimension: Dimension, color: string = "rgba(80,80,80,.8)") {
    this.colorCover = color;
    this._sideLeft = new Rectangle(this.ctx)
    this._sideRight = new Rectangle(this.ctx)
    this.interval = -1;
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
    if(dimension) {
      this.dimension = dimension;
    }
    this.sideLeft.color = this.colorCover
    this.sideLeft.draw(this.getDimensionLeft(this.dimension))
    this.sideRight.color = this.colorCover
    this.sideRight.draw(this.getDimensionRight(this.dimension))
  }

  calentar() {
    let {red, green, blue} = {red: 255,green: 0, blue:0 }
    const time = 100;
    const green_max = 210;
    let green_incrementor = 10;
    this.interval = setInterval(() => {
      green += green_incrementor
      this.colorCover = `rgba(${red},${green},${blue},1)`
      console.log(`color: ${this.colorCover}`)
      this.draw(this.dimension)
      if(green >= green_max || green <= 0) {
        green_incrementor *= -1;
      } 
    }, time);
    // console.log("interval: ", this.interval)
  }

  detenerCalentar() {
    if(this.interval != -1) {
      clearInterval(this.interval);
      this.colorCover = "rgba(80,80,80,.8)";
      this.interval = -1;
      this.draw();
    }
  }

  private getDimensionLeft(dimension: Dimension): Dimension {
    const {width, posX, posY, height } = dimension;
    const width_side = width * 0.1
    const posX_side = posX - width_side;
    const { size: height_fluid } = Util.calculateSizePos(height, posY, 80)
    const posY_side = posY + (height - height_fluid)
    let dimensionLeft: Dimension = { posX: posX_side, width: width_side, posY: posY_side, height: height_fluid}
    return dimensionLeft;
  }
  private getDimensionRight(dimension: Dimension): Dimension {
    const {width, posX, posY, height } = dimension;
    const width_side = width * 0.1
    const posX_side = posX + width ;
    const { size: height_fluid } = Util.calculateSizePos(height, posY, 80)
    const posY_side = posY + (height - height_fluid)
    let dimensionLeft: Dimension = { posX: posX_side, width: width_side, posY: posY_side, height: height_fluid }
    return dimensionLeft;
  }




}