import { Dimension } from '../interfaces/tanqueDimension.interface';

export class Rectangle {

  private _color: string = '#A0A0A0';
  _dimension:Dimension

  get dimension() :Dimension{
    return this._dimension
  }
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(dimension:Dimension): void{
    this.clear();
    this._dimension = dimension;
    this.ctx.fillRect(this._dimension.posX, this._dimension.posY, this._dimension.width, this._dimension.height);
  }

  clear(): void{
    if(this._dimension == null) return;
    this.ctx.clearRect(this._dimension.posX, this._dimension.posY, this._dimension.width, this._dimension.height);
  }

  set color(color: string) {
    this._color = color;
    this.ctx.fillStyle = this._color;
  }
}