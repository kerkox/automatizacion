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
        return 'badge badge-secondary'
      case 'TERMINADA':
        return 'badge badge-success'
    }
  }
}
