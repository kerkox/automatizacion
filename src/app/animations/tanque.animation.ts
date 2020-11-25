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

  _tanqueDimension: TanqueDimension;

  constructor(private ctx: CanvasRenderingContext2D){

  }
/**
 * 
 * @param x position X
 * @param y position X
 * @param size multiplo para el tamaño del tanque
 */
  setPosition(x:number,y: number,size: number  = 1){
    this._posX = x;
    this._posY = y;
    this._size = size;
  }

  draw(){
    //Taque y bloques de fondo
    this.ctx.fillStyle = this._colorTanque; //tanqueprincipal
    const r_left = new Rectangle(this.ctx)
    const r_right = new Rectangle(this.ctx)
    const r_center = new Rectangle(this.ctx)
    const r_bottom = new Rectangle(this.ctx)
    this._tanqueDimension = this.calculatePosAndSizeTanque(this._posX, this._posY, this._size)
    const { left, center, right, bottom } = this._tanqueDimension


    r_left.draw(left);
    r_center.draw(center);
    r_right.draw(right);
    r_bottom.draw(bottom);
    
    // this.ctx.fillRect(34, 87, 100, 38); // left 
    // this.ctx.fillRect(90, 87, 181, 181); // central
    // this.ctx.fillRect(150, 268, 62, 76); // botom
    // this.ctx.fillRect(227, 87, 100, 38); // right
  }

  private calculatePosAndSizeTanque(x:number,y: number,size: number): TanqueDimension{
    let tanqueDimensions: TanqueDimension;
    const left: Dimension = { posX: x, posY: y, width: 56 * size, height: 38 * size }
    const center: Dimension = { posX: left.posX + left.width, posY: y, width: 180 * size, height: 180 * size}
    const right: Dimension = { posX: center.posX + center.width, posY: y, width: 56 * size, height: 38 * size}
    const bottom: Dimension = { posX: center.posX + (60 * size), posY: center.posY + center.height, width: 60 * size, height: 76 * size}
    
    tanqueDimensions = { left, center, right, bottom}
    return tanqueDimensions;
  }

  set colorTanque(color :string) {
    this._colorTanque = color;
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
    this.mezcla(50, this._colorMezcla)


    // tapa abajo
    // this.ctx.fillStyle = this._colorEtradas; 
    // this.ctx.fillRect(150, 268, 62, 18);
    this.bottomCover(this._colorEntradas)


    //simbolo
    this.ctx.fillStyle = this._colorSimboloA;    //Caja simbolo
    this.ctx.fillRect(this._posXsimbolo, this._posYsimbolo, this._anchoSimbolo, this._altoSimbolo);
    this.ctx.fillStyle = this._colorSimboloB;    //lo que carga
    this.ctx.fillRect(this._posXsimbolo + 5, this._posYsimbolo + 5, this._anchoSimbolo - 10, this._altoSimbolo - 10);

    this.ctx.fillStyle = this._colorSimboloF; //Laflecha
    this.ctx.fillRect(this._posXsimbolo + 33, this._posYsimbolo + 45, this._anchoSimbolo - 66, this._altoSimbolo - 55);
    this.ctx.beginPath(); //El trinagulo de arriba
    this.ctx.moveTo(this._posXsimbolo + 15, this._posYsimbolo + 45);
    this.ctx.lineTo(this._posXsimbolo + 75, this._posYsimbolo + 45);
    this.ctx.lineTo(this._posXsimbolo + 45, this._posYsimbolo + 10);
    //c.fillStyle=colorSimboloC;
    this.ctx.fill();
  }

  private bottomCover(color: string){
    // tapa de abajo
    const { bottom } = this._tanqueDimension;
    this.drawBottomCover(color, bottom)
  }

  private drawBottomCover(color: string, bottomDimension:Dimension) {
    
    const r_bottomCover = new Rectangle(this.ctx);
    r_bottomCover.color = color;
    const { posX, posY, width, height } = bottomDimension
    const dimension: Dimension = { posX, posY, width, height: height * 0.5 }
    r_bottomCover.draw(dimension)
    
  }

  private leftFluid(color:  string){
    //liquido a la izquierda
    const { left } = this._tanqueDimension;
    this.drawFluid(this.ctx, left, color)    
  }
  private rightFluid(color: string){
    //liquido a la derecha
    const { right } = this._tanqueDimension;
    this.drawFluid(this.ctx, right, color)    

  }

  private drawFluid(ctx: CanvasRenderingContext2D, sideFluid: Dimension, color:string){
    const r_fluid = new Rectangle(ctx)
    const {  posX, posY, width, height }  = sideFluid
    let height_fluid = Math.floor(height * 0.80);
    let posY_fluid = posY + Math.ceil((height - height_fluid) / 2)
    
    const dimension: Dimension = { posX, posY: posY_fluid, width, height: height_fluid  }

    r_fluid.color = color;
    r_fluid.draw(dimension);
  }


  private mezcla(percent:number, color: string) {
    const { center } = this._tanqueDimension;
    this.drawMezcla(this.ctx, center,percent, color)    
    
  }

  private drawMezcla(ctx: CanvasRenderingContext2D, centerFluid: Dimension, percent:number,color: string) {
    const r_fluidCenter = new Rectangle(ctx)
    const dimension = this.percentMezcla(centerFluid,percent);
    r_fluidCenter.color = color;
    r_fluidCenter.draw(dimension)
  }

  private percentMezcla(centerFluid: Dimension, percent:number): Dimension{
    const { posX, posY, width, height } = centerFluid
    const width_mezcla = Math.floor(width * 0.94)
    const posX_mezcla = posX + Math.ceil((width - width_mezcla) /2 )
    
    const height_mezcla = (height * 0.95)
    const height_percent = height_mezcla * (percent / 100)
    const posY_percent = (posY * 1.05) + (height_mezcla - height_percent)
    const dimension: Dimension = { posX: posX_mezcla , posY: posY_percent, width: width_mezcla, height:  height_percent}
    
    return dimension;
  }


  mezclar() {
    //////////////////////////
    //Segundo this._estado mezclandoce
      //liquidos y compuertas
      this.ctx.fillStyle = this._colorMezcla; //la mescla
      this.ctx.fillRect(95, 128, 171, 133);
      this.ctx.fillStyle = this._colorEntradas; //tapas
      this.ctx.fillRect(150, 268, 62, 18); //abajo
      this.ctx.fillRect(271, 87, 18, 38); //derecha
      this.ctx.fillRect(72, 87, 18, 38); //izquierda


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

  disponible(){
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

  noDisponible(){
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