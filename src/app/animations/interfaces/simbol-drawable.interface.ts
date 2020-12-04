import { Dimension } from './tanqueDimension.interface';
export interface SimbolDrawable {
  draw(dimension:Dimension, colorSimbol:string):void;
}