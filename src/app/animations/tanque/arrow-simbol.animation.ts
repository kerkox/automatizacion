import { SimbolDrawable } from '../interfaces/simbol-drawable.interface';
import { EnumDirection } from '../enums/enum-direction.enum';
import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Simbol } from './simbol.animation';
import { Arrow } from '../base/arrow.animation';
export class ArrowSimbol extends Simbol implements SimbolDrawable {
  constructor(ctx: CanvasRenderingContext2D, dimension: Dimension, color: string = '', colorSimbolContent: string = '',private direction: EnumDirection,private colorArrow: string = '#FFF') {
    super(ctx,dimension,color,colorSimbolContent)
  }

  draw(){
    super.drawContent()    
    const arrow = new Arrow(super.ctx, this.direction)
    arrow.color = this.colorArrow;
    arrow.draw(super.dimension)
  }
}