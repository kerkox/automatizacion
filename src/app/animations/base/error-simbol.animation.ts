import { Dimension } from '../interfaces/tanqueDimension.interface';

export class ErrorSimbol {
  constructor(private ctx: CanvasRenderingContext2D, private dimension: Dimension, private color: string) {
    this.draw();
  }

  draw() {
    const { posX, posY, width, height } = this.dimension;
    const size_base = height / 8; // Grilla de 8 x 8
    // posiciones en la grilla
    const points: { x: number, y: number }[] = [
      { x:2, y:3 }, // 1
      { x:3, y:2 }, // 2
      { x:4, y:3 }, // 3 
      { x:5, y:2 }, // 4
      { x:6, y:3 }, // 5
      { x:5, y:4 }, // 6
      { x:6, y:5 }, // 7
      { x:5, y:6 }, // 8
      { x:4, y:5 }, // 9
      { x:3, y:6 }, // 10
      { x:2, y:5 }, // 11
      { x:3, y:4 }, // 12
    ]
    // |0|1|2|3|4|5|6|7|8|
    // |1| | | | | | | | |
    // |2| | |.| |.| | | |
    // |3| |.| |.| |.| | |
    // |4| | |.| |.| | | |
    // |5| |.| |.| |.| | |
    // |6| | |.| |.| | | |
    // |7| | | | | | | | |
    // |8| | | | | | | | |
    
    let posX_check: number;
    let posY_check:number;

    this.ctx.beginPath();
    // Posicion inicial
    this.ctx.moveTo(posX_check, posY_check);
    console.log(`inicial posX: ${posX_check} posY: ${posY_check}`)
    // Posiciones
    for(let pos of points){
      posX_check = posX + (pos.x * size_base)
      posY_check = posY + (pos.y * size_base)
      this.ctx.lineTo(posX_check, posY_check);
      
    }

    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

}