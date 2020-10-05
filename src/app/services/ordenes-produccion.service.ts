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
    
  }
}
