import { EnumDirection } from './../enums/enum-direction.enum';
import { Simbol } from './simbol.animation';
import { EnumSide } from './../enums/enum-side.enum';
import { Side } from './side.animation';
import { Arrow } from '../base/arrow.animation';
import { Util } from '../util.animation';
import { SizePos } from '../interfaces/sizePos.interface';
import { Dimension, TanqueDimension } from '../interfaces/tanqueDimension.interface';
import { Rectangle } from '../base/rectangle.animation';
export class Tanque {

  private _colorTanque = '#A0A0A0';
  private _colorEntradas = '#505050';
  private _colorLiquidoA = '#FACB52';
  private _colorLiquidoB = '#2D61FA';
  private _colorMezcla = '#9CFA20';
  private _colorSimboloA = '#8C538B';
  private _colorSimboloB = '#BF11BB';
  private _colorSimboloC = '#BF9B11';
  private _colorSimboloD = '#33FF33'; //verde
  private _colorSimboloE = '#FF3333'; //rojo
  private _colorSimboloF = '#FFFFFF';

  //varables para el simbolo
  private _posXsimbolo = 135;
  private _posYsimbolo = 135;
  private _anchoSimbolo = 90;
  private _altoSimbolo = 90;

  private _posX: number = 0;
  private _posY: number = 0;
  private _size: number = 1;

  private _showLeft: boolean = true;
  private _showRight: boolean = true;

  private _tanqueDimension: TanqueDimension;

  private _percentMezcla: number = 100;
  private _mezcla: Rectangle;

  private _sideRight: Side;
  private _sideLeft: Side;


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

  set colorTanque(color: string) {
    this._colorTanque = color;
    this.ctx.fillStyle = this._colorTanque
  }

  get sideRight() : Side{
    return this._sideRight;
  }

  get sideLeft(): Side {
    return this._sideLeft;
  }

  set sideRight(side: Side){
    this._sideRight  = side;
  }

  set sideLeft(side: Side){
    this._sideLeft = side;
  }

  get mezcla(): Rectangle {
    if(this._mezcla == null){
      this._mezcla = new Rectangle(this.ctx)
    }
    return this._mezcla
  }

  get tanqueDimension() : TanqueDimension{
    if(this._tanqueDimension == null) {
      this._tanqueDimension = this.calculatePosAndSizeTanque(this._posX, this._posY, this._size)
    }
    return this._tanqueDimension;
  }

  set showLeft(show: boolean) {
    this._showLeft = show;
  }
  get showLeft() {
    return this._showLeft;
  }

  set showRight(show: boolean) {
    this._showRight = show;
  }
  get showRight() {
    return this._showRight;
  }

  set percentMezclaValue(percent: number){
    this._percentMezcla = percent;
  }
  get percentMezclaValue(): number {
    return this._percentMezcla;
  }

  draw() {
    this.showTanqueBase();

    // this.ctx.fillRect(34, 87, 100, 38); // left 
    // this.ctx.fillRect(90, 87, 181, 181); // central
    // this.ctx.fillRect(150, 268, 62, 76); // botom
    // this.ctx.fillRect(227, 87, 100, 38); // right
  }

  vaciarMezcla(percentUntil:number = 5){
    if(this.percentMezclaValue <= percentUntil) return;

    const i = setInterval(() => {
      // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.percentMezclaValue -= 1;
      console.log("this.percentMezclaValue: ", this.percentMezclaValue)
      this.showMezcla()
      if (this.percentMezclaValue == percentUntil) {
        clearInterval(i);
      }
    }, 200);

    
  }

  private showTanqueBase() {
    this.drawTanqueBase(this._colorTanque)
  }

  private drawTanqueBase(color: string) {
    
    const { left, center, right, bottom } = this.tanqueDimension
    //Taque y bloques de fondo
    this.drawBaseLeft(color)
    this.drawBaseRight(color);
    
    
    this.drawBaseCenter(center, color);
    this.drawBaseBottom(bottom, color);
    
  }

  private drawBaseLeft(color:string = '') {
    if (this._showLeft) {
      if(this.sideLeft == null){
        const { left } = this.tanqueDimension
        this.sideLeft = new Side(this.ctx, left, EnumSide.LEFT,color)  
      }      
    } 
  }

