import { EstadoOrden } from './../enums/estado-orden.enum';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { types } from '../types/types';
import { OrdenProduccionAprobar } from '../interfaces/orden-produccion-aprobar.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdenProduccionService {

  constructor(private api: ApiService) { }


  consultarOrdenesProduccion(estadoOrden: EstadoOrden = EstadoOrden.GENERADA) {
    return this.api.get(types.API.OrdenProduccionByEstado(estadoOrden.toString()));
  }

  aprobar(ordenProduccionAprobar:OrdenProduccionAprobar[]){
    return this.api.post(types.API.OrdenProduccionAprobar, ordenProduccionAprobar)
  }


}
