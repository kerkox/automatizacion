import { AppState } from './../interfaces/animation.reducers';
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
import { Store } from '@ngrx/store';


export class Tanque {

  private _colorTanque = '#666';
  private _colorEntradas = 'rgba(50,50,50,1)';
  // private _colorLiquidoA = '#FACB52';
  private _colorLiquidoA = '#CBECFA';
  // private _colorLiquidoB = '#2D61FA';
  private _colorLiquidoB = '#CBECFA';
  private _colorMezcla = '#CBECFA';
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
  private _customRight: Dimension


  private _pausado:boolean = false;
  private _percentUntilMemory:number = -1;
  private _valueIteratorMemory: number = 1;

  private _onWorking: boolean = false;
  private _tanqueDebug: boolean = false;

  id: number

  constructor(private _ctx: CanvasRenderingContext2D
    , private store: Store<AppState>
    ) {
    // this.ctx.fillStyle = this._colorTanque; //tanqueprincipal
    this.store.subscribe(({pausado}) => {
      // this.tanqueDebug && console.log(`Pausar: ${pausado}`)
      if(pausado) {
        console.log(`%c Llega el evento para pausar: ${pausado}`, `color:#5cdbff;font-size:14px;`)
        this.pausar();
      } else {
        console.log(`%c Llega el evento para Continuar: ${pausado}`, `color:#5cdbff;font-size:14px;`)
        this.continuar();
      }
    })
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

  
  public get tanqueDebug() : boolean {
    return this._tanqueDebug;
  }
  
  
  public set tanqueDebug(debug : boolean) {
    this._tanqueDebug = debug;
  }

  public get onWorking() : boolean {
    return this._onWorking;
  }
  
  
  public set onWorking(working : boolean) {
    this._onWorking = working;
    this.pausado = !working;
    
  }
  

  public set colorSimbolo(color: string) {
    if(color != ''){
      this._colorSimbolo = color;
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
      // this.tanqueDebug && console.log(`height: ${height} posY: ${posY}, this.customBottom.posY: ${this.customBottom.posY}`)
      this.customBottom.height = posY - this.customBottom.posY + height
      // this.tanqueDebug && console.log(`this.customBottom.height: ${this.customBottom.height}`)
    }
  }

  private get customRight(): Dimension {
    if (!this._customRight) {
      const { right } = this.tanqueDimension
      this._customRight = right;
    }
    return this._customRight;
  }


  private set customRight(bottom: Dimension) {
    this._customRight = bottom;
  }

  public set customRightWidth(bottom: number | Dimension) {
    if (typeof bottom == "number") {
      this.customRight.width = bottom;
    } else {
      const { width, posX } = bottom
      // this.tanqueDebug && console.log(`width: ${width} posX: ${posX}, this.customRight.posX: ${this.customRight.posX}`)
      this.customRight.width = posX - this.customRight.posX 
      // this.tanqueDebug && console.log(`this.customRight.width: ${this.customRight.width}`)
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

  
  public get percentUntilMemory() : number {
    return this._percentUntilMemory;
  }

  public set percentUntilMemory(percent: number) {
    this._percentUntilMemory = percent;
  }

  
  public get pausado() : boolean {
    return this._pausado;
  }

  
  public set pausado(pausar : boolean) {
    this._pausado = pausar;
  }

  
  public set valueIteratorMemory(valueItearator : number) {
    this._valueIteratorMemory = valueItearator;
  }

  
  public get valueIteratorMemory() :number {
    return this._valueIteratorMemory;
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

  calentar(seconds:number = -1): Promise<boolean>{
    return new Promise((resolve, reject) => {
    this._drawCalentar = true;
    if (this.calentador) {
      // this.onWorking = true;
      this.calentador.calentar(seconds).then(() => {
        this.detenerCalentar()
        resolve(true);
      });
    }
    })
  }

  private detenerCalentar(){
    this._drawCalentar = false;
    this._showLeftCover = true;
    this._showRightCover = true;
    this.draw()
    console.log("Detener Calentar desde Tanque")
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
    this._simbol.draw(center,this.colorSimbolo);
  }

  vaciarMezcla(percentUntil: number = 5, speed: number = 1){
    if(this.percentMezclaValue <= percentUntil || !this._showMezcla) return;
    this.onWorking = true;
    return this.moverMezcla(-1,percentUntil,speed)
  }

  private cerrarEntradas(){
    this._showRightCover = true;
    this._showLeftCover = true;
    this.draw();
  }

  private abrirEntradas(){
    this._showRightCover = false;
    this._showLeftCover = false;
  }

  private moverMezcla(valueIterator: number = 0,percentUntil: number = 100, speed: number = 1): Promise<boolean>{
    console.log(`%conWorking: ${this.onWorking}`, `color:green; font-size:16px`)
    if (!this.onWorking)  return;
    return new Promise((resolve,rejcet) => {
      if(percentUntil != 100) {
        this.tanqueDebug && console.log(`before this.percentUntilMemory: ${this.percentUntilMemory}`)
        this.percentUntilMemory = percentUntil;
        this.tanqueDebug && console.log(`after this.percentUntilMemory: ${this.percentUntilMemory}`)
      }
      if(valueIterator != 0) {
        this.tanqueDebug && console.log(`valueIterator: ${valueIterator}`)
        this.valueIteratorMemory = valueIterator;
      }
      
    const time = Math.round(200 / speed)
    const i = setInterval(() => {
      // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.percentMezclaValue += this.valueIteratorMemory;
      this.draw()
      console.log(`${this.name} this.percentMezclaValue: ${this.percentMezclaValue} this.percentUntilMemory: ${this.percentUntilMemory}`)
      let result = (this.percentMezclaValue == this.percentUntilMemory || this.pausado)
      console.log(`resultado eval: ${result}`)
      if (this.percentMezclaValue == this.percentUntilMemory || this.pausado) {
        console.log(`%cDetener ${this.name} interval: ${i}`, `color:red; font-size: 16px;`)
        this.cerrarEntradas();
        clearInterval(i);
        if(!this.pausado){
          this.onWorking = false;
          resolve(true)
        }
      }
    }, time);
    console.log(`intervalo creado: ${i}`)

  })
  }

  pausar() {
    this.pausado = true;
  }

  continuar() {
    this.pausado = false;
    this.onWorking && this.moverMezcla();
  }

  llenarMezcla(percentUntil: number = 100, speed:number = 1): Promise<boolean>{
    if (this.percentMezclaValue >= percentUntil || !this._showMezcla) return;
    this.onWorking = true;
    this.abrirEntradas();
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
    // this.simbolArrow(EnumDirection.UP, this._colorSimboloA, this._colorSimboloB, this._colorSimbolo)
    this.draw();
  }

  lleno(colorContenido:string = ''){
    this.resetTanque();
    this._showLeftFluid = true;
    this._showRightFluid = true;
    this._showMezcla = true;
    colorContenido != '' && (this._colorMezcla = colorContenido);
    this._showBottomCover = true;
    // this.simbolCheckBase()
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
    // this.simbolArrow(EnumDirection.DOWN, this._colorSimboloA, this._colorSimboloB, this._colorSimbolo)
    this.draw();
  }

  disponible() {
    //simbolo
    this.resetTanque();
    // this.simbolCheck(this._colorSimboloA, this._colorSimboloD, this._colorSimbolo);
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
    this.drawTanqueBaseRightCustom(color);
    
    
    this.drawBaseCenter(center, color);
    
    this.drawTanqueBaseBottomCustom(color);
    
  }

 private drawTanqueBaseBottomCustom(color: string){
   const { bottom } = this.tanqueDimension
   if (this.customBottom) {
     bottom.height = this.customBottom.height
     this.drawBaseBottom(bottom, color);
   } else {
     this.drawBaseBottom(bottom, color);
   }

 }
 private drawTanqueBaseRightCustom(color: string){
   const { right } = this.tanqueDimension
  //  this.tanqueDebug && console.log(`${this.name} right posX: ${right.posX}, width: ${right.width}`)
   if (this.customRight) {
     right.width = this.customRight.width
     this.drawBaseRight(right, color);
   } else {
     this.drawBaseRight(right, color);
   }

 }

  private drawBaseLeft(color:string = '') {
    if (!this._showLeft) return;
    const { left } = this.tanqueDimension
    this.sideLeft = new Side(this.ctx, left, EnumSide.LEFT,color)  
  }

  private drawBaseRight(right: Dimension, color: string = '') {
    if (!this._showRight)  return;
      // const { right } = this.tanqueDimension
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
    const bottom: Dimension = { posX: center.posX + (75 * size), posY: center.posY + center.height, width: 30 * size, height: 76 * size }

    tanqueDimensions = { left, center, right, bottom }
    return tanqueDimensions;
  }

  private simbolArrow(enumDirection:EnumDirection, color: string, colorContent: string, colorArrow: string) {
    this._showSimbol = true;
    const { center } = this.tanqueDimension;
    this._simbol = new ArrowSimbol(this.ctx,center,color,colorContent,enumDirection,colorArrow)    
  }

  private simbolCheckBase(){
    // console.log("this._colorSimbolo: ", this._colorSimbolo)
    // this.simbolCheck(this._colorSimboloA, this._colorSimboloD, this._colorSimbolo);
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