  private drawBaseRight(color: string = '') {
    if (this._showRight) {
      if (this.sideRight == null) {
        const { right } = this.tanqueDimension
        this.sideRight = new Side(this.ctx, right, EnumSide.RIGHT,color)
      }  
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
    this.showMezcla()


    // tapa abajo
    // this.ctx.fillStyle = this._colorEtradas; 
    // this.ctx.fillRect(150, 268, 62, 18);
    this.bottomCover(this._colorEntradas)


    //simbolo
    //Caja simbolo
    // this.ctx.fillStyle = this._colorSimboloA;    
    // this.ctx.fillRect(this._posXsimbolo, this._posYsimbolo, this._anchoSimbolo, this._altoSimbolo);
    this.simbolArrow(EnumDirection.UP,this._colorSimboloA, this._colorSimboloB, this._colorSimboloF)



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

  private simbolArrow(enumDirection:EnumDirection, color: string, colorContent: string, colorArrow: string) {
    const { center } = this.tanqueDimension;
    const simbol = new Simbol(this.ctx,center,color);
    simbol.drawSimbolArrow(enumDirection,colorContent);
  }

  private bottomCover(color: string) {
    // tapa de abajo
    const { bottom } = this.tanqueDimension;
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
    this.sideLeft.drawFluid(color)    
  }
  private rightFluid(color: string) {
    //liquido a la derecha
    if (!this._showRight) return;
    this.sideRight.drawFluid(color)
  }



  private showMezcla() {
    const { center } = this.tanqueDimension;
    this.drawMezcla(this.ctx, center, this.percentMezclaValue, this._colorMezcla)
  }

  private drawMezcla(ctx: CanvasRenderingContext2D, centerFluid: Dimension, percent: number, color: string) {
    const dimension = this.getDimensionByPercentMezcla(centerFluid, percent);
    this.mezcla.color = color;
    this.mezcla.draw(dimension)
  }

  private getDimensionByPercentMezcla(centerFluid: Dimension, percent: number): Dimension {
    const { posX, posY, width, height } = centerFluid
    const { size: width_mezcla, pos: posX_mezcla } = Util.calculateSizePos(width, posX, 94)
    const {size: height_mezcla, pos: posY_mezcla } = Util.calculateSizePos(height, posY, 94)
    const height_percent = height_mezcla * (percent / 100)
    const posY_percent = posY_mezcla + (height_mezcla - height_percent)
    const dimension: Dimension = { posX: posX_mezcla, posY: posY_percent, width: width_mezcla, height: height_percent }

    return dimension;
  }


  private leftCover(color: string) {
    if(this.showLeft) {
      this.sideLeft.drawCover(color);
    }    
  }

  private rightCover(color: string) {
    if (this.showRight) {
      this.sideRight.drawCover(color);
    }
  }

  private simbolMezclar(color: string, colorContent: string = '', ){
    const { center } = this.tanqueDimension;
    const simbol = new Simbol(this.ctx, center, color);
    simbol.drawSimbolMezclar(colorContent);  
  }

  mezclar() {
    //////////////////////////
    //Segundo this._estado mezclandoce
    //liquidos y compuertas
    
    //tapas
    // this.ctx.fillStyle = this._colorEntradas; 
    //derecha
    // this.ctx.fillRect(271, 87, 18, 38); 
    this.rightCover(this._colorEntradas)
    
    //izquierda
    // this.ctx.fillRect(72, 87, 18, 38); 
    this.leftCover(this._colorEntradas)

    //abajo
    // this.ctx.fillRect(150, 268, 62, 18); 
    this.bottomCover(this._colorEntradas)

    //la mescla
    // this.ctx.fillStyle = this._colorMezcla; 
    // this.ctx.fillRect(95, 128, 171, 133);
    this.showMezcla()

    //simbolo
    this.simbolMezclar(this._colorSimboloA, null)
    //simbolo
    // this.ctx.fillStyle = this._colorSimboloA;    //Caja simbolo
    // this.ctx.fillRect(this._posXsimbolo, this._posYsimbolo, this._anchoSimbolo, this._altoSimbolo);
    // this.ctx.fillStyle = this._colorLiquidoA;  //una de las azpas
    // this.ctx.fillRect(this._posXsimbolo + 15, this._posYsimbolo + 30, this._anchoSimbolo - 68, this._altoSimbolo - 60);
    // this.ctx.fillStyle = this._colorLiquidoB;  //una de las azpas
    // this.ctx.fillRect(this._posXsimbolo + 53, this._posYsimbolo + 30, this._anchoSimbolo - 68, this._altoSimbolo - 60);
    // this.ctx.fillStyle = this._colorSimboloF;    //eje
    // this.ctx.fillRect(this._posXsimbolo + 37, this._posYsimbolo + 5, this._anchoSimbolo - 74, this._altoSimbolo - 10);
  }

  vaciar() {
    //liquidos y compuertas
    this.showMezcla()
    // this.ctx.fillStyle = this._colorMezcla; //la mescla
    // this.ctx.fillRect(95, 128, 171, 133);
    // this.ctx.fillRect(155, 261, 52, 83);

    
    this.rightCover(this._colorEntradas)
    this.leftCover(this._colorEntradas)
    // this.ctx.fillStyle = this._colorEntradas; //tapas
    // this.ctx.fillRect(271, 87, 18, 38); //derecha
    // this.ctx.fillRect(72, 87, 18, 38); //izquierda

    
    this.simbolArrow(EnumDirection.DOWN, this._colorSimboloA, this._colorSimboloB, this._colorSimboloF)


    //simbolo
    // this.ctx.fillStyle = this._colorSimboloA;    //Caja simbolo
    // this.ctx.fillRect(this._posXsimbolo, this._posYsimbolo, this._anchoSimbolo, this._altoSimbolo);
    // this.ctx.fillStyle = this._colorSimboloB;    //lo que carga
    // this.ctx.fillRect(this._posXsimbolo + 5, this._posYsimbolo + 5, this._anchoSimbolo - 10, this._altoSimbolo - 10);

    // this.ctx.fillStyle = this._colorSimboloF; //Laflecha
    // this.ctx.fillRect(this._posXsimbolo + 33, this._posYsimbolo + 10, this._anchoSimbolo - 66, this._altoSimbolo - 55);
    // this.ctx.beginPath(); //El trinagulo de arriba
    // this.ctx.moveTo(this._posXsimbolo + 15, this._posYsimbolo + 45);
    // this.ctx.lineTo(this._posXsimbolo + 75, this._posYsimbolo + 45);
    // this.ctx.lineTo(this._posXsimbolo + 45, this._posYsimbolo + 80);
    // //c.fillStyle=colorSimboloC;
    // this.ctx.fill();
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