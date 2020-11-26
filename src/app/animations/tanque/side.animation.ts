import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Util } from '../util.animation';
import { Rectangle } from './../base/rectangle.animation';
export class Side extends Rectangle{

  private _colorFluid: string;

  constructor(ctx: CanvasRenderingContext2D){
    super(ctx);
  }

  set colorFluid(color: string){
    this._colorFluid = color;
  }

  drawFluid(ctx: CanvasRenderingContext2D, color: string = '') {
    if(color != '') {
      this.colorFluid = color;
    }
    const r_fluid = new Rectangle(ctx)
    const { posX, posY, width, height } = this.dimension
    const { size: height_fluid, pos: posY_fluid } = Util.calculateSizePos(height, posY, 80)

    const dimension: Dimension = { posX, posY: posY_fluid, width, height: height_fluid }

    r_fluid.color = this._colorFluid;
    r_fluid.draw(dimension);
  }


}