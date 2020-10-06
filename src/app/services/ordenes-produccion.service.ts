import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdenesProduccionService {

  constructor() { }


  consultarOrdenesProduccion() {
    return new Promise((resolve, reject) => {
      let ordenesGuardadas = localStorage.getItem('ordenes');

      if(ordenesGuardadas){
        resolve(JSON.parse(ordenesGuardadas))
      } else {
        resolve([]);
      }
    })
  }

  guardarOrdenProduccion(ordenProduccion) {
    let ordenesGuardadas = localStorage.getItem('ordenes');
    let ordenesProduccion;
    if(ordenesGuardadas){
      ordenesProduccion = JSON.parse(ordenesGuardadas);
      ordenesProduccion.push(ordenProduccion);      
    } else {
      ordenesProduccion = [ordenProduccion];
    }

    localStorage.setItem('ordenes', JSON.stringify(ordenesProduccion));

  }
}
