import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { types } from '../types/types';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class OrdenesProduccionService {
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
        this.guardarData(types.API.Prioridades,{descripcion: 'Alta'});
        this.guardarData(types.API.Prioridades,{descripcion: 'Media'});
        this.guardarData(types.API.Prioridades,{descripcion: 'Baja'});
      }
    })
    this.consultarData(types.API.PresentacionProductos).then((res: any) => {
      if (!res || res.data.length == 0) {
        this.guardarData(types.API.PresentacionProductos,{descripcion: '400 ml'});
        this.guardarData(types.API.PresentacionProductos,{descripcion: '200 ml'});
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

  consultarOrdenesProduccion() {
    return this.consultarData(types.API.OrdenesProducciones);
  }

  consultarData(campo: any) {
    return this.http.get(`${BASE_URL}/${campo}`).toPromise();
  }

  guardarData(campo: any, valor: any) {
    return this.http.post(`${BASE_URL}/${campo}`, valor).toPromise();
    
  }

  
}
