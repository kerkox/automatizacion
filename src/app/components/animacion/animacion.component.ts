import { tanque_reset } from './../../animations/actions/tanque.actions';
import { continuar, pausar } from './../../animations/actions/pausado.actions';
import { AppState } from '../../animations/reducers/animation.reducers';
import { PruebaCalidadDialogComponent } from './../prueba-calidad-dialog/prueba-calidad-dialog.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tanque } from '../../animations/tanque/tanque.animation';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { calentarTypes } from 'src/app/animations/actions/calentar.actions';


@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.component.html',
  styleUrls: ['./animacion.component.css']
})
export class AnimacionComponent implements OnInit {
  @ViewChild('canvas', { static: true })

  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  private _nextFunction: Function;

  width = 1600;
  height = 1600;

  posX = 10;
  posY = 10;
  size = 50;
  
  estado = 0;
  pausado:boolean = true;

 
  tanques:Tanque[] = [];
  formControlTanque:FormControl = new FormControl('')



  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.formControlTanque.valueChanges.subscribe(index => this.loadDataTanque(index))
   
  }



  get tanque(): Tanque {
    return this.tanques[this.formControlTanque.value];
  }
  

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    // this.estados()
    setTimeout(() => {
      this.loadTanques();
    },500)
    this.store.select('pausado').subscribe(pausado => {
      console.log(`%c Pausado: ${pausado}`, "color:yellow;font-size:20px", );
      this.pausado = pausado
    })
    this.store.select('tanque_lleno').subscribe(tanque_lleno => {
      console.log(`%c tanque lleno: ${tanque_lleno}`,`color:yellow;font-size:20px`)
      if(tanque_lleno) {
        this.paso_next()
        this.store.dispatch(tanque_reset())
      }
    })
    this.store.select('calentar').subscribe(calentar => {
      switch (calentar) {
        case calentarTypes.calentar_fin:
          this.paso_next();
          break;
      
        default:
          break;
      }
    })

  }

  addTanque(tanque:Tanque = null, name:string = null) {
    if (tanque == null) {
      tanque = new Tanque(this.ctx, this.store)
      tanque.setPosition(this.posX, this.posY, this.size)
    }
    tanque.id = this.tanques.length;
    tanque.nameTanque(name ||  "Tanque: "+tanque.id.toString())
    this.tanques.push(tanque)
    // tmp_tanque.draw()
    this.formControlTanque.setValue(tanque.id);
    // console.log("this.tanques", this.tanques)
  }


  tanquesDisponibles(posX:number,posY:number,size:number, color: string = '', colorSimbolo:string = ''): Tanque{
    let tmp_tanque = new Tanque(this.ctx, this.store)
    // tmp_tanque.id = this.tanques.length;
    tmp_tanque.showSides = false;    
    tmp_tanque.colorSimbolo = colorSimbolo;
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.lleno(color);
    return tmp_tanque
  }

  tanqueAlmacen(posX: number, posY: number, size: number, showLeft: boolean = true, showRight: boolean = true, color: string = ''): Tanque {
    let tmp_tanque = new Tanque(this.ctx, this.store)
    // tmp_tanque.id = this.tanques.length;
    tmp_tanque.showLeft = showLeft;
    tmp_tanque.showRight = showRight;
    
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.disponible()
    return tmp_tanque
  }

  premixer(posX: number, posY: number, size: number, color: string = '') {
    let tmp_tanque = new Tanque(this.ctx, this.store)
    // tmp_tanque.id = this.tanques.length;
    tmp_tanque.percentMezclaValue = 0;
    tmp_tanque.colorSimbolo = color;
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.disponible();
    tmp_tanque.showCalentador = true;
    return tmp_tanque;
    // this.tanques.push(tmp_tanque)
  }

  loadTanques() {
    const mixer = this.premixer(295, 446, 100,"#fff");
    mixer.tanqueDebug = true;
    const { right } = mixer.tanqueDimension
    const materiaPrimaC = this.tanquesDisponibles(470, 10, 100, '#CBECFA', "#fff")
    materiaPrimaC.tanqueDebug = true;
    const { bottom } = materiaPrimaC.tanqueDimension;

    materiaPrimaC.customBottomHeight = right;
    mixer.customRightWidth = bottom
    let materiaB = this.tanquesDisponibles(273, 10, 100, '#CBECFA')
    // this.addTanque(this.tanquesDisponibles(0, 10, 100, 'rgba(97,188,216,1)'), "MATERIA A")
    this.addTanque(this.tanquesDisponibles(0, 10, 100, '#CBECFA'), "MATERIA A")
    materiaB.colorSimbolo = "gray"
    this.addTanque(materiaB,"MATERIA B")
    this.addTanque(materiaPrimaC,"MATERIA C")
    this.addTanque(this.premixer(135,228,100), "PREMIXER")
    this.addTanque(mixer, "MIXER")

    this.addTanque(this.tanqueAlmacen(28, 698, 100, false,true,'#FACB52'), "ALMACEN 1")
    this.addTanque(this.tanqueAlmacen(294, 698, 100, true,true,'#2D61FA'), "ALMACEN 2")
    this.addTanque(this.tanqueAlmacen(558, 698, 100, true,false,'#2D61FA'), "ALMACEN 3")

    // this.formControlTanque.setValue(this.tanques.length-1)
    this.dibujar();
  }

  calentar(){
    if (this.tanque.name.includes("MIXER")) {
      this.calentarTanque(this.tanque)
    }
  }
  
  private calentarTanque(tanque: Tanque) {
    tanque.calentar(5);
  }

  

 
  loadDataTanque(index:number) {
    const { posX, posY, size } = this.tanques[index]
    this.posX = posX
    this.posY = posY
    this.size = size    
  }

  estados() {
    this.estado += 1;
    if (this.estado > 5) {
      this.estado = 1;
    }
    this.dibujar();
  }

  vaciarMezcla(){
    this.vaciarMezclaTanque(this.tanque);
  }

  llenarMezcla(){
    this.llenarMezclaTanque(this.tanque, () => {});
  }

  vaciarMezclaTanque(tanque: Tanque, percentUntil: number = 0, speed: number = 1){
    tanque.tanqueDebug = true;
    tanque.vaciar();
    tanque.vaciarMezcla(percentUntil, speed);
  }

  async llenarMezclaTanque(tanque:Tanque,nextFunction:Function, percentUntil:number = 100, speed:number = 1, calentar:boolean = true): Promise<any> {
    this._nextFunction = nextFunction
    tanque.secondsCalentar = 5;
    tanque.llenar();
    await tanque.llenarMezcla(percentUntil, speed)
    // console.log("Ha terminado de cargar la materia prima")
    if(calentar){
      await this.calentarMezclaTanque(tanque)
      console.log("Termino de calentar")
    } else {

    }
    return true;
  }

  private async calentarMezclaTanque(tanque: Tanque): Promise<any>{
    tanque.mezclar()    
    return await tanque.calentar(5);    
  }

 

  loadMateriaPrima2(){
    this.paso1();
    this.pausado = false;
  }

  pausarContinuar(){
    console.log(`%c after this.pausado: ${this.pausado}`,`color:green;font-size:16px;`)
    if(this.pausado) {
      this.store.dispatch(continuar())
      console.log("%c Se lanza el evento de continuar","color:orange;font-size:14px")
    } else {
      this.store.dispatch(pausar())
      console.log("%c Se lanza el evento de pausar","color:orange;font-size:14px")
    }
    console.log(`%c Before this.pausado: ${this.pausado}`, `color:green;font-size:16px;`)
    // this.pausado = !this.pausado;
  }

  iniciar(){

  }


  paso1(){
    this.vaciarMezclaTanque(this.tanques[0], 80, 1);
    this.vaciarMezclaTanque(this.tanques[1], 80, 1);
    this.llenarMezclaTanque(this.tanques[3], this.paso2,40, 2).then(() => {
      console.log("Termino el Paso 1---------------------")
      // this.paso_next();
    })
  }

  paso_next(){
    console.log("Se va a abrir el dialog")
    this.openDialog(this._nextFunction);
  }

  paso2() {
    console.log("This: ", this)
    this.vaciarMezclaTanque(this.tanques[2], 80, 1)
    this.vaciarMezclaTanque(this.tanques[3], 0, 1.5)
    this.llenarMezclaTanque(this.tanques[4], this.paso3,60, 2).then(() => {
      console.log("Termino el Paso 2---------------------")
      // this.paso_next()      

    })
  }

  paso3() {
    this.vaciarMezclaTanque(this.tanques[4], 0, 1)
    this.tanques[5].percentMezclaValue = 0;
    this.llenarMezclaTanque(this.tanques[5], this.paso4,60, 1, false).then(() => {
      // this.paso_next();
    })
  }

  paso4(){
    console.log("Paso FINAL")
  }

  dibujar() {
    console.log("Se dibujo ")
    this.ctx.clearRect(0, 0, this.width, this.height); //limpiar ventana
    if(this.tanques.length == 0) return;
    
    this.tanques[this.formControlTanque.value].setPosition(this.posX,this.posY, this.size)
    this.tanques.forEach(tanque => tanque.draw())
    switch(this.estado){
      case 1:
        this.tanques[this.formControlTanque.value].llenar()
        break;
      case 2: 
        this.tanques[this.formControlTanque.value].mezclar()
        break;
      case 3:
        this.tanques[this.formControlTanque.value].vaciar()
        break;
      case 4:
        this.tanques[this.formControlTanque.value].disponible()
        break;
      case 5:
        this.tanques[this.formControlTanque.value].noDisponible()
        break;
    }    
  }

  openDialog(nextStep: Function ): void {
    const dialogRef = this.dialog.open(PruebaCalidadDialogComponent, {
      // width: '1200px',
      data: {}
    });
    const local_this = this;
    dialogRef.afterClosed().subscribe(result => {
      console.log("local_this: ", local_this)
      const nextStepFun = nextStep.bind(local_this);
      console.log('The dialog was closed result:', result);
      if(result) {
        nextStepFun()
      } else {
        local_this.openDialog(nextStep);
      } 
      // this.animal = result;
    });
  }

}


