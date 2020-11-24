import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tanque } from './../../animations/tanque.animation';
import { Square } from '../../animations/square.animation';

@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.component.html',
  styleUrls: ['./animacion.component.css']
})
export class AnimacionComponent implements OnInit {
  @ViewChild('canvas', { static: true })

  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

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

  dibujar() {
    this.ctx.clearRect(0, 0, 360, 360); //limpiar ventana
    const tanque =  new Tanque(this.ctx);
    tanque.draw();

    switch(this.estado){
      case 1:
        tanque.llenar();
        break;
      case 2: 
        tanque.mezclar()
        break;
      case 3:
        tanque.vaciar();
        break;
      case 4:
        tanque.disponible();
        break;
      case 5:
        tanque.noDisponible();
        break;

    }
  }

}


