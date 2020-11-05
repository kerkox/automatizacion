import { ApiService } from './api.service';
import { OrdenPedido } from '../interfaces/orden-pedido.interface';
import { Injectable } from '@angular/core';
import { types } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class OrdenPedidoService {
  constructor(private api: ApiService) { 
    this.inicializarValores();
  }

  inicializarValores() {
    this.consultarData(types.API.ReferenciaProductos).then((res: any) => {
      if (!res || res.data.length == 0) {
        this.guardarData(types.API.ReferenciaProductos,{descripcion: 'Shampoo'});
        this.guardarData(types.API.ReferenciaProductos,{descripcion: 'Acondicionador'})
      }
    })
    this.consultarData(types.API.TipoProductos).then((res: any) => {
      if (!res || res.data.length == 0) {
        this.guardarData(types.API.TipoProductos,{descripcion: 'Lisos'});
        this.guardarData(types.API.TipoProductos,{descripcion: 'Risos'});
        this.guardarData(types.API.TipoProductos,{descripcion: 'Duos'});
      }
    })
    this.consultarData(types.API.Prioridades).then((res: any) => {
      if (!res || res.data.length == 0) {
        this.guardarData(types.API.Prioridades, {descripcion: 'Alta', nivel:1});
        this.guardarData(types.API.Prioridades, { descripcion: 'Media', nivel: 2});
        this.guardarData(types.API.Prioridades, { descripcion: 'Baja', nivel: 3});
      }
    })
    this.consultarData(types.API.PresentacionProductos).then((res: any) => {
      if (!res || res.data.length == 0) {
        this.guardarData(types.API.PresentacionProductos,{descripcion: '450 ml', cantidad:450});
        this.guardarData(types.API.PresentacionProductos,{descripcion: '250 ml', cantidad: 250});
      }
    })
  }

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
