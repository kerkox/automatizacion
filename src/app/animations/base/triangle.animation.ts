export class Triangle {
  private _color: string = '#ffffff';
  constructor(private ctx: CanvasRenderingContext2D) { }

  draw(posX:number,posY:number, size:number) {
    this.ctx.beginPath();
    this.ctx.moveTo(posX, posY);
    this.ctx.lineTo(posX + size, posY);
    const posX_top = posX + (size / 2)
    // console.log("size: ", size)
    const altura = ((Math.sqrt(3) / 2) * size)
    // console.log("altura: ", altura)
    let posY_top = posY - (altura * 0.7)    
    // console.log(`posY: ${posY}, posY_top: ${posY_top}`)
    this.ctx.lineTo(posX_top, posY_top);
    this.ctx.fill();
  }

  set color(color: string) {
    this._color = color;
    this.ctx.fillStyle = this._color;
  }
}