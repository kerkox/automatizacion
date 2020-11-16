import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  colorBadgeEstadoOrden(estado: string) {
    switch (estado) {
      case 'GENERADA':
        return 'badge badge-secondary'
      case 'EN COLA':
        return 'badge badge-primary'
      case 'EN PRODUCCION':
        return 'badge badge-warning'
      case 'TERMINADA':
        return 'badge badge-success'
      case 'ABORTADA':
        return 'badge badge-danger'
    }
  }

  colorBadgePrioridad(nivel: number){
    switch(nivel){
      case 1:
        return 'badge badge-danger'
      case 2:
        return 'badge badge-warning'
      case 3: 
        return 'badge badge-primary'
    }
  }
}
