import { IInventario } from './../interfaces/inventario.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { types } from '../types/types';


const BASE_URL = environment.base_url; 

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) {

  }

  crear(inventario: IInventario) {
    return this.http.post(`${BASE_URL}/${types.API.Inventario}`, inventario).toPromise();
  }

  obtenerInventarios() {
    return this.http.get(`${BASE_URL}/${types.API.Inventario}`).toPromise();
  }

  borrar(id: string) {
    return this.http.delete(`${BASE_URL}/${types.API.Inventario}/${id}`).toPromise();
  }

  actualizar(id: string, inventario: IInventario) {
    return this.http.put(`${BASE_URL}/${types.API.Inventario}/${id}`, inventario).toPromise();
  }
}
