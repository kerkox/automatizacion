import { Dimension } from '../interfaces/tanqueDimension.interface';

export class Rectangle {

  private _color: string = '#A0A0A0';
  private _dimension:Dimension
  
  get dimension() :Dimension{
    return this._dimension
  }

  set dimension(dimension: Dimension) {
    this._dimension = dimension
  }

  get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }
  
  constructor(private _ctx: CanvasRenderingContext2D, color: string = '') {
    this.color = color;
  }

  draw(dimension:Dimension = null): void{
    this.clear();
    if(dimension != null){
      this.dimension = dimension;
    }
    this.ctx.fillStyle = this._color;
    this.ctx.fillRect(this.dimension.posX, this.dimension.posY, this.dimension.width, this.dimension.height);
  }

  clear(): void{
    if(this.dimension == null) return;
    this.ctx.clearRect(this.dimension.posX, this.dimension.posY, this.dimension.width, this.dimension.height);
  }

  set color(color: string) {
    if(color!= '') {
      this._color = color;      
    }
  }
}