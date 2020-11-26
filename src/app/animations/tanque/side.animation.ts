import { EnumSide } from '../enums/enum-side.enum';
import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Util } from '../util.animation';
import { Rectangle } from './../base/rectangle.animation';
export class Side extends Rectangle{

  private _colorFluid: string;
  private _colorCover: string;
  

  constructor(ctx: CanvasRenderingContext2D, dimension: Dimension,private _enumSide:EnumSide,color: string = ''){
    super(ctx);
    if(color != '') {
      super.color = color;
    }
    super.draw(dimension)
  }

  set colorFluid(color: string){
    if (color != '') {
      this._colorFluid = color;
    }    
  }

  get enumSide() {
    return this._enumSide;
  }

  
  public set colorCover(color : string) {
    if (color != '') {
      this._colorCover = color;
    }    
  }

  
  public get colorCover() : string {
    return this._colorCover;
  }
  
  

  drawFluid(color: string = '') {
    this.colorFluid = color;
    const r_fluid = new Rectangle(super.ctx)
    const { posX, posY, width, height } = this.dimension
    const { size: height_fluid, pos: posY_fluid } = Util.calculateSizePos(height, posY, 80)

    const dimension: Dimension = { posX, posY: posY_fluid, width, height: height_fluid }

    r_fluid.color = this._colorFluid;
    r_fluid.draw(dimension);
  }

  drawCover(color: string = '') {
    this.colorCover = color;
    const r_leftCover = new Rectangle(super.ctx);
    r_leftCover.color = this.colorCover;
    const { posX, posY, width, height } = super.dimension
    const width_cover = width * 0.3;
    const posX_cover = posX + (this.enumSide == EnumSide.LEFT && width - width_cover)
    const dimension: Dimension = { posX: posX_cover, posY, width: width_cover, height }
    r_leftCover.draw(dimension)

  }


}