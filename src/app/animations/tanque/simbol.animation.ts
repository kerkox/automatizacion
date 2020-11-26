import { Arrow } from '../base/arrow.animation';
import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Util } from '../util.animation';
import { Rectangle } from './../base/rectangle.animation';

export class Simbol extends Rectangle {
  
  private _colorSimbolBox: string;
  private _colorSimbolContent: string;

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


}