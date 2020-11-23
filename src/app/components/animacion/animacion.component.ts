import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
    square.draw(5, 1, 20);
    square.move(2, 30);
  }

  estados() {
    this.estado += 1;
    if (this.estado > 5) {
      this.estado = 1;
    }
    this.dibujar();
  }

  tanque() {
    //Taque y bloques de fondo
    this.ctx.fillStyle = this.colorTanque; //tanqueprincipal
    this.ctx.fillRect(90, 87, 181, 181);
    this.ctx.fillStyle = this.colorTanque;  //entrada izquierda
    this.ctx.fillRect(34, 87, 100, 38);
    this.ctx.fillStyle = this.colorTanque;  //entrada derecha
    this.ctx.fillRect(227, 87, 100, 38);
    this.ctx.fillStyle = this.colorTanque;  //salida
    this.ctx.fillRect(150, 268, 62, 76);
  }

  dibujar() {
    this.ctx.clearRect(0, 0, 360, 360); //limpiar ventana

    //////////////////////////
    //Primer this.estado llenandose
    this.tanque();

    if (this.estado == 1) {
      //liquidos y compuerta
      this.ctx.fillStyle = this.colorLiquidoA;  //liquido a la izquierda
      this.ctx.fillRect(34, 90, 57, 32);
      this.ctx.fillStyle = this.colorLiquidoB;  //liquido a la derecha
      this.ctx.fillRect(271, 90, 57, 32);
      this.ctx.fillStyle = this.colorMezcla;
      this.ctx.fillRect(95, 223, 171, 40);
      this.ctx.fillStyle = this.colorEtradas; //tapa abajo
      this.ctx.fillRect(150, 268, 62, 18);



      //simbolo
      this.ctx.fillStyle = this.colorSimboloA;    //Caja simbolo
      this.ctx.fillRect(this.posXsimbolo, this.posYsimbolo, this.anchoSimbolo, this.altoSimbolo);
      this.ctx.fillStyle = this.colorSimboloB;    //lo que carga
      this.ctx.fillRect(this.posXsimbolo + 5, this.posYsimbolo + 5, this.anchoSimbolo - 10, this.altoSimbolo - 10);

      this.ctx.fillStyle = this.colorSimboloF; //Laflecha
      this.ctx.fillRect(this.posXsimbolo + 33, this.posYsimbolo + 45, this.anchoSimbolo - 66, this.altoSimbolo - 55);
      this.ctx.beginPath(); //El trinagulo de arriba
      this.ctx.moveTo(this.posXsimbolo + 15, this.posYsimbolo + 45);
      this.ctx.lineTo(this.posXsimbolo + 75, this.posYsimbolo + 45);
      this.ctx.lineTo(this.posXsimbolo + 45, this.posYsimbolo + 10);
      //c.fillStyle=colorSimboloC;
      this.ctx.fill();

    
    }


    //////////////////////////
    //Segundo this.estado mezclandoce
    if (this.estado == 2) {
      //liquidos y compuertas
      this.ctx.fillStyle = this.colorMezcla; //la mescla
      this.ctx.fillRect(95, 128, 171, 133);
      this.ctx.fillStyle = this.colorEtradas; //tapas
      this.ctx.fillRect(150, 268, 62, 18); //abajo
      this.ctx.fillRect(271, 87, 18, 38); //derecha
      this.ctx.fillRect(72, 87, 18, 38); //izquierda


      //simbolo
      //simbolo
      this.ctx.fillStyle = this.colorSimboloA;    //Caja simbolo
      this.ctx.fillRect(this.posXsimbolo, this.posYsimbolo, this.anchoSimbolo, this.altoSimbolo);
      this.ctx.fillStyle = this.colorLiquidoA;  //una de las azpas
      this.ctx.fillRect(this.posXsimbolo + 15, this.posYsimbolo + 30, this.anchoSimbolo - 68, this.altoSimbolo - 60);
      this.ctx.fillStyle = this.colorLiquidoB;  //una de las azpas
      this.ctx.fillRect(this.posXsimbolo + 53, this.posYsimbolo + 30, this.anchoSimbolo - 68, this.altoSimbolo - 60);
      this.ctx.fillStyle = this.colorSimboloF;    //eje
      this.ctx.fillRect(this.posXsimbolo + 37, this.posYsimbolo + 5, this.anchoSimbolo - 74, this.altoSimbolo - 10);
    }

    //////////////////////////
    //tercer this.estado vaciado
    if (this.estado == 3) {
      //liquidos y compuertas
      this.ctx.fillStyle = this.colorMezcla; //la mescla
      this.ctx.fillRect(95, 128, 171, 133);
      this.ctx.fillRect(155, 261, 52, 83);
      this.ctx.fillStyle = this.colorEtradas; //tapas
      this.ctx.fillRect(271, 87, 18, 38); //derecha
      this.ctx.fillRect(72, 87, 18, 38); //izquierda

      //simbolo
      this.ctx.fillStyle = this.colorSimboloA;    //Caja simbolo
      this.ctx.fillRect(this.posXsimbolo, this.posYsimbolo, this.anchoSimbolo, this.altoSimbolo);
      this.ctx.fillStyle = this.colorSimboloB;    //lo que carga
      this.ctx.fillRect(this.posXsimbolo + 5, this.posYsimbolo + 5, this.anchoSimbolo - 10, this.altoSimbolo - 10);

      this.ctx.fillStyle = this.colorSimboloF; //Laflecha
      this.ctx.fillRect(this.posXsimbolo + 33, this.posYsimbolo + 10, this.anchoSimbolo - 66, this.altoSimbolo - 55);
      this.ctx.beginPath(); //El trinagulo de arriba
      this.ctx.moveTo(this.posXsimbolo + 15, this.posYsimbolo + 45);
      this.ctx.lineTo(this.posXsimbolo + 75, this.posYsimbolo + 45);
      this.ctx.lineTo(this.posXsimbolo + 45, this.posYsimbolo + 80);
      //c.fillStyle=colorSimboloC;
      this.ctx.fill();
    }

    //////////////////////////
    //cuarto this.estado disponible
    if (this.estado == 4) {
      //simbolo
      this.ctx.fillStyle = this.colorSimboloA;    //Caja simbolo
      this.ctx.fillRect(this.posXsimbolo, this.posYsimbolo, this.anchoSimbolo, this.altoSimbolo);
      this.ctx.fillStyle = this.colorSimboloD;    //lo que carga
      this.ctx.fillRect(this.posXsimbolo + 5, this.posYsimbolo + 5, this.anchoSimbolo - 10, this.altoSimbolo - 10);

      //El visto
      this.ctx.beginPath(); //El visto, cuenta con 7 vertices
      this.ctx.moveTo(this.posXsimbolo + 13, this.posYsimbolo + 45);
      this.ctx.lineTo(this.posXsimbolo + 26, this.posYsimbolo + 32);
      this.ctx.lineTo(this.posXsimbolo + 39, this.posYsimbolo + 45);
      this.ctx.lineTo(this.posXsimbolo + 65, this.posYsimbolo + 19);
      this.ctx.lineTo(this.posXsimbolo + 78, this.posYsimbolo + 32);
      this.ctx.lineTo(this.posXsimbolo + 39, this.posYsimbolo + 71);
      this.ctx.fillStyle = this.colorSimboloF;
      this.ctx.fill();
    }

    //////////////////////////
    //quinto this.estado no disponible
    if (this.estado == 5) {
      //Tapas del tanque
      this.ctx.fillStyle = this.colorEtradas; //tapas
      this.ctx.fillRect(150, 268, 62, 18); //abajo
      this.ctx.fillRect(271, 87, 18, 38); //derecha
      this.ctx.fillRect(72, 87, 18, 38); //izquierda


      //simbolo
      this.ctx.fillStyle = this.colorSimboloA;    //Caja simbolo
      this.ctx.fillRect(this.posXsimbolo, this.posYsimbolo, this.anchoSimbolo, this.altoSimbolo);
      this.ctx.fillStyle = this.colorSimboloE;    //lo que carga
      this.ctx.fillRect(this.posXsimbolo + 5, this.posYsimbolo + 5, this.anchoSimbolo - 10, this.altoSimbolo - 10);

      //la equis
      this.ctx.beginPath(); //la equis cuenta con muchos vertices
      this.ctx.moveTo(this.posXsimbolo + 45, this.posYsimbolo + 32);
      this.ctx.lineTo(this.posXsimbolo + 56, this.posYsimbolo + 19);
      this.ctx.lineTo(this.posXsimbolo + 69, this.posYsimbolo + 32);

      this.ctx.lineTo(this.posXsimbolo + 56, this.posYsimbolo + 45);
      this.ctx.lineTo(this.posXsimbolo + 69, this.posYsimbolo + 56);
      this.ctx.lineTo(this.posXsimbolo + 56, this.posYsimbolo + 69);

      this.ctx.lineTo(this.posXsimbolo + 45, this.posYsimbolo + 56);
      this.ctx.lineTo(this.posXsimbolo + 32, this.posYsimbolo + 69);
      this.ctx.lineTo(this.posXsimbolo + 19, this.posYsimbolo + 56);

      this.ctx.lineTo(this.posXsimbolo + 32, this.posYsimbolo + 45);
      this.ctx.lineTo(this.posXsimbolo + 19, this.posYsimbolo + 32);
      this.ctx.lineTo(this.posXsimbolo + 32, this.posYsimbolo + 19);

      this.ctx.fillStyle = this.colorSimboloF;
      this.ctx.fill();
    }
    // window.requestAnimationFrame(this.dibujar);
  }


}

export class Square {
  constructor(private ctx: CanvasRenderingContext2D) { }

  draw(x: number, y: number, z: number) {
    this.ctx.fillRect(z * x, z * y, z, z);
  }

  move(y: number, z: number) {
    const max = this.ctx.canvas.width / z;
    const canvas = this.ctx.canvas;
    let x = 0;
    const i = setInterval(() => {
      // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.draw(x, y, z);
      x++;
      if (x >= max) {
        clearInterval(i);
      }
    }, 100);
  }
}
