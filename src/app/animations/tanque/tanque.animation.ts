import { Calentador } from './calentador.animation';
import { ErrorSimbol } from './error-simbol.animation';
import { ErrorDraw } from '../base/error-draw.animation';
import { CheckSimbol } from './check-simbo..animation';
import { MezclaSimbol } from './mezcla-simbol.animation';
import { ArrowSimbol } from './arrow-simbol.animation';
import { SimbolDrawable } from '../interfaces/simbol-drawable.interface';
import { EnumDirection } from './../enums/enum-direction.enum';
import { Simbol } from './simbol.animation';
import { EnumSide } from './../enums/enum-side.enum';
import { Side } from './side.animation';
import { Util } from '../util.animation';
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
  private _colorSimbolo = '#000';

  private _showLeftFluid: boolean = false;
  private _showRightFluid: boolean = false;
  private _showMezcla: boolean = false;
  private _showBottomCover: boolean = false;
  private _simbol: SimbolDrawable = null;
  private _showSimbol: boolean = false;
  private _showRightCover: boolean = false;
  private _showLeftCover: boolean = false;

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
  private _calentador: Calentador = null;

  private _showCalentador: boolean = false;
  private _drawCalentar: boolean = false;

  private _name: string;

  private _customBottom: Dimension

  id: number

  constructor(private _ctx: CanvasRenderingContext2D) {
    // this.ctx.fillStyle = this._colorTanque; //tanqueprincipal
  }
  /**
   * 
   * @param x position X
   * @param y position X
   * @param size porcentaje para el tamaño del tanque
   */
  setPosition(x: number, y: number, size: number = 80) {
    this._posX = x;
    this._posY = y;
    this._size = (size / 100);
    this.draw();
  }

  set ctx(ctx: CanvasRenderingContext2D){
    this._ctx = ctx;
  }

  get ctx() {
    return this._ctx;
  }

  get posX(): number{
    return this._posX;
  }

  get posY(): number{
    return this._posY;
  }

  get size(): number{
    return this._size * 100;
  }

  set colorTanque(color: string) {
    this._colorTanque = color;
    this.ctx.fillStyle = this._colorTanque
  }

  public set colorSimbolo(color: string) {
    if(color != ''){
      this._colorSimbolo = color;
      console.log("El color cambio: ", this._colorSimbolo)
      this.draw();
    }
  }

  public get colorSimbolo(): string {
    return this._colorSimbolo;
  }

  set name(name: string){
    this._name = name;
  }

  get name(): string {
    return this._name;
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

  get calentador(): Calentador {
    return this._calentador;
  }

  set calentador(calentador: Calentador) {
    this._calentador = calentador;
  }

  
  private get customBottom() : Dimension {
    if(!this._customBottom) {
      const { bottom } = this.tanqueDimension
      this._customBottom = bottom;
    }
    return this._customBottom;
  }

  
  private set customBottom(bottom :Dimension) {
    this._customBottom = bottom;
  }

  public set customBottomHeight(bottom: number | Dimension) {
    if(typeof bottom == "number"){
      this.customBottom.height = bottom;
    } else {
      const {height, posY} = bottom
      console.log(`height: ${height} posY: ${posY}`)
      this.customBottom.height = height + posY - this.customBottom.posY
    }
  }
  

  private get mezcla(): Rectangle {
    if(this._mezcla == null){
      this._mezcla = new Rectangle(this.ctx)
    }
    return this._mezcla
  }

  
  public get showCalentador() :boolean {
    return this._showCalentador
  }

  public set showCalentador(show: boolean)  {
    this._showCalentador = show;
  }
  

  get tanqueDimension() : TanqueDimension{
    this._tanqueDimension = this.calculatePosAndSizeTanque(this._posX, this._posY, this._size)
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
  
  set showRightFluid(show: boolean) {
    this._showRightFluid = show;
  }

  set showSides(show:boolean) {
    this._showLeft = show;
    this._showRight = show;
  }

  set percentMezclaValue(percent: number){
    this._percentMezcla = percent;
  }
  get percentMezclaValue(): number {
    return this._percentMezcla;
  }

  draw() {
    this.showTanqueBase();
    this.leftFluid(this._colorLiquidoA)
    this.rightFluid(this._colorLiquidoB)
    this.showMezcla()
    this.rightCover(this._colorEntradas)
    this.leftCover(this._colorEntradas)
    this.bottomCover(this._colorEntradas)
    this.drawSimbol();
    this.nameTanque();
    this.drawCalentador();
  }

  drawCalentador() {
    if(!this.showCalentador) return;
    const { center } = this.tanqueDimension;
    if(!this.calentador){
      this.calentador = new Calentador(this.ctx,center)
    }
    this.calentador.draw(center);
    
  }

  calentar(){
    this._drawCalentar = true;
    if (this.calentador) {
      this.calentador.calentar();
    }
  }

  detenerCalentar(){
    this._drawCalentar = false;
    if (this.calentador) {
      this.calentador.detenerCalentar();
    }
    this.draw()
  }


  nameTanque(name: string = '') {
    if(name != '') {
      this.name = name;
    } 
    if(!this.name) return;
    // Aqui vamos a dibujar el nombre del tanque
    // Calcular el punto intermedio del center
    const { center } =  this.tanqueDimension;
    const { width, posX, posY, height } =  center;
    // const posX_text = posX;
    const { pos:posX_text } = Util.calculateSizePos(width,posX,10);
    const posY_text = posY + (height * 0.2);
    this.ctx.textAlign = "center"
    const font_size = Math.round((this.size / 100) * 24)
    // console.log(`posY: ${posY} posY_text: ${posY_text} font_size ${font_size}`)
    this.ctx.font = `${font_size}px Roboto`
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "rgba(0,0,0,0.7)";
    this.ctx.lineWidth = 4;
    // this.ctx.shadowColor = "rgba(0,0,0,8)";
    // this.ctx.strokeText()
    this.ctx.strokeText(this.name,posX_text,posY_text, width)
    this.ctx.fillText(this.name,posX_text,posY_text, width)
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = null;
    // console.log(`Se dibujo el texto: ${this.name}`)
  }

  private drawSimbol(){
    if(!this._showSimbol) return;
    const { center } = this.tanqueDimension;
    // console.log("center Dimension: ", center)
    this._simbol.draw(center);
  }

  vaciarMezcla(percentUntil: number = 5, speed: number = 1){
    if(this.percentMezclaValue <= percentUntil || !this._showMezcla) return;
    return this.moverMezcla(-1,percentUntil,speed)
  }

  private moverMezcla(valueIterator: number,percentUntil: number = 100, speed: number = 1): Promise<boolean>{
    return new Promise((resolve,rejcet) => {
    const time = Math.round(200 / speed)
    const i = setInterval(() => {
      // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.percentMezclaValue += valueIterator;
      // console.log("this.percentMezclaValue: ", this.percentMezclaValue)
      this.draw()
      if (this.percentMezclaValue == percentUntil) {
        clearInterval(i);
        resolve(true)
      }
    }, time);

  })
  }

  llenarMezcla(percentUntil: number = 100, speed:number = 1){
    if (this.percentMezclaValue >= percentUntil || !this._showMezcla) return;
    return this.moverMezcla(1,percentUntil,speed)
  }

  private resetTanque() {
    this._showLeftFluid = false;
    this._showRightFluid = false;
    this._showMezcla = false;
    this._showBottomCover = false;
    this._showSimbol = false;
    this._showRightCover = false;
    this._showLeftCover = false;
    this._simbol = null;
  }

  llenar() {
    this.resetTanque();
    this._showLeftFluid = true;
    this._showRightFluid = true;
    this._showMezcla = true;
    this._showBottomCover = true;
    this.simbolArrow(EnumDirection.UP, this._colorSimboloA, this._colorSimboloB, this._colorSimbolo)
    this.draw();
  }

  lleno(colorContenido:string = ''){
    this.resetTanque();
    this._showLeftFluid = true;
    this._showRightFluid = true;
    this._showMezcla = true;
    colorContenido != '' && (this._colorMezcla = colorContenido);
    this._showBottomCover = true;
    this.simbolCheckBase()
    this.draw();
  }

  mezclar() {
    this.resetTanque();
    this._showRightCover = true;
    this._showLeftCover = true;
    this._showBottomCover = true;
    this._showMezcla = true;
    this.simbolMezclar(this._colorSimboloA, null)
    this.draw();
  }

  vaciar() {
    this.resetTanque();
    this._showMezcla = true;
    this._showRightCover = true;
    this._showLeftCover = true;
    this.simbolArrow(EnumDirection.DOWN, this._colorSimboloA, this._colorSimboloB, this._colorSimbolo)
    this.draw();
  }

  disponible() {
    //simbolo
    this.resetTanque();
    this.simbolCheck(this._colorSimboloA, this._colorSimboloD, this._colorSimbolo);
    this.draw();
  }

  noDisponible() {
    //Tapas del tanque
    this.resetTanque();
    this._showRightCover = true;
    this._showLeftCover = true;
    this._showBottomCover = true;
    this.simbolError(this._colorSimboloA, this._colorSimboloE, this._colorSimbolo);
    this.draw();
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
    if(this.customBottom) {
      bottom.height = this.customBottom.height
      this.drawBaseBottom(bottom, color);
    } else {
      this.drawBaseBottom(bottom, color);      
    }
    
  }

 

  private drawBaseLeft(color:string = '') {
    if (!this._showLeft) return;
    const { left } = this.tanqueDimension
    this.sideLeft = new Side(this.ctx, left, EnumSide.LEFT,color)  
  }

  private drawBaseRight(color: string = '') {
    if (!this._showRight)  return;
      const { right } = this.tanqueDimension
      this.sideRight = new Side(this.ctx, right, EnumSide.RIGHT,color)
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

  private simbolArrow(enumDirection:EnumDirection, color: string, colorContent: string, colorArrow: string) {
    this._showSimbol = true;
    const { center } = this.tanqueDimension;
    this._simbol = new ArrowSimbol(this.ctx,center,color,colorContent,enumDirection,colorArrow)    
  }

  private simbolCheckBase(){
    console.log("this._colorSimbolo: ", this._colorSimbolo)
    this.simbolCheck(this._colorSimboloA, this._colorSimboloD, this._colorSimbolo);
  }

  private simbolCheck(color: string, colorContent: string, colorCheck: string) {
    this._showSimbol = true;
    const { center } = this.tanqueDimension;
    this._simbol = new CheckSimbol(this.ctx,center,color,colorContent,colorCheck)        
  }

  private simbolError(color: string, colorContent: string, colorError: string) {
    this._showSimbol = true;
    const { center } = this.tanqueDimension;
    this._simbol = new ErrorSimbol(this.ctx,center,color,colorContent, colorError);
  }

  private simbolMezclar(color: string, colorContent: string = '',) {
    this._showSimbol = true;
    const { center } = this.tanqueDimension;
    this._simbol = new MezclaSimbol(this.ctx, center, color, colorContent)
  }


  private bottomCover(color: string) {
    // tapa de abajo
    if(!this._showBottomCover) return;
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
    if(!this._showLeftFluid) return;
    const { left } = this.tanqueDimension
    this.sideLeft.drawFluid(left,color)    
  }
  private rightFluid(color: string) {
    //liquido a la derecha
    if (!this._showRight) return;
    if (!this._showRightFluid) return;
    const { right } = this.tanqueDimension
    this.sideRight.drawFluid(right,color)
  }



  private showMezcla() {
    if(!this._showMezcla) return;
    const { center } = this.tanqueDimension;
    this.drawMezcla(center, this.percentMezclaValue, this._colorMezcla)
  }

  private drawMezcla(centerFluid: Dimension, percent: number, color: string) {
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
    if(!this.showLeft)  return;
    if(!this._showLeftCover) return;
    const { left } = this.tanqueDimension
    this.sideLeft.drawCover(left,color);
    
  }

  private rightCover(color: string) {
    if (!this.showRight)  return;
    if(!this._showRightCover) return;
    const { right } = this.tanqueDimension
    this.sideRight.drawCover(right,color);
    
  }

  
 




}