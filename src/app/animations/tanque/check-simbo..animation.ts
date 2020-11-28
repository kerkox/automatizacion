import { Dimension } from './../interfaces/tanqueDimension.interface';
import { SimbolDrawable } from '../interfaces/simbol-drawable.interface';
import { Simbol } from './simbol.animation';
import { Check } from '../base/check.animation';
export class CheckSimbol extends Simbol implements SimbolDrawable {
  constructor(ctx: CanvasRenderingContext2D, dimension: Dimension, color: string = '', colorSimbolContent: string = '', private colorCheck: string = '') {
    super(ctx, dimension, color, colorSimbolContent)
  }

  draw(dimension:Dimension) {
    super.dimension = dimension;
    super.drawContent()
    new Check(super.ctx, super.dimension, this.colorCheck)
  }
}