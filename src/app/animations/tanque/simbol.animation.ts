import { EnumSide } from './../enums/enum-side.enum';
import { Arrow } from '../base/arrow.animation';
import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Util } from '../util.animation';
import { Rectangle } from './../base/rectangle.animation';

export class Simbol extends Rectangle {
  
  private _colorSimbolBox: string;
  private _colorSimbolContent: string = '#8C538B';

  constructor(ctx: CanvasRenderingContext2D, dimension: Dimension, color: string = '') {
    super(ctx);
    if (color != '') {
      super.color = color;
    }
    super.dimension = this.getDimensionFromCenter(dimension)
  }
  
  public get colorSimbolBox() : string {
    return this._colorSimbolBox;
  }
  
  public set colorSimbolBox(color : string) {
    if(color != '') {
      this._colorSimbolBox = color;
    }
  }
  
  public get colorSimbolContent() : string {
    return this._colorSimbolContent;
  }  

  public set colorSimbolContent(color : string) {
    if(color != '') {
      this._colorSimbolContent = color;
    }
  }
  

  drawSimbol() {
    super.draw()    
  }

  getDimensionFromCenter(dimension:Dimension):Dimension {
    const { posX, posY, width, height } = dimension
    const width_simbol = Math.ceil(width / 2);
    const height_simbol = Math.ceil(height / 2);
    const posX_simbol = posX + Math.floor((height - height_simbol) / 2);
    const posY_simbol = posY + Math.floor((width - width_simbol) / 2);
    const dimensionCalculate: Dimension = { posX: posX_simbol, posY: posY_simbol, width: width_simbol, height: height_simbol }
    return dimensionCalculate;
  }

  private drawSimbolContent(color: string = '') {
    this.colorSimbolContent = color;
    const r_simbol = new Rectangle(super.ctx);
    const { posX, posY, width, height } = super.dimension
    const { size: width_simbol_content, pos: posX_simbol_content } = Util.calculateSizePos(width, posX, 95)
    const { size: height_simbol_content, pos: posY_simbol_content } = Util.calculateSizePos(height, posY, 95)
    const dimension: Dimension = { posX: posX_simbol_content, posY: posY_simbol_content, width: width_simbol_content, height: height_simbol_content }
    r_simbol.color = this.colorSimbolContent;
    r_simbol.draw(dimension);
  }

  drawSimbolArrow(colorSimbolContent: string = '', colorArrow: string = '') {
    super.draw()
    this.drawSimbolContent(colorSimbolContent);
    const arrow = new Arrow(super.ctx)
    arrow.color = colorArrow;
    arrow.draw(super.dimension)
  }

  drawSimbolMezclar(colorSimbolContent: string = '', colorAspaLeft: string = '#FACB52', colorAspaRight: string = '#2D61FA', colorEje: string = '#FFF') {
    super.draw();
    colorSimbolContent != null && this.drawSimbolContent(colorSimbolContent);
    this.drawAspa(colorAspaLeft, EnumSide.LEFT)
    this.drawAspa(colorAspaRight, EnumSide.RIGHT)
    this.drawEje(colorEje);
  }

  private drawEje(color: string = ''){
    const eje = new Rectangle(super.ctx);
    const { posX, posY, width, height } = super.dimension
    const { size: width_eje, pos: posX_eje } = Util.calculateSizePos(width, posX, 20)
    const { size: height_eje, pos: posY_eje } = Util.calculateSizePos(height, posY, 90)
    
    const dimension: Dimension = { posX: posX_eje, posY: posY_eje, width: width_eje, height: height_eje }
    eje.color = color;
    eje.draw(dimension);
  }

  private drawAspa(color: string, enumSide: EnumSide) {
    const aspa = new Rectangle(super.ctx);
    const { posX, posY, width, height } = super.dimension
    const { size: width_aspa } = Util.calculateSizePos(width, posX, 25)
    let posX_aspa: number;
    if (enumSide == EnumSide.LEFT){
      posX_aspa = posX + (width * 0.15)
    }else if(enumSide == EnumSide.RIGHT){
      posX_aspa = posX + (width  - width_aspa - (width * 0.15))
    } 
    const { size: height_simbol_content, pos: posY_simbol_content } = Util.calculateSizePos(height, posY, 40)
    const dimension: Dimension = { posX: posX_aspa, posY: posY_simbol_content, width: width_aspa, height: height_simbol_content }
    aspa.color = color;
    aspa.draw(dimension);

  }

  


}