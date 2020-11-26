import { Arrow } from './arrow.animation';
import { Util } from './util.animation';
import { SizePos } from './interfaces/sizePos.interface';
import { Dimension, TanqueDimension } from './interfaces/tanqueDimension.interface';
import { Rectangle } from './rectangle.animation';
export class Tanque {

  _colorTanque = '#A0A0A0';
  _colorEntradas = '#505050';
  _colorLiquidoA = '#FACB52';
  _colorLiquidoB = '#2D61FA';
  _colorMezcla = '#9CFA20';
  _colorSimboloA = '#8C538B';
  _colorSimboloB = '#BF11BB';
  _colorSimboloC = '#BF9B11';
  _colorSimboloD = '#33FF33'; //verde
  _colorSimboloE = '#FF3333'; //rojo
  _colorSimboloF = '#FFFFFF';

  //varables para el simbolo
  _posXsimbolo = 135;
  _posYsimbolo = 135;
  _anchoSimbolo = 90;
  _altoSimbolo = 90;

  _posX: number = 0;
  _posY: number = 0;
  _size: number = 1;

  _showLeft: boolean = true;
  _showRight: boolean = true;

  _tanqueDimension: TanqueDimension;

  _percentMezcla: number = 100;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.ctx.fillStyle = this._colorTanque; //tanqueprincipal
  }
  /**
   * 
   * @param x position X
   * @param y position X
   * @param size multiplo para el tamaño del tanque
   */
  setPosition(x: number, y: number, size: number = 1) {
    this._posX = x;
    this._posY = y;
    this._size = size;
  }

  set showLeft(show: boolean) {
    this._showLeft = show;
  }

  set showRight(show: boolean) {
    this._showRight = show;
  }

  set percentMezclaValue(percent: number){
    this._percentMezcla = percent;
  }
  get percentMezclaValue(): number {
    return this._percentMezcla;
  }

  draw() {
    this.drawTanqueBase(this._colorTanque)

    // this.ctx.fillRect(34, 87, 100, 38); // left 
    // this.ctx.fillRect(90, 87, 181, 181); // central
    // this.ctx.fillRect(150, 268, 62, 76); // botom
    // this.ctx.fillRect(227, 87, 100, 38); // right
  }

  private drawTanqueBase(color: string) {
    this._tanqueDimension = this.calculatePosAndSizeTanque(this._posX, this._posY, this._size)
    const { left, center, right, bottom } = this._tanqueDimension
    //Taque y bloques de fondo
    this.drawBaseLeft(left, color)
    this.drawBaseRight(right, color);
    this.drawBaseCenter(center, color);
    this.drawBaseBottom(bottom, color);
    
  }

  private drawBaseLeft(left: Dimension, color:string) {
    if (this._showLeft) {
      const r_left = new Rectangle(this.ctx)
      r_left.color = color;
      r_left.draw(left);
    }
  }

  private drawBaseRight(right: Dimension, color: string) {
    if (this._showRight) {
      const r_right = new Rectangle(this.ctx)
      r_right.color = color;
      r_right.draw(right);
    }
  }

  private drawBaseCenter(center: Dimension, color:  string) {
    // console.log("Color para dibujar r_center: ", this.ctx.fillStyle)
    const r_center = new Rectangle(this.ctx)
    r_center.color = color;
    r_center.draw(center);
  }

  private drawBaseBottom(bottom: Dimension, color: string) {
    const r_bottom = new Rectangle(this.ctx)
    r_bottom.color = color;
    r_bottom.draw(bottom);
  }

  private calculatePosAndSizeTanque(x: number, y: number, size: number): TanqueDimension {
    let tanqueDimensions: TanqueDimension;
    const left: Dimension = { posX: x, posY: y, width: 56 * size, height: 38 * size }
    const center: Dimension = { posX: left.posX + left.width, posY: y, width: 180 * size, height: 180 * size }
    const right: Dimension = { posX: center.posX + center.width, posY: y, width: 56 * size, height: 38 * size }
    const bottom: Dimension = { posX: center.posX + (60 * size), posY: center.posY + center.height, width: 60 * size, height: 76 * size }

    tanqueDimensions = { left, center, right, bottom }
    return tanqueDimensions;
  }

  set colorTanque(color: string) {
    this._colorTanque = color;
    this.ctx.fillStyle = this._colorTanque
  }

  llenar() {
    //liquidos y compuerta
    //liquido a la izquierda

    this.leftFluid(this._colorLiquidoA)
    // this.ctx.fillStyle = this._colorLiquidoA;  
    // this.ctx.fillRect(34, 90, 57, 32);


    //liquido a la derecha
    // this.ctx.fillStyle = this._colorLiquidoB;  
    // this.ctx.fillRect(271, 90, 57, 32);
    this.rightFluid(this._colorLiquidoB)

    //Mezcla
    // this.ctx.fillStyle = this._colorMezcla;
    // this.ctx.fillRect(95, 223, 171, 40);
    this.mezcla(this.percentMezclaValue, this._colorMezcla)


    // tapa abajo
    // this.ctx.fillStyle = this._colorEtradas; 
    // this.ctx.fillRect(150, 268, 62, 18);
    this.bottomCover(this._colorEntradas)


    //simbolo
    //Caja simbolo
    // this.ctx.fillStyle = this._colorSimboloA;    
    // this.ctx.fillRect(this._posXsimbolo, this._posYsimbolo, this._anchoSimbolo, this._altoSimbolo);
    this.simbolBox(this._colorSimboloA, this._colorSimboloB, this._colorSimboloF)



    // this.ctx.fillStyle = this._colorSimboloB;    //lo que carga
    // this.ctx.fillRect(this._posXsimbolo + 5, this._posYsimbolo + 5, this._anchoSimbolo - 10, this._altoSimbolo - 10);

    // this.ctx.fillStyle = this._colorSimboloF; //Laflecha
    // this.ctx.fillRect(this._posXsimbolo + 33, this._posYsimbolo + 45, this._anchoSimbolo - 66, this._altoSimbolo - 55);
    // this.ctx.beginPath(); //El trinagulo de arriba
    // let posY = this._posYsimbolo + 45
    // this.ctx.moveTo(this._posXsimbolo + 15, posY);
    // this.ctx.lineTo(this._posXsimbolo + 75, posY);
    // this.ctx.lineTo(this._posXsimbolo + 45, this._posYsimbolo + 10);
    // //c.fillStyle=colorSimboloC;
    // this.ctx.fill();
  }

  private simbolBox(color: string, colorContent: string, colorArrow: string) {
    const { center } = this._tanqueDimension;
    const simbolDimension = this.drawSimbolBox(this.ctx, color, center)
    this.drawSimbolContent(this.ctx, colorContent, simbolDimension)
    this.drawSimbolArrow(this.ctx, colorArrow, simbolDimension)
  }

  private drawSimbolContent(ctx: CanvasRenderingContext2D, color: string, simbolDimension: Dimension) {
    const r_simbol = new Rectangle(ctx);
    const { posX, posY, width, height } = simbolDimension
    const { size: width_simbol_content, pos: posX_simbol_content } = Util.calculateSizePos(width, posX, 95)
    const { size: height_simbol_content, pos: posY_simbol_content } = Util.calculateSizePos(height, posY, 95)
    const dimension: Dimension = { posX: posX_simbol_content, posY: posY_simbol_content, width: width_simbol_content, height: height_simbol_content }
    r_simbol.color = color;
    r_simbol.draw(dimension);
  }

  private drawSimbolArrow(ctx: CanvasRenderingContext2D, color: string, simbolDimension: Dimension) {
    const arrow = new Arrow(ctx)
    arrow.draw(simbolDimension)
  }

  private drawSimbolBox(ctx: CanvasRenderingContext2D, color: string, centerDimension: Dimension): Dimension {
    const r_simbol = new Rectangle(ctx);
    const { posX, posY, width, height } = centerDimension
    const width_simbol = Math.ceil(width / 2);
    const height_simbol = Math.ceil(height / 2);
    const posX_simbol = posX + Math.floor((height - height_simbol) / 2);
    const posY_simbol = posY + Math.floor((width - width_simbol) / 2);
    const dimension: Dimension = { posX: posX_simbol, posY: posY_simbol, width: width_simbol, height: height_simbol }
    r_simbol.color = color;
    r_simbol.draw(dimension);
    return dimension;
  }

  private bottomCover(color: string) {
    // tapa de abajo
    const { bottom } = this._tanqueDimension;
    this.drawBottomCover(this.ctx, color, bottom)
  }

  private drawBottomCover(ctx: CanvasRenderingContext2D, color: string, bottomDimension: Dimension) {

    const r_bottomCover = new Rectangle(ctx);
    r_bottomCover.color = color;
    const { posX, posY, width, height } = bottomDimension
    const dimension: Dimension = { posX, posY, width, height: height * 0.3 }
    r_bottomCover.draw(dimension)

  }

  private leftFluid(color: string) {
    //liquido a la izquierda
    if (!this._showLeft) return;
    const { left } = this._tanqueDimension;
    this.drawFluid(this.ctx, left, color)
  }
  private rightFluid(color: string) {
    //liquido a la derecha
    if (!this._showRight) return;
    const { right } = this._tanqueDimension;
    this.drawFluid(this.ctx, right, color)

  }

  private drawFluid(ctx: CanvasRenderingContext2D, sideFluid: Dimension, color: string) {
    const r_fluid = new Rectangle(ctx)
    const { posX, posY, width, height } = sideFluid
    const { size: height_fluid, pos: posY_fluid } = Util.calculateSizePos(height, posY, 80)

    const dimension: Dimension = { posX, posY: posY_fluid, width, height: height_fluid }

    r_fluid.color = color;
    r_fluid.draw(dimension);
  }


  private mezcla(percent: number, color: string) {
    const { center } = this._tanqueDimension;
    this.drawMezcla(this.ctx, center, percent, color)

  }

  private drawMezcla(ctx: CanvasRenderingContext2D, centerFluid: Dimension, percent: number, color: string) {
    const r_fluidCenter = new Rectangle(ctx)
    const dimension = this.getDimensionByPercentMezcla(centerFluid, percent);
    r_fluidCenter.color = color;
    r_fluidCenter.draw(dimension)
  }

  private getDimensionByPercentMezcla(centerFluid: Dimension, percent: number): Dimension {
    const { posX, posY, width, height } = centerFluid
    const { size: width_mezcla, pos: posX_mezcla } = Util.calculateSizePos(width, posX, 94)

    const height_mezcla = (height * 0.95)
    const height_percent = height_mezcla * (percent / 100)
    const posY_percent = (posY * 1.05) + (height_mezcla - height_percent)
    const dimension: Dimension = { posX: posX_mezcla, posY: posY_percent, width: width_mezcla, height: height_percent }

    return dimension;
  }


  private leftCover(color: string) {
    const { left } = this._tanqueDimension
    this.drawSideCover(this.ctx, color, left, 'LEFT')
  }

  private rightCover(color: string) {
    const { right } = this._tanqueDimension
    this.drawSideCover(this.ctx, color, right, 'RIGHT')
  }

  private drawSideCover(ctx: CanvasRenderingContext2D, color: string, sideDimension: Dimension, side: 'LEFT' | 'RIGHT' ) {

    const r_leftCover = new Rectangle(ctx);
    r_leftCover.color = color;
    const { posX, posY, width, height } = sideDimension
    const width_cover = width * 0.3;
    const posX_cover = posX + ( side == 'LEFT' && width - width_cover)
    const dimension: Dimension = { posX: posX_cover, posY, width: width_cover, height }
    r_leftCover.draw(dimension)

  }
  mezclar() {
    //////////////////////////
    //Segundo this._estado mezclandoce
    //liquidos y compuertas
    this.ctx.fillStyle = this._colorMezcla; //la mescla
    this.ctx.fillRect(95, 128, 171, 133);
    this.ctx.fillStyle = this._colorEntradas; //tapas
    this.ctx.fillRect(150, 268, 62, 18); //abajo


    //derecha
    // this.ctx.fillRect(271, 87, 18, 38); 
    this.rightCover(this._colorEntradas)

    //izquierda
    // this.ctx.fillRect(72, 87, 18, 38); 
    this.leftCover(this._colorEntradas)
    this.bottomCover(this._colorEntradas)
    this.mezcla(this.percentMezclaValue,this._colorMezcla)

    //simbolo
    //simbolo
    this.ctx.fillStyle = this._colorSimboloA;    //Caja simbolo
    this.ctx.fillRect(this._posXsimbolo, this._posYsimbolo, this._anchoSimbolo, this._altoSimbolo);
    this.ctx.fillStyle = this._colorLiquidoA;  //una de las azpas
    this.ctx.fillRect(this._posXsimbolo + 15, this._posYsimbolo + 30, this._anchoSimbolo - 68, this._altoSimbolo - 60);
    this.ctx.fillStyle = this._colorLiquidoB;  //una de las azpas
    this.ctx.fillRect(this._posXsimbolo + 53, this._posYsimbolo + 30, this._anchoSimbolo - 68, this._altoSimbolo - 60);
    this.ctx.fillStyle = this._colorSimboloF;    //eje
    this.ctx.fillRect(this._posXsimbolo + 37, this._posYsimbolo + 5, this._anchoSimbolo - 74, this._altoSimbolo - 10);
  }

  vaciar() {
    //liquidos y compuertas
    this.ctx.fillStyle = this._colorMezcla; //la mescla
    this.ctx.fillRect(95, 128, 171, 133);
    this.ctx.fillRect(155, 261, 52, 83);
    this.ctx.fillStyle = this._colorEntradas; //tapas
    this.ctx.fillRect(271, 87, 18, 38); //derecha
    this.ctx.fillRect(72, 87, 18, 38); //izquierda

    //simbolo
    this.ctx.fillStyle = this._colorSimboloA;    //Caja simbolo
    this.ctx.fillRect(this._posXsimbolo, this._posYsimbolo, this._anchoSimbolo, this._altoSimbolo);
    this.ctx.fillStyle = this._colorSimboloB;    //lo que carga
    this.ctx.fillRect(this._posXsimbolo + 5, this._posYsimbolo + 5, this._anchoSimbolo - 10, this._altoSimbolo - 10);

    this.ctx.fillStyle = this._colorSimboloF; //Laflecha
    this.ctx.fillRect(this._posXsimbolo + 33, this._posYsimbolo + 10, this._anchoSimbolo - 66, this._altoSimbolo - 55);
    this.ctx.beginPath(); //El trinagulo de arriba
    this.ctx.moveTo(this._posXsimbolo + 15, this._posYsimbolo + 45);
    this.ctx.lineTo(this._posXsimbolo + 75, this._posYsimbolo + 45);
    this.ctx.lineTo(this._posXsimbolo + 45, this._posYsimbolo + 80);
    //c.fillStyle=colorSimboloC;
    this.ctx.fill();
  }

  disponible() {
    //simbolo
    this.ctx.fillStyle = this._colorSimboloA;    //Caja simbolo
    this.ctx.fillRect(this._posXsimbolo, this._posYsimbolo, this._anchoSimbolo, this._altoSimbolo);
    this.ctx.fillStyle = this._colorSimboloD;    //lo que carga
    this.ctx.fillRect(this._posXsimbolo + 5, this._posYsimbolo + 5, this._anchoSimbolo - 10, this._altoSimbolo - 10);

    //El visto
    this.ctx.beginPath(); //El visto, cuenta con 7 vertices
    this.ctx.moveTo(this._posXsimbolo + 13, this._posYsimbolo + 45);
    this.ctx.lineTo(this._posXsimbolo + 26, this._posYsimbolo + 32);
    this.ctx.lineTo(this._posXsimbolo + 39, this._posYsimbolo + 45);
    this.ctx.lineTo(this._posXsimbolo + 65, this._posYsimbolo + 19);
    this.ctx.lineTo(this._posXsimbolo + 78, this._posYsimbolo + 32);
    this.ctx.lineTo(this._posXsimbolo + 39, this._posYsimbolo + 71);
    this.ctx.fillStyle = this._colorSimboloF;
    this.ctx.fill();
  }

  noDisponible() {
    //Tapas del tanque
    this.ctx.fillStyle = this._colorEntradas; //tapas
    this.ctx.fillRect(150, 268, 62, 18); //abajo
    this.ctx.fillRect(271, 87, 18, 38); //derecha
    this.ctx.fillRect(72, 87, 18, 38); //izquierda


    //simbolo
    this.ctx.fillStyle = this._colorSimboloA;    //Caja simbolo
    this.ctx.fillRect(this._posXsimbolo, this._posYsimbolo, this._anchoSimbolo, this._altoSimbolo);
    this.ctx.fillStyle = this._colorSimboloE;    //lo que carga
    this.ctx.fillRect(this._posXsimbolo + 5, this._posYsimbolo + 5, this._anchoSimbolo - 10, this._altoSimbolo - 10);

    //la equis
    this.ctx.beginPath(); //la equis cuenta con muchos vertices
    this.ctx.moveTo(this._posXsimbolo + 45, this._posYsimbolo + 32);
    this.ctx.lineTo(this._posXsimbolo + 56, this._posYsimbolo + 19);
    this.ctx.lineTo(this._posXsimbolo + 69, this._posYsimbolo + 32);

    this.ctx.lineTo(this._posXsimbolo + 56, this._posYsimbolo + 45);
    this.ctx.lineTo(this._posXsimbolo + 69, this._posYsimbolo + 56);
    this.ctx.lineTo(this._posXsimbolo + 56, this._posYsimbolo + 69);

    this.ctx.lineTo(this._posXsimbolo + 45, this._posYsimbolo + 56);
    this.ctx.lineTo(this._posXsimbolo + 32, this._posYsimbolo + 69);
    this.ctx.lineTo(this._posXsimbolo + 19, this._posYsimbolo + 56);

    this.ctx.lineTo(this._posXsimbolo + 32, this._posYsimbolo + 45);
    this.ctx.lineTo(this._posXsimbolo + 19, this._posYsimbolo + 32);
    this.ctx.lineTo(this._posXsimbolo + 32, this._posYsimbolo + 19);

    this.ctx.fillStyle = this._colorSimboloF;
    this.ctx.fill();
  }




}