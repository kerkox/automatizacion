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
      if (!res || res.length == 0) {
        this.guardarData(types.API.ReferenciaProductos,'Shampoo');
        this.guardarData(types.API.ReferenciaProductos,'Acondicionador');
      }
    })
    this.consultarData(types.API.TipoProductos).then((res: any) => {
      if (!res || res.length == 0) {
        this.guardarData(types.API.TipoProductos, 'Lisos');
        this.guardarData(types.API.TipoProductos, 'Risos');
        this.guardarData(types.API.TipoProductos, 'Duos');
      }
    })
    this.consultarData(types.API.Prioridades).then((res: any) => {
      if (!res || res.length == 0) {
        this.guardarData(types.API.Prioridades, 'Alta');
        this.guardarData(types.API.Prioridades, 'Media');
        this.guardarData(types.API.Prioridades, 'Baja');
      }
    })
    this.consultarData(types.API.PresentacionProductos).then((res: any) => {
      if (!res || res.length == 0) {
        this.guardarData(types.API.PresentacionProductos, '400 ml');
        this.guardarData(types.API.PresentacionProductos, '200 ml');
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
    let camposGuardadas = localStorage.getItem(campo);
    let campos;
    if (camposGuardadas) {
      campos = JSON.parse(camposGuardadas);
      campos.push(valor);
    } else {
      campos = [valor];
    }
    localStorage.setItem(campo, JSON.stringify(campos));
  }

  
}
