import { Dimension } from './interfaces/tanqueDimension.interface';

export class Rectangle {

  private _color: string = '#A0A0A0';
  constructor(private ctx: CanvasRenderingContext2D) {}

  // draw(x: number, y: number, width: number, height: number): void {
  //   this.ctx.fillStyle = this._color;
  //   this.ctx.fillRect(x, y, width, height);
  // }

  draw(dimension:Dimension): void{
    this.ctx.fillStyle = this._color;
    this.ctx.fillRect(dimension.posX, dimension.posY, dimension.width, dimension.height);
  }

  set color(color: string) {
    this._color = color;
  }
}