import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdenesProduccionService {
  constructor() { 
    this.inicializarValores();
  }

  inicializarValores() {
    this.consultarData('referencias').then(res => {
      if (!res) {
        this.guardarData('referencias','Shampoo');
        this.guardarData('referencias','Acondicionador');
      }
    })
    this.consultarData('tipos').then(res => {
      if (!res) {
        this.guardarData('tipos', 'Lisos');
        this.guardarData('tipos', 'Risos');
        this.guardarData('tipos', 'Duos');
      }
    })
  }

  consultarData(campo: any) {
    return new Promise((resolve, reject) => {
      let campos = localStorage.getItem(campo);
      if (campos) {
        resolve(JSON.parse(campos))
      } else {
        resolve([]);
      }
    })
  }

  guardarData(campo: any, valor: any) {
    let camposGuardadas = localStorage.getItem(campo);
    let campos;
    if (camposGuardadas) {
      campos = JSON.parse(camposGuardadas);
      campos.push(valor);
    } else {
      campos = [valor];
    }
    localStorage.setItem(campo, campos);
  }

  
}
