export class Tanque {

  _colorTanque = '#A0A0A0';
  _colorEtradas = '#505050';
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

  constructor(private ctx: CanvasRenderingContext2D){

  }
/**
 * 
 * @param x position X
 * @param y position X
 * @param size multiplo para el tamaño del tanque
 */
  setPosition(x:number,y: number,size: number){

  }

  draw(){
    //Taque y bloques de fondo
    this.ctx.fillStyle = this._colorTanque; //tanqueprincipal
    this.ctx.fillRect(90, 87, 181, 181);
    this.ctx.fillRect(34, 87, 100, 38);
    this.ctx.fillRect(227, 87, 100, 38);
    this.ctx.fillRect(150, 268, 62, 76);
  }

  set colorTanque(color :string) {
    this._colorTanque = color;
  }

  llenar() {
    //liquidos y compuerta
    this.ctx.fillStyle = this._colorLiquidoA;  //liquido a la izquierda
    this.ctx.fillRect(34, 90, 57, 32);
    this.ctx.fillStyle = this._colorLiquidoB;  //liquido a la derecha
    this.ctx.fillRect(271, 90, 57, 32);
    this.ctx.fillStyle = this._colorMezcla;
    this.ctx.fillRect(95, 223, 171, 40);
    this.ctx.fillStyle = this._colorEtradas; //tapa abajo
    this.ctx.fillRect(150, 268, 62, 18);


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

  mezclar() {
    //////////////////////////
    //Segundo this._estado mezclandoce
      //liquidos y compuertas
      this.ctx.fillStyle = this._colorMezcla; //la mescla
      this.ctx.fillRect(95, 128, 171, 133);
      this.ctx.fillStyle = this._colorEtradas; //tapas
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
    this.ctx.fillStyle = this._colorEtradas; //tapas
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
    this.ctx.fillStyle = this._colorEtradas; //tapas
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