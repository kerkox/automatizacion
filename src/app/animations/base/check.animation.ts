import { Dimension } from '../interfaces/tanqueDimension.interface';

export class Check {
  constructor(private ctx: CanvasRenderingContext2D,private dimension: Dimension, private color:string) { 
    this.draw();
  }

  draw() {
    const {posX, posY, width, height } = this.dimension;
    const size_base = height / 8;
    let posX_check = posX + ( size_base * 1);
    let posY_check = posY + ( size_base * 4);
    
    this.ctx.beginPath();
    // Posicion inicial
    this.ctx.moveTo(posX_check, posY_check);

    // Posicion 1
    posX_check += size_base;
    posY_check -= size_base;
    this.ctx.lineTo(posX_check, posY_check);

    // Posicion 2
    posX_check += size_base;
    posY_check += size_base;
    this.ctx.lineTo(posX_check, posY_check);

    // Posicion 3
    posX_check += (size_base * 3);
    posY_check -= (size_base * 3);
    this.ctx.lineTo(posX_check, posY_check);

    // Posicion 4
    posX_check += size_base;
    posY_check += size_base;
    this.ctx.lineTo(posX_check, posY_check);

    // Posicion 5
    posX_check -= (size_base * 4);
    posY_check += (size_base * 4);
    this.ctx.lineTo(posX_check, posY_check);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

}