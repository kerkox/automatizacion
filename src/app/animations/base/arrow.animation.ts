import { EnumDirection } from './../enums/enum-direction.enum';
import { Rectangle } from './rectangle.animation';
import { Triangle } from './triangle.animation';
import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Util } from '../util.animation';

export class Arrow {
  private _color: string = '#ffffff';
  constructor(private ctx: CanvasRenderingContext2D, private direction: EnumDirection) { }

  draw(dimension: Dimension) {
    this.drawTriangle(dimension);
    this.drawBase(dimension);
  }

  private drawTriangle(dimension:Dimension){
    const { posX, posY, width, height } = dimension
    const triangle = new Triangle(this.ctx)
    triangle.color = this.color;
    const { size: width_triangle, pos: posX_triangle } = Util.calculateSizePos(width, posX, 70)
    triangle.draw(this.direction,posX_triangle, posY + (height / 2), width_triangle)
  }

  private drawBase(dimension:Dimension) {
    const { posX, posY, width, height } = dimension
    const base = new Rectangle(this.ctx)
    base.color = this.color;
    const height_base = ((height / 2) * 0.85)
    const { size: width_base, pos: posX_base } = Util.calculateSizePos(width, posX, 30)
    let posY_base = posY + (height / 2) - height_base
    if(this.direction == EnumDirection.UP){
      posY_base = posY + height_base
    } 
    const dimension_base: Dimension = { posX: posX_base, posY: posY_base, width: width_base, height: height_base }
    base.draw(dimension_base)
  }

  set color(color: string) {
    if(color != ''){
      this._color = color;
    }    
  }

  get color(): string {
    return this._color;
  }
}