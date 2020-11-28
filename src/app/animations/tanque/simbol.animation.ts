import { Dimension } from '../interfaces/tanqueDimension.interface';
import { Util } from '../util.animation';
import { Rectangle } from './../base/rectangle.animation';

export class Simbol extends Rectangle {
  
  private _colorSimbolContent: string = '#8C538B';
 
  constructor(ctx: CanvasRenderingContext2D, dimension: Dimension, color: string = '',colorSimbolContent: string = '') {
    super(ctx, color);
    super.dimension = dimension;
    this.colorSimbolContent = colorSimbolContent
  }

  public set dimension(dimension:Dimension) {
    super.dimension = this.getDimensionFromCenter(dimension)
  }

  public get dimension(){
    return super.dimension
  }
  
  public get colorSimbolContent() : string {
    return this._colorSimbolContent;
  }  

  public set colorSimbolContent(color : string) {
    if(color != '') {
      this._colorSimbolContent = color;
    }
  }
  
  drawContent() {
    super.draw()
    this.colorSimbolContent != null && this.drawSimbolContent();
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

  private drawSimbolContent() {
    // this.colorSimbolContent = color;
    const r_simbol = new Rectangle(super.ctx, this.colorSimbolContent);
    const { posX, posY, width, height } = super.dimension
    const { size: width_simbol_content, pos: posX_simbol_content } = Util.calculateSizePos(width, posX, 90)
    const { size: height_simbol_content, pos: posY_simbol_content } = Util.calculateSizePos(height, posY, 90)
    const dimension: Dimension = { posX: posX_simbol_content, posY: posY_simbol_content, width: width_simbol_content, height: height_simbol_content }
    r_simbol.draw(dimension);
  }

  

}