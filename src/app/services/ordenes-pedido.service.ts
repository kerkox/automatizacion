import { OrdenPedido } from '../interfaces/ordenPedido.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { types } from '../types/types';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class OrdenesPedidoService {
  constructor(private http: HttpClient) { 
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
    return this.http.get(`${BASE_URL}/${campo}`).toPromise();
  }

  guardarOrdenPedido(ordenPedido:OrdenPedido) {
    return this.guardarData(types.API.OrdenesPedidos,ordenPedido);
  }

  guardarData(campo: any, valor: any) {
    return this.http.post(`${BASE_URL}/${campo}`, valor).toPromise();
    
  }

  
}
