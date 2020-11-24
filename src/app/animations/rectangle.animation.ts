export class Rectangle {

  private _color: string = '#A0A0A0';
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(x: number, y: number, width: number, height: number) {
    this.ctx.fillStyle = this._color;
    this.ctx.fillRect(x, y, width, height);
  }

  set color(color: string) {
    this._color = color;
  }
}