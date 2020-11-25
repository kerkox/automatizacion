import { Dimension } from './interfaces/tanqueDimension.interface';

export class Rectangle {

  private _color: string = '#A0A0A0';
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(dimension:Dimension): void{
    this.ctx.fillRect(dimension.posX, dimension.posY, dimension.width, dimension.height);
  }

  set color(color: string) {
    this._color = color;
    this.ctx.fillStyle = this._color;
  }
}