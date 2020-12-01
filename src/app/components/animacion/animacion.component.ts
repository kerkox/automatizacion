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

  addTanque(tanque:Tanque = null) {
    if (tanque == null) {
      tanque = new Tanque(this.ctx)
      tanque.setPosition(this.posX, this.posY, this.size)
    }
    tanque.id = this.tanques.length;
    tanque.nameTanque("Tanque: "+tanque.id.toString())
    this.tanques.push(tanque)
    // tmp_tanque.draw()
    this.formControlTanque.setValue(tanque.id);
    // console.log("this.tanques", this.tanques)
  }


  tanquesDisponibles(posX:number,posY:number,size:number, color: string = ''){
    let tmp_tanque = new Tanque(this.ctx)
    // tmp_tanque.id = this.tanques.length;
    tmp_tanque.showSides = false;    
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.lleno(color);
    return tmp_tanque
  }

  premixer(posX: number, posY: number, size: number, color: string = '') {
    let tmp_tanque = new Tanque(this.ctx)
    // tmp_tanque.id = this.tanques.length;
    tmp_tanque.percentMezclaValue = 0;
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.disponible();
    return tmp_tanque;
    // this.tanques.push(tmp_tanque)
  }

  loadTanques() {
    this.addTanque(this.tanquesDisponibles(-55, 10, 100, '#FACB52'))
    this.addTanque(this.tanquesDisponibles(218, 10, 100, '#2D61FA'))
    this.addTanque(this.tanquesDisponibles(420,10,100, 'red'))
    this.addTanque(this.premixer(80,228,100))
    this.addTanque(this.premixer(240,446,100))
    this.formControlTanque.setValue(this.tanques.length-1)
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
    this.llenarMezclaTanque(this.tanque);
  }

  vaciarMezclaTanque(tanque: Tanque, percentUntil: number = 0, speed: number = 1){
    tanque.vaciar();
    tanque.vaciarMezcla(percentUntil, speed);
  }

  llenarMezclaTanque(tanque:Tanque, percentUntil:number = 100, speed:number = 1){
    tanque.llenar();
    tanque.llenarMezcla(percentUntil, speed).then(() => {
      // console.log("Ha terminado de cargar la materia prima")
      tanque.mezclar()
      // console.log("ha cambiado el icono a mezclar")
    });
  }

  loadMateriaPrima2(){
    this.vaciarMezclaTanque(this.tanques[0],50,1);
    this.vaciarMezclaTanque(this.tanques[1],50,1);
    this.llenarMezclaTanque(this.tanques[3],100,2);
  }

  dibujar() {
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

}


