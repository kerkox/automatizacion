import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Util } from '../util.animation';
import { Rectangle } from './../base/rectangle.animation';
export class Side extends Rectangle{

  private _colorFluid: string;

  constructor(ctx: CanvasRenderingContext2D, dimension: Dimension,color: string = ''){
    super(ctx);
    if(color != '') {
      super.color = color;
    }
    super.draw(dimension)
  }

  set colorFluid(color: string){
    this._colorFluid = color;
  }

  drawFluid(color: string = '') {
    if(color != '') {
      this.colorFluid = color;
    }
    const r_fluid = new Rectangle(super.ctx)
    const { posX, posY, width, height } = this.dimension
    const { size: height_fluid, pos: posY_fluid } = Util.calculateSizePos(height, posY, 80)

    const dimension: Dimension = { posX, posY: posY_fluid, width, height: height_fluid }

    r_fluid.color = this._colorFluid;
    r_fluid.draw(dimension);
  }


}