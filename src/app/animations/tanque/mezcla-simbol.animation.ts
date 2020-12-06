import { SimbolDrawable } from '../interfaces/simbol-drawable.interface';
import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Simbol } from './simbol.animation';
import { EnumSide } from '../enums/enum-side.enum';
import { Util } from '../util.animation';
import { Rectangle } from '../base/rectangle.animation';
export class MezclaSimbol extends Simbol implements SimbolDrawable {
  constructor(ctx: CanvasRenderingContext2D, dimension: Dimension, color: string = '', colorSimbolContent: string = '',
    private colorAspaLeft: string = '#999', private colorAspaRight: string = '#999', private colorEje: string = '#000' ) {
    super(ctx, dimension, color, colorSimbolContent)
  }
  
  draw(dimension:Dimension) {
    super.dimension = dimension;
    // super.drawContent()
    
    this.drawAspa(this.colorAspaLeft, EnumSide.LEFT)
    this.drawAspa(this.colorAspaRight, EnumSide.RIGHT)
    this.drawEje(this.colorEje);
  }

  private drawAspa(color: string, enumSide: EnumSide) {
    const aspa = new Rectangle(super.ctx);
    const { posX, posY, width, height } = super.dimension
    const { size: width_aspa } = Util.calculateSizePos(width, posX, 25)
    let posX_aspa: number;
    if (enumSide == EnumSide.LEFT) {
      posX_aspa = posX + (width * 0.15)
    } else if (enumSide == EnumSide.RIGHT) {
      posX_aspa = posX + (width - width_aspa - (width * 0.15))
    }
    const { size: height_simbol_content, pos: posY_simbol_content } = Util.calculateSizePos(height, posY, 40)
    const dimension: Dimension = { posX: posX_aspa, posY: posY_simbol_content, width: width_aspa, height: height_simbol_content }
    aspa.color = color;
    aspa.draw(dimension);

  }

  private drawEje(color: string = '') {
    const eje = new Rectangle(super.ctx);
    const { posX, posY, width, height } = super.dimension
    const { posY: posY_original, height: height_original } = super.dimensionOriginal;
    const { size: width_eje, pos: posX_eje } = Util.calculateSizePos(width, posX, 20)
    const { size: height_eje } = Util.calculateSizePos(height_original, posY_original, 70)
    const posY_eje = posY_original;

    const dimension: Dimension = { posX: posX_eje, posY: posY_eje, width: width_eje, height: height_eje }
    eje.color = color;
    eje.draw(dimension);
  }

}