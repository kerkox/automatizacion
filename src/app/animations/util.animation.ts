import { SizePos } from './interfaces/sizePos.interface';

export class Util {
  
  static calculateSizePos(size: number, pos: number, percent: number): SizePos {
    const size_calculate = Math.floor(size * (percent / 100))
    const pos_calculate = pos + Math.ceil((size - size_calculate) / 2)
    const sizePos: SizePos = { size: size_calculate, pos: pos_calculate };
    return sizePos
  }
}