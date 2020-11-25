import { Rectangle } from './rectangle.animation';
import { Triangle } from './triangle.animation';
import { Dimension } from './interfaces/tanqueDimension.interface';
import { Util } from './util.animation';

export class Arrow {
  private _color: string = '#ffffff';
  constructor(private ctx: CanvasRenderingContext2D) { }

  draw(dimension: Dimension) {
    const { posX, posY, width, height } = dimension
    const triangle = new Triangle(this.ctx)
    triangle.color = this._color;
    const { size: width_triangle, pos: posX_triangle } = Util.calculateSizePos(width, posX, 50)
    triangle.draw(posX_triangle, posY + (height / 2), width_triangle)
    const base = new Rectangle(this.ctx)
    base.color = this._color;
    const height_base = ((height / 2) * 0.90)
    const { size: width_base, pos: posX_base } = Util.calculateSizePos(width, posX, 30)
    const dimension_base: Dimension = { posX: posX_base, posY: posY + height_base, width: width_base, height: height_base }
    base.draw(dimension_base)
  }

  set color(color: string) {
    this._color = color;
    this.ctx.fillStyle = this._color;
  }
}