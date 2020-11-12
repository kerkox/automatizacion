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
      case 'EN PRODUCCION':
        return 'badge badge-primary'
      case 'TERMINADA':
        return 'badge badge-success'
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
