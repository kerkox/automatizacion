import { Dimension } from './../interfaces/tanqueDimension.interface';
import { ErrorDraw } from './../base/error-draw.animation';
import { SimbolDrawable } from '../interfaces/simbol-drawable.interface';
import { Simbol } from './simbol.animation';

export class ErrorSimbol extends Simbol implements SimbolDrawable {
  constructor(ctx: CanvasRenderingContext2D, dimension: Dimension, color: string = '', colorSimbolContent: string = '', private _colorError: string = '') {
    super(ctx, dimension, color, colorSimbolContent)
  }
  set colorError(color: string) {
    if (color != '') {
      this._colorError = color;
    }
  }
  get colorError(): string {
    return this._colorError;
  }

  draw(dimension: Dimension, colorError: string = '') {
    super.dimension = dimension;
    super.drawContent()
    this.colorError = colorError;
    new ErrorDraw(this.ctx, super.dimension, this.colorError);
  }
}