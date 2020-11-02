import { ActualizarMateriaPrima } from './../interfaces/materiaPrima.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CrearMateriaPrima } from '../interfaces/materiaPrima.interface';
import { types } from '../types/types';


const BASE_URL = environment.base_url; 
@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {

  constructor(private http: HttpClient) {

  }

 
  crear(crearMateriaPrima: CrearMateriaPrima) {
    return this.http.post(`${BASE_URL}/${types.API.MateriaPrimas}`, crearMateriaPrima).toPromise();
  }

  obtenerMateriasPrimas() {
    return this.http.get(`${BASE_URL}/${types.API.MateriaPrimas}`).toPromise();
  }

  borrar(id: string){
    return this.http.delete(`${BASE_URL}/${types.API.MateriaPrimas}/${id}`).toPromise();
  }

  actualizar(actualizarMateriaPrima:ActualizarMateriaPrima ) {
    return this.http.put(`${BASE_URL}/${types.API.MateriaPrimas}/${actualizarMateriaPrima.id}`, actualizarMateriaPrima).toPromise();
  }

}
