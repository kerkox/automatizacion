import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tanque } from '../../animations/tanque/tanque.animation';
import { Square } from '../../animations/base/square.animation';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.component.html',
  styleUrls: ['./animacion.component.css']
})
export class AnimacionComponent implements OnInit {
  @ViewChild('canvas', { static: true })

  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  width = 800;
  height = 800;

  posX = 10;
  posY = 10;
  size = 50;
  
  estado = 0;

 
  tanques:Tanque[] = [];
  formControlTanque:FormControl = new FormControl('')

  get tanque(): Tanque {
    return this.tanques[this.formControlTanque.value];
  }
  constructor() {
    this.formControlTanque.valueChanges.subscribe(index => this.loadDataTanque(index))
   }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.estados()
    this.loadTanques();
  }

  addTanque() {
    let tmp_tanque = new Tanque(this.ctx)
    tmp_tanque.id = this.tanques.length;
    tmp_tanque.setPosition(this.posX, this.posY, this.size)
    this.tanques.push(tmp_tanque)
    // tmp_tanque.draw()
    this.formControlTanque.setValue(tmp_tanque.id);
    console.log("this.tanques", this.tanques)
  }


  tanquesDisponibles(posX:number,posY:number,size:number, color: string = ''){
    let tmp_tanque = new Tanque(this.ctx)
    tmp_tanque.id = this.tanques.length;
    tmp_tanque.showSides = false;    
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.lleno(color);
    this.tanques.push(tmp_tanque)
  }

  premixer(posX: number, posY: number, size: number, color: string = '') {
    let tmp_tanque = new Tanque(this.ctx)
    tmp_tanque.id = this.tanques.length;
    tmp_tanque.percentMezclaValue = 0;
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.disponible();
    this.tanques.push(tmp_tanque)
  }

  loadTanques() {
    this.tanquesDisponibles(10,10,50, 'blue')
    this.tanquesDisponibles(150,10,50, 'green')
    this.tanquesDisponibles(290,10,50, 'yellow')
    this.premixer(80,119,50);
    this.formControlTanque.setValue(this.tanques.length-1)
  }

 
  loadDataTanque(index:number) {
    console.log("index: ",index)
    const { posX, posY, size } = this.tanques[index]
    console.log(`posx: ${posX} posY: ${posY} size: ${size}`)
    
    // let posX = this.tanques[index].posX
    // let posY = this.tanques[index].posY
    // let size = this.tanques[index].size
    this.posX = posX
    this.posY = posY
    this.size = size
    console.log(`posx: ${this.posX} posY: ${this.posY} size: ${this.size}`)
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
    // this.vaciarMezclaTanque(this.tanque2, 50);
  }

  llenarMezcla(){
    this.llenarMezclaTanque(this.tanque);
  }

  vaciarMezclaTanque(tanque:Tanque, percentUntil:number = 0){
    tanque.vaciar();
    tanque.vaciarMezcla(percentUntil);
  }

  llenarMezclaTanque(tanque:Tanque, percentUntil:number = 100){
    tanque.llenar();
    tanque.llenarMezcla(percentUntil);
  }

  loadMateriaPrima2(){
    this.vaciarMezclaTanque(this.tanques[1]);
    this.llenarMezclaTanque(this.tanques[3]);
  }

  dibujar() {
    this.ctx.clearRect(0, 0, this.width, this.height); //limpiar ventana
    if(this.tanques.length == 0) return;
    // console.log("Hay")
    // console.log(this.tanque)
    // this.tanque =  new Tanque(this.ctx);
    // this.tanque2 =  new Tanque(this.ctx);
    this.tanques.forEach(tanque => tanque.draw())

    this.tanques[this.formControlTanque.value].setPosition(this.posX,this.posY, this.size)
    
      // this.tanques[this.tanque_select].draw();
    

    // this.tanque2.setPosition(250,10, 0.8)
    // tanque2.showLeft = false;
    // tanque2.showRight = false;
    // this.tanque2.draw();
    
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

}


