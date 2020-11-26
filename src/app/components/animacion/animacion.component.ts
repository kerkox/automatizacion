import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tanque } from '../../animations/tanque/tanque.animation';
import { Square } from '../../animations/base/square.animation';

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

  //paleta de colores
  colorTanque = '#A0A0A0';
  colorEtradas = '#505050';
  colorLiquidoA = '#FACB52';
  colorLiquidoB = '#2D61FA';
  colorMezcla = '#9CFA20';
  colorSimboloA = '#8C538B';
  colorSimboloB = '#BF11BB';
  colorSimboloC = '#BF9B11';
  colorSimboloD = '#33FF33'; //verde
  colorSimboloE = '#FF3333'; //rojo
  colorSimboloF = '#FFFFFF';

  //varables para el simbolo
  posXsimbolo = 135;
  posYsimbolo = 135;
  anchoSimbolo = 90;
  altoSimbolo = 90;
  arregloFlujos = [];

  tanque:Tanque;
  tanque2:Tanque;

  constructor() { }

  ngOnInit(): void {
    this.arregloFlujos = [];
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.estados()
  }

  animate(): void {
    const canvas = this.ctx.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.fillStyle = 'red';
    const square = new Square(this.ctx);
    square.draw(1, 1, 20);
    square.move(2, 30);
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
    this.vaciarMezclaTanque(this.tanque2, 50);
  }

  vaciarMezclaTanque(tanque:Tanque, percentUntil:number = 5){
    tanque.vaciarMezcla(percentUntil);
  }

  dibujar() {
    this.ctx.clearRect(0, 0, this.width, this.height); //limpiar ventana
    this.tanque =  new Tanque(this.ctx);
    this.tanque2 =  new Tanque(this.ctx);
    const size_percent = this.size / 100
    this.tanque.setPosition(this.posX,this.posY, size_percent)
    this.tanque.draw();
    this.tanque.llenar();

    this.tanque2.setPosition(250,10, 0.8)
    // tanque2.showLeft = false;
    // tanque2.showRight = false;
    this.tanque2.draw();

    switch(this.estado){
      case 1:
        this.tanque2.llenar();
        break;
      case 2: 
        this.tanque2.mezclar()
        break;
      case 3:
        this.tanque2.vaciar();
        break;
      case 4:
        this.tanque2.disponible();
        break;
      case 5:
        this.tanque2.noDisponible();
        break;

    }
  }

}


