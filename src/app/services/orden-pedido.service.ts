import { ApiService } from './api.service';
import { OrdenPedido } from '../interfaces/orden-pedido.interface';
import { Injectable } from '@angular/core';
import { types } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class OrdenPedidoService {
  constructor(private api: ApiService) { }

  consultarReferenciasProducto(){
    return this.consultarData(types.API.ReferenciaProductos);
  }

  consultarTiposProducto() {
    return this.consultarData(types.API.TipoProductos);
  }

  consultarPrioridades() {
    return this.consultarData(types.API.Prioridades);
  }

  consultarPresentacionProducto() {
    return this.consultarData(types.API.PresentacionProductos);
  }

  consultarOrdenesPedido() {
    return this.consultarData(types.API.OrdenesPedidos);
  }

  consultarData(campo: any) {
    return this.api.get(campo);
  }

  guardarOrdenPedido(ordenPedido:OrdenPedido) {
    return this.guardarData(types.API.OrdenesPedidos,ordenPedido);
  }

  guardarData(campo: any, valor: any) {
    return this.api.post(campo, valor);    
  }

  
}
