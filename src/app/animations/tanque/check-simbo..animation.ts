import { Dimension } from './../interfaces/tanqueDimension.interface';
import { SimbolDrawable } from '../interfaces/simbol-drawable.interface';
import { Simbol } from './simbol.animation';
import { Check } from '../base/check.animation';
export class CheckSimbol extends Simbol implements SimbolDrawable {
  constructor(ctx: CanvasRenderingContext2D, dimension: Dimension, color: string = '', colorSimbolContent: string = '', private _colorCheck: string = '') {
    super(ctx, dimension, color, colorSimbolContent)
  }

  set colorCheck(color: string){
    if(color != ''){
      this._colorCheck = color;
    }
  }
  get colorCheck(): string {
    return this._colorCheck;
  }

  draw(dimension:Dimension, colorCheck: string = '') {
    super.dimension = dimension;
    super.drawContent()
    this.colorCheck = colorCheck;
    new Check(super.ctx, super.dimension, this.colorCheck)
  }
}