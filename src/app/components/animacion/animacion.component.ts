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

  width = 1600;
  height = 1600;

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

  addTanque(tanque:Tanque = null, name:string = null) {
    if (tanque == null) {
      tanque = new Tanque(this.ctx)
      tanque.setPosition(this.posX, this.posY, this.size)
    }
    tanque.id = this.tanques.length;
    tanque.nameTanque(name ||  "Tanque: "+tanque.id.toString())
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

  tanqueAlmacen(posX: number, posY: number, size: number, showLeft: boolean = true, showRight: boolean = true, color: string = '') {
    let tmp_tanque = new Tanque(this.ctx)
    // tmp_tanque.id = this.tanques.length;
    tmp_tanque.showLeft = showLeft;
    tmp_tanque.showRight = showRight;
    
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.disponible()
    return tmp_tanque
  }

  premixer(posX: number, posY: number, size: number, color: string = '') {
    let tmp_tanque = new Tanque(this.ctx)
    // tmp_tanque.id = this.tanques.length;
    tmp_tanque.percentMezclaValue = 0;
    tmp_tanque.setPosition(posX, posY, size)
    tmp_tanque.disponible();
    tmp_tanque.showCalentador = true;
    return tmp_tanque;
    // this.tanques.push(tmp_tanque)
  }

  loadTanques() {
    const mixer = this.premixer(295, 446, 100);
    const materiaPrima3 = this.tanquesDisponibles(470, 10, 100, 'red')
    const { right } = mixer.tanqueDimension
    materiaPrima3.customBottomHeight = right;

    this.addTanque(this.tanquesDisponibles(0, 10, 100, '#FACB52'), "MATERIA A")
    this.addTanque(this.tanquesDisponibles(273, 10, 100, '#2D61FA'),"MATERIA B")
    this.addTanque(materiaPrima3,"MATERIA C")
    this.addTanque(this.premixer(135,228,100), "PREMIXER")
    this.addTanque(mixer, "MIXER")

    this.addTanque(this.tanqueAlmacen(28, 698, 100, false,true,'#FACB52'), "ALMACEN 1")
    this.addTanque(this.tanqueAlmacen(294, 698, 100, true,true,'#2D61FA'), "ALMACEN 2")
    this.addTanque(this.tanqueAlmacen(558, 698, 100, true,false,'#2D61FA'), "ALMACEN 3")

    this.formControlTanque.setValue(this.tanques.length-1)
  }

  calentar(){
    if (this.tanque.name.includes("MIXER")) {
      this.calentarTanque(this.tanque)
    }
  }
  detenerCalentar(){
    if (this.tanque.name.includes("MIXER")) {
      this.detenerCalentarTanque(this.tanque)
    }
  }

  private calentarTanque(tanque: Tanque) {
    tanque.calentar();
  }

  private detenerCalentarTanque(tanque: Tanque){
    tanque.detenerCalentar();
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

  async llenarMezclaTanque(tanque:Tanque, percentUntil:number = 100, speed:number = 1): Promise<any> {
    
    tanque.llenar();
    await tanque.llenarMezcla(percentUntil, speed)
    // console.log("Ha terminado de cargar la materia prima")
    tanque.mezclar()
    tanque.calentar();
    await this.esperaPasoMixer(5)
    tanque.detenerCalentar();
    return true;
  }

  private esperaPasoMixer(seconds: number = 5): Promise<any>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, seconds * 1000)
    })
  }

  loadMateriaPrima2(){
    this.vaciarMezclaTanque(this.tanques[0],80,1);
    this.vaciarMezclaTanque(this.tanques[1],80,1);
    this.llenarMezclaTanque(this.tanques[3],40,2).then(() =>{
      this.vaciarMezclaTanque(this.tanques[2],80,1)
      this.vaciarMezclaTanque(this.tanques[3],0,1.5)
      this.llenarMezclaTanque(this.tanques[4], 60, 2)
    })
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

}


