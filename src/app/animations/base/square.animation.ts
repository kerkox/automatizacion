export class Square {
  constructor(private ctx: CanvasRenderingContext2D) { }

  draw(x: number, y: number, z: number) {
    this.ctx.fillRect(x*2, y*2, z, z);
  }

  move(y: number, z: number) {
    const max = this.ctx.canvas.width -1;
    const canvas = this.ctx.canvas;
    let x = 0;
    const i = setInterval(() => {
      // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.draw(x, y, z);
      x++;
      if (x >= max) {
        clearInterval(i);
      }
    }, 5);
  }
}