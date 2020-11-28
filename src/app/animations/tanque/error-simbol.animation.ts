import { ErrorDraw } from './../base/error-draw.animation';
import { SimbolDrawable } from '../interfaces/simbol-drawable.interface';
import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Simbol } from './simbol.animation';

export class ErrorSimbol extends Simbol implements SimbolDrawable {
  constructor(ctx: CanvasRenderingContext2D, dimension: Dimension, color: string = '', colorSimbolContent: string = '', private colorError: string = '') {
    super(ctx, dimension, color, colorSimbolContent)
  }

  draw() {
    super.drawContent()
    new ErrorDraw(this.ctx, super.dimension, this.colorError);
  }
}